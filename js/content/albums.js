/**
 * @fileoverview Albums feature module of Telegram Local Downloader.
 * Runs in Chrome's isolated world. Media byte retrieval takes place in the page-world script.
 * @requires TelegramLocalDownloader
 */
(() => {
  "use strict";
  const ns = globalThis.TelegramLocalDownloader;

  /** Utility feature reference; registered earlier in manifest order. @private */
  const getChatMediaIdentity = ns.utils.getChatMediaIdentity;
  /** Download feature reference; registered earlier in manifest order. @private */
  const triggerEvent = ns.downloads.triggerEvent;

  /** Reference to the shared media-host locator helper. @private */
  const markFallbackTarget = ns.utils.markFallbackTarget;
  /** @type {(...args: any[]) => string} Retrieve a media DOM source safely. @private */
  const getMediaNodeSrc = ns.utils.getMediaNodeSrc;

  /**
   * Download one album video without opening Telegram's viewer first.
   * Uses the album item's own message ID, not its parent bubble's ID.
   * @param {HTMLInputElement} checkbox
   * @param {number} index
   * @param {Element} container
   * @returns {Promise<boolean>}
   */
  async function handleAlbumItem(checkbox, index, container) {
    const albumItem = checkbox.closest(".album-item");
    if (!albumItem) return false;
    return mediaDownload(index + 1, container, albumItem);
  }

  /**
   * Request the original video document first; DOM/viewer fallbacks are handled
   * in the page world. An album item's identity is kept separate from the UI index.
   * @param {number|string} id UI-only progress index.
   * @param {Element} container Progress UI container.
   * @param {Element|null} mediaItem The actual Telegram message/album item.
   * @returns {Promise<boolean>}
   */
  async function mediaDownload(id, container, mediaItem = null) {
    const target = mediaItem || container;
    const identity = getChatMediaIdentity(target);
    const source = target.querySelector(
      "video.media-video source, video.media-video, video source, video",
    );
    const url = getMediaNodeSrc(source);
    return triggerEvent("single", url, id, "video", container, {
      ...identity,
      source_pending: !url,
      fallback_selector: markFallbackTarget(target),
      waitForComplete: true,
      downloadTimeout: 180000,
    });
  }

  /** Public feature interface, used only by sibling content-script modules. */
  ns.albums = { handleAlbumItem, mediaDownload };
})();
