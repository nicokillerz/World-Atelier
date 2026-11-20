'use strict';
/** Ponte segura entre a interface (renderer) e o sistema de arquivos (main). Só expõe o necessário. */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('atelier', {
  isDesktop: true,
  assetBase: 'atelier://app/@ws/',
  info: () => ipcRenderer.sendSync('ws:info'),
  loadSync: () => ipcRenderer.sendSync('data:loadSync'),
  writeData: (json) => ipcRenderer.invoke('data:write', json),
  putAsset: (projectId, dataUrl) => ipcRenderer.invoke('asset:put', projectId, dataUrl),
  cleanupAssets: (refs) => ipcRenderer.invoke('assets:cleanup', refs),
  pickWorkspace: () => ipcRenderer.invoke('ws:pick'),
  defaultWorkspace: () => ipcRenderer.invoke('ws:default'),
  applyWorkspace: (dir, copy) => ipcRenderer.invoke('ws:apply', { dir, copy }),
  openWorkspace: () => ipcRenderer.invoke('ws:open'),
  exportProject: (worldId) => ipcRenderer.invoke('project:export', worldId),
  importProject: () => ipcRenderer.invoke('project:import'),
  setLanguage: (language) => ipcRenderer.send('app:language', language),
  onFlush: (cb) => ipcRenderer.on('app:flush', async () => {
    try { await cb(); } finally { ipcRenderer.send('app:flushed'); }
  }),
  onMenu: (cb) => ipcRenderer.on('menu', (_e, id) => cb(id))
});
