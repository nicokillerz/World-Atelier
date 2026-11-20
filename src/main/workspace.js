'use strict';
/**
 * Camada de arquivos do Workspace.
 * Cada mundo principal é salvo como um projeto independente em worlds/<hash>/.
 * A árvore completa de sub-mundos acompanha o projeto; cada projeto tem seus assets e backups.
 * O arquivo world-atelier.json passa a ser apenas o índice global (coleções + lista de projetos).
 * O formato antigo, com todos os mundos num único JSON, é migrado automaticamente na primeira leitura.
 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const zlib = require('node:zlib');

const DATA_FILE = 'world-atelier.json';
const PROJECTS_DIR = 'worlds';
const MAX_BACKUPS = 14;
const INDEX_FORMAT = 'world-atelier-workspace-v2';
const PROJECT_FORMAT = 'world-atelier-project-v1';
const EXT = {
  'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/png': 'png', 'image/webp': 'webp',
  'image/gif': 'gif', 'image/avif': 'avif', 'image/bmp': 'bmp', 'image/svg+xml': 'svg'
};
const DATA_URL = /^data:(image\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/=\s]+)$/i;
const ASSET_REL = /^(?:assets\/[\w.-]+|worlds\/[a-f0-9]{16}\/assets\/[\w.-]+)$/i;
const ASSET_REF = /(?:worlds\/[a-f0-9]{16}\/)?assets\/[\w.-]+/gi;
const join = (dir, ...a) => path.join(dir, ...a);
const stamp = (d = new Date()) => d.toISOString().slice(0, 10);
const uid = () => crypto.randomBytes(5).toString('hex');

function folderForWorld(id) {
  return crypto.createHash('sha256').update(String(id || '')).digest('hex').slice(0, 16);
}
function ensureLayout(dir) {
  if (typeof dir !== 'string' || !path.isAbsolute(dir)) throw new Error('Caminho de pasta inválido.');
  fs.mkdirSync(join(dir, PROJECTS_DIR), { recursive: true });
  fs.mkdirSync(join(dir, 'backups'), { recursive: true });
  const probe = join(dir, '.write-test'); fs.writeFileSync(probe, 'ok'); fs.rmSync(probe);
}
const hasData = (dir) => !!dir && fs.existsSync(join(dir, DATA_FILE));
function writeAtomic(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = file + '.tmp';
  fs.writeFileSync(tmp, content);
  fs.renameSync(tmp, file);
}
function listBackups(dir) {
  const d = join(dir, 'backups');
  if (!fs.existsSync(d)) return [];
  return fs.readdirSync(d).filter((f) => /^auto-\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort().reverse();
}
function keepDailyBackup(file, backupDir) {
  if (!fs.existsSync(file)) return;
  fs.mkdirSync(backupDir, { recursive: true });
  const bk = join(backupDir, `auto-${stamp()}.json`);
  if (!fs.existsSync(bk)) fs.copyFileSync(file, bk);
  const old = fs.readdirSync(backupDir).filter(f => /^auto-\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort().reverse().slice(MAX_BACKUPS);
  old.forEach(f => fs.rmSync(join(backupDir, f), { force: true }));
}
function parseJsonFile(file) {
  try { const value = JSON.parse(fs.readFileSync(file, 'utf8')); return value; } catch { return null; }
}

function groupWorlds(state) {
  const worlds = Array.isArray(state?.worlds) ? state.worlds : [];
  const byId = new Map(worlds.filter(w => w && w.id != null).map(w => [String(w.id), w]));
  const roots = new Map();
  for (const world of worlds) {
    let cur = world; const seen = new Set();
    while (cur?.par && byId.has(String(cur.par)) && !seen.has(String(cur.id))) {
      seen.add(String(cur.id));
      const parent = byId.get(String(cur.par));
      if (!parent || seen.has(String(parent.id))) break;
      cur = parent;
    }
    const rootId = String(cur?.id ?? world.id ?? uid());
    if (!roots.has(rootId)) roots.set(rootId, { root: cur || world, worlds: [] });
    roots.get(rootId).worlds.push(world);
  }
  return [...roots.values()];
}
function replaceAssetRefsInWorlds(worlds, dir, projectFolder) {
  const targetDir = join(dir, PROJECTS_DIR, projectFolder, 'assets');
  fs.mkdirSync(targetDir, { recursive: true });
  const seen = new Set();
  function visit(node) {
    if (!node || typeof node !== 'object') return;
    for (const key of Object.keys(node)) {
      const value = node[key];
      if (typeof value === 'string' && /(?:worlds\/[a-f0-9]{16}\/)?assets\/[\w.-]+/i.test(value)) {
        node[key] = value.replace(ASSET_REF, (ref) => {
          if (seen.has(ref)) return `worlds/${projectFolder}/assets/${path.posix.basename(ref)}`;
          seen.add(ref);
          const oldName = path.posix.basename(ref);
          const oldFile = ref.startsWith('worlds/') ? join(dir, ...ref.split('/')) : join(dir, 'assets', oldName);
          const newFile = join(targetDir, oldName);
          if (fs.existsSync(oldFile) && path.resolve(oldFile) !== path.resolve(newFile) && !fs.existsSync(newFile)) fs.copyFileSync(oldFile, newFile);
          // If a relative ref already points at another valid project folder, copy it into this project's assets.
          if (!fs.existsSync(newFile) && !ref.startsWith('worlds/')) {
            const legacy = join(dir, 'assets', oldName);
            if (fs.existsSync(legacy)) fs.copyFileSync(legacy, newFile);
          }
          return `worlds/${projectFolder}/assets/${oldName}`;
        });
      } else if (value && typeof value === 'object') visit(value);
    }
  }
  worlds.forEach(visit);
}

/** Grava índice global + um JSON independente por árvore de mundos. */
function writeData(dir, json) {
  if (typeof json !== 'string' || json.length < 2) throw new Error('Dados inválidos.');
  const state = JSON.parse(json);
  if (!state || typeof state !== 'object' || !Array.isArray(state.worlds)) throw new Error('O backup precisa conter uma lista de mundos.');
  ensureLayout(dir);
  const indexFile = join(dir, DATA_FILE);
  const previous = parseJsonFile(indexFile);
  const previousProjects = previous?.format === INDEX_FORMAT && Array.isArray(previous.projects) ? previous.projects : [];
  keepDailyBackup(indexFile, join(dir, 'backups'));

  const groups = groupWorlds(state);
  const projects = [];
  for (const group of groups) {
    const rootId = String(group.root.id);
    const folder = folderForWorld(rootId);
    const projectDir = join(dir, PROJECTS_DIR, folder);
    const projectFile = join(projectDir, 'world.json');
    keepDailyBackup(projectFile, join(projectDir, 'backups'));
    replaceAssetRefsInWorlds(group.worlds, dir, folder);
    const projectPayload = { format: PROJECT_FORMAT, rootId, worlds: group.worlds };
    writeAtomic(projectFile, JSON.stringify(projectPayload));
    projects.push({ id: rootId, folder, name: String(group.root.name || 'Sem nome'), shelf: String(group.root.sh || '') });
  }

  const meta = { ...state }; delete meta.worlds;
  const indexPayload = { format: INDEX_FORMAT, version: 2, meta, projects };
  writeAtomic(indexFile, JSON.stringify(indexPayload));

  // Projetos removidos do estado são arquivados, não apagados definitivamente.
  const current = new Set(projects.map(p => p.folder));
  const removed = previousProjects.filter(p => p?.folder && !current.has(p.folder));
  for (const p of removed) {
    const source = join(dir, PROJECTS_DIR, p.folder);
    if (!fs.existsSync(source)) continue;
    const destDir = join(dir, 'backups', 'deleted-worlds'); fs.mkdirSync(destDir, { recursive: true });
    const dest = join(destDir, `${p.folder}-${Date.now()}`);
    try { fs.renameSync(source, dest); } catch (e) { console.warn('Não foi possível arquivar o mundo removido:', e.message); }
  }
  return { bytes: Buffer.byteLength(json), projects: projects.length };
}

