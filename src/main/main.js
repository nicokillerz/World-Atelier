'use strict';
/**
 * Processo principal do World Atelier (Electron).
 * - Abre a janela e serve a interface pelo protocolo seguro atelier://app/
 * - Serve imagens de projetos em atelier://app/@ws/worlds/<hash>/assets/...
 * - Lê/grava os dados na pasta escolhida pelo usuário (veja workspace.js)
 */
const { app, BrowserWindow, ipcMain, dialog, shell, protocol, net } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const { pathToFileURL } = require('node:url');
const pkg = require('../../package.json');
const ws = require('./workspace');
const { createConfig } = require('./config');
const { buildMenu } = require('./menu');

const RENDERER_DIR = path.join(__dirname, '..', 'renderer');
const CSP = "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-src 'none'";
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.avif': 'image/avif', '.bmp': 'image/bmp', '.svg': 'image/svg+xml'
};

protocol.registerSchemesAsPrivileged([
  { scheme: 'atelier', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true, stream: true } }
]);

let win = null;
let config = null;
let workspaceDir = null;
let appLanguage = 'pt-BR';

if (!app.requestSingleInstanceLock()) app.quit();
app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });

const trusted = (e) => !!e.senderFrame && e.senderFrame.url.startsWith('atelier://app/');
const defaultDir = () => path.join(app.getPath('documents'), 'World Atelier');

function initWorkspace() {
  // WA_WORKSPACE: variável de ambiente opcional (testes / uso avançado). Sobrepõe a configuração.
  const dir = process.env.WA_WORKSPACE || config.get('workspace');
  if (dir) {
    try { ws.ensureLayout(dir); workspaceDir = dir; } catch (e) { console.error('Pasta de dados inacessível:', e.message); workspaceDir = null; }
  }
}

async function serveFile(full, extraHeaders = {}) {
  const res = await net.fetch(pathToFileURL(full).toString());
  const headers = new Headers(res.headers);
  headers.set('content-type', MIME[path.extname(full).toLowerCase()] || 'application/octet-stream');
  for (const [k, v] of Object.entries(extraHeaders)) headers.set(k, v);
  return new Response(res.body, { status: res.status, headers });
}

function registerProtocol() {
  protocol.handle('atelier', async (req) => {
    try {
      const url = new URL(req.url);
      const pathname = decodeURIComponent(url.pathname);
      if (pathname.startsWith('/@ws/')) {
        const full = ws.assetPath(workspaceDir, pathname.slice(5));
        if (!full || !fs.existsSync(full)) return new Response('Not found', { status: 404 });
        return serveFile(full);
      }
      const rel = pathname === '/' ? 'index.html' : pathname.slice(1);
      const full = path.resolve(RENDERER_DIR, rel);
      if (!full.startsWith(RENDERER_DIR + path.sep) || !fs.existsSync(full)) return new Response('Not found', { status: 404 });
      return serveFile(full, rel === 'index.html' ? { 'Content-Security-Policy': CSP } : {});
    } catch (e) {
      return new Response(String(e.message), { status: 500 });
    }
  });
}

