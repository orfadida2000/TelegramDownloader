/**
 * @fileoverview Page-world Telegram Web K media resolver and binary downloader.
 *
 * Loaded exactly once as a regular page <script> by content/main.js. Unlike
 * Chrome's isolated-world content scripts, this script can access rootScope's
 * proxied Telegram managers. It performs no transcoding or recompression.
 *
 * Contract with the isolated world:
 *   tvd_media_download: {type:'single'|'batch', media: DownloadRequest|DownloadRequest[]}
 *   tvd_download_done: {ok:boolean, request_id:string, mid:string}
 *   <request_id>_media_download_progress: {request_id, progress, download_id}
 *
 * A successful completion means that a browser download has been initiated;
 * it is not a filesystem-level confirmation that the user saved the file.
 */
(() => {
  "use strict";
  if (window.__tvdInjectLoaded) return;
  window.__tvdInjectLoaded = true;
  document.documentElement.setAttribute("data-tvd-page-inject", "1");

  const LOG_PREFIX = "[Telegram Downloader]";
  const CHUNK_SIZE = 1024 * 1024;
  const MAX_IN_FLIGHT_CHUNKS = 6;
  const MAX_ATTEMPTS = 4;
  const VIEWER_TIMEOUT_MS = 10000;
  const OBJECT_URL_REVOKE_DELAY_MS = 60000;
  const activeDownloads = new Map();
  const RANGE_PATTERN = /^bytes\s+(\d+)-(\d+)\/(\d+|\*)$/i;

  /** @typedef {TelegramWebKDocument} TelegramDocument */
  /** @typedef {TelegramWebKPhotoSize} TelegramPhotoSize */
  /** @typedef {TelegramWebKPhoto} TelegramPhoto */
  /** @typedef {{type: string, media_url?: string, resolved_url?: string, mid?: string, pid?: string, fallback_selector?: string, request_id: string, progress_id?: string, download_id?: string|number}} DownloadRequest */
  /** @typedef {{url: string, filename?: string, mime?: string, label: string}} DownloadCandidate */
  /** @typedef {{blob: Blob, mime: string}} DownloadedBytes */

  /** @param {string} message @param {unknown} [details] */
  const warn = (message, details) => console.warn(LOG_PREFIX, message, details ?? "");
  /** @param {string} message @param {unknown} [details] */
  const error = (message, details) => console.error(LOG_PREFIX, message, details ?? "");

  /**
   * Generate a stable lock key for a specific Telegram message. A numeric UI
   * index is never treated as an actual Telegram message ID.
   * @param {DownloadRequest} request
   * @returns {string}
   */
  function getDownloadKey(request) {
    const pid = String(request.pid ?? "").trim();
    const mid = String(request.mid ?? "").trim();
    if (/^-?\d+$/.test(pid) && /^\d+$/.test(mid) && mid !== "0") {
      return `id:${pid}:${mid}`;
    }
    const source = request.media_url || request.resolved_url || "";
    if (source) return `url:${source}`;
    if (request.fallback_selector) return `selector:${request.fallback_selector}`;
    return "";
  }

  /**
   * Atomically claim an in-flight request, or reject a concurrent duplicate.
   * @param {DownloadRequest} request
   * @returns {{key: string, owner: symbol}|null}
   */
  function claimDownload(request) {
    const key = getDownloadKey(request);
    if (key && activeDownloads.has(key)) return null;
    const owner = Symbol("telegram-download");
    if (key) activeDownloads.set(key, owner);
    return { key, owner };
  }

  /** @param {{key: string, owner: symbol}} claim */
  function releaseDownload(claim) {
    if (claim.key && activeDownloads.get(claim.key) === claim.owner) {
      activeDownloads.delete(claim.key);
    }
  }

  /**
   * Acknowledge completion or failure exactly once for each accepted request.
   * @param {DownloadRequest} request
   * @param {boolean} ok
   */
  function emitDone(request, ok) {
    document.dispatchEvent(
      new CustomEvent("tvd_download_done", {
        detail: { ok, request_id: request.request_id || "", mid: request.mid || "" },
      }),
    );
  }

  /**
   * Emit a request-specific percentage; use 'error' to restore the download UI
   * without mistakenly reporting 100% when the fetch has failed.
   * @param {DownloadRequest} request
   * @param {number|'error'} progress
   */
  function emitProgress(request, progress) {
    const id = request.progress_id || request.request_id;
    if (!id) return;
    const value =
      typeof progress === "number" ? Math.max(0, Math.min(100, progress)).toFixed(2) : progress;
    document.dispatchEvent(
      new CustomEvent(id + "_media_download_progress", {
        detail: { request_id: id, progress: value, download_id: request.download_id },
      }),
    );
  }

  /**
   * Accept only Telegram-origin or Telegram-created blob URLs as downloaded
   * sources; never hand arbitrary page-provided external URLs to fetch().
   * @param {string} value
   * @returns {boolean}
   */
  function isUsableUrl(value) {
    if (typeof value !== "string" || !value) return false;
    if (value.startsWith("blob:")) {
      return value.startsWith(`blob:${window.location.origin}/`);
    }
    try {
      const url = new URL(value, window.location.origin);
      return (
        url.origin === window.location.origin &&
        ["http:", "https:"].includes(url.protocol) &&
        !/\.m3u8(?:\?|$)/i.test(url.pathname)
      );
    } catch {
      return false;
    }
  }

  /**
   * Determine the active Telegram chat peer from stable Web K DOM hints.
   * An explicitly supplied peer ID remains authoritative for album items.
   * @returns {string}
   */
  function getCurrentPeerId() {
    for (const selector of [
      "#column-center .topbar [data-peer-id]",
      "#column-center .bubble[data-peer-id]",
      "#MiddleColumn [data-peer-id]",
      "#column-right [data-peer-id]",
    ]) {
      const id = document.querySelector(selector)?.getAttribute("data-peer-id");
      if (id) return id;
    }
    return "";
  }

  /**
   * Retrieve message metadata through Web K's asynchronous worker proxies.
   * @param {DownloadRequest} request
   * @returns {Promise<{message: TelegramWebKMessage, managers: TelegramWebKManagers}|null>}
   */
  async function lookupMessage(request) {
    const managers = window.rootScope?.managers;
    const pid = String(request.pid || getCurrentPeerId());
    const mid = String(request.mid || "");
    if (
      !managers?.appMessagesManager?.getMessageByPeer ||
      !/^-?\d+$/.test(pid) ||
      !/^\d+$/.test(mid) ||
      mid === "0"
    )
      return null;
    try {
      const message = await managers.appMessagesManager.getMessageByPeer(Number(pid), Number(mid));
      return message ? { message, managers } : null;
    } catch (exception) {
      warn("Message metadata unavailable; trying DOM/viewer fallback.", exception);
      return null;
    }
  }

  /**
   * Select the largest genuinely downloadable photo size, not a stripped or
   * embedded preview. Progressive sizes report their largest available byte
   * segment in the sizes array. Dimensions take priority over byte length.
   * @param {TelegramPhoto} photo
   * @returns {TelegramPhotoSize|null}
   */
  function chooseLargestPhotoSize(photo) {
    const candidates = Array.isArray(photo?.sizes)
      ? photo.sizes.filter(
          (size) =>
            size &&
            Number(size.w) > 0 &&
            Number(size.h) > 0 &&
            size._ !== "photoStrippedSize" &&
            size._ !== "photoSizeEmpty",
        )
      : [];
    candidates.sort((a, b) => {
      const area = Number(b.w) * Number(b.h) - Number(a.w) * Number(a.h);
      if (area) return area;
      /** @param {TelegramPhotoSize} size */
      const bytes = (size) =>
        Number(size.size) || (Array.isArray(size.sizes) ? Number(size.sizes.at(-1)) : 0) || 0;
      return bytes(b) - bytes(a);
    });
    return candidates[0] || null;
  }

  /**
   * Determine the original name of a Telegram document, including the
   * documentAttributeFilename representation when file_name is absent.
   * @param {TelegramDocument} doc
   * @returns {string}
   */
  function documentFilename(doc) {
    return String(
      doc.file_name ||
        doc.attributes?.find((attr) => attr?._ === "documentAttributeFilename")?.file_name ||
        "",
    );
  }

  /**
   * Encode the same document-file descriptor used by the previous extension's
   * Web K /k/stream endpoint. No video conversion or alternate transcode occurs.
   * @param {TelegramDocument} doc
   * @returns {DownloadCandidate|null}
   */
  function documentCandidate(doc) {
    if (!doc?.id || doc.dc_id == null || !doc.access_hash || !doc.file_reference) return null;
    const filename = documentFilename(doc);
    const descriptor = {
      dcId: doc.dc_id,
      location: {
        _: "inputDocumentFileLocation",
        id: doc.id,
        access_hash: doc.access_hash,
        file_reference: doc.file_reference,
      },
      size: doc.size,
      mimeType: doc.mime_type,
      fileName: filename,
    };
    return {
      url: `${window.location.origin}/k/stream/${encodeURIComponent(JSON.stringify(descriptor))}`,
      filename,
      mime: String(doc.mime_type || ""),
      label: `document ${String(doc.id)}`,
    };
  }

  /**
   * Retrieve alternate video documents from the message or Web K's document
   * registry. The primary document is kept first because it is the uploaded
   * original/source. Transcoded alternatives are only failure fallbacks.
   * @param {TelegramWebKMessageMedia} messageMedia
   * @param {TelegramDocument} primary
   * @param {TelegramWebKManagers} managers
   * @returns {Promise<TelegramDocument[]>}
   */
  async function getVideoDocuments(messageMedia, primary, managers) {
    let alternatives = Array.isArray(messageMedia?.alt_documents) ? messageMedia.alt_documents : [];
    if (!alternatives.length && managers?.appDocsManager?.getAltDocsByDocument) {
      try {
        const result = await managers.appDocsManager.getAltDocsByDocument(primary.id);
        if (Array.isArray(result)) alternatives = result;
      } catch (exception) {
        warn("Alternate video document lookup failed.", exception);
      }
    }
    const seen = new Set([String(primary.id)]);
    const unique = alternatives.filter((doc) => {
      if (!doc?.id || seen.has(String(doc.id))) return false;
      seen.add(String(doc.id));
      return true;
    });
    /** @param {TelegramDocument} doc */
    const resolution = (doc) => {
      const attr = doc.attributes?.find((value) => value?._ === "documentAttributeVideo");
      return Number(attr?.w || 0) * Number(attr?.h || 0);
    };
    unique.sort(
      (a, b) => resolution(b) - resolution(a) || Number(b.size || 0) - Number(a.size || 0),
    );
    return [primary, ...unique];
  }

  /**
   * Construct quality-aware candidate factories in fidelity preference order.
   * A photo's largest variant is resolved directly through apiFileManager;
   * a document uses its original byte stream (alt video files follow only if
   * the original cannot be fetched). Viewer/DOM fallbacks are appended later.
   * @param {DownloadRequest} request
   * @param {{message: TelegramWebKMessage, managers: TelegramWebKManagers}|null} lookup
   * @returns {Promise<{candidates: Array<() => Promise<DownloadCandidate|null>>, photoSize: TelegramPhotoSize|null}>}
   */
  async function messageCandidates(request, lookup) {
    /** @type {Array<() => Promise<DownloadCandidate|null>>} */
    const candidates = [];
    /** @type {TelegramPhotoSize|null} */
    let photoSize = null;
    if (!lookup) return { candidates, photoSize };
    const { message, managers } = lookup;
    const media = message.media || {};
    const photo = media.photo || media.webpage?.photo;
    const doc = media.document || media.webpage?.document;
    const kind = String(request.type || "").toLowerCase();
    if (photo && (kind.includes("image") || kind === "img")) {
      photoSize = chooseLargestPhotoSize(photo);
      const fileManager = managers.apiFileManager;
      if (photoSize && fileManager?.downloadMediaURL) {
        const selectedSize = photoSize;
        candidates.push(async () => ({
          url: await fileManager.downloadMediaURL({ media: photo, thumb: selectedSize }),
          filename: `photo_${String(message.id || request.mid || photo.id)}`,
          mime: "image/jpeg",
          label: `photo ${String(photo.id)} (${selectedSize.w}x${selectedSize.h})`,
        }));
      }
    }
    if (doc) {
      const docs = kind.includes("video") ? await getVideoDocuments(media, doc, managers) : [doc];
      for (const document of docs) {
        const candidate = documentCandidate(document);
        if (candidate) candidates.push(async () => candidate);
      }
    }
    return { candidates, photoSize };
  }

  /** @param {Element|null} node @returns {string} */
  function getMediaNodeSrc(node) {
    if (!node) return "";
    const mediaNode = /** @type {HTMLMediaElement|HTMLImageElement} */ (node);
    const source =
      mediaNode.currentSrc ||
      mediaNode.src ||
      node.getAttribute?.("src") ||
      node.querySelector?.("source")?.src ||
      "";
    return isUsableUrl(String(source)) ? String(source) : "";
  }

  /**
   * Ignore hidden viewers left mounted in Telegram's SPA DOM. A hidden prior
   * story/photo must never be mistaken for the preview we just opened.
   * @param {Element|null} element
   * @returns {boolean}
   */
  function isVisibleViewer(element) {
    if (!element || element.classList.contains("hide") || element.classList.contains("is-hidden"))
      return false;
    const style = getComputedStyle(element);
    if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
      return false;
    }
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  /**
   * Read the best active viewer source, preferring the largest decoded image.
   * @param {'image'|'video'} kind
   * @returns {{url: string, width: number, height: number}|null}
   */
  function getViewerSource(kind) {
    const roots = [
      document.querySelector("#stories-viewer"),
      document.querySelector(".media-viewer-movers"),
    ].filter((root) => root !== null);
    for (const root of roots) {
      const viewer = root.closest(".media-viewer-whole, #MediaViewer, #stories-viewer") || root;
      if (!isVisibleViewer(viewer)) continue;
      if (kind === "video") {
        const source = root.querySelector("video.media-video source, video source, video");
        const url = getMediaNodeSrc(source);
        if (url) return { url, width: 0, height: 0 };
      } else {
        const images = [
          .../** @type {NodeListOf<HTMLImageElement>} */ (
            root.querySelectorAll("img.media-photo, img.full-media, img.thumbnail")
          ),
        ];
        const choices = images
          .filter((img) => !img.classList.contains("logo-img"))
          .map((img) => ({
            url: getMediaNodeSrc(img),
            width: img.naturalWidth || 0,
            height: img.naturalHeight || 0,
          }))
          .filter((image) => image.url);
        choices.sort((a, b) => b.width * b.height - a.width * a.height);
        if (choices.length) return choices[0];
      }
    }
    return null;
  }

  /**
   * Reproduce a Telegram click for the exceptional last-resort viewer path.
   * @param {Element} element
   */
  function dispatchClick(element) {
    if (!element) return;
    for (const type of ["mouseover", "mousedown", "mouseup", "click"]) {
      element.dispatchEvent(
        new MouseEvent(type, { bubbles: true, cancelable: true, view: window }),
      );
    }
  }

  /** @returns {boolean} Whether any existing media viewer is visibly open. */
  function viewerIsOpen() {
    return [
      ...document.querySelectorAll(".media-viewer-whole, #MediaViewer, #stories-viewer"),
    ].some(isVisibleViewer);
  }

  /**
   * Close only the preview this resolver opened; do not close a pre-existing
   * user viewer or depend on a positional toolbar-button index.
   */
  function closeOpenedViewer() {
    const close = document.querySelector(
      "div.media-viewer-whole button.media-viewer-close, #MediaViewer button.media-viewer-close, #stories-viewer button.media-viewer-close",
    );
    if (close) dispatchClick(close);
  }

  /**
   * Open the viewer only after direct/DOM candidates have failed. For photos,
   * wait for the requested full-size dimensions rather than taking the first
   * low-resolution thumbnail to appear. Caller owns cleanup until fetch ends.
   * @param {DownloadRequest} request
   * @param {TelegramPhotoSize|null} targetSize
   * @returns {Promise<{candidate: DownloadCandidate, cleanup: () => void}|null>}
   */
  async function viewerCandidate(request, targetSize) {
    if (!request.fallback_selector || viewerIsOpen()) return null;
    const host = document.querySelector(request.fallback_selector);
    if (!host) return null;
    const target =
      host.querySelector(
        ".album-item-media, .media-inner, img.media-photo, img.thumbnail, video.media-video, .video-time, .video-duration",
      ) || host;
    const kind = /^(img|image)$/i.test(request.type) ? "image" : "video";
    dispatchClick(target);
    let best = null;
    const targetArea = Number(targetSize?.w || 0) * Number(targetSize?.h || 0);
    const deadline = Date.now() + VIEWER_TIMEOUT_MS;
    while (Date.now() < deadline) {
      const source = getViewerSource(kind);
      if (source) {
        if (!best || source.width * source.height >= best.width * best.height) best = source;
        if (kind === "video" || !targetArea || source.width * source.height >= targetArea) break;
      }
      await new Promise((resolve) => window.setTimeout(resolve, 200));
    }
    if (!best) {
      closeOpenedViewer();
      return null;
    }
    return {
      candidate: {
        url: best.url,
        filename: kind === "image" ? `photo_${request.mid || "unknown"}` : "",
        mime: kind === "image" ? "image/jpeg" : "",
        label: "viewer fallback",
      },
      cleanup: closeOpenedViewer,
    };
  }

  /**
   * Parse RFC 7233 Content-Range and reject malformed/unknown lengths.
   * @param {string|null} header
   * @returns {{start: number, end: number, total: number}|null}
   */
  function parseContentRange(header) {
    const match = String(header || "").match(RANGE_PATTERN);
    if (!match || match[3] === "*") return null;
    const start = Number(match[1]),
      end = Number(match[2]),
      total = Number(match[3]);
    if (
      ![start, end, total].every(Number.isSafeInteger) ||
      start < 0 ||
      end < start ||
      end >= total
    ) {
      return null;
    }
    return { start, end, total };
  }

  /**
   * Retry transient network/HTTP failures with bounded exponential backoff.
   * @param {string} url
   * @param {RequestInit} options
   * @returns {Promise<Response>}
   */
  async function fetchWithRetries(url, options) {
    let lastError;
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      try {
        const response = await fetch(url, options);
        if (response.ok) return response;
        if (![408, 429, 500, 502, 503, 504].includes(response.status)) {
          throw new Error(`Non-retryable HTTP ${response.status}`);
        }
        lastError = new Error(`HTTP ${response.status}`);
      } catch (exception) {
        lastError = exception;
        const message = exception instanceof Error ? exception.message : String(exception);
        if (options.signal?.aborted || /Non-retryable/.test(message)) throw exception;
      }
      if (attempt < MAX_ATTEMPTS - 1) {
        await new Promise((resolve) =>
          window.setTimeout(resolve, Math.min(300 * 2 ** attempt, 2400)),
        );
      }
    }
    throw lastError || new Error("Media fetch failed");
  }

  /**
   * Consume an ordinary 200 response using streams when available. Supports
   * media endpoints without Range support and all object-URL sources.
   * @param {Response} response
   * @param {DownloadRequest} request
   * @param {string} hint
   * @returns {Promise<DownloadedBytes>}
   */
  async function readFullResponse(response, request, hint) {
    const total = Number(response.headers.get("Content-Length")) || 0;
    const mime = response.headers.get("Content-Type") || hint || "application/octet-stream";
    if (!response.body?.getReader) {
      const blob = await response.blob();
      emitProgress(request, 99.99);
      return { blob: blob.type ? blob : new Blob([blob], { type: mime }), mime };
    }
    const reader = response.body.getReader();
    const parts = [];
    let received = 0;
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        parts.push(value);
        received += value.byteLength;
        if (total) emitProgress(request, Math.min(99.99, (received * 100) / total));
      }
    } finally {
      reader.releaseLock();
    }
    if (total && total !== received)
      throw new Error(`Truncated response: ${received}/${total} bytes`);
    return { blob: new Blob(parts, { type: mime }), mime };
  }

  /**
   * Fetch the original binary bytes with Range verification when supported.
   * A 200 response is consumed directly; each 206 is validated for expected
   * offset, length and total. Fallback never silently saves partial data.
   * @param {DownloadCandidate} candidate
   * @param {DownloadRequest} request
   * @returns {Promise<DownloadedBytes>}
   */
  async function downloadBytes(candidate, request) {
    const url = candidate.url;
    if (!isUsableUrl(url)) throw new Error("Unsupported or untrusted media URL");
    if (url.startsWith("blob:")) {
      const response = await fetchWithRetries(url, {});
      return readFullResponse(response, request, candidate.mime || "");
    }

    // Discover the server's actual range unit. Some Telegram endpoints serve
    // fewer bytes than requested; subsequent requests use the observed size.
    const first = await fetchWithRetries(url, { headers: { Range: `bytes=0-${CHUNK_SIZE - 1}` } });
    if (first.status === 200) return readFullResponse(first, request, candidate.mime || "");
    if (first.status !== 206) throw new Error(`Expected 206, got HTTP ${first.status}`);
    const initialRange = parseContentRange(first.headers.get("Content-Range"));
    if (!initialRange || initialRange.start !== 0) {
      throw new Error("Invalid initial Content-Range");
    }
    const initialBytes = await first.arrayBuffer();
    if (initialBytes.byteLength !== initialRange.end + 1) {
      throw new Error("Truncated initial media segment");
    }
    const mime = first.headers.get("Content-Type") || candidate.mime || "application/octet-stream";
    const total = initialRange.total;
    const segmentSize = initialBytes.byteLength;
    const remainingCount = Math.ceil((total - segmentSize) / segmentSize);
    const parts = new Array(remainingCount + 1);
    parts[0] = initialBytes;
    let received = segmentSize;
    let nextJob = 0;
    emitProgress(request, Math.min(99.99, (100 * received) / total));
    if (!remainingCount) return { blob: new Blob(parts, { type: mime }), mime };

    const controller = new AbortController();
    /**
     * Independently fetch and validate one range at a time per worker. The
     * indexed result array guarantees ordered reassembly regardless of which
     * requests finish first; the shared byte counter reports actual progress.
     * @returns {Promise<void>}
     */
    async function worker() {
      while (nextJob < remainingCount && !controller.signal.aborted) {
        const job = nextJob++;
        const from = segmentSize * (job + 1);
        const to = Math.min(total - 1, from + segmentSize - 1);
        const response = await fetchWithRetries(url, {
          headers: { Range: `bytes=${from}-${to}` },
          signal: controller.signal,
        });
        if (response.status !== 206) throw new Error("Server stopped honoring byte ranges");
        const range = parseContentRange(response.headers.get("Content-Range"));
        if (!range || range.start !== from || range.end !== to || range.total !== total) {
          throw new Error(`Unexpected Content-Range for byte range ${from}-${to}`);
        }
        const bytes = await response.arrayBuffer();
        if (bytes.byteLength !== to - from + 1) {
          throw new Error(`Truncated media segment ${from}-${to}`);
        }
        parts[job + 1] = bytes;
        received += bytes.byteLength;
        emitProgress(request, Math.min(99.99, (100 * received) / total));
      }
    }
    const workers = Array.from({ length: Math.min(MAX_IN_FLIGHT_CHUNKS, remainingCount) }, worker);
    try {
      await Promise.all(workers);
    } catch (exception) {
      controller.abort();
      await Promise.allSettled(workers);
      throw exception;
    }
    if (received !== total || parts.some((part) => !part)) {
      throw new Error(`Incomplete download: ${received}/${total} bytes`);
    }
    return { blob: new Blob(parts, { type: mime }), mime };
  }

  /**
   * Derive a suitable filename extension from the actual response MIME type;
   * never label a downloaded photo as MP4 solely because its URL is a blob.
   * @param {string} mime
   * @returns {string}
   */
  function extensionForMime(mime) {
    const type = String(mime || "")
      .split(";")[0]
      .toLowerCase()
      .trim();
    /** @type {Record<string,string>} */
    const known = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/gif": "gif",
      "image/avif": "avif",
      "video/mp4": "mp4",
      "video/webm": "webm",
      "video/quicktime": "mov",
      "audio/mpeg": "mp3",
      "audio/ogg": "ogg",
      "audio/mp4": "m4a",
      "audio/wav": "wav",
      "audio/webm": "webm",
      "text/plain": "txt",
      "application/pdf": "pdf",
      "application/zip": "zip",
    };
    return (
      known[type] ||
      (type.includes("/") ? type.split("/")[1].replace(/[^a-z0-9]+/g, "") : "") ||
      "bin"
    );
  }

  /**
   * Decode a candidate's original descriptor when Telegram provides no
   * filename separately; avoid trusting a URL path as a filename.
   * @param {string} url
   * @returns {string}
   */
  function filenameFromStream(url) {
    try {
      const component = url.slice(url.lastIndexOf("/") + 1);
      const meta = JSON.parse(decodeURIComponent(component));
      return typeof meta.fileName === "string" ? meta.fileName : "";
    } catch {
      return "";
    }
  }

  /**
   * Sanitize filenames to one portable name while preserving provided Unicode,
   * original extensions, and the name of a document uploaded as a file.
   * @param {DownloadCandidate} candidate
   * @param {DownloadRequest} request
   * @param {DownloadedBytes} downloaded
   * @returns {string}
   */
  function filenameFor(candidate, request, downloaded) {
    let filename = String(candidate.filename || filenameFromStream(candidate.url) || "");

    filename = filename
      // eslint-disable-next-line no-control-regex -- Intentionally sanitize ASCII control characters.
      .replace(/[\\/:*?"<>|\x00-\x1f]/g, "_")
      .trim()
      .replace(/[. ]+$/, "");
    if (!filename) filename = `telegram_${String(request.mid || "download")}`;

    const ext = extensionForMime(downloaded.mime || downloaded.blob.type || candidate.mime || "");
    if (!/\.[a-z0-9]{1,12}$/i.test(filename)) filename += `.${ext}`;

    return filename;
  }

  /**
   * Initiate the browser save using a newly minted object URL. Keep the URL
   * alive briefly after click so download managers have time to claim it.
   * @param {Blob} blob
   * @param {string} filename
   */
  function saveBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.rel = "noopener";
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    try {
      anchor.click();
    } finally {
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), OBJECT_URL_REVOKE_DELAY_MS);
    }
  }

  /**
   * Attempt a candidate completely, including the actual fetch and download.
   * Source discovery alone is not treated as success.
   * @param {DownloadCandidate} candidate
   * @param {DownloadRequest} request
   * @returns {Promise<boolean>}
   */
  async function attemptCandidate(candidate, request) {
    const downloaded = await downloadBytes(candidate, request);
    if (!downloaded.blob.size) throw new Error("Empty downloaded payload");
    saveBlob(downloaded.blob, filenameFor(candidate, request, downloaded));
    emitProgress(request, 100);
    return true;
  }

  /**
   * Try source-quality candidates in the right order, retrying another source
   * after a failed fetch. Photos use full-size -> viewer -> DOM; videos use
   * original -> alternate(s) -> DOM -> viewer. The viewer is never the first
   * resolution step for normal chat or album videos.
   * @param {DownloadRequest} request
   * @returns {Promise<boolean>}
   */
  async function resolveAndDownload(request) {
    const lookup = await lookupMessage(request);
    const { candidates, photoSize } = await messageCandidates(request, lookup);
    const kind = String(request.type || "").toLowerCase();
    const isImage = kind === "img" || kind === "image";
    const domUrl = String(request.media_url || request.resolved_url || "");
    const dom = isUsableUrl(domUrl)
      ? {
          url: domUrl,
          label: "existing DOM source",
          filename: "",
          mime: "",
        }
      : null;
    const seen = new Set();
    /** @param {DownloadCandidate|null} candidate @returns {Promise<boolean>} */
    async function tryOne(candidate) {
      if (!candidate?.url || !isUsableUrl(candidate.url) || seen.has(candidate.url)) return false;
      seen.add(candidate.url);
      try {
        return await attemptCandidate(candidate, request);
      } catch (exception) {
        warn(`${candidate.label} failed.`, exception);
        return false;
      }
    }
    // Resolve an individual candidate lazily so one failed manager call does
    // not abort subsequent alternatives or the DOM/viewer fallbacks.
    for (const makeCandidate of candidates) {
      try {
        if (await tryOne(await makeCandidate())) return true;
      } catch (exception) {
        warn("Telegram manager could not resolve a source.", exception);
      }
    }
    if (!isImage && (await tryOne(dom))) return true;
    let viewer = null;
    try {
      viewer = await viewerCandidate(request, isImage ? photoSize : null);
      if (viewer && (await tryOne(viewer.candidate))) return true;
    } catch (exception) {
      warn("Viewer fallback failed.", exception);
    } finally {
      viewer?.cleanup();
    }
    if (isImage && (await tryOne(dom))) return true;
    emitProgress(request, "error");
    error("No usable source could be downloaded.", {
      mid: request.mid,
      pid: request.pid,
      type: request.type,
    });
    return false;
  }

  /**
   * Start one request and always release its lock and signal completion.
   * @param {DownloadRequest} request
   * @returns {Promise<void>}
   */
  async function startDownload(request) {
    const claim = claimDownload(request);
    if (!claim) {
      warn("Download already active for this message.", { mid: request.mid, pid: request.pid });
      emitDone(request, false);
      return;
    }
    let ok = false;
    try {
      ok = await resolveAndDownload(request);
    } catch (exception) {
      error("Unexpected download failure.", exception);
      emitProgress(request, "error");
    } finally {
      releaseDownload(claim);
      emitDone(request, ok);
    }
  }

  /**
   * One MAIN-world request listener. Rejected duplicate requests are
   * acknowledged immediately, so the content world does not time out.
   */
  document.addEventListener("tvd_media_download", (event) => {
    const envelope = /** @type {CustomEvent} */ (event).detail || {};
    const requests =
      envelope.type === "single"
        ? [envelope.media]
        : envelope.type === "batch" && Array.isArray(envelope.media)
          ? envelope.media
          : [];
    for (const request of requests) {
      if (request && typeof request === "object") void startDownload(request);
    }
  });
})();
