/**
 * @fileoverview Ui feature module of Telegram Local Downloader.
 * Runs in Chrome's isolated world. Media byte retrieval takes place in the page-world script.
 * @requires TelegramLocalDownloader
 */
(() => {
  "use strict";
  const ns = globalThis.TelegramLocalDownloader;
  const i18 = ns.i18;

  /**
   * Build the localized chat download control or album batch control.
   * @param {string} type
   * @param {boolean} isMulti
   */
  function createDownloadBtn(type, isMulti) {
    let btn_class = "",
      btn_text = "",
      data_text = "FORCE DOWNLOAD";
    switch (type) {
      case "image":
        btn_class = "download-images down_btn_img";
        btn_text = i18.t("dialog.butImg");
        break;
      case "video":
        btn_class = "download-videos down_btn_video";
        btn_text = i18.t("dialog.butVideo");
        break;
      case "music":
        btn_class = "download-videos down_btn_music";
        btn_text = i18.t("dialog.butMusic");
        break;
      default:
        break;
    }
    const btn_warrper_box = document.createElement("div");
    const btn_inner_box = document.createElement("div");
    const btn = document.createElement("button");
    btn_warrper_box.className = isMulti
      ? "content-teleram-script check-all-download"
      : "content-teleram-script";
    btn_inner_box.className = "downloadBtnIns";
    btn.className = isMulti ? "download-checkbox-all" : `${btn_class}`;
    btn.innerText = isMulti ? i18.t("dialog.butAllFile") : btn_text;
    btn.setAttribute("data-text", data_text);
    let logo = injectLogo();
    btn_inner_box.appendChild(logo);
    btn_inner_box.appendChild(btn);
    btn_warrper_box.appendChild(btn_inner_box);
    return btn_warrper_box;
  }

  /**
   * Create a progress display for an active chat download.
   */
  function creatDownloadBtnsProgress() {
    const progressDiv = document.createElement("div");
    progressDiv.className = "progress-teleram-script";
    const process_box = document.createElement("div");
    process_box.className = "content-teleram-script  down_btn_progress";
    progressDiv.appendChild(process_box);
    return progressDiv;
  }

  /**
   * Create a checked selection checkbox for an album item.
   */
  function creatDownloadCheckBox() {
    const checkbox_box = document.createElement("input");
    checkbox_box.className = "download-check-item";
    checkbox_box.type = "checkbox";
    checkbox_box.name = "checkbox-down";
    checkbox_box.value = "down_btn_checkbox";
    checkbox_box.checked = true;
    return checkbox_box;
  }

  /**
   * Create the media-sidebar bulk download toolbar.
   */
  function cteateDownloadAllMonthBtn() {
    let downloadParent = document.createElement("div");
    let downloadButton = document.createElement("button");
    downloadParent.className = "download-click-div tgMedia";
    downloadButton.className =
      "download-click-all download-click-btn downloadvideo download-videos";
    downloadParent.style.top = "80px";
    downloadButton.innerText = "Download all Media";
    downloadButton.setAttribute("data-text", "Download all Media");
    let logo = injectLogo();
    downloadButton.appendChild(logo);
    downloadParent.appendChild(downloadButton);
    return downloadParent;
  }

  /**
   * Create the control for downloading the selected month of media.
   */
  function createDownloadMonthBtn() {
    let month_downloadButton = document.createElement("button");
    month_downloadButton.className =
      "download-click-month  download-click-btn downloadvideo download-videos";
    month_downloadButton.innerText = i18.t("dialog.downloadMonth");
    let logo = injectLogo();
    month_downloadButton.appendChild(logo);
    return month_downloadButton;
  }

  /**
   * Create the stories bulk download control.
   */
  function createDownloadAllStoryBtn() {
    let downloadParent = document.createElement("div");
    let downloadButton = document.createElement("button");
    downloadParent.className = "download-click-div tgStory";
    downloadButton.className =
      "download-click-all download-click-btn downloadvideo download-videos";
    downloadParent.style.top = "20px";
    downloadButton.innerText = "Download all Stories";
    downloadButton.setAttribute("data-text", "Download all Stories");
    let logo = injectLogo();
    downloadButton.appendChild(logo);
    downloadParent.appendChild(downloadButton);
    return downloadParent;
  }

  /**
   * Create a download control for a single story.
   */
  function createDownloadStoryMediaBtn() {
    let downloadButton = document.createElement("button");
    downloadButton.className =
      "download-click-one  download-click-btn downloadvideo download-videos";
    downloadButton.innerText = "Download";
    downloadButton.setAttribute("data-text", "Download");
    let logo = injectLogo();
    downloadButton.appendChild(logo);
    return downloadButton;
  }

  /**
   * Create an extension-owned logo image without using the page network.
   */
  function injectLogo() {
    const logo = document.createElement("img");
    logo.src = chrome.runtime.getURL("/assets/image/logo.png");
    logo.className = "logo-img";
    return logo;
  }

  /**
   * Attach a download control once to the intended media container.
   * @param {Element} container
   * @param {string} type
   * @param {HTMLElement} htmlTemplate
   * @param {Element | "attachment"} injectBox
   */
  const injectDownloadButton = (container, type, htmlTemplate, injectBox) => {
    const existingButton = container.querySelector(`.down_btn_${type}`);

    if (!existingButton) {
      const target = injectBox === "attachment" ? container : injectBox;
      target.appendChild(htmlTemplate);
    }
  };

  /** Public feature interface, used only by sibling content-script modules. */
  ns.ui = {
    createDownloadBtn,
    creatDownloadBtnsProgress,
    creatDownloadCheckBox,
    cteateDownloadAllMonthBtn,
    createDownloadMonthBtn,
    createDownloadAllStoryBtn,
    createDownloadStoryMediaBtn,
    injectLogo,
    injectDownloadButton,
  };
})();
