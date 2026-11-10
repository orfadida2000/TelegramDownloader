/**
 * @fileoverview Isolated-world smoke tests for module load order and API wiring.
 * No browser or external dependencies required: node --test tests/content.test.cjs
 */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const base = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(base, 'manifest.json'), 'utf8'));

test('every manifest asset exists and content scripts are registered in order', () => {
  for (const script of manifest.content_scripts[0].js) {
    assert.equal(fs.existsSync(path.join(base, script)), true, `Missing ${script}`);
  }
  for (const css of manifest.content_scripts[0].css) {
    assert.equal(fs.existsSync(path.join(base, css)), true, `Missing ${css}`);
  }
  assert.equal(manifest.content_scripts[0].js.at(0), 'js/content/core.js');
  assert.equal(manifest.content_scripts[0].js.at(-1), 'js/content/main.js');
  assert.ok(manifest.web_accessible_resources[0].resources.includes('js/telegram-contextScript.js'));
});

test('all content modules load without their old Webpack/Vue runtime', () => {
  const attributes = new Map();
  const scripts = [];
  const element = {
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementsByClassName: () => [],
    getAttribute: key => attributes.get(key) || null,
    setAttribute: (key, value) => attributes.set(key, value),
    contains: () => false,
    appendChild: node => scripts.push(node),
    addEventListener() {},
    classList: {contains: () => false}
  };
  const context = vm.createContext({
    window: {
      setInterval() {}, setTimeout() {}, clearTimeout() {}
    },
    document: {
      body: element, head: element, documentElement: element,
      querySelector: () => null, querySelectorAll: () => [],
      getElementById: () => null,
      createElement: type => ({...element, style: {}, type})
    },
    navigator: {language: 'he-IL'},
    chrome: {runtime: {getURL: value => `chrome-extension://mock/${value}`}},
    MutationObserver: class {observe() {}},
    crypto: {randomUUID: () => 'mock-uuid'},
    console,
    setTimeout() {}, setInterval() {}, clearTimeout() {}
  });
  for (const filename of manifest.content_scripts[0].js) {
    const code = fs.readFileSync(path.join(base, filename), 'utf8');
    vm.runInContext(code, context, {filename});
  }
  const app = context.TelegramLocalDownloader;
  assert.equal(app.started, true);
  assert.equal(app.i18.t('dialog.butImg'), 'הורדת תמונה');
  assert.equal(typeof app.chat.initialButtonsDownload, 'function');
  assert.equal(typeof app.albums.handleAlbumItem, 'function');
  assert.equal(typeof app.downloads.triggerEvent, 'function');
  assert.equal(typeof app.sidebar.initialInfoButtonsDownload, 'function');
  assert.equal(scripts.length, 1, 'Exactly one page-world script should be injected');
  assert.equal(scripts[0].src, 'chrome-extension://mock/js/telegram-contextScript.js');
  // Re-run main; its namespace guard must suppress duplicate observers/scripts.
  vm.runInContext(fs.readFileSync(path.join(base, 'js/content/main.js'), 'utf8'), context);
  assert.equal(scripts.length, 1);
});

test('fallback locators are stable and do not replace Telegram message IDs', () => {
  const code = ['core.js', 'locales.js', 'utils.js']
    .map(name => fs.readFileSync(path.join(base, 'js/content', name), 'utf8'));
  const vmContext = vm.createContext({
    globalThis: {}, crypto: {randomUUID: () => 'stable-id'}, navigator: {language: 'en'}
  });
  for (const source of code) vm.runInContext(source, vmContext);
  const attrs = new Map([['data-mid', '5232']]);
  const node = {
    getAttribute: key => attrs.get(key) || null,
    setAttribute: (key, value) => attrs.set(key, value)
  };
  const mark = vmContext.globalThis.TelegramLocalDownloader.utils.markFallbackTarget;
  assert.equal(mark(node), '[data-tvd-fallback-id="stable-id"]');
  assert.equal(mark(node), '[data-tvd-fallback-id="stable-id"]');
  assert.equal(attrs.get('data-mid'), '5232');
});
