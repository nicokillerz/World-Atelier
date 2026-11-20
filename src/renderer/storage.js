/* World Atelier - camada de armazenamento (storage.js)
 *
 * Expõe o objeto global STORE, usado pelo app.js:
 *   STORE.load()            -> devolve o objeto de dados (ou null)
 *   STORE.save(getState)    -> agenda o salvamento automático (com debounce)
 *   STORE.flush()           -> grava agora e devolve uma Promise
 *   STORE.onStatus(fn)      -> fn('pending' | 'saved' | 'error', mensagem)
 *
 * Dois modos:
 *   - Desktop (Electron): grava o índice global em world-atelier.json e cada árvore de mundos em
 *     worlds/<id-do-projeto>/world.json. As imagens vão para a pasta assets do projeto e o JSON
 *     guarda apenas caminhos relativos. Na memória, usam URLs atelier:// para as <img> funcionarem.
 *   - Navegador: usa localStorage (como a versão web original).
 */
(function () {
  'use strict';
  const KEY = 'ocw1';
  const A = window.atelier || null;
  const DATA_URL = /^data:image\/[a-z0-9.+-]+;base64,/i;
  const REL = /^(?:assets\/[\w.-]+|worlds\/[a-f0-9]{16}\/assets\/[\w.-]+)\.(?:jpe?g|png|webp|gif|avif|bmp|svg)$/i;

  /** Percorre todos os textos de um objeto (em qualquer profundidade): fn(pai, chave, valor). */
  function walk(node, fn) {
    if (!node || typeof node !== 'object') return;
    const keys = Array.isArray(node) ? node.keys() : Object.keys(node);
    for (const k of keys) {
      const v = node[k];
      if (typeof v === 'string') fn(node, k, v);
      else if (v && typeof v === 'object') walk(v, fn);
    }
  }

  const listeners = [];
  const emit = (s, m) => listeners.forEach((f) => { try { f(s, m); } catch (e) { console.error(e); } });

  /* ------------------------------------------------------------------ navegador */
  if (!A) {
    window.STORE = {
      desktop: false,
      load() { try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; } },
      save(get) {
        try { localStorage.setItem(KEY, JSON.stringify(get())); emit('saved'); }
        catch (e) { emit('error', e.message); alert('Não foi possível salvar (armazenamento cheio?). Exporte um backup e remova imagens.'); }
      },
      flush() { return Promise.resolve(); },
      onStatus(fn) { listeners.push(fn); },
      referenced() { return []; },
      walk
    };
    return;
  }

  /* -------------------------------------------------------------------- desktop */
  const BASE = A.assetBase; // "atelier://app/@ws/"
  let getState = null, timer = 0, dirty = false, chain = Promise.resolve(), warned = false;

  function rootIdFor(world, worlds) {
    const byId = new Map((worlds || []).map((w) => [String(w.id), w]));
    let cur = world; const seen = new Set();
    while (cur?.par && byId.has(String(cur.par)) && !seen.has(String(cur.id))) {
      seen.add(String(cur.id));
      const parent = byId.get(String(cur.par));
      if (!parent || seen.has(String(parent.id))) break;
      cur = parent;
    }
    return String(cur?.id || world?.id || '');
  }

  async function persist(S) {
    // 1) Imagens novas são gravadas dentro da pasta do mundo principal ao qual pertencem.
    const worlds = Array.isArray(S.worlds) ? S.worlds : [];
    const found = new Map();
    for (const world of worlds) {
      const projectId = rootIdFor(world, worlds);
      walk(world, (p, k, v) => {
        if (!DATA_URL.test(v)) return;
        const key = projectId + '\0' + v;
        if (!found.has(key)) found.set(key, { projectId, dataUrl: v, refs: [] });
        found.get(key).refs.push([p, k]);
      });
    }
    for (const { projectId, dataUrl, refs } of found.values()) {
      const rel = await A.putAsset(projectId, dataUrl);
      for (const [p, k] of refs) p[k] = BASE + rel;
    }
    // 2) O processo principal distribui o JSON por pastas de projetos independentes.
    const json = JSON.stringify(S, (k, v) => (typeof v === 'string' && v.startsWith(BASE) ? v.slice(BASE.length) : v));
    await A.writeData(json);
  }

  async function runSave() {
    if (!dirty) return;
    try {
      while (dirty) { dirty = false; await persist(getState()); }
      emit('saved');
    } catch (e) {
      dirty = false;
      console.error('Falha ao salvar:', e);
      emit('error', e.message || String(e));
      if (!warned) { warned = true; alert('Não foi possível salvar na pasta de dados:\n' + (e.message || e) + '\n\nVerifique se a pasta ainda existe e se há espaço no disco.'); }
    }
  }

  window.STORE = {
    desktop: true,
    load() {
      const raw = A.loadSync();
      if (!raw) return null;
      const S = JSON.parse(raw);
      walk(S, (p, k, v) => { if (REL.test(v)) p[k] = BASE + v; });
      return S;
    },
    save(get) {
      getState = get; dirty = true; emit('pending');
      clearTimeout(timer);
      timer = setTimeout(() => { chain = chain.then(runSave); }, 350);
    },
    flush() {
      clearTimeout(timer);
      if (dirty) chain = chain.then(runSave);
      return chain;
    },
    onStatus(fn) { listeners.push(fn); },
    /** Caminhos relativos de todas as imagens que os dados usam agora. */
    referenced() {
      const out = new Set();
      const get = getState || window.STORE.getState;
      if (!get) throw new Error('Estado do app indisponível.'); // nunca limpar imagens sem saber o que está em uso
      walk(get(), (p, k, v) => { if (v.startsWith(BASE)) out.add(v.slice(BASE.length)); });
      return [...out];
    },
    walk,
    BASE
  };
  A.onFlush(() => window.STORE.flush());
})();
