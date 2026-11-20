'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const ws = require('../src/main/workspace');

const PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'wa-'));
const tree = () => ({
  shelves: [{ id: 'shelf', n: 'Meus mundos' }], worlds: [
    { id: 'root-a', name: 'Aethelgard', par: '', sh: 'shelf', cv: { img: '' }, chars: [{ id: 'char-a', name: 'Ari', images: [] }], wiki: [{ id: 'wiki-a', t: 'Ari', b: '<a href="#lk-root-a-c-char-a">Ari</a>' }], stories: [{ id: 'story-a', arcs: [{ id: 'arc-a', chapters: [{ id: 'chapter-a', chars: ['char-a'] }] }] }] },
    { id: 'child-a', name: 'Capital', par: 'root-a', sh: 'shelf', chars: [{ id: 'char-b', name: 'Bia' }], rels: [{ id: 'rel-a', members: ['char-a', 'char-b'], pairs: { 'char-a|char-b': { d: 'Amigas' } } }] },
    { id: 'root-b', name: 'Slice of Life', par: '', sh: 'shelf', chars: [] }
  ]
});

test('putAsset grava cada imagem na pasta do projeto e não duplica', () => {
  const dir = tmp(), a = ws.putAsset(dir, 'root-a', PNG), b = ws.putAsset(dir, 'root-a', PNG);
  assert.match(a, /^worlds\/[a-f0-9]{16}\/assets\/[0-9a-f]{24}\.png$/);
  assert.equal(a, b);
  assert.equal(fs.readdirSync(path.join(dir, 'worlds', ws.folderForWorld('root-a'), 'assets')).length, 1);
});

test('putAsset recusa dados que não são imagem', () => {
  assert.throws(() => ws.putAsset(tmp(), 'root-a', 'data:text/html;base64,AAAA'));
});

test('writeData separa mundos principais e guarda os sub-mundos junto da árvore', () => {
  const dir = tmp(), state = tree();
  const rootImage = ws.putAsset(dir, 'root-a', PNG);
  state.worlds[0].cv.img = rootImage;
  ws.writeData(dir, JSON.stringify(state));
  const index = JSON.parse(fs.readFileSync(path.join(dir, 'world-atelier.json'), 'utf8'));
  assert.equal(index.format, ws.INDEX_FORMAT);
  assert.equal(index.projects.length, 2);
  const projectDir = path.join(dir, 'worlds', ws.folderForWorld('root-a'));
  const project = JSON.parse(fs.readFileSync(path.join(projectDir, 'world.json'), 'utf8'));
  assert.deepEqual(project.worlds.map(w => w.id), ['root-a', 'child-a']);
  assert.equal(project.worlds[0].cv.img, `worlds/${ws.folderForWorld('root-a')}/assets/${path.basename(rootImage)}`);
  const loaded = JSON.parse(ws.readData(dir));
  assert.equal(loaded.worlds.length, 3);
  assert.equal(loaded.worlds.find(w => w.id === 'child-a').par, 'root-a');
});