function registerIpc() {
  ipcMain.on('app:language', (e, language) => {
    if (!trusted(e) || !['pt-BR', 'en'].includes(language)) return;
    appLanguage = language;
    config.set('language', appLanguage);
    buildMenu(() => win, pkg.homepage, appLanguage || 'pt-BR');
  });

  const guard = (fn) => (e, ...a) => { if (!trusted(e)) throw new Error(appLanguage === 'en' ? 'Unauthorized origin.' : 'Origem não autorizada.'); return fn(e, ...a); };
  const t = (pt, en) => appLanguage === 'en' ? en : pt;

  ipcMain.on('ws:info', (e) => {
    e.returnValue = trusted(e) ? { workspace: workspaceDir, hasData: ws.hasData(workspaceDir), version: app.getVersion(), platform: process.platform, defaultDir: defaultDir(), language: appLanguage } : null;
  });
  ipcMain.on('data:loadSync', (e) => {
    try { e.returnValue = trusted(e) ? ws.readData(workspaceDir) : null; } catch (err) { console.error(err); e.returnValue = null; }
  });
  ipcMain.handle('data:write', guard((_e, json) => {
    if (!workspaceDir) throw new Error(t('Nenhuma pasta de dados escolhida.', 'No data folder has been selected.'));
    return ws.writeData(workspaceDir, json);
  }));
  ipcMain.handle('asset:put', guard((_e, projectId, dataUrl) => {
    if (!workspaceDir) throw new Error(t('Nenhuma pasta de dados escolhida.', 'No data folder has been selected.'));
    return ws.putAsset(workspaceDir, projectId, dataUrl);
  }));
  ipcMain.handle('assets:cleanup', guard((_e, refs) => {
    if (!workspaceDir) throw new Error(t('Nenhuma pasta de dados escolhida.', 'No data folder has been selected.'));
    return ws.cleanupAssets(workspaceDir, Array.isArray(refs) ? refs : []);
  }));
  ipcMain.handle('ws:default', guard(() => defaultDir()));
  ipcMain.handle('ws:pick', guard(async () => {
    const r = await dialog.showOpenDialog(win, {
      title: t('Escolha a pasta onde o World Atelier vai guardar seus dados', 'Choose the folder where World Atelier will store your data'),
      defaultPath: workspaceDir || app.getPath('documents'),
      properties: ['openDirectory', 'createDirectory']
    });
    if (r.canceled || !r.filePaths[0]) return null;
    return { path: r.filePaths[0], hasData: ws.hasData(r.filePaths[0]) };
  }));
  ipcMain.handle('ws:apply', guard((_e, { dir, copy }) => {
    ws.ensureLayout(dir);
    if (copy && workspaceDir && !ws.hasData(dir)) ws.copyWorkspace(workspaceDir, dir);
    workspaceDir = dir;
    config.set('workspace', dir);
    return { ok: true };
  }));
  ipcMain.handle('ws:open', guard(() => (workspaceDir ? shell.openPath(workspaceDir) : '')));
  ipcMain.handle('project:export', guard(async (_e, worldId) => {
    if (!workspaceDir) throw new Error(t('Nenhuma pasta de dados escolhida.', 'No data folder has been selected.'));
    const raw = ws.readData(workspaceDir);
    if (!raw) throw new Error(t('Não há dados para exportar.', 'There is no data to export.'));
    const state = JSON.parse(raw);
    const selected = state.worlds.find(w => String(w.id) === String(worldId));
    if (!selected) throw new Error(t('O mundo selecionado não foi encontrado.', 'The selected world could not be found.'));
    let root = selected, seen = new Set();
    while (root.par && !seen.has(String(root.id))) {
      seen.add(String(root.id));
      const parent = state.worlds.find(w => String(w.id) === String(root.par));
      if (!parent) break;
      root = parent;
    }
    const safeName = String(root.name || 'World Atelier').replace(/[<>:"/\\|?*\x00-\x1F]/g, '-').slice(0, 80);
    const result = await dialog.showSaveDialog(win, {
      title: t('Exportar mundo e todos os sub-mundos', 'Export world and all sub-worlds'),
      defaultPath: path.join(app.getPath('downloads'), `${safeName}.worldatelier`),
      filters: [{ name: t('Projeto World Atelier', 'World Atelier project'), extensions: ['worldatelier'] }]
    });
    if (result.canceled || !result.filePath) return { canceled: true };
    return ws.exportProject(workspaceDir, root.id, result.filePath);
  }));
  ipcMain.handle('project:import', guard(async () => {
    if (!workspaceDir) throw new Error(t('Nenhuma pasta de dados escolhida.', 'No data folder has been selected.'));
    const result = await dialog.showOpenDialog(win, {
      title: t('Importar um mundo do World Atelier', 'Import a World Atelier world'),
      defaultPath: app.getPath('downloads'),
      properties: ['openFile'],
      filters: [{ name: t('Projeto World Atelier', 'World Atelier project'), extensions: ['worldatelier'] }]
    });
    if (result.canceled || !result.filePaths[0]) return { canceled: true };
    return ws.importProject(workspaceDir, result.filePaths[0]);
  }));

  // Ao fechar: pede para a interface terminar de gravar e só então fecha.
  ipcMain.on('app:flushed', () => { if (win) { win.__flushed = true; win.close(); } });
}

function createWindow() {
  const iconPath = path.join(__dirname, '..', '..', 'build', 'icon.png');
  win = new BrowserWindow({
    width: 1360, height: 860, minWidth: 900, minHeight: 600,
    backgroundColor: '#0b0907', show: false, title: 'World Atelier',
    ...(fs.existsSync(iconPath) ? { icon: iconPath } : {}),
    webPreferences: {
      preload: path.join(__dirname, '..', 'preload', 'preload.js'),
      contextIsolation: true, nodeIntegration: false, sandbox: true, spellcheck: true
    }
  });
  win.once('ready-to-show', () => win.show());
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:\/\//.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('atelier://app/')) e.preventDefault(); });
  win.on('close', (e) => {
    if (win.__flushed || win.webContents.isDestroyed()) return;
    e.preventDefault();
    win.webContents.send('app:flush');
    setTimeout(() => { if (win) { win.__flushed = true; win.close(); } }, 5000); // segurança: nunca trava o fechamento
  });
  win.on('closed', () => { win = null; });
  win.loadURL('atelier://app/index.html');
}

app.whenReady().then(() => {
  config = createConfig(app.getPath('userData'));
  appLanguage = ['en', 'pt-BR'].includes(config.get('language')) ? config.get('language') : null;
  initWorkspace();
  registerProtocol();
  registerIpc();
  buildMenu(() => win, pkg.homepage, appLanguage || 'pt-BR');
  createWindow();
  app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) createWindow(); });
});
app.on('window-all-closed', () => app.quit());
