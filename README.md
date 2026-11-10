# Telegram Local Downloader

An unpacked Manifest V3 Chrome extension for **Telegram Web K** (`https://web.telegram.org/k/`). It adds in-page download controls for supported chat media, albums, media sidebar entries, and stories, and downloads the original media bytes where Web K exposes them.

This edition is intentionally **build-free**. It has no npm/runtime dependency, telemetry, licensing system, or remote service. It uses Telegram Web K's own client session; it does not ask for Telegram credentials.

## Install

1. Extract this ZIP to a permanent directory. Do not load the ZIP itself.
2. Open `chrome://extensions`, turn on **Developer mode**, choose **Load unpacked**, and select the directory containing `manifest.json`.
3. Open or reload `https://web.telegram.org/k/` while signed in.
4. Use the extension's download buttons beside supported messages, in albums, or in the sidebar.

If an earlier unpacked copy is installed, disable or remove the old extension before loading the new directory to avoid duplicate controls.

## How media retrieval works

**Photos sent as photos:** Look up the Telegram message using the peer ID and message ID; select the largest non-placeholder variant in `message.media.photo.sizes`; ask Web K's `apiFileManager.downloadMediaURL` for that exact variant. If unavailable, try an opened-on-demand viewer (waiting for the target dimensions) and finally the chat DOM image URL. Telegram's own upload-time photo compression cannot be reversed. A 2560-pixel photo stored by Telegram cannot be turned back into the original 5184-pixel PNG.

**Videos:** Prefer the message's primary `media.document`, which is generally the original/uploaded video file, and request its bytes through Telegram Web K's stream endpoint. Alternative-quality documents, when available, are attempted after a failed primary download. Existing DOM source and lastly a viewer-based source are retained as fallbacks. Merely finding a URL does not count as a successful download; fetching its bytes must also succeed. No re-encoding or remuxing occurs.

**Files sent as documents:** The page-world resolver preserves the original document filename and MIME when a request for the document is available. The UI still follows the media-element detection supported in the original extension; **it does not yet add a general-purpose download button to arbitrary `.txt`, PDF, or other document message bubbles**.

**Audio and special media:** The existing chat and sidebar detection paths have been retained where applicable. Some Telegram content types and UI layouts may require additional selectors.

Downloads use browser-native `download` links, byte-range verification where supported, and request-specific progress/completion events. The completion event confirms that the browser save was initiated, **not** that the operating system finished writing the file.

## Structure

| Path | Purpose |
|---|---|
| `manifest.json` | Chrome permissions, script order, CSS, and accessible assets |
| `js/content/core.js` | Shared isolated-world namespace and state |
| `js/content/locales.js` | Preserved English, Hebrew, and Chinese UI text |
| `js/content/utils.js` | DOM discovery, message identification, fallback locators |
| `js/content/ui.js` | Download controls and progress elements |
| `js/content/downloads.js` | Correlated download requests and completion monitoring |
| `js/content/viewer.js` | Viewer/DOM helper functions |
| `js/content/albums.js` | Album-item downloading and batch coordination |
| `js/content/chat.js` | Chat message controls, image, video, and audio |
| `js/content/sidebar.js` | Media sidebar and story controls |
| `js/content/main.js` | **Only** startup entry point; installs observers and injects the page script once |
| `js/telegram-contextScript.js` | **Single MAIN-world script**; Telegram managers, quality selection, binary downloader |
| `css/telegram-downloader.css` | Scoped UI styles |
| `types/globals.d.ts`, `jsconfig.json` | Type-aware JSDoc editing support; no emitted build files |
| `tests/*.test.cjs` | Node.js regression tests using simulated browser/Telegram objects |

All `js/content/*.js` files run in Chrome's isolated content-script world, in the exact order listed in the manifest. They share only the `globalThis.TelegramLocalDownloader` namespace. The entry point `main.js` injects `js/telegram-contextScript.js` into Telegram's MAIN world so it can use Web K's internal `window.rootScope.managers` proxies. The two worlds exchange DOM `CustomEvent` messages; no ordinary ES module imports or bundler are required.

The source has JSDoc for public module interfaces, nontrivial functions, request/event contracts, asynchronous manager calls, and binary-safety invariants. `jsconfig.json` enables JavaScript type checking in compatible editors.

## Validation

With Node.js installed, from the extracted extension root:

```sh
node --test tests/*.test.cjs
```

To check the JSDoc and cross-module interfaces with **strict** JavaScript type checking, run `tsc -p jsconfig.json` if TypeScript is installed. The included `jsconfig.json` sets `strict: true` and includes `types/globals.d.ts`; a successful check produces no diagnostics. VS Code also uses this configuration when analyzing the JavaScript project. None of these development tools is required to run the extension in Chrome.

## Boundaries and limitations

- **Live Telegram verification is still required.** The supplied source was refactored and the new downloader was checked with mock Telegram APIs, but the extension has not been run in a signed-in production Telegram Web K browser here. Telegram's private managers and DOM may change over time.
- Alternate video-quality documents are not available for every video. The primary document is assumed to be the preferred original source; Telegram may expose different metadata for some videos.
- Even the largest photo variant is limited by Telegram's own upload/storage processing. Documents generally preserve the file's original encoded bytes.
- The fallback viewer uses Web K's current DOM structure. It is invoked only after direct sources cannot be fetched, and it does not deliberately close a viewer that was already open.
- Downloaded files are buffered in browser memory; large files require substantial free RAM. There is no resume across browser restarts.
- Downloading protected content is not guaranteed; follow Telegram and the content owner's permissions. The extension does not claim to override server-side restrictions.
- The extension does not change how Telegram handles file sending or uploads.

## License

See the included `LICENSE` from the supplied original project.
