/**
 * @fileoverview Single startup entry point for the isolated-world feature modules.
 * Chrome injects this file last, after core, translations, and all feature modules.
 */
(() => {
  "use strict";
  const app = globalThis.TelegramLocalDownloader;
  if (!app || app.started) return;
  app.started = true;

  /**
   * Inject the one page-world script that can access Telegram's rootScope managers.
   * @returns {void}
   */
  function injectPageScript() {
    if (document.documentElement.getAttribute("data-tvd-page-inject") === "1") return;
    if (document.getElementById("tvd-inject-script")) return;
    const script = document.createElement("script");
    script.id = "tvd-inject-script";
    script.src = chrome.runtime.getURL("js/telegram-contextScript.js");
    script.addEventListener(
      "error",
      () => {
        console.error("[Telegram Downloader] Page-world script failed to load.");
      },
      { once: true },
    );
    (document.head || document.documentElement).appendChild(script);
  }

  /**
   * Run idempotent chat/sidebar scans and watch SPA updates.
   * The observer and timer are owned exclusively by this entry point.
   * @returns {void}
   */
  function start() {
    injectPageScript();
    app.chat.initialButtonsDownload();
    app.sidebar.initialInfoButtonsDownload();
    window.setInterval(() => {
      app.chat.initialButtonsDownload();
      app.sidebar.initialInfoButtonsDownload();
    }, 5000);
    const observer = new MutationObserver(app.sidebar.scheduleInfoButtonsDownload);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  if (document.body) start();
  else document.addEventListener("DOMContentLoaded", start, { once: true });
})();
