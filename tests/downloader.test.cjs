/**
 * @fileoverview Zero-dependency contract tests for the page-world downloader.
 * Run with: node --test tests/downloader.test.cjs
 * Uses synthetic Telegram manager proxies and DOM events; does not require login.
 */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '..', 'js/telegram-contextScript.js'), 'utf8');

/** @param {Object} opts @returns {Object} */
function harness(opts = {}) {
  const handlers = new Map();
  const saved = [];
  const refs = new Map();
  let reference = 0;
  let clicks = 0;
  const location = {origin: 'https://web.telegram.org'};
  const base = {
    style: {},
    setAttribute(name, value) { this[name] = value; },
    getAttribute(name) { return this[name] || null; },
    appendChild() {},
    remove() {},
    querySelector() { return null; },
    querySelectorAll() { return []; },
    closest() { return null; },
    classList: {contains() { return false; }}
  };
  const document = {
    documentElement: Object.create(base),
    body: Object.create(base),
    querySelector: selector => opts.querySelector?.(selector) || null,
    createElement: tag => {
      if (tag !== 'a') return Object.create(base);
      const anchor = Object.assign(Object.create(base), {
        click() {saved.push({name: this.download, blob: refs.get(this.href)});}
      });
      return anchor;
    },
    addEventListener(type, handler) {
      if (!handlers.has(type)) handlers.set(type, []);
      handlers.get(type).push(handler);
    },
    dispatchEvent(event) {
      for (const handler of handlers.get(event.type) || []) handler(event);
      return true;
    }
  };
  const timers = [];
  const url = class extends URL {};
  url.createObjectURL = blob => {
    const ref = `blob:https://web.telegram.org/generated-${++reference}`;
    refs.set(ref, blob);
    return ref;
  };
  url.revokeObjectURL = ref => refs.delete(ref);
  const window = {
    location,
    rootScope: {managers: opts.managers || {}},
    setTimeout: fn => {timers.push(fn); return timers.length;},
  };
  const context = vm.createContext({
    window, document, URL: url, Response, Blob, CustomEvent, AbortController,
    MouseEvent: class {constructor(type) {this.type = type;}},
    console: {warn() {}, error() {}},
    fetch: opts.fetch || (async () => {throw Error('Unexpected fetch');}),
    getComputedStyle: () => ({display: 'block'}),
    setTimeout: (fn) => {timers.push(fn); return timers.length;}
  });
  vm.runInContext(source, context);
  /** @param {Object} media @returns {Promise<boolean>} */
  function request(media) {
    return new Promise(resolve => {
      const id = media.request_id;
      document.addEventListener('tvd_download_done', e => {
        if (e.detail.request_id === id) resolve(e.detail.ok);
      });
      document.dispatchEvent(new CustomEvent('tvd_media_download', {
        detail: {type: 'single', media}
      }));
    });
  }
  return {request, saved, document, window, refs, timers, get clicks() {return clicks;}};
}

function documentData(id, name = 'original.mp4') {
  return {id, dc_id: 2, access_hash: 'access', file_reference: 'reference',
    size: 4, mime_type: 'video/mp4', file_name: name,
    attributes: [{_: 'documentAttributeVideo', w: 1920, h: 1080}]};
}

function rangeResponse(data, from = 0, total = data.length, mime = 'video/mp4') {
  const bytes = data.slice(from, Math.min(from + 1024 * 1024, data.length));
  return new Response(bytes, {status: 206, headers: {
    'Content-Range': `bytes ${from}-${from + bytes.length - 1}/${total}`,
    'Content-Type': mime
  }});
}

