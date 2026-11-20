'use strict';
// Testa o storage.js do desktop: imagens são extraídas para assets de cada projeto.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const ws = require('../src/main/workspace');

const PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
const SRC = fs.readFileSync(path.join(__dirname, '../src/renderer/storage.js'), 'utf8');
function boot(dir) {
  const atelier = {
    assetBase: 'atelier://app/@ws/', loadSync: () => ws.readData(dir),
    writeData: async (j) => ws.writeData(dir, j),
    putAsset: async (projectId, u) => ws.putAsset(dir, projectId, u), onFlush() {}
  };
  const win = { atelier, setTimeout, clearTimeout, console }; win.window = win;
  vm.runInNewContext(SRC, win); return win.STORE;
}

test('desktop: extrai imagens para a pasta do mundo principal e relê com URLs', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'wa-')); let store = boot(dir);
  const S = { shelves: [{ id: 's', n: 'Coleção' }], worlds: [
    { id: 'root', name: 'Raiz', cv: { img: PNG }, chars: [{ id: 'c1', images: [{ src: PNG }] }] },
    { id: 'child', name: 'Filho', par: 'root', chars: [{ id: 'c2', images: [{ src: PNG }] }] },
    { id: 'other', name: 'Outro', cv: { img: PNG }, chars: [] }
  ] };
  store.save(() => S); await new Promise(r => setTimeout(r, 450)); await store.flush();
  const loaded = JSON.parse(ws.readData(dir));
  assert.equal(loaded.worlds.length, 3);
  assert.ok(!JSON.stringify(loaded).includes('data:image'));
  const rootRel = loaded.worlds[0].cv.img;
  const otherRel = loaded.worlds[2].cv.img;
  assert.match(rootRel, /^worlds\/[a-f0-9]{16}\/assets\/[0-9a-f]{24}\.png$/);
  assert.notEqual(rootRel, otherRel, 'projetos independentes têm pastas de assets independentes');
  assert.ok(fs.existsSync(ws.assetPath(dir, rootRel)));
  assert.ok(fs.existsSync(ws.assetPath(dir, otherRel)));
  assert.equal(fs.readdirSync(path.dirname(ws.assetPath(dir, rootRel))).length, 1);
  store = boot(dir); const S2 = store.load();
  assert.ok(S2.worlds[0].cv.img.startsWith('atelier://app/@ws/worlds/'));
  assert.ok(S2.worlds[1].chars[0].images[0].src.startsWith('atelier://app/@ws/worlds/'));
});

test('desktop: referenced() lista imagens dos projetos em uso', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'wa-')), store = boot(dir);
  const S = { worlds: [{ id: 'w', cv: { img: PNG } }] };
  store.save(() => S); await store.flush();
  assert.equal(store.referenced().length, 1);
});