function restoreProject(projectDir) {
  const backupDir = join(projectDir, 'backups');
  if (!fs.existsSync(backupDir)) return null;
  const names = fs.readdirSync(backupDir).filter(f => /^auto-\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort().reverse();
  for (const name of names) {
    const file = join(backupDir, name), data = parseJsonFile(file);
    if (data?.format === PROJECT_FORMAT && Array.isArray(data.worlds)) return fs.readFileSync(file, 'utf8');
  }
  return null;
}
/** Lê o estado consolidado. O formato antigo é migrado automaticamente ao ser aberto. */
function readData(dir) {
  if (!dir) return null;
  const file = join(dir, DATA_FILE);
  if (!fs.existsSync(file)) return null;
  const payload = parseJsonFile(file);
  if (!payload) {
    const corrupt = join(dir, `world-atelier.corrompido-${Date.now()}.json`);
    try { fs.renameSync(file, corrupt); } catch {}
    for (const name of listBackups(dir)) {
      const backup = parseJsonFile(join(dir, 'backups', name));
      if (backup) { writeAtomic(file, JSON.stringify(backup)); return readData(dir); }
    }
    return null;
  }
  if (payload.format !== INDEX_FORMAT) {
    if (Array.isArray(payload.worlds)) {
      // Migração transparente do formato antigo monolítico. Imagens em assets/ são copiadas
      // para a pasta de cada projeto e seus caminhos são atualizados no mesmo processo.
      writeData(dir, JSON.stringify(payload));
      return readData(dir);
    }
    return null;
  }
  const state = { ...(payload.meta || {}), worlds: [] };
  for (const project of (payload.projects || [])) {
    if (!project || !/^[a-f0-9]{16}$/.test(project.folder || '')) continue;
    const projectDir = join(dir, PROJECTS_DIR, project.folder);
    const projectFile = join(projectDir, 'world.json');
    let content = parseJsonFile(projectFile);
    if (!content || content.format !== PROJECT_FORMAT || !Array.isArray(content.worlds)) {
      const restored = restoreProject(projectDir);
      if (restored) { writeAtomic(projectFile, restored); content = JSON.parse(restored); }
    }
    if (content?.format === PROJECT_FORMAT && Array.isArray(content.worlds)) state.worlds.push(...content.worlds);
  }
  return JSON.stringify(state);
}

/** Extrai data URL para o diretório de assets do projeto. */
function putAsset(dir, projectId, dataUrl) {
  if (dataUrl === undefined) { dataUrl = projectId; projectId = null; } // compatibilidade com API antiga
  const m = DATA_URL.exec(String(dataUrl));
  if (!m) throw new Error('Imagem inválida.');
  const ext = EXT[m[1].toLowerCase()];
  if (!ext) throw new Error('Formato de imagem não suportado: ' + m[1]);
  const buf = Buffer.from(m[2].replace(/\s/g, ''), 'base64');
  const name = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 24) + '.' + ext;
  ensureLayout(dir);
  const rel = projectId == null ? `assets/${name}` : `worlds/${folderForWorld(projectId)}/assets/${name}`;
  const file = join(dir, ...rel.split('/'));
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (!fs.existsSync(file)) fs.writeFileSync(file, buf);
  return rel;
}
/** Caminho absoluto seguro de um asset entregue pelo protocolo atelier://. */
function assetPath(dir, rel) {
  if (!dir || typeof rel !== 'string' || !ASSET_REL.test(rel)) return null;
  const full = path.resolve(dir, ...rel.split('/'));
  const base = path.resolve(dir, rel.startsWith('worlds/') ? join(dir, ...rel.split('/').slice(0, 3)) : join(dir, 'assets'));
  return full.startsWith(base + path.sep) ? full : null;
}
function cleanupAssets(dir, refs) {
  const used = new Set((refs || []).map(r => String(r).replace(/\\/g, '/')));
  const folders = [join(dir, 'assets')];
  const worldsDir = join(dir, PROJECTS_DIR);
  if (fs.existsSync(worldsDir)) for (const f of fs.readdirSync(worldsDir)) folders.push(join(worldsDir, f, 'assets'));
  const trash = join(dir, 'backups', 'imagens-sem-uso'); let removed = 0, bytes = 0;
  for (const folder of folders) {
    if (!fs.existsSync(folder)) continue;
    const prefix = path.relative(dir, folder).replace(/\\/g, '/');
    for (const fileName of fs.readdirSync(folder)) {
      const from = join(folder, fileName), rel = `${prefix}/${fileName}`;
      if (used.has(rel) || !fs.statSync(from).isFile()) continue;
      const dest = join(trash, ...rel.split('/')); fs.mkdirSync(path.dirname(dest), { recursive: true });
      bytes += fs.statSync(from).size; fs.renameSync(from, dest); removed++;
    }
  }
  return { removed, bytes };
}
function copyWorkspace(src, dst) {
  if (path.resolve(src) === path.resolve(dst)) return;
  ensureLayout(dst);
  if (fs.existsSync(src)) fs.cpSync(src, dst, { recursive: true, force: true });
}

