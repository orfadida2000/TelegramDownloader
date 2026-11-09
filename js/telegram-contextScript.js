/******/ (function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/ module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/ __webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/ __webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/ __webpack_require__.d = function (exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, { enumerable: true, get: getter });
      /******/
    }
    /******/
  };
  /******/
  /******/ // define __esModule on exports
  /******/ __webpack_require__.r = function (exports) {
    /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
      /******/
    }
    /******/ Object.defineProperty(exports, "__esModule", { value: true });
    /******/
  };
  /******/
  /******/ // create a fake namespace object
  /******/ // mode & 1: value is a module id, require it
  /******/ // mode & 2: merge all properties of value into the ns
  /******/ // mode & 4: return value when already ns object
  /******/ // mode & 8|1: behave like require
  /******/ __webpack_require__.t = function (value, mode) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (mode & 4 && typeof value === "object" && value && value.__esModule) return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, "default", { enumerable: true, value: value });
    /******/ if (mode & 2 && typeof value != "string")
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key),
        );
    /******/ return ns;
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/ __webpack_require__.n = function (module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/ __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/ __webpack_require__.p = "/";
  /******/
  /******/
  /******/ // Load entry module and return exports
  /******/ return __webpack_require__((__webpack_require__.s = 4));
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ 3662: /***/ function (module, exports) {
      // (function () {
      if (!window.__tvdInjectLoaded) {
        var _chrome$runtime;
        window.__tvdInjectLoaded = true;
        const logger = {
          // Suppress routine progress/success messages.
          info: () => {},
          warn: (message, details) => console.warn("[Telegram Downloader]", message, details ?? ""),
          error: (message, details) => console.error("[Telegram Downloader]", message, details ?? ""),
        };
        const contentRangeRegex = /^bytes (\d+)-(\d+)\/(\d+)$/;
        const REFRESH_DELAY = 500;
        const isPageWorld =
          typeof chrome === "undefined" ||
          !(
            (_chrome$runtime = chrome.runtime) !== null &&
            _chrome$runtime !== void 0 &&
            _chrome$runtime.id
          );
        if (isPageWorld) {
          document.documentElement.setAttribute("data-tvd-page-inject", "1");
        }
        // Per-media active download locks. A key is held until its request terminates.
        const activeDownloads = new Map();
        function getDownloadKey(media = {}) {
          const peerId = String(media.pid ?? "").trim();
          const messageId = String(media.mid ?? "").trim();
          // An index or document ID is not a Telegram message ID. Only explicitly
          // supplied numeric peer/message IDs participate in this identity key.
          if (/^-?\d+$/.test(peerId) && /^\d+$/.test(messageId) && messageId !== "0") {
            return `id:${peerId}:${messageId}`;
          }
          const url = String(media.media_url || media.resolved_url || "");
          if (url) return `url:${url}`;
          if (media.fallback_selector) {
            return `selector:${peerId}:${media.fallback_selector}:${media.type || ""}`;
          }
          return "";
        }
        function claimDownload(media = {}) {
          const key = getDownloadKey(media);
          // An unidentifiable file should not block unrelated downloads.
          if (!key) return { key: "", owner: null };
          if (activeDownloads.has(key)) {
            logger.warn("Download already active for this media item.", {
              type: media.type || "unknown",
              requestId: media.request_id || "",
            });
            return null;
          }
          const owner = Symbol("active-download");
          activeDownloads.set(key, owner);
          return { key, owner };
        }
        function releaseDownload(claim) {
          if (claim?.key && activeDownloads.get(claim.key) === claim.owner) {
            activeDownloads.delete(claim.key);
          }
        }

        // Receive download requests from the content script.
        document.addEventListener("tvd_media_download", function (event) {
          const details = event.detail || {};
          const payload = details.media || {};
          const pageReady = document.documentElement.getAttribute("data-tvd-page-inject") === "1";
          if (!isPageWorld && pageReady) return;
          const startDownload = (media) => {
            const claim = claimDownload(media);
            if (!claim) {
              // Acknowledge rejected requests so callers do not wait until timeout.
              emitDownloadDone(media, false);
              return;
            }
            void resolveAndDownload(media, claim);
          };
          if (details.type === "single") {
            startDownload(payload);
          } else if (details.type === "batch") {
            for (const media of Array.isArray(payload) ? payload : []) startDownload(media);
          }
        });
        function isResolvedTelegramUrl(url = "") {
          const value = String(url || "");
          return (
            value.includes("/k/stream/") ||
            value.includes("stream/") ||
            value.includes("/a/progressive/") ||
            value.includes("progressive/")
          );
        }
        function getCurrentPeerId() {
          const selectors = [
            "div.chat.active div.chat-info div.avatar",
            "div[id=MiddleColumn] div[data-peer-id]",
            "#column-center .chat-info .avatar",
            "#column-center .chat-info [data-peer-id]",
            "#column-center .topbar [data-peer-id]",
            "#column-center .bubble[data-peer-id]",
            "#MiddleColumn [data-peer-id]",
          ];
          for (const selector of selectors) {
            var _document$querySelect;
            const peerId =
              (_document$querySelect = document.querySelector(selector)) === null ||
              _document$querySelect === void 0
                ? void 0
                : _document$querySelect.getAttribute("data-peer-id");
            if (peerId) return peerId;
          }
          return "";
        }
        function getInjectMediaNodeSrc(node) {
          var _node$getAttribute, _node$querySelector;
          if (!node) return "";
          const src =
            node.currentSrc ||
            node.src ||
            ((_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0
              ? void 0
              : _node$getAttribute.call(node, "src")) ||
            ((_node$querySelector = node.querySelector) === null ||
            _node$querySelector === void 0 ||
            (_node$querySelector = _node$querySelector.call(node, "source")) === null ||
            _node$querySelector === void 0
              ? void 0
              : _node$querySelector.src) ||
            "";
          if (String(src || "").startsWith("data:")) return "";
          if (src.startsWith("chrome-extension://") || src.startsWith("moz-extension://")) {
            return "";
          }
          return src;
        }
        function queryViewerMediaImage(root) {
          if (!root) return null;
          const selectors = ["img.media-photo", "img.full-media", "img.thumbnail"];
          for (const selector of selectors) {
            const nodes = root.querySelectorAll(selector);
            for (const node of nodes) {
              var _node$classList;
              if (
                (_node$classList = node.classList) !== null &&
                _node$classList !== void 0 &&
                _node$classList.contains("logo-img")
              )
                continue;
              const url = getInjectMediaNodeSrc(node);
              if (url) return node;
            }
          }
          return null;
        }
        function getKViewerUrl(isImage) {
          const storyRoot = document.querySelector("#stories-viewer");
          const root = storyRoot || document.querySelector(".media-viewer-movers");
          if (!root) return "";
          const video = root.querySelector("video.media-video source, video source, video");
          const image = queryViewerMediaImage(root);
          const videoUrl = getInjectMediaNodeSrc(video);
          const imageUrl = getInjectMediaNodeSrc(image);
          return isImage ? imageUrl || videoUrl : videoUrl || "";
        }
        function safeClick(element) {
          if (!element || typeof element.dispatchEvent !== "function") return;
          try {
            const mouseEvent = document.createEvent("MouseEvents");
            mouseEvent.initEvent("mouseover", true, true);
            element.dispatchEvent(mouseEvent);
            mouseEvent.initEvent("mousedown", true, true);
            element.dispatchEvent(mouseEvent);
            mouseEvent.initEvent("mouseup", true, true);
            element.dispatchEvent(mouseEvent);
            mouseEvent.initEvent("click", true, true);
            element.dispatchEvent(mouseEvent);
          } catch (e) {
            var _element$click;
            (_element$click = element.click) === null ||
              _element$click === void 0 ||
              _element$click.call(element);
          }
        }
        function closeKViewerPage() {
          var _closeBtn$closest;
          const closeBtn =
            document.querySelector("div.media-viewer-whole button.media-viewer-close") ||
            document.querySelector("#MediaViewer button.media-viewer-close") ||
            document.querySelector("#stories-viewer button.media-viewer-close") ||
            document.querySelector("button.media-viewer-close");
          if (
            closeBtn &&
            !(
              (_closeBtn$closest = closeBtn.closest) !== null &&
              _closeBtn$closest !== void 0 &&
              _closeBtn$closest.call(closeBtn, ".media-viewer-topbar-left")
            )
          ) {
            safeClick(closeBtn);
          }
        }
        function emitDownloadDone(media = {}, ok = false) {
          document.dispatchEvent(
            new CustomEvent("tvd_download_done", {
              detail: {
                ok: !!ok,
                request_id: media.request_id || "",
                mid: media.mid || "",
              },
            }),
          );
        }
        async function resolveKStreamUrl(media = {}) {
          try {
            var _window$rootScope, _message$media, _message$media2;
            const pid = media.pid || getCurrentPeerId();
            const mid = media.mid;
            if (
              !pid ||
              !mid ||
              !(
                (_window$rootScope = window.rootScope) !== null &&
                _window$rootScope !== void 0 &&
                (_window$rootScope = _window$rootScope.managers) !== null &&
                _window$rootScope !== void 0 &&
                _window$rootScope.appMessagesManager
              )
            ) {
              return null;
            }
            const message = await window.rootScope.managers.appMessagesManager.getMessageByPeer(
              Number(pid) || pid,
              Number(mid) || mid,
            );
            const doc =
              (message === null ||
              message === void 0 ||
              (_message$media = message.media) === null ||
              _message$media === void 0
                ? void 0
                : _message$media.document) ||
              (message === null ||
              message === void 0 ||
              (_message$media2 = message.media) === null ||
              _message$media2 === void 0 ||
              (_message$media2 = _message$media2.webpage) === null ||
              _message$media2 === void 0
                ? void 0
                : _message$media2.document);
            if (!doc) return null;
            const payload = {
              dcId: doc.dc_id,
              location: {
                _: "inputDocumentFileLocation",
                id: doc.id,
                access_hash: doc.access_hash,
                file_reference: doc.file_reference,
              },
              size: doc.size,
              mimeType: doc.mime_type,
              fileName: doc.file_name,
            };
            return {
              url:
                window.location.origin + "/k/stream/" + encodeURIComponent(JSON.stringify(payload)),
              fileName: doc.file_name || "",
            };
          } catch (e) {
            return null;
          }
        }
        async function resolveViewerDomUrl(media = {}) {
          var _element$querySelecto;
          const isImage = String(media.type || "")
            .toLowerCase()
            .includes("image");
          const existing = getKViewerUrl(isImage);
          if (existing)
            return {
              url: existing,
            };
          const selector = media.fallback_selector;
          if (!selector) return null;
          const element = document.querySelector(selector);
          if (!element) return null;
          const clickTarget =
            ((_element$querySelecto = element.querySelector) === null ||
            _element$querySelecto === void 0
              ? void 0
              : _element$querySelecto.call(
                  element,
                  "img.media-photo, img.full-media, img.thumbnail, .media-inner, .video-time, .video-duration",
                )) || element;
          safeClick(clickTarget);
          const startedAt = Date.now();
          while (Date.now() - startedAt < 10000) {
            const url = getKViewerUrl(isImage);
            if (url)
              return {
                url,
              };
            await new Promise((resolve) => setTimeout(resolve, 250));
          }
          return null;
        }
        async function resolveAndDownload(media, claim) {
          let url = "";
          let ok = false;
          try {
            url = media.media_url || media.resolved_url || "";
            if (!isResolvedTelegramUrl(url)) {
              const kUrl = await resolveKStreamUrl(media);
              if (kUrl !== null && kUrl !== void 0 && kUrl.url) url = kUrl.url;
            }
            if (!url || (!isResolvedTelegramUrl(url) && !url.startsWith("blob:"))) {
              const viewer = await resolveViewerDomUrl(media);
              if (viewer !== null && viewer !== void 0 && viewer.url) url = viewer.url;
            }
            if (!url) {
              logger.error("Cannot resolve a media URL.", {
                type: media.type || "unknown",
                requestId: media.request_id || "",
              });
              return;
            }
            await handleFetchDownload(url, media.progress_id || media.request_id, media.download_id);
            ok = true;
          } catch (e) {
            logger.error("Media download failed.", {
              type: media.type || "unknown",
              requestId: media.request_id || "",
              error: e,
            });
          } finally {
            // The entire fetch/retry/fallback operation has returned or failed.
            releaseDownload(claim);
            emitDownloadDone(media, ok);
          }
        }
        const downloadMediaSequentially = (url, requestId = "", downloadId) => {
          return new Promise((resolve, reject) => {
            let _blobs = [];
            let _next_offset = 0;
            let _total_size = null;
            let _file_extension = "mp4";
            let mimeType = "application/octet-stream";
            let settled = false;
            let fileName =
              (Math.random() + 1).toString(36).substring(2, 10) + "." + _file_extension;
            try {
              const metadata = JSON.parse(
                decodeURIComponent(url.split("/")[url.split("/").length - 1]),
              );
              if (metadata.fileName) {
                fileName = metadata.fileName;
              } else if (metadata.location && metadata.location.id) {
                fileName = metadata.location.id + "." + _file_extension;
              }
            } catch (e) {
              // Invalid JSON string, pass extracting fileName
            }
            logger.info(`URL: ${url}`, fileName);
            const finish = (ok, reason) => {
              if (settled) return;
              settled = true;
              if (ok) resolve();
              else reject(reason || new Error("download failed"));
            };
            const fetchNextPart = () => {
              fetch(url, {
                method: "GET",
                headers: {
                  Range: `bytes=${_next_offset}-`,
                },
                "User-Agent":
                  "User-Agent Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/117.0",
              })
                .then((res) => {
                  if (![200, 206].includes(res.status)) {
                    throw new Error("Non 200/206 response was received: " + res.status);
                  }
                  mimeType = res.headers.get("Content-Type") || "application/octet-stream";
                  _file_extension = normalizeFileExtension(mimeType);
                  fileName = fileName.substring(0, fileName.indexOf(".") + 1) + _file_extension;
                  const range = res.headers.get("Content-Range");
                  const match =
                    range === null || range === void 0 ? void 0 : range.match(contentRangeRegex);
                  if (!match) {
                    _total_size = Number(res.headers.get("Content-Length")) || 0;
                    _next_offset = _total_size;
                    return res.blob();
                  }
                  const startOffset = parseInt(match[1]);
                  const endOffset = parseInt(match[2]);
                  const totalSize = parseInt(match[3]);
                  if (startOffset !== _next_offset) {
                    logger.error("Gap detected between responses.", fileName);
                    logger.info("Last offset: " + _next_offset, fileName);
                    logger.info("New start offset " + match[1], fileName);
                    throw "Gap detected between responses.";
                  }
                  if (_total_size && totalSize !== _total_size) {
                    logger.error("Total size differs", fileName);
                    throw "Total size differs";
                  }
                  _next_offset = endOffset + 1;
                  _total_size = totalSize;
                  logger.info(
                    `Get response: ${res.headers.get("Content-Length")} bytes data from ${res.headers.get("Content-Range")}`,
                    fileName,
                  );
                  logger.info(
                    `Progress: ${((_next_offset * 100) / _total_size).toFixed(0)}%`,
                    fileName,
                  );
                  // Define an event to transmit the download progress of the file：
                  if (requestId) {
                    const mediaDownloadProgress = new CustomEvent(requestId + "_media_download_progress", {
                      detail: {
                        request_id: requestId,
                        progress: ((_next_offset * 100) / _total_size).toFixed(0),
                        download_id: downloadId,
                      },
                    });
                    // trigger event
                    document.dispatchEvent(mediaDownloadProgress);
                  }
                  return res.blob();
                })
                .then((resBlob) => {
                  _blobs.push(resBlob);
                })
                .then(() => {
                  if (!_total_size) {
                    if (_blobs.length) {
                      save();
                      return;
                    }
                    throw new Error("_total_size is NULL");
                  }
                  if (_next_offset < _total_size) {
                    fetchNextPart();
                  } else {
                    save();
                  }
                })
                .catch((reason) => {
                  logger.error(reason, fileName);
                  finish(false, reason);
                });
            };
            const save = () => {
              logger.info("Finish downloading blobs", fileName);
              logger.info("Concatenating blobs and downloading...", fileName);
              const blob = new Blob(_blobs, {
                type: mimeType,
              });
              const blobUrl = window.URL.createObjectURL(blob);
              logger.info("Final blob size: " + blob.size + " bytes", fileName);
              const a = document.createElement("a");
              document.body.appendChild(a);
              a.href = blobUrl;
              a.download = fileName;
              a.click();
              document.body.removeChild(a);
              window.URL.revokeObjectURL(blobUrl);
              logger.info("Download triggered", fileName);
              updateProgress("100.00", requestId, downloadId);
              finish(true);
            };
            fetchNextPart();
          });
        };
        async function fetchUrl(url) {
          let t = await fetch(url, {
            headers: {
              Range: "bytes=0-",
            },
          });
          if (!t.ok) throw Error(`HTTP error! Status: ${t.status}`);
          let r = parseInt(t.headers.get("Content-Range").split("/")[1], 10),
            o = parseInt(t.headers.get("Content-Length"), 10),
            n = t.headers.get("Content-Type"),
            s = t.headers.get("Accept-Ranges");
          if ("bytes" !== s) throw Error("Server does not support partial content (byte ranges)");
          return {
            contentType: n,
            segmentCount: Math.ceil(r / o),
            contentSize: r,
            segmentSize: o,
          };
        }
        async function handleFetchDownload(url, requestId, downloadId) {
          let params = {
            autoRetry: !0,
            progress: () => {},
            check: void 0,
          };
          if (url.startsWith("blob:")) {
            return downloadMediaSequentially(url, requestId, downloadId);
          }
          let { autoRetry: a, progress: l, check: s } = params;
          try {
            let {
              segmentCount: n,
              segmentSize: c,
              contentSize: d,
              contentType: f,
            } = await fetchUrl(url);
            let progress = Array(n)
                .fill(0)
                .map((e, t) => t * c)
                .map((t, r) => {
                  let a = Math.min(t + c - 1, d - 1),
                    o = {
                      Range: `bytes=${t}-${a}`,
                    };
                  return () =>
                    fetch(url, {
                      headers: o,
                    }).then((res) => {
                      if (res.status !== 206) {
                        throw new Error(`HTTP ${res.status} for media byte range ${t}-${a}`);
                      }
                      let prog = ((a / d) * 100).toFixed(2);
                      logger.info(`Progress: ${prog}%`);
                      return (updateProgress(prog, requestId, downloadId), res.arrayBuffer());
                    });
                }),
              name = getFileNameFromUrl(url, f),
              h = await getResult(progress, 20, 3),
              m = new Blob(h, {
                type: f || "application/octet-stream",
              });
            // return i(!1), URL.createObjectURL(m);
            let downloadUrl = URL.createObjectURL(m);
            updateProgress("100.00", requestId, downloadId);
            return save(downloadUrl, name);
          } catch (e) {
            logger.warn("Parallel media download failed; trying sequential fallback.", { error: e });
            try {
              await downloadMediaSequentially(url, requestId, downloadId);
              return;
            } catch (retryError) {
              if (url && !String(url).startsWith("blob:")) {
                logger.warn("Both fetch methods failed; handing URL to browser (result unverified).", {
                  error: retryError,
                });
                save(url, getFileNameFromUrl(url, "application/octet-stream"));
                updateProgress("100.00", requestId, downloadId);
                return;
              }
              throw retryError || e;
            }
          }
        }
        async function getResult(tasks, batchSize = 20, maxRetries = 3) {
          const results = [];
          for (let start = 0; start < tasks.length; start += batchSize) {
            const batch = tasks.slice(start, start + batchSize);
            for (let attempt = 0; ; attempt++) {
              try {
                const parts = await Promise.all(batch.map((task) => task()));
                results.push(...parts);
                break;
              } catch (error) {
                if (attempt >= maxRetries) {
                  logger.error("Media segment batch exhausted retries.", {
                    batchStart: start,
                    attempts: attempt + 1,
                    error,
                  });
                  throw error;
                }
                const delayMs = Math.min(500 * 2 ** attempt, 4000);
                logger.warn("Media segment batch failed; retrying.", {
                  batchStart: start,
                  attempt: attempt + 1,
                  maxAttempts: maxRetries + 1,
                  delayMs,
                  error,
                });
                await setRefresh(delayMs);
              }
            }
          }
          return results;
        }
        async function setRefresh(e) {
          return new Promise((t, n) => {
            setTimeout(() => {
              t(null);
            }, e);
          });
        }
        function save(e, t, n) {
          let r = document.createElement("a");
          r.href = e;
          r.download = t || "download";
          r.rel = "noopener";
          r.style.display = "none";
          document.body.appendChild(r);
          r.click();
          document.body.removeChild(r);
        }
        function normalizeFileExtension(type) {
          const mime = String(type || "")
            .split(";")[0]
            .trim()
            .toLowerCase();
          const subtype = (mime.split("/")[1] || "").trim();
          if (subtype === "mpeg" || subtype === "mp3") return "mp3";
          if (subtype === "ogg" || subtype === "oga" || subtype === "opus") return "ogg";
          if (subtype === "wav" || subtype === "x-wav") return "wav";
          if (subtype === "webm") return "webm";
          if (subtype === "mp4") return "mp4";
          return subtype.replace(/[^a-z0-9]+/g, "") || "bin";
        }
        function getFileNameFromUrl(url, type) {
          let _file_extension = normalizeFileExtension(type);
          let fileName = "";
          try {
            let metadata = "";
            if (url.includes("progressive/")) {
              //a-version
              metadata = url.split("document").slice(1);
              fileName = metadata + "." + _file_extension;
            } else {
              //k-version
              metadata = JSON.parse(decodeURIComponent(url.split("/").slice(-1)[0]));
              if (metadata.fileName) {
                fileName = metadata.fileName;
              } else if (metadata.location && metadata.location.id) {
                fileName = metadata.location.id + "." + _file_extension;
              }
            }
            logger.info(`URL:${fileName}`);
          } catch (e) {
            // Invalid JSON string, pass extracting fileName
          }
          if (!fileName) {
            fileName = (Math.random() + 1).toString(36).substring(2, 10) + "." + _file_extension;
          }
          return fileName;
        }
        function updateProgress(p, requestId, downloadId) {
          // Define an event to transmit the download progress of the file：
          logger.info(`updateProgress: ${p},${requestId},${downloadId},`);
          if (requestId) {
            const mediaDownloadProgress = new CustomEvent(requestId + "_media_download_progress", {
              detail: {
                request_id: requestId,
                progress: p,
                download_id: downloadId,
              },
            });
            // trigger event
            document.dispatchEvent(mediaDownloadProgress);
          }
        }
      }

      /***/
    },

    /***/ 4: /***/ function (module, exports, __webpack_require__) {
      module.exports = __webpack_require__("3662");

      /***/
    },

    /******/
  },
);
