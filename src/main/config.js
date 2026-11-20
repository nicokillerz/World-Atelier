'use strict';
/** Configuração do app (guarda qual é a pasta de dados). Fica na pasta de perfil do usuário, não na pasta de dados. */
const fs = require('node:fs');
const path = require('node:path');

function createConfig(userDataDir) {
  const file = path.join(userDataDir, 'config.json');
  let cache = {};
  try { cache = JSON.parse(fs.readFileSync(file, 'utf8')); } catch { cache = {}; }
  return {
    get: (k) => cache[k],
    set(k, v) {
      cache[k] = v;
      fs.mkdirSync(userDataDir, { recursive: true });
      fs.writeFileSync(file + '.tmp', JSON.stringify(cache, null, 2));
      fs.renameSync(file + '.tmp', file);
    }
  };
}
module.exports = { createConfig };
