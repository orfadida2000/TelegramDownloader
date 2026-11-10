/**
 * @fileoverview Non-emitted declarations for the Chrome isolated world and the
 * subset of Telegram Web K's private page-world API used by the extension.
 *
 * Chrome loads the isolated-world scripts in the order specified by
 * manifest.json. `core.js` creates the namespace; each feature registers its
 * interface before the final `main.js` initialization runs.
 *
 * These declarations describe contracts, not a dependency on TypeScript at
 * runtime. Telegram's private manager APIs must be checked on client updates.
 */

declare const chrome: {
  runtime: {getURL(path: string): string};
};

/** Nested translations used by `i18.t` (not every language needs every key). */
interface TelegramTranslationTree {
  [key: string]: string | TelegramTranslationTree;
}
type TelegramLocale = 'en' | 'he' | 'zh-CN';
type TelegramTranslations = Record<TelegramLocale, TelegramTranslationTree>;

/** Telegram message identifiers; an album item's ID is not the UI index. */
interface TelegramMediaIdentity {
  pid: string;
  mid: string;
}

/** Optional source-resolution hints sent from the isolated world. */
interface TelegramDownloadRequestOptions {
  mid?: string;
  pid?: string;
  fallback_selector?: string;
  source_pending?: boolean;
  waitForComplete?: boolean;
  downloadTimeout?: number;
}

/** A source found in the media viewer, possibly including its preview image. */
interface TelegramViewerMedia {
  url: string;
  preview_src: string;
  type: string;
}

interface TelegramDownloaderUI {
  createDownloadBtn(type: string, isMulti: boolean): HTMLDivElement;
  creatDownloadBtnsProgress(): HTMLDivElement;
  creatDownloadCheckBox(): HTMLInputElement;
  cteateDownloadAllMonthBtn(): HTMLDivElement;
  createDownloadMonthBtn(): HTMLButtonElement;
  createDownloadAllStoryBtn(): HTMLDivElement;
  createDownloadStoryMediaBtn(): HTMLButtonElement;
  injectLogo(): HTMLImageElement;
  injectDownloadButton(container: Element, type: string, htmlTemplate: HTMLElement,
    injectBox: Element | 'attachment'): void;
}

interface TelegramDownloaderUtils {
  getBubbleMediaId(element: Element): string;
  getChatMediaIdentity(element: Element | null): TelegramMediaIdentity;
  sleep(ms: number): Promise<void>;
  isExtensionMediaUrl(url?: string): boolean;
  isPluginMediaNode(node: Element): boolean;
  queryTelegramMediaImage(root: Element | null): Element | null;
  getMediaNodeSrc(node: Element | null): string;
  getSidebarImageSrc(element: Element): string;
  getKAudioTitle(element: Element): string;
  decodeKStreamPayload(src?: string): TelegramStreamPayload | null;
  findKAudioSource(element: Element, audioButton: Element | null,
    audioNodes: NodeListOf<HTMLAudioElement>): string;
  waitForContainerAudioSrc(container: Element, timeout?: number): Promise<string>;
  waitForAudioPreload(timeout?: number, interval?: number): Promise<boolean>;
  markFallbackTarget(element: Element | null): string;
}

/** File metadata returned by Web K's `/k/stream` descriptor. */
interface TelegramStreamPayload {
  location?: {id?: string | number};
  fileName?: string;
  [key: string]: unknown;
}

interface TelegramDownloaderDownloads {
  attachDownloadProgressListener(container: HTMLElement | null, progressId: string): () => void;
  waitForDownloadDone(ids: string | string[], timeout?: number): Promise<boolean>;
  triggerEvent(eventType: 'single' | 'batch', downloadUrl: string,
    itemIndex: number | string, mediaType: 'image' | 'img' | 'video' | 'music',
    container: Element | null, mediaMeta?: TelegramDownloadRequestOptions): Promise<boolean>;
}