test('migra automaticamente o JSON monolítico antigo, inclusive as imagens', () => {
  const dir = tmp();
  const oldImage = ws.putAsset(dir, PNG); // cria assets/ legado
  const legacy = { shelves: [{ id: 's', n: 'Coleção' }], worlds: [
    { id: 'legacy-root', name: 'Antigo', par: '', sh: 's', cv: { img: oldImage }, chars: [] },
    { id: 'legacy-child', name: 'Filho', par: 'legacy-root', sh: 's', chars: [] }
  ] };
  fs.writeFileSync(path.join(dir, 'world-atelier.json'), JSON.stringify(legacy));
  const migrated = JSON.parse(ws.readData(dir));
  assert.equal(migrated.worlds.length, 2);
  assert.match(migrated.worlds[0].cv.img, /^worlds\/[a-f0-9]{16}\/assets\//);
  assert.ok(fs.existsSync(ws.assetPath(dir, migrated.worlds[0].cv.img)));
  assert.equal(JSON.parse(fs.readFileSync(path.join(dir, 'world-atelier.json'), 'utf8')).format, ws.INDEX_FORMAT);
  assert.ok(ws.listBackups(dir).length >= 1, 'o JSON monolítico antigo fica preservado no backup');
});

test('writeData valida JSON antes de substituir o índice', () => {
  const dir = tmp(); ws.writeData(dir, JSON.stringify(tree()));
  const before = ws.readData(dir);
  assert.throws(() => ws.writeData(dir, '{quebrado'));
  assert.equal(ws.readData(dir), before);
});

test('assetPath só aceita assets dentro das pastas esperadas', () => {
  const dir = tmp();
  assert.ok(ws.assetPath(dir, `worlds/${ws.folderForWorld('root-a')}/assets/abc.png`));
  assert.ok(ws.assetPath(dir, 'assets/abc.png'));
  assert.equal(ws.assetPath(dir, 'assets/../world-atelier.json'), null);
  assert.equal(ws.assetPath(dir, '../etc/passwd'), null);
  assert.equal(ws.assetPath(null, 'assets/a.png'), null);
});

test('cleanupAssets move imagens sem uso preservando a pasta relativa', () => {
  const dir = tmp(), used = ws.putAsset(dir, 'root-a', PNG);
  const unused = path.join(dir, 'worlds', ws.folderForWorld('root-a'), 'assets', 'unused.png');
  fs.writeFileSync(unused, 'x');
  const r = ws.cleanupAssets(dir, [used]);
  assert.equal(r.removed, 1);
  assert.ok(fs.existsSync(ws.assetPath(dir, used)));
  assert.ok(fs.existsSync(path.join(dir, 'backups', 'imagens-sem-uso', ...unused.slice(dir.length + 1).split(path.sep))));
});

test('copyWorkspace copia índice, projetos e assets', () => {
  const a = tmp(), b = tmp(), state = tree();
  const image = ws.putAsset(a, 'root-a', PNG); state.worlds[0].cv.img = image;
  ws.writeData(a, JSON.stringify(state)); ws.copyWorkspace(a, b);
  assert.ok(ws.hasData(b));
  assert.equal(JSON.parse(ws.readData(b)).worlds.length, 3);
  assert.ok(fs.existsSync(ws.assetPath(b, image)));
});

test('exporta um mundo com todos os sub-mundos e assets e importa sem substituir outros projetos', () => {
  const source = tmp(), destination = tmp(), state = tree();
  const image = ws.putAsset(source, 'root-a', PNG); state.worlds[0].cv.img = image;
  ws.writeData(source, JSON.stringify(state));
  const archive = path.join(source, 'Aethelgard.worldatelier');
  const exp = ws.exportProject(source, 'root-a', archive);
  assert.equal(exp.worlds, 2); assert.equal(exp.assets, 1);
  const first = ws.importProject(destination, archive);
  assert.equal(first.worlds, 2); assert.equal(first.assets, 1);
  const imported = JSON.parse(ws.readData(destination));
  assert.equal(imported.worlds.length, 2);
  const importedRoot = imported.worlds.find(w => !w.par);
  assert.equal(importedRoot.name, 'Aethelgard');
  assert.equal(imported.worlds.find(w => w.name === 'Capital').par, importedRoot.id);
  assert.ok(fs.existsSync(ws.assetPath(destination, importedRoot.cv.img)));
  // Importar o mesmo arquivo outra vez cria uma cópia com novos IDs, não sobrescreve a primeira.
  const second = ws.importProject(destination, archive);
  const after = JSON.parse(ws.readData(destination));
  assert.equal(after.worlds.length, 4);
  assert.notEqual(second.id, first.id);
  const secondTree = after.worlds.filter(w => w.id === second.id || w.par === second.id);
  const secondRoot = secondTree.find(w => w.id === second.id);
  const secondChild = secondTree.find(w => w.par === second.id);
  const remappedCharA = secondRoot.chars[0].id, remappedCharB = secondChild.chars[0].id;
  assert.notEqual(remappedCharA, 'char-a');
  assert.deepEqual(secondRoot.stories[0].arcs[0].chapters[0].chars, [remappedCharA]);
  assert.deepEqual(secondChild.rels[0].members, [remappedCharA, remappedCharB]);
  assert.ok(secondChild.rels[0].pairs[`${remappedCharA}|${remappedCharB}`]);
  assert.ok(secondRoot.wiki[0].b.includes(`#lk-${second.id}-c-${remappedCharA}`));
});


test('projetos removidos são arquivados em vez de apagados permanentemente', () => {
  const dir = tmp(), state = { shelves: [{ id: 's', n: 'S' }], worlds: [{ id: 'to-delete', name: 'Antigo', par: '', sh: 's', chars: [] }] };
  ws.writeData(dir, JSON.stringify(state));
  const folder = path.join(dir, 'worlds', ws.folderForWorld('to-delete'));
  assert.ok(fs.existsSync(folder));
  ws.writeData(dir, JSON.stringify({ shelves: state.shelves, worlds: [] }));
  assert.ok(!fs.existsSync(folder));
  const archived = path.join(dir, 'backups', 'deleted-worlds');
  assert.equal(fs.readdirSync(archived).length, 1);
});

test('ZIP de projeto rejeita caminho com traversal', () => {
  const archive = ws.makeZip([{ name: '../escape.txt', data: 'x' }]);
  assert.throws(() => ws.extractZip(archive), /inseguro/i);
});
