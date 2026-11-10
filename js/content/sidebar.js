/**
 * @fileoverview Sidebar feature module of Telegram Local Downloader.
 * Runs in Chrome's isolated world. Media byte retrieval takes place in the page-world script.
 * @requires TelegramLocalDownloader
 */
(() => {
  "use strict";
  const ns = globalThis.TelegramLocalDownloader;

  /** UI feature reference; registered earlier in manifest order. @private */
  const cteateDownloadAllMonthBtn = ns.ui.cteateDownloadAllMonthBtn;
  /** UI feature reference; registered earlier in manifest order. @private */
  const createDownloadMonthBtn = ns.ui.createDownloadMonthBtn;
  /** UI feature reference; registered earlier in manifest order. @private */
  const createDownloadAllStoryBtn = ns.ui.createDownloadAllStoryBtn;
  /** UI feature reference; registered earlier in manifest order. @private */
  const createDownloadStoryMediaBtn = ns.ui.createDownloadStoryMediaBtn;
  /** Create stable media selectors for page-world viewer fallbacks. */
  const markFallbackTarget = ns.utils.markFallbackTarget;
  /** Utility feature reference; registered earlier in manifest order. @private */
  const isPluginMediaNode = ns.utils.isPluginMediaNode;
  /** Utility feature reference; registered earlier in manifest order. @private */
  const queryTelegramMediaImage = ns.utils.queryTelegramMediaImage;
  /** Utility feature reference; registered earlier in manifest order. @private */
  const getSidebarImageSrc = ns.utils.getSidebarImageSrc;
  /** Download feature reference; registered earlier in manifest order. @private */
  const triggerEvent = ns.downloads.triggerEvent;

  /**
   * Return the first element matching any candidate selector.
   * @param {string[]} selectors
   * @returns {Element | null}
   */
  const queryFirst = (selectors) => {
    for (const selector of selectors) {
      const node = document.querySelector(selector);
      if (node) return node;
    }
    return null;
  };

  /**
   * Choose the appropriate insertion point for a sidebar toolbar.
   * @param {Element|null} activePanel
   * @returns {Element|null} Toolbar parent, if available.
   */
  const getSidebarToolbarHost = (activePanel) => {
    var _activePanel$closest;
    return (
      document.querySelector("#column-right .search-super") ||
      (activePanel === null ||
      activePanel === void 0 ||
      (_activePanel$closest = activePanel.closest) === null ||
      _activePanel$closest === void 0
        ? void 0
        : _activePanel$closest.call(activePanel, "#column-right .search-super")) ||
      document.querySelector("#column-right") ||
      (activePanel === null || activePanel === void 0 ? void 0 : activePanel.parentElement) ||
      null
    );
  };

  /**
   * Attach a sidebar toolbar without creating duplicates.
   * @param {Element|null} targetElement Parent that will own the toolbar.
   * @param {HTMLElement} toolbar UI element to insert.
   * @returns {void}
   */
  const insertSidebarToolbar = (targetElement, toolbar) => {
    var _targetElement$queryS;
    if (!targetElement || !toolbar) return;
    const anchor =
      targetElement.firstChild ||
      ((_targetElement$queryS = targetElement.querySelector) === null ||
      _targetElement$queryS === void 0
        ? void 0
        : _targetElement$queryS.call(
            targetElement,
            ".search-super-content, .search-super-container-media.active, .search-super-container-stories.active, .scrollable.scrollable-y",
          ));
    if (anchor && anchor.parentNode === targetElement) {
      targetElement.insertBefore(toolbar, anchor);
      return;
    }
    if (typeof targetElement.prepend === "function") {
      targetElement.prepend(toolbar);
      return;
    }
    targetElement.appendChild(toolbar);
  };

  /**
   * Locate the currently active shared-media panel.
   */
  const getActiveMediaPanel = () => {
    var _document$querySelect;
    const exact = queryFirst([
      "#column-right .search-super-container-media.active",
      "#column-right .search-super-tab-container.active.search-super-container-media",
      '#column-right [class*="search-super-container-media"].active',
    ]);
    if (exact) return exact;
    const activeTab = document.querySelector("#column-right .search-super-tab-container.active");
    if (activeTab && isMediaPanel(activeTab) && !isStoryPanel(activeTab)) {
      return activeTab;
    }
    const tabText = String(
      ((_document$querySelect = document.querySelector(
        '#column-right .search-super-tab.active, #column-right .tabs-tab.active, #column-right .Tab.active, #column-right [aria-selected="true"]',
      )) === null || _document$querySelect === void 0
        ? void 0
        : _document$querySelect.textContent) || "",
    ).toLowerCase();
    if (tabText && /media|photo|video/.test(tabText) && !/stor/.test(tabText)) {
      return document.querySelector("#column-right .search-super-container-media");
    }
    return null;
  };

  /**
   * Locate the currently active story panel.
   */
  const getActiveStoryPanel = () => {
    const exact = queryFirst([
      "#column-right .search-super-container-stories.active",
      "#column-right .search-super-tab-container.active.search-super-container-stories",
      '#column-right [class*="search-super-container-stories"].active',
    ]);
    if (exact) return exact;
    const activeTab = document.querySelector("#column-right .search-super-tab-container.active");
    if (activeTab && isStoryPanel(activeTab)) return activeTab;
    return null;
  };

  /**
   * Recognize a Telegram shared-media panel.
   * @param {Element} panel
   */
  const isMediaPanel = (panel) => {
    const className = String((panel === null || panel === void 0 ? void 0 : panel.className) || "");
    return (
      className.includes("search-super-container-media") || className.includes("container-media")
    );
  };

  /**
   * Recognize a Telegram story panel.
   * @param {Element} panel
   */
  const isStoryPanel = (panel) => {
    const className = String((panel === null || panel === void 0 ? void 0 : panel.className) || "");
    return (
      className.includes("search-super-container-stories") ||
      className.includes("container-stories")
    );
  };

  /**
   * Install the shared-media bulk download control.
   */
  function createDownloadAllMediaButton() {
    const panel = getActiveMediaPanel();
    if (!panel || isStoryPanel(panel) || !isMediaPanel(panel)) return;
    const targetElement = getSidebarToolbarHost(panel);
    if (!targetElement) return;
    targetElement.querySelector(".download-click-div.tgStory")?.remove();
    if (targetElement.querySelector(".download-click-div.tgMedia") == null) {
      let downloadParent = cteateDownloadAllMonthBtn();
      insertSidebarToolbar(targetElement, downloadParent);
      downloadParent.addEventListener("click", async function () {
        k_media_downloadClick("batch", null);
      });
    }
  }

  /**
   * Install a scoped monthly media download control.
   * @param {NodeListOf<Element>} groupEle Monthly media group containers.
   * @param {number} i Group index.
   * @returns {void}
   */
  function createDownloadMonthMediaButton(groupEle, i) {
    var _groupEle$i;
    let month_class = "search-super-month-name";
    let monthEle =
      (_groupEle$i = groupEle[i]) === null || _groupEle$i === void 0
        ? void 0
        : _groupEle$i.querySelector(`.${month_class}`);
    if (!(monthEle instanceof HTMLElement)) return;
    if (monthEle.querySelector(".download-click-month") == null) {
      monthEle.style.display = "flex";
      let month_downloadButton = createDownloadMonthBtn();
      monthEle.appendChild(month_downloadButton);
      // Add event binding
      month_downloadButton.addEventListener("click", async function () {
        k_media_downloadClick("batch-month", groupEle[i]);
      });
    }
  }

  /**
   * Install the story bulk download control.
   */
  function createDownloadAllStoryButton() {
    const storyPanel =
      getActiveStoryPanel() || queryFirst(["#column-right .search-super-container-stories"]);
    if (!storyPanel) return;
    const targetElement = getSidebarToolbarHost(storyPanel);
    if (!targetElement) return;
    targetElement.querySelector(".download-click-div.tgMedia")?.remove();
    if (targetElement.querySelector(".download-click-div.tgStory") == null) {
      let downloadParent = createDownloadAllStoryBtn();
      insertSidebarToolbar(targetElement, downloadParent);
      downloadParent.addEventListener("click", async function () {
        k_story_downloadClick("batch", null);
      });
    }
  }

  /**
   * Install a per-item sidebar download control.
   * @param {HTMLElement} item
   * @param {"media"|"story"} initType
   */
  function createDownloadSingleButton(item, initType) {
    if (item.querySelector(".download-click-one") === null) {
      if (typeof getComputedStyle === "function" && getComputedStyle(item).position === "static") {
        item.style.position = "relative";
      }
      let downloadButton = createDownloadStoryMediaBtn();
      item.appendChild(downloadButton);
      // Add event binding
      downloadButton.addEventListener("click", async function (event) {
        var _event$stopImmediateP;
        event.preventDefault();
        event.stopPropagation();
        (_event$stopImmediateP = event.stopImmediatePropagation) === null ||
          _event$stopImmediateP === void 0 ||
          _event$stopImmediateP.call(event);
        initType === "story"
          ? k_story_downloadClick("single", item)
          : k_media_downloadClick("single", item);
      });
    }
  }

  let infoButtonsBusy = false;

  /**
   * Inspect the sidebar and add download controls to newly rendered items.
   */
  const initialInfoButtonsDownload = async () => {
    if (infoButtonsBusy) return;
    infoButtonsBusy = true;
    try {
      const mediaPanel = getActiveMediaPanel();
      const storyPanel = getActiveStoryPanel();
      const activeTab = document.querySelector("#column-right .search-super-tab-container.active");
      const activeClass = String(
        (activeTab === null || activeTab === void 0 ? void 0 : activeTab.className) || "",
      );
      if (
        (mediaPanel && isMediaPanel(mediaPanel) && !isStoryPanel(mediaPanel)) ||
        activeClass.includes("search-super-container-media")
      ) {
        const panel = mediaPanel || activeTab;
        if (!panel) return;
        createDownloadAllMediaButton();
        const groupEle = panel.querySelectorAll(".search-super-month");
        groupEle.forEach((_, i) => {
          createDownloadMonthMediaButton(groupEle, i);
        });
        (getKSidebarItems("tgMedia", panel) || []).forEach((item) => {
          createDownloadSingleButton(/** @type {HTMLElement} */ (item), "media");
        });
        return;
      }
      if (
        (storyPanel && isStoryPanel(storyPanel)) ||
        activeClass.includes("search-super-container-stories")
      ) {
        const panel = storyPanel || activeTab;
        createDownloadAllStoryButton();
        (getKSidebarItems("tgStory", panel) || []).forEach((item) => {
          createDownloadSingleButton(/** @type {HTMLElement} */ (item), "story");
        });
        return;
      }
      if (activeTab) {
        document
          .querySelectorAll("#column-right .search-super .download-click-div")
          .forEach((node) => node.remove());
      }
    } finally {
      infoButtonsBusy = false;
    }
  };

  /** @type {number|null} */
  let infoScanTimer = null;

  /**
   * Debounce sidebar updates triggered by DOM mutations.
   */
  const scheduleInfoButtonsDownload = () => {
    if (infoScanTimer) return;
    infoScanTimer = window.setTimeout(() => {
      infoScanTimer = null;
      initialInfoButtonsDownload();
    }, 300);
  };

  /**
   * Wait for a group of matching DOM elements to become available.
   * @param {string} querySelector
   * @param {number} timeout
   * @returns {Promise<NodeListOf<Element>>}
   */
  async function getGroupEle(querySelector, timeout) {
    return new Promise((resolve) => {
      let t = document.querySelectorAll(querySelector);
      if (t.length) return resolve(t);
      let settled = false;
      /** @param {NodeListOf<Element>} nodes */
      const done = (nodes) => {
        if (settled) return;
        settled = true;
        observer.disconnect();
        if (timer) window.clearTimeout(timer);
        resolve(nodes);
      };
      const observer = new MutationObserver(() => {
        let nodes = document.querySelectorAll(querySelector);
        if (nodes.length) {
          done(nodes);
        }
      });
      const timer = timeout
        ? window.setTimeout(() => {
            done(document.querySelectorAll(querySelector));
          }, timeout)
        : null;
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }

  /**
   * Dispatch a single, monthly, or bulk media-sidebar download.
   * @param {string} type
   * @param {Element|null} ele
   */
  async function k_media_downloadClick(type, ele) {
    if (type === "single") {
      if (ele) await k_media_downloadResource(ele);
    } else {
      /** @type {Element[]} */
      let media_container = [];
      if (type === "batch") {
        media_container = getKSidebarItems("tgMedia");
      } else if (type === "batch-month") {
        media_container = getKSidebarItems("tgMedia", ele);
      }
      for (let i = 0; i < media_container.length; i++) {
        await k_media_downloadResource(media_container[i]);
      }
    }
  }

  /**
   * Dispatch one or more story downloads.
   * @param {string} type
   * @param {Element|null} ele
   */
  async function k_story_downloadClick(type, ele) {
    if (type === "batch") {
      const media_container = getKSidebarItems("tgStory");
      for (let i = 0; i < media_container.length; i++) {
        await k_story_downloadResource(media_container[i]);
      }
    } else if (ele) {
      await k_story_downloadResource(ele);
    }
  }

  let lastKPeerId = "";

  const K_SIDEBAR_ITEM_SELECTOR = [
    ".media-container[data-mid]",
    ".media-container",
    ".grid-item[data-mid]",
    ".grid-item",
    "[data-mid]",
    "[data-message-id]",
    ".album-item",
    ".media-inner",
    "img.media-photo",
    "img.thumbnail",
    "canvas.media-photo",
    "canvas.canvas-thumbnail",
    "canvas",
    "video.media-video",
    "video",
  ].join(", ");

  const K_SIDEBAR_ITEM_HOST_SELECTOR = [
    ".media-container[data-mid]",
    ".media-container",
    ".grid-item[data-mid]",
    ".grid-item",
    "[data-mid]",
    "[data-message-id]",
    ".album-item",
  ].join(", ");

  /**
   * Find the peer identifier associated with the active Telegram chat.
   * @returns {string}
   */
  function getPeerId() {
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
      var _document$querySelect2;
      const peerId =
        (_document$querySelect2 = document.querySelector(selector)) === null ||
        _document$querySelect2 === void 0
          ? void 0
          : _document$querySelect2.getAttribute("data-peer-id");
      if (peerId) {
        lastKPeerId = peerId;
        return peerId;
      }
    }
    return lastKPeerId;
  }

  /**
   * Resolve a message identifier from a sidebar media card.
   * @param {Element} element
   * @returns {string}
   */
  function getSidebarMediaId(element) {
    var _element$closest4,
      _element$closest5,
      _element$querySelecto5,
      _element$querySelecto6,
      _element$closest6,
      _element$querySelecto7;
    let rawId =
      (element === null || element === void 0 ? void 0 : element.getAttribute("data-mid")) ||
      (element === null || element === void 0 ? void 0 : element.getAttribute("data-message-id")) ||
      (element === null ||
      element === void 0 ||
      (_element$closest4 = element.closest) === null ||
      _element$closest4 === void 0 ||
      (_element$closest4 = _element$closest4.call(element, "[data-mid]")) === null ||
      _element$closest4 === void 0
        ? void 0
        : _element$closest4.getAttribute("data-mid")) ||
      (element === null ||
      element === void 0 ||
      (_element$closest5 = element.closest) === null ||
      _element$closest5 === void 0 ||
      (_element$closest5 = _element$closest5.call(element, "[data-message-id]")) === null ||
      _element$closest5 === void 0
        ? void 0
        : _element$closest5.getAttribute("data-message-id")) ||
      (element === null ||
      element === void 0 ||
      (_element$querySelecto5 = element.querySelector) === null ||
      _element$querySelecto5 === void 0 ||
      (_element$querySelecto5 = _element$querySelecto5.call(element, "[data-mid]")) === null ||
      _element$querySelecto5 === void 0
        ? void 0
        : _element$querySelecto5.getAttribute("data-mid")) ||
      (element === null ||
      element === void 0 ||
      (_element$querySelecto6 = element.querySelector) === null ||
      _element$querySelecto6 === void 0 ||
      (_element$querySelecto6 = _element$querySelecto6.call(element, "[data-message-id]")) ===
        null ||
      _element$querySelecto6 === void 0
        ? void 0
        : _element$querySelecto6.getAttribute("data-message-id")) ||
      (element === null ||
      element === void 0 ||
      (_element$closest6 = element.closest) === null ||
      _element$closest6 === void 0 ||
      (_element$closest6 = _element$closest6.call(
        element,
        '[id^="shared-mediamessage-"], [id^="shared-media-message-"], [id^="album-media-message"], [id^="media-message-"]',
      )) === null ||
      _element$closest6 === void 0
        ? void 0
        : _element$closest6.getAttribute("id")) ||
      (element === null ||
      element === void 0 ||
      (_element$querySelecto7 = element.querySelector) === null ||
      _element$querySelecto7 === void 0 ||
      (_element$querySelecto7 = _element$querySelecto7.call(
        element,
        '[id^="shared-mediamessage-"], [id^="shared-media-message-"], [id^="album-media-message"], [id^="media-message-"]',
      )) === null ||
      _element$querySelecto7 === void 0
        ? void 0
        : _element$querySelecto7.getAttribute("id")) ||
      (element === null || element === void 0 ? void 0 : element.getAttribute("id")) ||
      "";
    rawId = String(rawId || "")
      .replace(/^info_/, "")
      .replace(/_download$/, "");
    if (rawId.startsWith("shared-mediamessage-")) {
      return rawId.split("shared-mediamessage-")[1];
    }
    if (rawId.startsWith("shared-media-message-")) {
      return rawId.split("shared-media-message-")[1];
    }
    if (rawId.startsWith("media-message-")) {
      return rawId.split("media-message-")[1];
    }
    if (rawId.startsWith("album-media-message-")) {
      return rawId.split("album-media-message-")[1];
    }
    if (rawId.startsWith("album-media-message")) {
      return rawId.split("album-media-message")[1];
    }
    return rawId;
  }

  /**
   * Determine the parent media host for a sidebar node.
   * @param {Element} element
   */
  function getMediaHost(element) {
    var _element$closest7;
    return (
      (element === null ||
      element === void 0 ||
      (_element$closest7 = element.closest) === null ||
      _element$closest7 === void 0
        ? void 0
        : _element$closest7.call(
            element,
            ".album-item, .media-container, .grid-item, .bubble, .media-inner",
          )) ||
      (element === null || element === void 0 ? void 0 : element.parentElement) ||
      element
    );
  }

  /**
   * Classify a sidebar item as video using Telegram’s DOM hints.
   * @param {Element} element
   * @returns {boolean}
   */
  function isKVideoLikeElement(element) {
    var _element$matches, _host$classList, _host$classList2, _host$classList3, _host$querySelector;
    const host = getMediaHost(element);
    return Boolean(
      (element === null ||
      element === void 0 ||
      (_element$matches = element.matches) === null ||
      _element$matches === void 0
        ? void 0
        : _element$matches.call(
            element,
            "video.media-video, video, .media-video, .video-time, .video-duration",
          )) ||
      (host === null ||
      host === void 0 ||
      (_host$classList = host.classList) === null ||
      _host$classList === void 0
        ? void 0
        : _host$classList.contains("video")) ||
      (host === null ||
      host === void 0 ||
      (_host$classList2 = host.classList) === null ||
      _host$classList2 === void 0
        ? void 0
        : _host$classList2.contains("round")) ||
      (host === null ||
      host === void 0 ||
      (_host$classList3 = host.classList) === null ||
      _host$classList3 === void 0
        ? void 0
        : _host$classList3.contains("gif")) ||
      (host === null ||
      host === void 0 ||
      (_host$querySelector = host.querySelector) === null ||
      _host$querySelector === void 0
        ? void 0
        : _host$querySelector.call(
            host,
            ".video-time, .video-duration, video.media-video, .media-video, video",
          )),
    );
  }

  /**
   * Test whether a sidebar item contains a non-extension image.
   * @param {Element} element
   * @returns {boolean}
   */
  function hasKSidebarImage(element) {
    return Boolean(queryTelegramMediaImage(element));
  }

  /**
   * Classify a sidebar item by media type.
   * @param {Element} element
   * @returns {'video'|'image'|''}
   */
  function getKSidebarType(element) {
    if (isKVideoLikeElement(element)) return "video";
    if (hasKSidebarImage(element)) return "image";
    return "";
  }

  /**
   * Find the stable host corresponding to a sidebar child node.
   * @param {Element} node
   * @param {Element} panel
   */
  function getSidebarItemHost(node, panel) {
    var _node$matches, _node$closest3, _host$matches;
    if (!node || !panel) return null;
    if (
      (_node$matches = node.matches) !== null &&
      _node$matches !== void 0 &&
      _node$matches.call(node, "img, video, canvas")
    ) {
      var _node$closest2, _mediaHost$matches, _node$parentElement$m, _node$parentElement;
      const mediaHost =
        (_node$closest2 = node.closest) === null || _node$closest2 === void 0
          ? void 0
          : _node$closest2.call(
              node,
              ".media-container, .grid-item, .album-item, div, li, a, button, [role='button']",
            );
      if (
        mediaHost &&
        mediaHost !== panel &&
        !(
          (_mediaHost$matches = mediaHost.matches) !== null &&
          _mediaHost$matches !== void 0 &&
          _mediaHost$matches.call(mediaHost, "img, video, canvas, .media-inner")
        ) &&
        panel.contains(mediaHost)
      ) {
        return mediaHost;
      }
      if (
        node.parentElement &&
        node.parentElement !== panel &&
        !(
          (_node$parentElement$m = (_node$parentElement = node.parentElement).matches) !== null &&
          _node$parentElement$m !== void 0 &&
          _node$parentElement$m.call(_node$parentElement, ".media-inner")
        ) &&
        panel.contains(node.parentElement)
      ) {
        return node.parentElement;
      }
    }
    const host =
      (_node$closest3 = node.closest) === null || _node$closest3 === void 0
        ? void 0
        : _node$closest3.call(node, K_SIDEBAR_ITEM_HOST_SELECTOR);
    if (
      host &&
      host !== panel &&
      !(
        (_host$matches = host.matches) !== null &&
        _host$matches !== void 0 &&
        _host$matches.call(host, "img, video, canvas, .media-inner")
      ) &&
      panel.contains(host)
    ) {
      return host;
    }
    return null;
  }

  /**
   * Enumerate unique downloadable media cards in a sidebar panel.
   * @param {string} tabType
   * @param {Element | null} root
   * @returns {Element[]}
   */
  function getKSidebarItems(tabType, root = null) {
    var _panel$matches;
    const panel = root || (tabType === "tgStory" ? getActiveStoryPanel() : getActiveMediaPanel());
    if (!panel) return [];
    const candidates = [...panel.querySelectorAll(K_SIDEBAR_ITEM_SELECTOR)];
    if (
      (_panel$matches = panel.matches) !== null &&
      _panel$matches !== void 0 &&
      _panel$matches.call(panel, K_SIDEBAR_ITEM_SELECTOR)
    )
      candidates.unshift(panel);
    const seen = new Set();
    /** @type {Element[]} */
    const items = [];
    candidates.forEach((node) => {
      var _node$matches2;
      if (isPluginMediaNode(node)) return;
      const item =
        getSidebarItemHost(node, panel) ||
        ((_node$matches2 = node.matches) !== null &&
        _node$matches2 !== void 0 &&
        _node$matches2.call(node, ".media-container, .grid-item, .album-item")
          ? node
          : null);
      if (!item || !panel.contains(item)) return;
      const mid = getSidebarMediaId(item);
      if (!mid || seen.has(mid)) return;
      if (!getKSidebarType(item)) return;
      seen.add(mid);
      items.push(item);
    });
    return items;
  }

  /**
   * Construct the identity and fallback selector for a sidebar download.
   * @param {Element} element
   * @param {string} tabType
   * @returns {{mid: string, pid: string, type: 'image'|'img'|'video'|'music',
   *   download_id: string, fallback_selector: string, tabType: string}|null}
   */
  function buildSidebarDownloadMeta(element, tabType) {
    const mid = getSidebarMediaId(element);
    const type = getKSidebarType(element);
    if (!mid || !type) return null;
    const download_id = "info_" + mid;
    const domId = download_id + "_download";
    element.setAttribute("data-tgvd-download-id", domId);
    element.setAttribute("id", domId);
    return {
      mid,
      pid:
        element.getAttribute("data-peer-id") ||
        element.closest("[data-mid][data-peer-id]")?.getAttribute("data-peer-id") ||
        element.querySelector("[data-mid][data-peer-id]")?.getAttribute("data-peer-id") ||
        getPeerId(),
      type,
      download_id,
      fallback_selector: markFallbackTarget(element),
      tabType,
    };
  }

  /**
   * Dispatch a sidebar download with request correlation and completion tracking.
   * @param {Element} element
   * @param {string} tabType
   * @param {string} url
   * @param {'image'|'img'|'video'|'music'} type
   * @param {boolean} sourcePending
   */
  async function dispatchSidebarDownload(element, tabType, url, type, sourcePending) {
    var _element$querySelecto10;
    const meta = buildSidebarDownloadMeta(element, tabType);
    if (!meta) return false;
    (_element$querySelecto10 = element.querySelector(".downloadvideo")) === null ||
      _element$querySelecto10 === void 0 ||
      _element$querySelecto10.classList.add("down_btn_video");
    return triggerEvent("single", url || "", meta.mid, type || meta.type, element, {
      mid: meta.mid,
      pid: meta.pid,
      source_pending: sourcePending,
      fallback_selector: meta.fallback_selector,
      waitForComplete: true,
      downloadTimeout: type === "image" || meta.type === "image" ? 60000 : 180000,
    });
  }

  /**
   * Resolve a sidebar item directly and open the viewer only if needed.
   * @param {Element} element
   * @param {string} tabType
   */
  async function downloadKSidebarResourceViaViewer(element, tabType) {
    const meta = buildSidebarDownloadMeta(element, tabType);
    if (!meta) return false;
    const source = element.querySelector(
      "video.media-video source, video.media-video, video source, video",
    );
    const url =
      meta.type === "image" ? getSidebarImageSrc(element) : ns.utils.getMediaNodeSrc(source);
    // The page-world resolver prefers Telegram's original document / largest
    // stored photo. The viewer opens only if direct retrieval fails.
    return dispatchSidebarDownload(element, tabType, url || "", meta.type, !url);
  }

  /**
   * Download a shared-media sidebar item.
   * @param {Element} element
   */
  async function k_media_downloadResource(element) {
    await downloadKSidebarResourceViaViewer(element, "tgMedia");
  }

  /**
   * Download a story sidebar item.
   * @param {Element} element
   */
  async function k_story_downloadResource(element) {
    await downloadKSidebarResourceViaViewer(element, "tgStory");
  }

  /** Public feature interface, used only by sibling content-script modules. */
  const sidebarApi = {
    queryFirst,
    getSidebarToolbarHost,
    insertSidebarToolbar,
    getActiveMediaPanel,
    getActiveStoryPanel,
    isMediaPanel,
    isStoryPanel,
    createDownloadAllMediaButton,
    createDownloadMonthMediaButton,
    createDownloadAllStoryButton,
    createDownloadSingleButton,
    initialInfoButtonsDownload,
    scheduleInfoButtonsDownload,
    getGroupEle,
    k_media_downloadClick,
    k_story_downloadClick,
    getPeerId,
    getSidebarMediaId,
    getMediaHost,
    isKVideoLikeElement,
    hasKSidebarImage,
    getKSidebarType,
    getSidebarItemHost,
    getKSidebarItems,
    buildSidebarDownloadMeta,
    dispatchSidebarDownload,
    downloadKSidebarResourceViaViewer,
    k_media_downloadResource,
    k_story_downloadResource,
  };
  ns.sidebar = sidebarApi;
})();