interface TelegramDownloaderViewer {
  disPatchClick(dom: Element): void;
  getKViewerClickTarget(element: Element): Element;
  getKViewerMedia(tabType: string, expectedType?: string): TelegramViewerMedia;
  waitForKViewerSource(tabType: string, expectedType?: string,
    timeout?: number): Promise<TelegramViewerMedia>;
  isVisibleNode(node: Element | null): boolean;
  isKViewerOpen(tabType?: string): boolean;
  waitForKViewerClosed(tabType?: string, timeout?: number): Promise<boolean>;
  isPreviewCloseButton(btn: Element | null): boolean;
  closeKViewer(tabType?: string): Promise<boolean>;
}

interface TelegramDownloaderAlbums {
  handleAlbumItem(checkbox: HTMLInputElement, index: number,
    container: Element): Promise<boolean>;
  mediaDownload(id: string | number, container: Element,
    mediaItem?: Element | null): Promise<boolean>;
}

interface TelegramDownloaderChat {
  handleDownload(container: HTMLElement, element: Element | null,
    type: 'music' | 'img' | 'video', index: number): Promise<void>;
  initialButtonsDownload(): void;
}

interface TelegramDownloaderSidebar {
  initialInfoButtonsDownload(): Promise<void>;
  scheduleInfoButtonsDownload(): void;
}

/** Namespace completed in manifest order before the entrypoint starts. */
interface TelegramDownloaderNamespace {
  state: {maxProgress: number};
  locales: TelegramTranslations | null;
  i18: {t(key: string): string};
  started: boolean;
  ui: TelegramDownloaderUI;
  utils: TelegramDownloaderUtils;
  downloads: TelegramDownloaderDownloads;
  viewer: TelegramDownloaderViewer;
  albums: TelegramDownloaderAlbums;
  chat: TelegramDownloaderChat;
  sidebar: TelegramDownloaderSidebar;
}

declare var TelegramLocalDownloader: TelegramDownloaderNamespace;

/** Telegram Web K private worker proxy structures. */
interface TelegramWebKDocumentAttribute {
  _: string;
  file_name?: string;
  w?: number;
  h?: number;
}
interface TelegramWebKDocument {
  _: string;
  id: string | number;
  dc_id?: number;
  size?: number;
  mime_type?: string;
  file_name?: string;
  access_hash?: string;
  file_reference?: unknown;
  attributes?: TelegramWebKDocumentAttribute[];
}
interface TelegramWebKPhotoSize {
  _: string;
  type?: string;
  w?: number;
  h?: number;
  size?: number;
  sizes?: number[];
}
interface TelegramWebKPhoto {
  _: string;
  id: string | number;
  sizes: TelegramWebKPhotoSize[];
}
interface TelegramWebKMessageMedia {
  photo?: TelegramWebKPhoto;
  document?: TelegramWebKDocument;
  alt_documents?: TelegramWebKDocument[];
  webpage?: {
    photo?: TelegramWebKPhoto;
    document?: TelegramWebKDocument;
  };
}
interface TelegramWebKMessage {
  id?: string | number;
  media?: TelegramWebKMessageMedia;
}
interface TelegramWebKManagers {
  appMessagesManager?: {
    getMessageByPeer(pid: number, mid: number): Promise<TelegramWebKMessage | null>;
  };
  apiFileManager?: {
    downloadMediaURL(options: {media: TelegramWebKPhoto | TelegramWebKDocument;
      thumb?: TelegramWebKPhotoSize}): Promise<string>;
  };
  appDocsManager?: {
    getAltDocsByDocument(id: string | number): Promise<TelegramWebKDocument[]> | TelegramWebKDocument[] | undefined;
  };
}

interface Window {
  /** Prevents duplicate registration of the MAIN-world downloader. */
  __tvdInjectLoaded?: boolean;
  /** Unstable Telegram Web K internals; not present before startup. */
  rootScope?: {managers?: TelegramWebKManagers};
}
