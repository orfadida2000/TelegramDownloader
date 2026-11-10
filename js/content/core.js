/**
 * @fileoverview Shared isolated-world namespace and typed event contracts.
 * Loaded first by Chrome; subsequent files add narrowly scoped feature APIs.
 */
(() => {
  'use strict';
  if (globalThis.TelegramLocalDownloader) return;
  /** @typedef {{pid: string, mid: string}} MediaIdentity */
  /** @typedef {{url?: string, type?: string, media_url?: string, mid?: string, pid?: string, source_pending?: boolean, fallback_selector?: string, download_id?: number|string, progress_id?: string, request_id?: string}} DownloadRequest */
  /** @typedef {{type: 'single'|'batch', media: DownloadRequest | DownloadRequest[]}} DownloadEnvelope */
  /** @typedef {{ok: boolean, request_id: string, mid: string}} DownloadCompletion */
  /** @typedef {{request_id: string, progress: string, download_id: string|number}} DownloadProgress */
  /** @type {Pick<TelegramDownloaderNamespace, 'state'|'locales'|'i18'|'started'>} */
  const app = {
    state: { maxProgress: -Infinity },
    locales: null,
    started: false,
    i18: {
      /** Look up an original translation, falling back to English and then the key.
       * @param {string} key Dotted translation key (for example, dialog.butImg).
       * @returns {string}
       */
      t(key) {
        const language = String(navigator.language || 'en').toLowerCase();
        const locale = language.includes('zh') ? 'zh-CN' : language.includes('he') ? 'he' : 'en';
        /**
         * Traverse one nested language catalog without losing the value type.
         * @param {TelegramTranslationTree|undefined} messages
         * @returns {string|undefined}
         */
        const lookup = (messages) => {
          /** @type {string|TelegramTranslationTree|undefined} */
          let value = messages;
          for (const part of key.split('.')) {
            if (!value || typeof value === 'string') return undefined;
            value = value[part];
          }
          return typeof value === 'string' ? value : undefined;
        };
        return lookup(app.locales?.[locale]) ?? lookup(app.locales?.en) ?? key;
      }
    }
  };
  // Registration is staged: manifest.json guarantees all feature scripts load
  // before main.js uses the complete namespace. Only this boundary is asserted.
  globalThis.TelegramLocalDownloader = /** @type {TelegramDownloaderNamespace} */ (
    /** @type {unknown} */ (app)
  );
})();
