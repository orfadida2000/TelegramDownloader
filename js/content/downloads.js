/**
 * @fileoverview Downloads feature module of Telegram Local Downloader.
 * Runs in Chrome's isolated world. Media byte retrieval takes place in the page-world script.
 * @requires TelegramLocalDownloader
 */
(() => {
  'use strict';
  const ns = globalThis.TelegramLocalDownloader;
  const i18 = ns.i18;
  /** UI feature reference; registered earlier in manifest order. @private */
  const creatDownloadBtnsProgress = ns.ui.creatDownloadBtnsProgress;

  /**
   * Update one container’s progress UI for a request-specific event stream.
   * @param {HTMLElement|null} container
   * @param {string} progressId
   * @returns {() => void} Removes the listener when the request completes.
   */
  const attachDownloadProgressListener = (container, progressId) => {
    if (!container || !progressId) return () => { };
    const eventName = progressId + "_media_download_progress";
    /** @param {Event} value */
    const onProgress = (value) => {
      var _value$detail;
      const downBtnProgress = /** @type {HTMLElement|null} */ (container.querySelector(".down_btn_progress"));
      const downBtnVideo = /** @type {HTMLElement|null} */ (container.querySelector(".down_btn_video"));
      const downBtnMusic = /** @type {HTMLElement|null} */ (container.querySelector(".down_btn_music"));
      const checkAllDownload = /** @type {HTMLElement|null} */ (container.querySelector(".check-all-download"));
      const progress =
        value === null ||
          value === void 0 ||
          (_value$detail = /** @type {CustomEvent<{progress?: string|number}>} */ (value).detail) === null ||
          _value$detail === void 0
          ? void 0
          : _value$detail.progress;
      if (progress === "error") {
      if (downBtnVideo) downBtnVideo.style.display = "block";
      if (downBtnMusic) downBtnMusic.style.display = "block";
      if (checkAllDownload) checkAllDownload.style.display = "flex";
      if (downBtnProgress) {
        downBtnProgress.textContent = "Download failed";
        downBtnProgress.style.display = "none";
      }
      return;
    }
    if (progress != null && String(progress) !== "100.00" && String(progress) !== "100") {
        let progContent = progress;
        if (downBtnVideo) downBtnVideo.style.display = "none";
        if (downBtnMusic) downBtnMusic.style.display = "none";
        if (checkAllDownload) {
          checkAllDownload.style.display = "none";
          const parsed = parseInt(String(progress), 10);
          if (!Number.isNaN(parsed)) {
            ns.state.maxProgress = Math.max(ns.state.maxProgress, parsed);
            progContent = ns.state.maxProgress;
          }
        }
        let progressNode = downBtnProgress;
        if (!progressNode) {
          container.appendChild(creatDownloadBtnsProgress());
          progressNode = /** @type {HTMLElement|null} */ (container.querySelector(".down_btn_progress"));
        }
        if (progressNode) {
          progressNode.style.display = "block";
          progressNode.innerHTML = `${i18.t("dialog.progressText")} ${progContent}%`;
        }
        return;
      }
      if (downBtnVideo) downBtnVideo.style.display = "block";
      if (downBtnMusic) downBtnMusic.style.display = "block";
      if (checkAllDownload) checkAllDownload.style.display = "flex";
      if (downBtnProgress) downBtnProgress.style.display = "none";
    };
    document.addEventListener(eventName, onProgress);
    return () => document.removeEventListener(eventName, onProgress);
  };

  /**
   * Wait for completion with an inactivity watchdog rather than a total-time
   * cap. Large Telegram files may legitimately require more than three minutes;
   * each progress update resets the watchdog. A stalled request still times out.
   * @param {string|string[]} ids Correlated request identifiers.
   * @param {number} timeout Maximum milliseconds without any progress.
   * @returns {Promise<boolean>} True only after the page world acknowledges success.
   */
  const waitForDownloadDone = (ids, timeout = 180000) => {
    const wanted = new Set(
      (Array.isArray(ids) ? ids : [ids]).map(id => String(id || '')).filter(Boolean)
    );
    if (!wanted.size) return Promise.resolve(false);
    return new Promise(resolve => {
      /** @type {number|undefined} */
      let timer;
      const cleanup = () => {
        window.clearTimeout(timer);
        document.removeEventListener('tvd_download_done', onDone);
        for (const id of wanted) {
          document.removeEventListener(id + '_media_download_progress', onProgress);
        }
      };
      const onTimeout = () => {
        console.warn('[Telegram Downloader] No download progress before inactivity timeout.', {
          requestIds: [...wanted], idleTimeoutMs: timeout
        });
        // Reset the visible button state without reporting a false success.
        for (const id of wanted) {
          document.dispatchEvent(new CustomEvent(id + '_media_download_progress', {
            detail: {request_id: id, progress: 'error'}
          }));
        }
        cleanup();
        resolve(false);
      };
      const refresh = () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(onTimeout, timeout);
      };
      /** @param {Event} event */
      const onDone = event => {
        const detail = /** @type {CustomEvent<{request_id: string, ok: boolean}>} */ (event).detail;
        if (!wanted.has(String(detail?.request_id || ''))) return;
        cleanup();
        resolve(Boolean(detail?.ok));
      };
      /** @param {Event} event */
      const onProgress = event => {
        const detail = /** @type {CustomEvent<{request_id: string}>} */ (event).detail;
        if (wanted.has(String(detail?.request_id || ''))) refresh();
      };
      document.addEventListener('tvd_download_done', onDone);
      for (const id of wanted) {
        document.addEventListener(id + '_media_download_progress', onProgress);
      }
      refresh();
    });
  };

  /**
   * @typedef {Object} RequestOptions
   * @property {string} [mid] Telegram message ID; never a visual album index.
   * @property {string} [pid] Telegram peer ID.
   * @property {string} [fallback_selector] Locator used if direct retrieval fails.
   * @property {boolean} [source_pending] Whether the supplied URL is unresolved.
   * @property {boolean} [waitForComplete] Await the page-world completion acknowledgment.
   * @property {number} [downloadTimeout] Acknowledgment timeout in milliseconds.
   */
  /**
   * Submit an isolated-to-main-world event with request correlation.
   * @param {'single'|'batch'} eventType
   * @param {string} downloadUrl Existing DOM URL (possibly empty).
   * @param {number|string} itemIndex UI progress index, not the message ID.
   * @param {'image'|'img'|'video'|'music'} mediaType
   * @param {Element|null} container Progress display host.
   * @param {RequestOptions} mediaMeta Identity, fallback locator, and wait behavior.
   * @returns {Promise<boolean>} True only after successful download initiation.
   */
  const triggerEvent = async (eventType, downloadUrl, itemIndex, mediaType, container, mediaMeta = {}) => {
    const url = String(downloadUrl || '');
    const hasIdentity = /^-?\d+$/.test(String(mediaMeta.pid || '')) &&
      /^\d+$/.test(String(mediaMeta.mid || ''));
    const validUrl = /^(blob:|https?:)/.test(url) && !url.startsWith('data:');
    if (!hasIdentity && !validUrl && !mediaMeta.fallback_selector) {
      console.warn('[Telegram Downloader] Missing both media identity and usable URL.');
      return false;
    }
    const readyBy = Date.now() + 5000;
    while (document.documentElement.getAttribute('data-tvd-page-inject') !== '1') {
      if (Date.now() > readyBy) {
        console.error('[Telegram Downloader] Page-world downloader is not ready.');
        return false;
      }
      await new Promise(resolve => window.setTimeout(resolve, 50));
    }
    const requestId = crypto.randomUUID();
    const detachProgress = attachDownloadProgressListener(
      container instanceof HTMLElement ? container : null, requestId
    );
    const media = {
      media_url: url,
      download_id: itemIndex,
      request_id: requestId,
      progress_id: requestId,
      mid: String(mediaMeta.mid || ''),
      pid: String(mediaMeta.pid || ''),
      type: mediaType,
      source_pending: Boolean(mediaMeta.source_pending),
      fallback_selector: mediaMeta.fallback_selector || ''
    };
    // Register the completion listener before dispatch, since duplicate requests
    // can be rejected synchronously by the page-world handler.
    const completed = mediaMeta.waitForComplete
      ? waitForDownloadDone(requestId, mediaMeta.downloadTimeout || 180000)
      : Promise.resolve(true);
    document.dispatchEvent(new CustomEvent('tvd_media_download', {
      detail: { type: eventType, media }
    }));
    try {
      return await completed;
    } finally {
      detachProgress();
    }
  };

  /** Public feature interface, used only by sibling content-script modules. */
  ns.downloads = { attachDownloadProgressListener, waitForDownloadDone, triggerEvent };
})();
