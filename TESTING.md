# Manual regression checklist

These tests must be completed in a signed-in Chrome session at `https://web.telegram.org/k/`. Automated unit tests do **not** substitute for this integration validation.

## Installation / startup

- Load the unpacked directory and reload Telegram Web K.
- Confirm the console has no JavaScript exceptions and no missing script/CSS/resource loads.
- Confirm the page-world script is loaded once (`data-tvd-page-inject="1"` on `document.documentElement`).
- Navigate between chats and open/close the media sidebar. Confirm there are no duplicate download buttons.
- Check Hebrew, English, and Chinese UI text under corresponding browser locales.

## Chat media

- Send a 5184 × 3456 PNG **as a photo**, and before manually opening the viewer, download it with the extension. Inspect the saved image: the largest stored Web K variant (for the reference case 2560 × 1706 JPEG), not the initial 1280 × 853 bubble preview, is expected.
- Send the same PNG **as a document**. Verify Telegram's normal file download retains PNG format and original dimensions; do not assume the extension already adds a generic document button.
- Send single MP4, WebM, and audio samples; confirm correct bytes, MIME/extension, and expected playback.
- Send an album with mixed photos and videos. Download its items and verify no unnecessary video-viewer flashing when direct document resolution succeeds.
- Confirm each album item's **own** message ID is used. Look for cross-item duplicates, incorrect files, or incorrectly reused preview URLs.
- Test photo/video messages with captions and messages without text.

## Sidebar and stories

- Test sidebar photo, video, month selection, and bulk downloads, including content with only thumbnails initially loaded.
- Test story downloads with story viewer already open and with viewer closed.

## Failure paths

- Disconnect the network during a download. Verify no truncated/partial output is falsely reported as completed; UI recovers from failure.
- Trigger a duplicate download while the first request is running. Confirm duplicate locking and eventual release.
- Attempt to download a large media file and confirm progress updates keep the inactivity watchdog alive.
- Test an unavailable original document that has a valid alternative quality, confirming fallback selects the alternative only after original fetch fails.
- Confirm a manually open media viewer is not unexpectedly closed by the downloader.

## Report a failure

Collect the media type and sending mode, whether the item is standalone/album/sidebar/story, the peer ID and message ID if available, the extension console message, the downloaded filename/MIME/dimensions, and the relevant DOM structure. Do **not** share authentication credentials, access hashes, or private URLs.
