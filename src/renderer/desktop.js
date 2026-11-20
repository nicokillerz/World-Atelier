/* World Atelier - recursos exclusivos do app desktop (desktop.js)
 * Só faz algo quando roda dentro do Electron (window.atelier existe).
 *   - Primeira abertura: pede a pasta de dados
 *   - Configurações: trocar pasta, abrir pasta, limpar imagens sem uso, backup portátil
 *   - Indicador "Salvo" na barra lateral
 */
(function () {
  'use strict';
  const A = window.atelier;
  if (!A) return;
  const info = A.info() || {};
  STORE.getState = () => S; // S é a variável global do app.js

  /* ---------- utilidades de interface ---------- */
  const esc = (t) => String(t ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function modal(html, { locked = false } = {}) {
    const ov = document.createElement('div');
    ov.className = 'dk-ov';
    ov.innerHTML = `<div class="dk-card">${html}</div>`;
    if (!locked) ov.addEventListener('mousedown', (e) => { if (e.target === ov) ov.remove(); });
    document.body.append(ov);
    return ov;
  }
  function choose(message, yes, no) {
    return new Promise((res) => {
      const ov = modal(`<p>${message}</p><div class="dk-row"><button data-r="0">${no}</button><button class="pri" data-r="1">${yes}</button></div>`);
      ov.addEventListener('click', (e) => { const b = e.target.closest('[data-r]'); if (b) { ov.remove(); res(b.dataset.r === '1'); } });
    });
  }
  const mb = (n) => (n / 1048576).toFixed(1).replace('.', ',') + ' MB';

  /* ---------- barra lateral: configurações + estado de salvamento ---------- */
  const aside = document.querySelector('aside');
  if (aside) {
    const anchor = aside.querySelector('[data-act="exp"]');
    let btn = aside.querySelector('[data-desk="settings"]');
    if (!btn) {
      btn = document.createElement('button');
      btn.dataset.desk = 'settings';
      btn.textContent = '⚙ Configurações';
      aside.insertBefore(btn, anchor);
    }
    const state = document.createElement('div');
    state.id = 'saveState';
    aside.append(state);
    const labels = { pending: 'Salvando…', saved: '✓ Salvo na pasta de dados', error: '⚠ Erro ao salvar' };
    STORE.onStatus((s) => { state.textContent = labels[s] || ''; state.dataset.s = s; });
  }

  /* ---------- primeira abertura ---------- */
  function welcome() {
    const ov = modal(`
      <h2>Bem-vindo ao World Atelier</h2>
      <p>Escolha a pasta do seu computador onde seus mundos serão guardados. Tudo é salvo automaticamente lá:</p>
      <ul>
        <li><b>world-atelier.json</b> — índice das coleções e projetos</li>
        <li><b>worlds/</b> — uma pasta independente para cada mundo principal, com seus sub-mundos e imagens</li>
        <li><b>backups/</b> — cópias automáticas e mundos removidos arquivados</li>
      </ul>
      <p class="dk-mute">Dica: escolha uma pasta sincronizada (OneDrive, Google Drive, Dropbox) para ter backup na nuvem.</p>
      <div class="dk-row"><button data-a="default">Usar a pasta padrão</button><button class="pri" data-a="pick">📁 Escolher uma pasta…</button></div>
      <p class="dk-mute" id="dkWelcomeHint"></p>`, { locked: true });
    ov.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-a]'); if (!b) return;
      try {
        let dir = null;
        if (b.dataset.a === 'default') dir = await A.defaultWorkspace();
        else { const r = await A.pickWorkspace(); dir = r && r.path; }
        if (!dir) return;
        await A.applyWorkspace(dir, false);
        location.reload();
      } catch (err) { ov.querySelector('#dkWelcomeHint').textContent = 'Não foi possível usar essa pasta: ' + (err.message || err); }
    });
  }

  /* ---------- trocar pasta ---------- */
  async function changeWorkspace() {
    await STORE.flush();
    const r = await A.pickWorkspace();
    if (!r) return;
    let copy = false;
    if (r.hasData) {
      if (!await choose('Já existem dados do World Atelier nessa pasta. Abrir esses dados?<br><small>Os dados da pasta atual continuam guardados lá.</small>', 'Abrir', 'Cancelar')) return;
    } else if (info.hasData || (info.workspace && S.worlds.length)) {
      copy = await choose('A pasta escolhida está vazia. Copiar seus mundos e imagens atuais para ela?', 'Copiar', 'Começar vazio');
    }
    try { await A.applyWorkspace(r.path, copy); location.reload(); }
    catch (e) { alert('Não foi possível usar essa pasta: ' + (e.message || e)); }
  }

  /* ---------- backup portátil (imagens embutidas, abre também na versão web) ---------- */
  async function exportPortable() {
    await STORE.flush();
    const base = STORE.BASE;
    const copy = JSON.parse(JSON.stringify(S, (k, v) => v));
    const urls = new Set();
    STORE.walk(copy, (p, k, v) => { if (v.startsWith(base)) urls.add(v); });
    const toData = (blob) => new Promise((res, rej) => { const f = new FileReader(); f.onload = () => res(f.result); f.onerror = rej; f.readAsDataURL(blob); });
    const map = new Map();
    for (const u of urls) { const r = await fetch(u); map.set(u, await toData(await r.blob())); }
    STORE.walk(copy, (p, k, v) => { if (map.has(v)) p[k] = map.get(v); });
    const blob = new Blob([JSON.stringify(copy)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'world-atelier-backup-' + new Date().toISOString().slice(0, 10) + '.json'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
  // O botão "Exportar backup" da barra lateral passa a gerar o backup portátil.
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-act="exp"]')) return;
    e.stopPropagation(); e.preventDefault();
    exportPortable().catch((err) => alert('Não foi possível gerar o backup: ' + (err.message || err)));
  }, true);

  /* ---------- tela de configurações ---------- */
  function settings() {
    const cur = A.info() || {};
    const ov = modal(`
      <h2>Configurações</h2>
      <h4>Idioma / Language</h4>
      <select id="waLanguage" style="width:100%">
        <option value="pt-BR">Português (Brasil)</option>
        <option value="en">English</option>
      </select>
      <h4>Pasta de dados</h4>
      <p class="dk-path">${esc(cur.workspace || '(nenhuma)')}</p>
      <div class="dk-row dk-left"><button data-a="change">Alterar pasta…</button><button data-a="open">Abrir no Explorador</button></div>
      <h4>Imagens</h4>
      <p class="dk-mute">Imagens que nenhum mundo usa mais podem ser movidas para <i>backups/imagens-sem-uso</i> (nada é apagado de verdade).</p>
      <div class="dk-row dk-left"><button data-a="clean">Limpar imagens sem uso</button></div>
      <h4>Backup</h4>
      <p class="dk-mute">A própria pasta de dados já é o seu backup. Na estante, você também pode exportar um mundo individual com toda a sua árvore de sub-mundos.</p>
      <div class="dk-row dk-left"><button data-a="export">Exportar backup completo (.json)</button></div>
      <p class="dk-result" id="dkResult"></p>
      <div class="dk-row"><span class="dk-mute">World Atelier ${esc(cur.version || '')}</span><button class="pri" data-a="close">Fechar</button></div>`);
    const out = ov.querySelector('#dkResult');
    const languageSelect = ov.querySelector('#waLanguage');
    if (languageSelect) {
      languageSelect.value = window.WorldAtelierI18n?.getLanguage?.() || 'pt-BR';
      languageSelect.addEventListener('change', () => window.WorldAtelierI18n?.setLanguage?.(languageSelect.value));
    }
    ov.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-a]'); if (!b) return;
      const a = b.dataset.a;
      try {
        if (a === 'close') ov.remove();
        else if (a === 'change') { ov.remove(); await changeWorkspace(); }
        else if (a === 'open') await A.openWorkspace();
        else if (a === 'export') { out.textContent = 'Preparando o backup…'; await exportPortable(); out.textContent = 'Backup gerado.'; }
        else if (a === 'clean') {
          await STORE.flush();
          const r = await A.cleanupAssets(STORE.referenced());
          out.textContent = r.removed ? `${r.removed} imagem(ns) sem uso movida(s) (${mb(r.bytes)}).` : 'Nenhuma imagem sem uso encontrada.';
        }
      } catch (err) { out.textContent = 'Erro: ' + (err.message || err); }
    });
  }

  // Exporta/importa projetos inteiros. O processo principal cria um arquivo .worldatelier
  // com o mundo selecionado, todos os sub-mundos descendentes e seus assets.
  document.addEventListener('click', async (e) => {
    const exportButton = e.target.closest('[data-act="exportWorld"]');
    const importButton = e.target.closest('[data-act="importWorld"]');
    if (!exportButton && !importButton) return;
    e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
    try {
      await STORE.flush();
      if (exportButton) {
        const result = await A.exportProject(exportButton.dataset.id);
        if (!result?.canceled) alert(`Projeto exportado!\n\n${result.name}\n${result.worlds} mundo(s), incluindo sub-mundos\n${result.assets} imagem(ns).`);
      } else {
        const result = await A.importProject();
        if (result?.canceled) return;
        alert(`Projeto importado!\n\n${result.name}\n${result.worlds} mundo(s) e ${result.assets} imagem(ns).\n\nO projeto foi adicionado sem substituir os mundos existentes.`);
        location.reload();
      }
    } catch (err) {
      alert('Não foi possível concluir a operação: ' + (err.message || err));
    }
  }, true);

  document.addEventListener('click', (e) => { if (e.target.closest('[data-desk="settings"]')) settings(); });
  A.onMenu((id) => {
    if (id === 'settings') settings();
    else if (id === 'choose-workspace') changeWorkspace();
    else if (id === 'open-workspace') A.openWorkspace();
  });

  if (!info.workspace) welcome();
})();
