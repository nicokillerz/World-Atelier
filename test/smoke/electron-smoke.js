'use strict';
// Teste de fumaça com o Electron de verdade (não faz parte do `npm test`).
// Uso:  npx electron test/smoke/electron-smoke.js   (no Linux sem tela: xvfb-run -a npx electron --no-sandbox ...)
const { app, BrowserWindow } = require('electron');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'wa-smoke-'));
const dataDir = path.join(tmp, 'dados');
process.env.WA_WORKSPACE = dataDir;
app.setPath('userData', path.join(tmp, 'perfil'));
require('../../src/main/main.js');

const PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const fail = (m) => { console.error('FALHOU:', m); app.exit(1); };

app.on('browser-window-created', (_e, win) => {
  win.webContents.on('console-message', (_ev, ...a) => { const m = a[0].message || a[2]; if (/error|erro/i.test(String(m))) console.log('[renderer]', m); });
  win.webContents.once('did-finish-load', async () => {
    try {
      const js = (c) => win.webContents.executeJavaScript(c);
      await wait(500);
      console.log('desktop bridge:', await js('typeof window.atelier'), '| STORE.desktop:', await js('STORE.desktop'));
      console.log('overlay de boas-vindas visível?', await js("!!document.querySelector('.dk-ov')"));
      await js(`(()=>{document.querySelector('[data-act="newW"]').click();document.querySelector('[data-act="createWorld"]').click();W().cv.img=${JSON.stringify(PNG)};save();render();})()`);
      await wait(1200);
      const index = JSON.parse(fs.readFileSync(path.join(dataDir, 'world-atelier.json'), 'utf8'));
      const project = index.projects[0];
      const projectDir = path.join(dataDir, 'worlds', project.folder);
      const json = fs.readFileSync(path.join(projectDir, 'world.json'), 'utf8');
      const assets = fs.readdirSync(path.join(projectDir, 'assets'));
      console.log('Índice com projetos:', index.projects.length, '| JSON do projeto sem imagem embutida:', !json.includes('data:image'), '| assets:', assets);
      // a imagem é servida pelo protocolo atelier:// e carrega no <img>
      const ok = await js(`new Promise(r=>{const i=new Image();i.onload=()=>r(i.naturalWidth);i.onerror=()=>r(-1);i.src=W().cv.img})`);
      console.log('imagem carregada via atelier://:', ok === 1 ? 'sim' : 'NÃO (' + ok + ')');
      // canvas não pode ficar "tainted" (necessário para extrair paleta de cores)
      const taint = await js(`(()=>{try{const c=document.createElement('canvas');c.width=c.height=1;const x=c.getContext('2d');const i=new Image();return new Promise(r=>{i.onload=()=>{try{x.drawImage(i,0,0);x.getImageData(0,0,1,1);r('ok')}catch(e){r('tainted')}};i.src=W().cv.img})}catch(e){return 'erro'}})()`);
      console.log('canvas com imagem do workspace:', taint);
      console.log('fonte local carregada:', await js("document.fonts.check(\"16px 'Cinzel'\")"));
      if (!json || json.includes('data:image') || assets.length !== 1 || ok !== 1 || index.projects.length !== 1) return fail('verificações básicas');
      console.log('SMOKE OK'); app.exit(0);
    } catch (e) { fail(e.stack || e); }
  });
});
setTimeout(() => fail('tempo esgotado'), 40000);