/* ---------------------------- arquivo .worldatelier (ZIP seguro) */
let crcTable;
function crc32(buf) {
  if (!crcTable) { crcTable = new Uint32Array(256); for (let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?(0xedb88320^(c>>>1)):(c>>>1);crcTable[n]=c>>>0;} }
  let c=0xffffffff; for(const b of buf)c=crcTable[(c^b)&0xff]^(c>>>8); return (c^0xffffffff)>>>0;
}
function dosDateTime(d = new Date()) {
  const year=Math.max(1980,d.getFullYear());
  return { time:(d.getHours()<<11)|(d.getMinutes()<<5)|Math.floor(d.getSeconds()/2), date:((year-1980)<<9)|((d.getMonth()+1)<<5)|d.getDate() };
}
function makeZip(entries) {
  const locals=[], centrals=[]; let offset=0; const dt=dosDateTime();
  for (const entry of entries) {
    const name=Buffer.from(entry.name.replace(/\\/g,'/'),'utf8'), data=Buffer.isBuffer(entry.data)?entry.data:Buffer.from(entry.data);
    const crc=crc32(data), local=Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50,0);local.writeUInt16LE(20,4);local.writeUInt16LE(0x0800,6);local.writeUInt16LE(0,8);
    local.writeUInt16LE(dt.time,10);local.writeUInt16LE(dt.date,12);local.writeUInt32LE(crc,14);local.writeUInt32LE(data.length,18);local.writeUInt32LE(data.length,22);local.writeUInt16LE(name.length,26);local.writeUInt16LE(0,28);
    locals.push(local,name,data);
    const central=Buffer.alloc(46);central.writeUInt32LE(0x02014b50,0);central.writeUInt16LE(20,4);central.writeUInt16LE(20,6);central.writeUInt16LE(0x0800,8);central.writeUInt16LE(0,10);
    central.writeUInt16LE(dt.time,12);central.writeUInt16LE(dt.date,14);central.writeUInt32LE(crc,16);central.writeUInt32LE(data.length,20);central.writeUInt32LE(data.length,24);
    central.writeUInt16LE(name.length,28);central.writeUInt16LE(0,30);central.writeUInt16LE(0,32);central.writeUInt16LE(0,34);central.writeUInt16LE(0,36);central.writeUInt32LE(0,38);central.writeUInt32LE(offset,42);
    centrals.push(central,name); offset+=local.length+name.length+data.length;
  }
  const centralSize=centrals.reduce((n,b)=>n+b.length,0), count=entries.length, end=Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50,0);end.writeUInt16LE(0,4);end.writeUInt16LE(0,6);end.writeUInt16LE(count,8);end.writeUInt16LE(count,10);end.writeUInt32LE(centralSize,12);end.writeUInt32LE(offset,16);end.writeUInt16LE(0,20);
  return Buffer.concat([...locals,...centrals,end]);
}
function extractZip(buffer, limits={}) {
  const maxFiles=limits.maxFiles||5000,maxTotal=limits.maxTotal||1024*1024*1024,maxFile=limits.maxFile||300*1024*1024;
  const min=Math.max(0,buffer.length-65557);let eocd=-1;
  for(let i=buffer.length-22;i>=min;i--)if(buffer.readUInt32LE(i)===0x06054b50){eocd=i;break}
  if(eocd<0)throw new Error('Arquivo de projeto inválido (ZIP sem diretório central).');
  const count=buffer.readUInt16LE(eocd+10),centralSize=buffer.readUInt32LE(eocd+12);let offset=buffer.readUInt32LE(eocd+16);
  if(count>maxFiles||offset+centralSize>buffer.length)throw new Error('Arquivo de projeto excede os limites permitidos.');
  const out=new Map();let total=0;
  for(let i=0;i<count;i++){
    if(buffer.readUInt32LE(offset)!==0x02014b50)throw new Error('Diretório central do ZIP inválido.');
    const flags=buffer.readUInt16LE(offset+8),method=buffer.readUInt16LE(offset+10),crc=buffer.readUInt32LE(offset+16),csize=buffer.readUInt32LE(offset+20),usize=buffer.readUInt32LE(offset+24);
    const nl=buffer.readUInt16LE(offset+28),el=buffer.readUInt16LE(offset+30),cl=buffer.readUInt16LE(offset+32),localOffset=buffer.readUInt32LE(offset+42);
    const name=buffer.subarray(offset+46,offset+46+nl).toString('utf8');offset+=46+nl+el+cl;
    if(flags&1)throw new Error('Projetos criptografados não são suportados.');
    if(!name||name.startsWith('/')||name.includes('\\')||name.split('/').some(p=>p==='..'||p===''))throw new Error('O projeto contém um caminho de arquivo inseguro.');
    if(usize>maxFile||(total+=usize)>maxTotal)throw new Error('O projeto é grande demais para importar.');
    if(buffer.readUInt32LE(localOffset)!==0x04034b50)throw new Error('Cabeçalho de arquivo ZIP inválido.');
    const lnl=buffer.readUInt16LE(localOffset+26),lel=buffer.readUInt16LE(localOffset+28),start=localOffset+30+lnl+lel;
    const compressed=buffer.subarray(start,start+csize);let data;
    if(method===0)data=Buffer.from(compressed);else if(method===8)data=zlib.inflateRawSync(compressed);else throw new Error('Método de compactação ZIP não suportado.');
    if(data.length!==usize||crc32(data)!==crc)throw new Error(`O arquivo ${name} está corrompido.`);
    if(!name.endsWith('/'))out.set(name,data);
  }
  return out;
}
function walkReplace(node, replacer) {
  if (!node || typeof node !== 'object') return;
  for (const key of Object.keys(node)) {
    const value=node[key];
    if (typeof value==='string') node[key]=replacer(value);
    else if (value && typeof value==='object') walkReplace(value,replacer);
  }
}
function descendantsOf(worlds, rootId) {
  const selected=worlds.find(w=>String(w.id)===String(rootId));if(!selected)return [];
  const out=[selected];for(let i=0;i<out.length;i++)for(const candidate of worlds)if(String(candidate.par||'')===String(out[i].id)&&!out.includes(candidate))out.push(candidate);
  return out;
}
function collectIds(node, out=new Set()) {
  if(!node||typeof node!=='object')return out;
  if(Array.isArray(node)){node.forEach(x=>collectIds(x,out));return out;}
  for(const [k,v] of Object.entries(node)){if(k==='id'&&(typeof v==='string'||typeof v==='number'))out.add(String(v));if(v&&typeof v==='object')collectIds(v,out);}
  return out;
}
function remapIds(node, map) {
  const replaceText=(value)=>{
    if(map.has(value))return map.get(value);
    let out=value;
    for(const [oldId,newId] of map){const escaped=oldId.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');out=out.replace(new RegExp(`(^|[^A-Za-z0-9])${escaped}(?=$|[^A-Za-z0-9])`,'g'),(m,p)=>p+newId);}
    return out;
  };
  if(Array.isArray(node))return node.map(x=>remapIds(x,map));
  if(!node||typeof node!=='object')return typeof node==='string'?replaceText(node):node;
  const out={};for(const [key,value] of Object.entries(node)){const newKey=replaceText(key);out[newKey]=key==='id'&&typeof value==='string'?(map.get(value)||value):remapIds(value,map);}return out;
}
function exportProject(dir, worldId, destinationFile) {
  const raw=readData(dir);if(!raw)throw new Error('Nenhum projeto foi encontrado nesta pasta.');
  const state=JSON.parse(raw), selected=state.worlds.find(w=>String(w.id)===String(worldId));if(!selected)throw new Error('O mundo selecionado não existe.');
  // O botão exporta a raiz da árvore, para incluir sempre todos os sub-mundos e o acervo compartilhado.
  let root=selected, seen=new Set();while(root.par&&state.worlds.some(w=>String(w.id)===String(root.par))&&!seen.has(root.id)){seen.add(root.id);root=state.worlds.find(w=>String(w.id)===String(root.par));}
  const worlds=descendantsOf(state.worlds,root.id).map(w=>JSON.parse(JSON.stringify(w)));
  const folder=folderForWorld(root.id), projectDir=join(dir,PROJECTS_DIR,folder);
  const names=new Set();
  walkReplace(worlds,value=>value.replace(new RegExp(`worlds/${folder}/assets/`,'g'),'assets/'));
  for(const world of worlds)walkReplace(world,value=>{for(const match of value.matchAll(/assets\/([\w.-]+)/g))names.add(match[1]);return value;});
  const entries=[
    {name:'manifest.json',data:JSON.stringify({format:'world-atelier-project-archive',version:1,rootId:root.id,name:root.name||'Sem nome',exportedAt:new Date().toISOString()})},
    {name:'world.json',data:JSON.stringify({format:PROJECT_FORMAT,rootId:root.id,worlds})}
  ];
  for(const name of names){const file=join(projectDir,'assets',name);if(fs.existsSync(file)&&fs.statSync(file).isFile())entries.push({name:`assets/${name}`,data:fs.readFileSync(file)});}
  fs.mkdirSync(path.dirname(destinationFile),{recursive:true});fs.writeFileSync(destinationFile,makeZip(entries));
  return {ok:true,name:root.name||'Sem nome',worlds:worlds.length,assets:entries.length-2};
}
function importProject(dir, sourceFile) {
  ensureLayout(dir);
  const entries=extractZip(fs.readFileSync(sourceFile));
  const manifest=entries.has('manifest.json')?JSON.parse(entries.get('manifest.json').toString('utf8')):null;
  const payload=entries.has('world.json')?JSON.parse(entries.get('world.json').toString('utf8')):null;
  if(manifest?.format!=='world-atelier-project-archive'||manifest.version!==1||payload?.format!==PROJECT_FORMAT||!Array.isArray(payload.worlds))throw new Error('Este arquivo não é um projeto World Atelier válido.');
  const state=JSON.parse(readData(dir)||'{}');state.shelves||=[{id:uid(),n:'Meus mundos'}];state.worlds||=[];
  const incoming=payload.worlds.map(w=>JSON.parse(JSON.stringify(w)));
  const importedRoot=incoming.find(w=>String(w.id)===String(payload.rootId));if(!importedRoot)throw new Error('O mundo principal não foi encontrado dentro do arquivo.');
  const existingIds=collectIds(state), incomingIds=collectIds(incoming), idMap=new Map();
  for(const oldId of incomingIds)if(existingIds.has(oldId)){let next;do{next=uid()}while(existingIds.has(next)||incomingIds.has(next)||[...idMap.values()].includes(next));idMap.set(oldId,next);}
  const remapped=remapIds(incoming,idMap);
  const newRootId=idMap.get(String(payload.rootId))||String(payload.rootId), folder=folderForWorld(newRootId);
  const root=remapped.find(w=>String(w.id)===newRootId);root.par='';
  const shelf=state.shelves[0]?.id||'';
  remapped.forEach(w=>{w.sh=shelf;walkReplace(w,value=>value.replace(/(?:worlds\/[a-f0-9]{16}\/)?assets\/([\w.-]+)/g,`worlds/${folder}/assets/$1`));});
  const projectDir=join(dir,PROJECTS_DIR,folder,'assets');fs.mkdirSync(projectDir,{recursive:true});
  for(const [name,data] of entries){if(!name.startsWith('assets/'))continue;const assetName=name.slice('assets/'.length);if(!/^[\w.-]+$/.test(assetName))throw new Error('Nome de imagem inválido no arquivo de projeto.');fs.writeFileSync(join(projectDir,assetName),data);}
  state.worlds.push(...remapped);
  writeData(dir,JSON.stringify(state));
  return {ok:true,id:newRootId,name:root.name||manifest.name||'Sem nome',worlds:remapped.length,assets:[...entries.keys()].filter(x=>x.startsWith('assets/')).length};
}

module.exports = { DATA_FILE, PROJECTS_DIR, INDEX_FORMAT, ensureLayout, hasData, writeData, readData, putAsset, assetPath, cleanupAssets, copyWorkspace, listBackups, folderForWorld, exportProject, importProject, makeZip, extractZip };
