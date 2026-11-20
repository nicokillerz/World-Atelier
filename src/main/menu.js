'use strict';
const { Menu, shell, app } = require('electron');

function buildMenu(getWin, homepage, language = 'pt-BR') {
  const t = (pt, en) => language === 'en' ? en : pt;
  const send = (id) => () => getWin() && getWin().webContents.send('menu', id);
  const template = [
    { label: t('Arquivo', 'File'), submenu: [
      { label: t('Configurações…', 'Settings…'), accelerator: 'CmdOrCtrl+,', click: send('settings') },
      { label: t('Escolher pasta de dados…', 'Choose data folder…'), click: send('choose-workspace') },
      { label: t('Abrir pasta de dados', 'Open data folder'), click: send('open-workspace') },
      { type: 'separator' },
      { role: 'quit', label: t('Sair', 'Quit') }
    ] },
    { label: t('Editar', 'Edit'), submenu: [
      { role: 'undo', label: t('Desfazer', 'Undo') }, { role: 'redo', label: t('Refazer', 'Redo') }, { type: 'separator' },
      { role: 'cut', label: t('Recortar', 'Cut') }, { role: 'copy', label: t('Copiar', 'Copy') }, { role: 'paste', label: t('Colar', 'Paste') },
      { role: 'selectAll', label: t('Selecionar tudo', 'Select all') }
    ] },
    { label: t('Exibir', 'View'), submenu: [
      { role: 'resetZoom', label: t('Tamanho normal', 'Actual size') }, { role: 'zoomIn', label: t('Aumentar', 'Zoom in') }, { role: 'zoomOut', label: t('Diminuir', 'Zoom out') },
      { type: 'separator' }, { role: 'togglefullscreen', label: t('Tela cheia', 'Full screen') },
      ...(app.isPackaged ? [] : [{ type: 'separator' }, { role: 'reload' }, { role: 'toggleDevTools' }])
    ] },
    { label: t('Ajuda', 'Help'), submenu: [
      { label: t('Código-fonte no GitHub', 'Source code on GitHub'), click: () => shell.openExternal(homepage) }
    ] }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}
module.exports = { buildMenu };
