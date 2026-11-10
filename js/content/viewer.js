/**
 * @fileoverview Viewer feature module of Telegram Local Downloader.
 * Runs in Chrome's isolated world. Media byte retrieval takes place in the page-world script.
 * @requires TelegramLocalDownloader
 */
(() => {
  "use strict";
  const ns = globalThis.TelegramLocalDownloader;

  /** Utility feature reference; registered earlier in manifest order. @private */
  const sleep = ns.utils.sleep;
  /** Utility feature reference; registered earlier in manifest order. @private */
  const isPluginMediaNode = ns.utils.isPluginMediaNode;
  /** Utility feature reference; registered earlier in manifest order. @private */
  const queryTelegramMediaImage = ns.utils.queryTelegramMediaImage;
  /** Utility feature reference; registered earlier in manifest order. @private */
  const getMediaNodeSrc = ns.utils.getMediaNodeSrc;

  /**
   * Dispatch a trusted-shape sequence of synthetic pointer events to a Telegram control.
   * @param {Element} dom
   */
  function disPatchClick(dom) {
    if (!dom || typeof dom.dispatchEvent !== "function") return;
    try {
      const mouseEvent = document.createEvent("MouseEvents");
      mouseEvent.initEvent("mouseover", true, true);
      dom.dispatchEvent(mouseEvent);
      mouseEvent.initEvent("mousedown", true, true);
      dom.dispatchEvent(mouseEvent);
      mouseEvent.initEvent("mouseup", true, true);
      dom.dispatchEvent(mouseEvent);
      mouseEvent.initEvent("click", true, true);
      dom.dispatchEvent(mouseEvent);
    } catch {
      ["mouseover", "mousedown", "mouseup", "click"].forEach((type) => {
        dom.dispatchEvent(
          new MouseEvent(type, {
            bubbles: true,
            cancelable: true,
            view: window,
          }),
        );
      });
    }
  }

  /**
   * Choose a media item or its interactive preview as a viewer target.
   * @param {Element} element
   */
  function getKViewerClickTarget(element) {
    var _element$querySelecto9;
    const selectors = [
      ".media-inner",
      "div.album-item-media",
      ".video-time",
      ".video-duration",
      "video.media-video",
      ".media-video",
      "img.media-photo",
      "img.thumbnail",
      "canvas.media-photo",
      "canvas.canvas-thumbnail",
    ];
    for (const selector of selectors) {
      var _element$querySelecto8;
      const node =
        element === null ||
        element === void 0 ||
        (_element$querySelecto8 = element.querySelector) === null ||
        _element$querySelecto8 === void 0
          ? void 0
          : _element$querySelecto8.call(element, selector);
      if (node && !isPluginMediaNode(node)) return node;
    }
    const mediaInner =
      element === null ||
      element === void 0 ||
      (_element$querySelecto9 = element.querySelector) === null ||
      _element$querySelecto9 === void 0
        ? void 0
        : _element$querySelecto9.call(element, ".media-inner");
    if (mediaInner) return mediaInner;
    return element;
  }

  /**
   * Read the currently visible image/video viewer source.
   * @param {string} tabType
   * @param {string} expectedType
   * @returns {TelegramViewerMedia}
   */
  function getKViewerMedia(tabType, expectedType = "") {
    const isStory = tabType === "tgStory";
    const root = isStory
      ? document.querySelector("#stories-viewer")
      : document.querySelector(".media-viewer-movers");
    const video =
      root === null || root === void 0
        ? void 0
        : root.querySelector("video.media-video source, video source, video");
    const image = queryTelegramMediaImage(root);
    const videoUrl = getMediaNodeSrc(video ?? null);
    const imageUrl = getMediaNodeSrc(image);
    const wantsImage = expectedType === "image";
    return {
      url: wantsImage ? imageUrl || videoUrl : videoUrl || "",
      preview_src: imageUrl || "",
      type: wantsImage ? "image" : "video",
    };
  }

  /**
   * Poll a Telegram viewer for a usable media source.
   * @param {string} tabType
   * @param {string} expectedType
   * @param {number} timeout
   * @returns {Promise<TelegramViewerMedia>}
   */
  async function waitForKViewerSource(tabType, expectedType = "video", timeout = 10000) {
    const startedAt = Date.now();
    while (Date.now() - startedAt < timeout) {
      const viewerMedia = getKViewerMedia(tabType, expectedType);
      if (viewerMedia.url) return viewerMedia;
      await sleep(250);
    }
    return getKViewerMedia(tabType, expectedType);
  }

  /**
   * Check whether a DOM element is visible.
   * @param {Element|null} node
   * @returns {boolean}
   */
  function isVisibleNode(node) {
    var _node$classList2, _node$classList3, _node$getBoundingClie;
    if (!node) return false;
    if (
      ((_node$classList2 = node.classList) !== null &&
        _node$classList2 !== void 0 &&
        _node$classList2.contains("hide")) ||
      ((_node$classList3 = node.classList) !== null &&
        _node$classList3 !== void 0 &&
        _node$classList3.contains("is-hidden"))
    ) {
      return false;
    }
    if (typeof getComputedStyle === "function") {
      const style = getComputedStyle(node);
      if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
        return false;
      }
    }
    const rect =
      (_node$getBoundingClie = node.getBoundingClientRect) === null ||
      _node$getBoundingClie === void 0
        ? void 0
        : _node$getBoundingClie.call(node);
    return !rect || (rect.width > 0 && rect.height > 0);
  }

  /**
   * Check whether a media/story viewer is currently open.
   * @param {string} tabType
   * @returns {boolean}
   */
  function isKViewerOpen(tabType = "tgMedia") {
    if (tabType === "tgStory") {
      return isVisibleNode(document.querySelector("#stories-viewer"));
    }
    const root =
      document.querySelector("div.media-viewer-whole") || document.querySelector("#MediaViewer");
    return isVisibleNode(root);
  }

  /**
   * Wait for a viewer to close.
   * @param {string} tabType
   * @param {number} timeout
   */
  async function waitForKViewerClosed(tabType = "tgMedia", timeout = 5000) {
    const startedAt = Date.now();
    while (Date.now() - startedAt < timeout) {
      if (!isKViewerOpen(tabType)) return true;
      await sleep(200);
    }
    return !isKViewerOpen(tabType);
  }

  /**
   * Identify a close control belonging to an active media preview.
   * @param {Element|null} btn Candidate close button.
   * @returns {boolean} Whether it belongs to the active media preview.
   */
  function isPreviewCloseButton(btn) {
    var _btn$closest, _btn$closest2, _btn$closest3;
    if (!btn) return false;
    if (
      (_btn$closest = btn.closest) !== null &&
      _btn$closest !== void 0 &&
      _btn$closest.call(btn, ".media-viewer-topbar-left")
    )
      return false;
    if (
      (_btn$closest2 = btn.closest) !== null &&
      _btn$closest2 !== void 0 &&
      _btn$closest2.call(btn, "#column-right") &&
      !(
        (_btn$closest3 = btn.closest) !== null &&
        _btn$closest3 !== void 0 &&
        _btn$closest3.call(btn, ".media-viewer-whole, #MediaViewer, #stories-viewer")
      )
    ) {
      return false;
    }
    return true;
  }

  /**
   * Dismiss the active media viewer without closing unrelated UI.
   * @param {string} tabType
   */
  async function closeKViewer(tabType = "tgMedia") {
    const roots =
      tabType === "tgStory"
        ? [...document.querySelectorAll("#stories-viewer")].filter(isVisibleNode)
        : [...document.querySelectorAll("div.media-viewer-whole, #MediaViewer")].filter(
            isVisibleNode,
          );
    /** @type {Element[]} */
    const candidates = [];
    roots.forEach((root) => {
      const toolbarButtons = [...root.querySelectorAll(".media-viewer-buttons > .btn-icon")];
      const lastToolbar = toolbarButtons[toolbarButtons.length - 1];
      if (lastToolbar) candidates.push(lastToolbar);
      root
        .querySelectorAll("button.media-viewer-close, .tgico-close, [aria-label='Close']")
        .forEach((btn) => candidates.push(btn));
    });
    const seen = new Set();
    for (const closeBtn of candidates) {
      if (!closeBtn || seen.has(closeBtn) || !isPreviewCloseButton(closeBtn)) continue;
      seen.add(closeBtn);
      disPatchClick(closeBtn);
      await sleep(400);
      if (await waitForKViewerClosed(tabType, 1500)) return true;
    }
    return waitForKViewerClosed(tabType, 2000);
  }

  /** Public feature interface, used only by sibling content-script modules. */
  ns.viewer = {
    disPatchClick,
    getKViewerClickTarget,
    getKViewerMedia,
    waitForKViewerSource,
    isVisibleNode,
    isKViewerOpen,
    waitForKViewerClosed,
    isPreviewCloseButton,
    closeKViewer,
  };
})();
