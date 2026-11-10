/**
 * @fileoverview Chat feature module of Telegram Local Downloader.
 * Runs in Chrome's isolated world. Media byte retrieval takes place in the page-world script.
 * @requires TelegramLocalDownloader
 */
(() => {
  "use strict";
  const ns = globalThis.TelegramLocalDownloader;
  const i18 = ns.i18;
  /** UI feature reference; registered earlier in manifest order. @private */
  const createDownloadBtn = ns.ui.createDownloadBtn;
  /** UI feature reference; registered earlier in manifest order. @private */
  const creatDownloadCheckBox = ns.ui.creatDownloadCheckBox;
  /** UI feature reference; registered earlier in manifest order. @private */
  const injectDownloadButton = ns.ui.injectDownloadButton;
  /** Utility feature reference; registered earlier in manifest order. @private */
  const getChatMediaIdentity = ns.utils.getChatMediaIdentity;
  /** Utility feature reference; registered earlier in manifest order. @private */
  const sleep = ns.utils.sleep;
  /** Utility feature reference; registered earlier in manifest order. @private */
  const getMediaNodeSrc = ns.utils.getMediaNodeSrc;
  /** Utility feature reference; registered earlier in manifest order. @private */
  const findKAudioSource = ns.utils.findKAudioSource;
  /** Utility feature reference; registered earlier in manifest order. @private */
  const waitForContainerAudioSrc = ns.utils.waitForContainerAudioSrc;
  /** Utility feature reference; registered earlier in manifest order. @private */
  const waitForAudioPreload = ns.utils.waitForAudioPreload;
  /** Download feature reference; registered earlier in manifest order. @private */
  const triggerEvent = ns.downloads.triggerEvent;
  /** Album feature reference; registered earlier in manifest order. @private */
  const handleAlbumItem = ns.albums.handleAlbumItem;
  /** Establish the exact DOM target for a viewer fallback if needed. */
  const markFallbackTarget = ns.utils.markFallbackTarget;
  /** Album feature reference; registered earlier in manifest order. @private */
  const mediaDownload = ns.albums.mediaDownload;

  /**
   * Attach an asynchronous download handler to a standalone media button.
   * @param {HTMLElement} container
   * @param {Element|null} element
   * @param {"music"|"img"|"video"} type
   * @param {number} conIndx
   */
  const handleDownload = async (container, element, type, conIndx) => {
    const downloadButton = container.querySelector(`.down_btn_${type}`);
    if (downloadButton) {
      downloadButton.addEventListener("click", async (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (type === "music") {
          const downloadBtn = /** @type {HTMLElement|null} */ (
            container.querySelector(".down_btn_music")
          );
          const audio_play = /** @type {HTMLCollectionOf<HTMLElement>} */ (
            container.getElementsByClassName("audio-play-icon")
          );
          if (!downloadBtn || !audio_play.length) return;
          const identity = getChatMediaIdentity(container);
          const downloadId = identity.mid || String(conIndx + 1);
          try {
            downloadBtn.innerHTML = "DOWNLOADING...";
            audio_play[0].click();
            await sleep(500);
            await waitForAudioPreload();
            let audioSrc = await waitForContainerAudioSrc(container, 10000);
            if (!audioSrc) {
              audioSrc = findKAudioSource(
                container,
                audio_play[0],
                document.querySelectorAll("audio"),
              );
            }
            await triggerEvent("single", audioSrc || "", downloadId, type, container, {
              ...identity,
              source_pending: !audioSrc,
              waitForComplete: true,
              downloadTimeout: 120000,
            });
          } finally {
            var _audio_play$;
            if (
              (_audio_play$ = audio_play[0]) !== null &&
              _audio_play$ !== void 0 &&
              (_audio_play$ = _audio_play$.parentElement) !== null &&
              _audio_play$ !== void 0 &&
              (_audio_play$ = _audio_play$.classList) !== null &&
              _audio_play$ !== void 0 &&
              _audio_play$.contains("playing")
            ) {
              audio_play[0].click();
            }
            downloadBtn.innerHTML = i18.t("dialog.butMusic");
          }
        } else {
          await triggerEvent("single", getMediaNodeSrc(element), conIndx + 1, type, container, {
            ...getChatMediaIdentity(container),
            fallback_selector: markFallbackTarget(container),
            waitForComplete: true,
            downloadTimeout: type === "img" ? 60000 : 180000,
          });
        }
      });
    }
  };

  /**
   * Scan visible chat bubbles and install individual or album controls idempotently.
   */
  const initialButtonsDownload = () => {
    const elements = document.querySelectorAll(".bubble-content-wrapper");
    elements.forEach((container, conIndx) => {
      const imgElement = container.querySelector("img.media-photo");
      // const videoElement = container.querySelector('.attachment video');
      const paternityCon = container.querySelector(".content-teleram-script");
      const videoElement = container.querySelector(".media-video");
      const albumItem = container.querySelectorAll(".album-item");
      const videoTime = container.querySelector(".video-time");
      const source_music = container.getElementsByClassName("audio");

      // Inject the download button if it does not exist in the parent container
      if (
        paternityCon === null &&
        albumItem.length === 0 &&
        imgElement !== null &&
        source_music.length === 0
      ) {
        // Video download button
        if (videoElement !== null && videoTime !== null) {
          injectDownloadButton(container, "video", createDownloadBtn("video", false), "attachment");
          handleDownload(/** @type {HTMLElement} */ (container), videoElement, "video", conIndx);
        }

        // Without video link
        if (videoTime !== null && videoElement === null) {
          injectDownloadButton(container, "video", createDownloadBtn("video", false), "attachment");
          container.querySelector(".down_btn_video")?.addEventListener("click", async (event) => {
            event.preventDefault();
            event.stopPropagation();
            await mediaDownload(conIndx + 1, container);
          });
        }

        // Image download button
        if (videoTime === null && videoElement === null) {
          injectDownloadButton(container, "img", createDownloadBtn("image", false), "attachment");
          handleDownload(/** @type {HTMLElement} */ (container), imgElement, "img", conIndx);
        }
      }

      // Audio/Voice: Yes .audio and no .media-video，No more requests .audio-title
      if (albumItem.length === 0 && source_music && source_music.length > 0 && !videoElement) {
        const voiceDocs = container.querySelectorAll(".spoilers-container .document-container");
        /** @param {Element} item */
        const injectAudioTarget = (item) => {
          if (item.querySelector(".down_btn_music")) return;
          injectDownloadButton(item, "music", createDownloadBtn("music", false), "attachment");
          if (item instanceof HTMLElement) handleDownload(item, null, "music", conIndx);
        };
        if (voiceDocs.length > 0) {
          voiceDocs.forEach((item) => injectAudioTarget(item));
        } else {
          injectAudioTarget(container);
        }
      }

      // checkbox
      albumItem.forEach((item) => {
        const checkboxDown = item.querySelector(".download-check-item");
        if (!checkboxDown) {
          injectDownloadButton(item, "check", creatDownloadCheckBox(), item);
        }
      });

      // Multiple choice download button
      const downCheckAll = container.querySelectorAll(".download-checkbox-all");
      if (downCheckAll.length === 0 && container.querySelector(".album-item") !== null) {
        injectDownloadButton(container, "downloadAll", createDownloadBtn("", true), container);
        container.querySelectorAll(".download-checkbox-all").forEach((all) => {
          const bubbleCoWr = all.closest(".bubble-content-wrapper") || container;
          all.addEventListener("click", async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const checkboxDown = /** @type {NodeListOf<HTMLInputElement>} */ (
              bubbleCoWr.querySelectorAll(".download-check-item")
            );
            ns.state.maxProgress = -Infinity;
            let promiseChain = Promise.resolve();
            checkboxDown.forEach((checkbox, index) => {
              if (checkbox.checked !== true) return;
              promiseChain = promiseChain.then(async () => {
                const albumNode = checkbox.closest(".album-item") || checkbox.parentElement;
                if (!albumNode) return;

                if (albumNode.querySelector(".video-time") === null) {
                  const imageNode = albumNode.querySelector("img.media-photo");
                  const imageUrl = imageNode ? getMediaNodeSrc(imageNode) : "";
                  await triggerEvent("single", imageUrl, index + 1, "image", container, {
                    ...getChatMediaIdentity(albumNode),
                    source_pending: !imageUrl,
                    fallback_selector: markFallbackTarget(albumNode),
                    waitForComplete: true,
                    downloadTimeout: 60000,
                  });
                  return;
                }
                await handleAlbumItem(checkbox, index, container);
              });
            });
            await promiseChain.catch(() => {});
          });
        });
      }
    });
  };

  /** Public feature interface, used only by sibling content-script modules. */
  ns.chat = { handleDownload, initialButtonsDownload };
})();