test('requests the largest Telegram photo variant without opening viewer', async () => {
  const photo = {_: 'photo', id: 20, sizes: [
    {_: 'photoSize', type: 'y', w: 1280, h: 853, size: 350000},
    {_: 'photoSize', type: 'w', w: 2560, h: 1706, size: 1000000}
  ]};
  let requestedSize;
  const managers = {
    appMessagesManager: {getMessageByPeer: async () => ({id: 123, media: {photo}})},
    apiFileManager: {downloadMediaURL: async ({thumb}) => {
      requestedSize = thumb;
      return 'blob:https://web.telegram.org/full';
    }}
  };
  const app = harness({managers, fetch: async () => new Response(new Uint8Array([1,2,3]), {
    headers: {'Content-Type': 'image/jpeg', 'Content-Length': '3'}
  })});
  const ok = await app.request({request_id: 'photo', type: 'image', pid: '-45', mid: '123'});
  assert.equal(ok, true);
  assert.equal(requestedSize.w, 2560);
  assert.equal(app.saved.length, 1);
  assert.equal(app.saved[0].name, 'photo_123.jpg');
  assert.deepEqual([...new Uint8Array(await app.saved[0].blob.arrayBuffer())], [1,2,3]);
});

test('prefers original uploaded video even when alternatives have equal resolution', async () => {
  const primary = documentData('original');
  const alt = {...documentData('transcoded', 'alternative.mp4'), size: 2};
  const fetched = [];
  const managers = {appMessagesManager: {getMessageByPeer: async () => ({
    id: 12, media: {document: primary, alt_documents: [alt]}
  })}};
  const app = harness({managers, fetch: async url => {
    const id = JSON.parse(decodeURIComponent(String(url).split('/').at(-1))).location.id;
    fetched.push(id);
    return rangeResponse(Uint8Array.of(9,8,7,6));
  }});
  const ok = await app.request({request_id: 'video', type: 'video', pid: '-45', mid: '12'});
  assert.equal(ok, true);
  assert.deepEqual(fetched, ['original']);
  assert.equal(app.saved[0].name, 'original.mp4');
});

test('tries the alternate document if fetching the original actually fails', async () => {
  const primary = documentData('original');
  const alt = documentData('transcoded', 'alternative.mp4');
  const fetched = [];
  const managers = {appMessagesManager: {getMessageByPeer: async () => ({
    media: {document: primary, alt_documents: [alt]}
  })}};
  const app = harness({managers, fetch: async url => {
    const id = JSON.parse(decodeURIComponent(String(url).split('/').at(-1))).location.id;
    fetched.push(id);
    if (id === 'original') return new Response('Forbidden', {status: 403});
    return rangeResponse(Uint8Array.of(4,5,6,7));
  }});
  assert.equal(await app.request({request_id:'retry', type:'video', pid:'-45', mid:'12'}), true);
  assert.deepEqual(fetched, ['original', 'transcoded']);
  assert.equal(app.saved[0].name, 'alternative.mp4');
});

test('reassembles every verified byte-range segment, in order', async () => {
  const bytes = new Uint8Array(2 * 1024 * 1024 + 17);
  for (let i = 0; i < bytes.length; i++) bytes[i] = i % 251;
  const offsets = [];
  const app = harness({fetch: async (_, config) => {
    const start = Number(config.headers.Range.match(/bytes=(\d+)-/)[1]);
    offsets.push(start);
    return rangeResponse(bytes, start, bytes.length);
  }});
  const request = {request_id:'ranges', type:'video', media_url:'https://web.telegram.org/k/stream/test'};
  assert.equal(await app.request(request), true);
  assert.deepEqual(offsets, [0, 1024 * 1024, 2 * 1024 * 1024]);
  const result = new Uint8Array(await app.saved[0].blob.arrayBuffer());
  assert.deepEqual(result, bytes);
});

test('rejects a truncated HTTP 206 response instead of saving corrupt data', async () => {
  const app = harness({fetch: async () => new Response(Uint8Array.of(1,2), {
    status:206, headers: {'Content-Range':'bytes 0-3/4','Content-Type':'video/mp4'}
  })});
  assert.equal(await app.request({request_id:'bad', type:'video',
    media_url:'https://web.telegram.org/k/stream/test'}), false);
  assert.equal(app.saved.length, 0);
});

test('does not fetch an arbitrary external URL supplied through the event', async () => {
  let called = false;
  const app = harness({fetch: async () => {called = true; throw Error('Must not fetch');}});
  assert.equal(await app.request({request_id:'external', type:'video',
    media_url:'https://example.org/bad.mp4'}), false);
  assert.equal(called, false);
});
