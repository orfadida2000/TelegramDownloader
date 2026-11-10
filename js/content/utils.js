/**
 * @fileoverview Utils feature module of Telegram Local Downloader.
 * Runs in Chrome's isolated world. Media byte retrieval takes place in the page-world script.
 * @requires TelegramLocalDownloader
 */
(() => {
  "use strict";
  const ns = globalThis.TelegramLocalDownloader;

  /**
   * Extract a Telegram message identifier from a media element or its ancestors.
   * @param {Element} element
   * @returns {string}
   */
  function getBubbleMediaId(element) {
    var _element$getAttribute,
      _element$closest,
      _element$closest$getA,
      _element$closest2,
      _element$closest2$get,
      _element$querySelecto,
      _element$querySelecto2;
    return (
      (element === null ||
      element === void 0 ||
      (_element$getAttribute = element.getAttribute) === null ||
      _element$getAttribute === void 0
        ? void 0
        : _element$getAttribute.call(element, "data-mid")) ||
      (element === null ||
      element === void 0 ||
      (_element$closest = element.closest) === null ||
      _element$closest === void 0 ||
      (_element$closest = _element$closest.call(element, "[data-mid]")) === null ||
      _element$closest === void 0 ||
      (_element$closest$getA = _element$closest.getAttribute) === null ||
      _element$closest$getA === void 0
        ? void 0
        : _element$closest$getA.call(_element$closest, "data-mid")) ||
      (element === null ||
      element === void 0 ||
      (_element$closest2 = element.closest) === null ||
      _element$closest2 === void 0 ||
      (_element$closest2 = _element$closest2.call(element, "[data-message-id]")) === null ||
      _element$closest2 === void 0 ||
      (_element$closest2$get = _element$closest2.getAttribute) === null ||
      _element$closest2$get === void 0
        ? void 0
        : _element$closest2$get.call(_element$closest2, "data-message-id")) ||
      (element === null ||
      element === void 0 ||
      (_element$querySelecto = element.querySelector) === null ||
      _element$querySelecto === void 0 ||
      (_element$querySelecto = _element$querySelecto.call(element, "[data-mid]")) === null ||
      _element$querySelecto === void 0 ||
      (_element$querySelecto2 = _element$querySelecto.getAttribute) === null ||
      _element$querySelecto2 === void 0
        ? void 0
        : _element$querySelecto2.call(_element$querySelecto, "data-mid")) ||
      ""
    );
  }

  /**
   * Resolve the peer/message pair, preferring album-item IDs over the parent bubble.
   * @param {Element|null} element
   * @returns {TelegramMediaIdentity}
   */
  function getChatMediaIdentity(element) {
    const item = element?.closest?.(".album-item");
    const bubble = element?.closest?.(".bubble");
    const source = item || bubble;
    return {
      mid: source?.getAttribute("data-mid") || "",
      pid: source?.getAttribute("data-peer-id") || bubble?.getAttribute("data-peer-id") || "",
    };
  }

  /**
   * Delay asynchronously without blocking DOM rendering.
   * @param {number} ms
   * @returns {Promise<void>}
   */
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /**
   * Determine whether a media URL points to an extension asset.
   * @param {string} url
   * @returns {boolean}
   */
  const isExtensionMediaUrl = (url = "") => {
    const src = String(url || "");
    return src.startsWith("chrome-extension://") || src.startsWith("moz-extension://");
  };

  /**
   * Exclude extension-generated UI from media discovery.
   * @param {Element} node
   * @returns {boolean}
   */
  const isPluginMediaNode = (node) => {
    var _node$classList, _node$closest, _node$getAttribute;
    if (!node) return false;
    if (
      ((_node$classList = node.classList) !== null &&
        _node$classList !== void 0 &&
        _node$classList.contains("logo-img")) ||
      ((_node$closest = node.closest) !== null &&
        _node$closest !== void 0 &&
        _node$closest.call(
          node,
          ".download-click-one, .download-click-div, .download-click-month, .content-teleram-script, .downloadBtnIns",
        ))
    ) {
      return true;
    }
    const src =
      /** @type {HTMLImageElement|HTMLVideoElement} */ (node).currentSrc ||
      /** @type {HTMLImageElement|HTMLVideoElement} */ (node).src ||
      ((_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0
        ? void 0
        : _node$getAttribute.call(node, "src")) ||
      "";
    return isExtensionMediaUrl(src);
  };

  /**
   * Find the first valid Telegram media image in the supplied root.
   * @param {Element | null} root
   */
  const queryTelegramMediaImage = (root) => {
    if (!root) return null;
    const selectors = [
      "img.media-photo",
      "img.full-media",
      "img.thumbnail",
      ".media-inner img",
      "canvas.media-photo",
      "canvas.canvas-thumbnail",
    ];
    for (const selector of selectors) {
      const nodes = root.querySelectorAll(selector);
      for (const node of nodes) {
        if (!isPluginMediaNode(node)) return node;
      }
    }
    return null;
  };

  /**
   * Read a media element’s active source while excluding invalid URLs.
   * @param {Element|null} node
   * @returns {string}
   */
  const getMediaNodeSrc = (node) => {
    var _node$getAttribute2, _node$querySelector;
    if (!node) return "";
    const src =
      /** @type {HTMLImageElement|HTMLVideoElement} */ (node).currentSrc ||
      /** @type {HTMLImageElement|HTMLVideoElement} */ (node).src ||
      ((_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0
        ? void 0
        : _node$getAttribute2.call(node, "src")) ||
      ((_node$querySelector = node.querySelector) === null ||
      _node$querySelector === void 0 ||
      (_node$querySelector = _node$querySelector.call(node, "source")) === null ||
      _node$querySelector === void 0
        ? void 0
        : /** @type {HTMLSourceElement} */ (_node$querySelector).src) ||
      "";
    if (String(src || "").startsWith("data:")) return "";
    if (isExtensionMediaUrl(src)) return "";
    return src;
  };

  /**
   * Find a downloadable image source in a sidebar item.
   * @param {Element} element
   * @returns {string}
   */
  const getSidebarImageSrc = (element) => {
    const node = queryTelegramMediaImage(element);
    if (!node) return "";
    return getMediaNodeSrc(node);
  };

  /**
   * Identify a Telegram audio item using its visible title metadata.
   * @param {Element} element
   */
  const getKAudioTitle = (element) => {
    var _element$querySelecto3,
      _element$parentElemen,
      _element$parentElemen2,
      _element$closest3,
      _element$closest3$que;
    const titleNode =
      (element === null ||
      element === void 0 ||
      (_element$querySelecto3 = element.querySelector) === null ||
      _element$querySelecto3 === void 0
        ? void 0
        : _element$querySelecto3.call(element, ".audio-title")) ||
      (element === null ||
      element === void 0 ||
      (_element$parentElemen = element.parentElement) === null ||
      _element$parentElemen === void 0 ||
      (_element$parentElemen2 = _element$parentElemen.querySelector) === null ||
      _element$parentElemen2 === void 0
        ? void 0
        : _element$parentElemen2.call(_element$parentElemen, ".audio-title")) ||
      (element === null ||
      element === void 0 ||
      (_element$closest3 = element.closest) === null ||
      _element$closest3 === void 0 ||
      (_element$closest3 = _element$closest3.call(element, ".bubble")) === null ||
      _element$closest3 === void 0 ||
      (_element$closest3$que = _element$closest3.querySelector) === null ||
      _element$closest3$que === void 0
        ? void 0
        : _element$closest3$que.call(_element$closest3, ".audio-title"));
    if (!titleNode) return "";
    const raw =
      (
        titleNode.getAttribute("title") ||
        (titleNode instanceof HTMLElement ? titleNode.innerText : titleNode.textContent) ||
        ""
      ).split(" ")[0] || "";
    return raw
      .replace(/\(.*?\)/g, "")
      .split(/[,\uFF0C]/)[0]
      .trim();
  };

  /**
   * Decode the JSON descriptor carried in a Telegram Web K stream URL.
   * @param {string} src
   * @returns {TelegramStreamPayload | null}
   */
  const decodeKStreamPayload = (src = "") => {
    if (!src.includes("stream/")) return null;
    try {
      const parsed = JSON.parse(
        decodeURIComponent(src.substring(src.indexOf("stream/") + 7).split("?")[0]),
      );
      return parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? /** @type {TelegramStreamPayload} */ (parsed)
        : null;
    } catch {
      return null;
    }
  };

  /**
   * Find the audio source corresponding to a particular Telegram audio message.
   * @param {Element} element
   * @param {Element|null} audioButton
   * @param {NodeListOf<HTMLAudioElement>} audioNodes
   * @returns {string}
   */
  const findKAudioSource = (element, audioButton, audioNodes) => {
    var _audioButton$parentEl;
    const mid = getBubbleMediaId(element);
    const title = getKAudioTitle(element);
    const containerAudios = [...element.querySelectorAll("audio")];
    const audios = containerAudios.length ? containerAudios : [...audioNodes];
    const playingInContainer = audios.find(
      (item) => !item.paused && !item.ended && getMediaNodeSrc(item),
    );
    if (playingInContainer) return getMediaNodeSrc(playingInContainer);
    for (const item of audios) {
      var _payload$location2;
      const src = getMediaNodeSrc(item);
      if (!src) continue;
      const payload = decodeKStreamPayload(src);
      if (
        mid &&
        payload !== null &&
        payload !== void 0 &&
        (_payload$location2 = payload.location) !== null &&
        _payload$location2 !== void 0 &&
        _payload$location2.id &&
        String(_payload$location2.id) === String(mid)
      ) {
        return src;
      }
    }
    for (const item of audios) {
      const src = getMediaNodeSrc(item);
      if (!src) continue;
      const payload = decodeKStreamPayload(src);
      if (
        title &&
        payload !== null &&
        payload !== void 0 &&
        payload.fileName &&
        payload.fileName.includes(title)
      ) {
        return src;
      }
    }
    const playingAudio = [...audioNodes].find(
      (item) => !item.paused && !item.ended && getMediaNodeSrc(item),
    );
    if (playingAudio) return getMediaNodeSrc(playingAudio);
    if (
      audioButton !== null &&
      audioButton !== void 0 &&
      (_audioButton$parentEl = audioButton.parentElement) !== null &&
      _audioButton$parentEl !== void 0 &&
      (_audioButton$parentEl = _audioButton$parentEl.classList) !== null &&
      _audioButton$parentEl !== void 0 &&
      _audioButton$parentEl.contains("playing")
    ) {
      const current = audios.find((item) => getMediaNodeSrc(item));
      if (current) return getMediaNodeSrc(current);
    }
    for (const item of audios) {
      const src = getMediaNodeSrc(item);
      if (src) return src;
    }
    return "";
  };

  /**
   * Wait until Telegram exposes the current audio source.
   * @param {Element} container
   * @param {number} timeout
   * @returns {Promise<string>}
   */
  const waitForContainerAudioSrc = async (container, timeout = 10000) => {
    const startedAt = Date.now();
    while (Date.now() - startedAt < timeout) {
      const src = findKAudioSource(
        container,
        container.querySelector(".audio-play-icon"),
        document.querySelectorAll("audio"),
      );
      if (src) return src;
      await sleep(250);
    }
    return "";
  };

  /**
   * Wait for Telegram’s audio preload indicator to disappear.
   * @param {number} timeout
   * @param {number} interval
   */
  const waitForAudioPreload = (timeout = 8000, interval = 200) => {
    return new Promise((resolve) => {
      const startedAt = Date.now();
      const timer = setInterval(() => {
        const hasPreloader =
          document.querySelectorAll("div.audio-download > div.preloader-container.is-visible")
            .length > 0;
        if (!hasPreloader || Date.now() - startedAt >= timeout) {
          clearInterval(timer);
          resolve(true);
        }
      }, interval);
    });
  };

  /**
   * Give a Telegram media host a stable, unambiguous fallback selector.
   * The generated attribute is only a locator and does not affect message IDs.
   * @param {Element|null} element
   * @returns {string}
   */
  function markFallbackTarget(element) {
    if (!element || typeof element.setAttribute !== "function") return "";
    let id = element.getAttribute("data-tvd-fallback-id");
    if (!id) {
      id = crypto.randomUUID();
      element.setAttribute("data-tvd-fallback-id", id);
    }
    return `[data-tvd-fallback-id="${id}"]`;
  }

  /** Public feature interface, used only by sibling content-script modules. */
  ns.utils = {
    markFallbackTarget,
    getBubbleMediaId,
    getChatMediaIdentity,
    sleep,
    isExtensionMediaUrl,
    isPluginMediaNode,
    queryTelegramMediaImage,
    getMediaNodeSrc,
    getSidebarImageSrc,
    getKAudioTitle,
    decodeKStreamPayload,
    findKAudioSource,
    waitForContainerAudioSrc,
    waitForAudioPreload,
  };
})();
