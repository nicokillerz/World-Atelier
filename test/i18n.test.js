'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

class FakeElement {
  constructor(tagName = 'div', attributes = {}, children = []) {
    this.nodeType = 1;
    this.tagName = tagName.toUpperCase();
    this.attributes = { ...attributes };
    this.children = children;
    this.parentElement = null;
    for (const child of children) if (child) child.parentElement = this;
  }
  hasAttribute(name) { return Object.hasOwn(this.attributes, name); }
  getAttribute(name) { return this.attributes[name] ?? null; }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  closest(selector) {
    const selectors = selector.split(',').map((part) => part.trim());
    for (let node = this; node; node = node.parentElement) {
      for (const item of selectors) {
        if (item === '[data-no-translate]' && node.hasAttribute('data-no-translate')) return node;
        if (item === '[contenteditable="true"]' && node.getAttribute('contenteditable') === 'true') return node;
        if (item.startsWith('.') && (node.attributes.class || '').split(/\s+/).includes(item.slice(1))) return node;
        if (item.startsWith('[') && item.endsWith(']')) {
          const name = item.slice(1, -1).split('=')[0];
          if (node.hasAttribute(name)) return node;
        }
      }
    }
    return null;
  }
  querySelectorAll() {
    const result = [];
    const visit = (node) => {
      for (const child of node.children || []) {
        if (child.nodeType === 1) { result.push(child); visit(child); }
      }
    };
    visit(this);
    return result;
  }
}

function textNode(value) { return { nodeType: 3, nodeValue: value, parentElement: null }; }
function createHarness() {
  const placeholder = new FakeElement('input', { placeholder: 'Nova tag (ex: Casas, Criaturas)' });
  const summaryPlaceholder = new FakeElement('textarea', { placeholder: 'Um resumo curto para apresentar este personagem...' });
  const spectrumLeft = new FakeElement('input', { placeholder: 'Lado A' });
  const spectrumRight = new FakeElement('input', { placeholder: 'Lado B' });
  const spectrumGroup = new FakeElement('input', { placeholder: 'Grupo' });
  const protectedInput = new FakeElement('input', { placeholder: 'Nome personalizado', 'data-no-translate': '' });
  const labelledButton = new FakeElement('button', { title: 'Ver grafo', 'aria-label': 'Novo personagem' });
  const sceneImage = new FakeElement('img', { alt: 'Ilustração da cena' });
  const richText = new FakeElement('div', { contenteditable: 'true', class: 'rt rte', 'data-ph': 'Jeito de ser, de falar, manias, medos, valores...' }, [textNode('Texto escrito pela pessoa')]);
  const uppercase = textNode('IDEIAS');
  const emojiHeading = textNode('⚙ CONFIGURAÇÕES DO PROJETO');
  const visibleSubworlds = textNode('👁 Sub-mundos: visíveis');
  const protectedName = textNode('Nome de personagem');
  const protectedWrap = new FakeElement('span', { 'data-no-translate': '' }, [protectedName]);
  const status = textNode('REVISÃO');
  const content = new FakeElement('section', {}, [uppercase, emojiHeading, visibleSubworlds, protectedWrap, richText, status]);
  const body = new FakeElement('body', {}, [placeholder, summaryPlaceholder, spectrumLeft, spectrumRight, spectrumGroup, protectedInput, labelledButton, sceneImage, content]);
  const document = {
    body,
    documentElement: {},
    addEventListener() {},
    createTreeWalker(root) {
      const nodes = [];
      const visit = (node) => {
        for (const child of node.children || []) {
          if (child.nodeType === 3) nodes.push(child);
          else visit(child);
        }
      };
      visit(root);
      let index = 0;
      return { nextNode: () => nodes[index++] || null };
    }
  };
  const window = {
    alert(message) { window.lastAlert = message; },
    confirm(message) { window.lastConfirm = message; return true; },
    dispatchEvent() {}
  };
  const context = {
    window,
    document,
    localStorage: { getItem: () => 'en', setItem() {} },
    Node: { ELEMENT_NODE: 1, TEXT_NODE: 3 },
    NodeFilter: { SHOW_TEXT: 4 },
    Element: FakeElement,
    MutationObserver: class { observe() {} },
    Event: class { constructor(type) { this.type = type; } },
    console
  };
  const source = fs.readFileSync(path.join(__dirname, '../src/renderer/i18n.js'), 'utf8');
  vm.runInNewContext(source, context, { filename: 'i18n.js' });
  return { window, document, placeholder, summaryPlaceholder, spectrumLeft, spectrumRight, spectrumGroup, protectedInput, labelledButton, sceneImage, richText, uppercase, emojiHeading, visibleSubworlds, protectedName, status };
}

test('localização traduz placeholders, caixa alta e cabeçalhos com símbolos', () => {
  const h = createHarness();
  assert.equal(h.placeholder.getAttribute('placeholder'), 'New tag (e.g. Houses, Creatures)');
  assert.equal(h.summaryPlaceholder.getAttribute('placeholder'), 'A short summary to introduce this character...');
  assert.equal(h.spectrumLeft.getAttribute('placeholder'), 'Side A');
  assert.equal(h.spectrumRight.getAttribute('placeholder'), 'Side B');
  assert.equal(h.spectrumGroup.getAttribute('placeholder'), 'Group');
  assert.equal(h.richText.getAttribute('data-ph'), 'Personality, speech, quirks, fears, and values...');
  assert.equal(h.richText.children[0].nodeValue, 'Texto escrito pela pessoa');
  assert.equal(h.labelledButton.getAttribute('title'), 'View graph');
  assert.equal(h.labelledButton.getAttribute('aria-label'), 'New character');
  assert.equal(h.sceneImage.getAttribute('alt'), 'Scene illustration');
  assert.equal(h.uppercase.nodeValue, 'IDEAS');
  assert.equal(h.emojiHeading.nodeValue, '⚙ PROJECT SETTINGS');
  assert.equal(h.status.nodeValue, 'REVIEW');
  assert.equal(h.visibleSubworlds.nodeValue, '👁 Sub-worlds: visible');
});

test('localização preserva texto explicitamente marcado como conteúdo do usuário e permite voltar ao português', () => {
  const h = createHarness();
  assert.equal(h.protectedInput.getAttribute('placeholder'), 'Nome personalizado');
  assert.equal(h.protectedName.nodeValue, 'Nome de personagem');
  h.window.WorldAtelierI18n.setLanguage('pt-BR');
  assert.equal(h.placeholder.getAttribute('placeholder'), 'Nova tag (ex: Casas, Criaturas)');
  assert.equal(h.summaryPlaceholder.getAttribute('placeholder'), 'Um resumo curto para apresentar este personagem...');
  assert.equal(h.spectrumLeft.getAttribute('placeholder'), 'Lado A');
  assert.equal(h.richText.getAttribute('data-ph'), 'Jeito de ser, de falar, manias, medos, valores...');
  assert.equal(h.richText.children[0].nodeValue, 'Texto escrito pela pessoa');
  assert.equal(h.labelledButton.getAttribute('title'), 'Ver grafo');
  assert.equal(h.labelledButton.getAttribute('aria-label'), 'Novo personagem');
  assert.equal(h.sceneImage.getAttribute('alt'), 'Ilustração da cena');
  assert.equal(h.uppercase.nodeValue, 'IDEIAS');
  assert.equal(h.emojiHeading.nodeValue, '⚙ CONFIGURAÇÕES DO PROJETO');
  assert.equal(h.status.nodeValue, 'REVISÃO');
  assert.equal(h.visibleSubworlds.nodeValue, '👁 Sub-mundos: visíveis');
});

test('alertas do navegador são apresentados no idioma selecionado', () => {
  const h = createHarness();
  h.window.alert('Não foi possível gerar o backup: disk error');
  assert.equal(h.window.lastAlert, 'Could not create the backup: disk error');
  h.window.alert('Não foi possível salvar na pasta de dados:\nVerifique se a pasta ainda existe e se há espaço no disco.');
  assert.equal(h.window.lastAlert, 'Could not save to the data folder:\nCheck that the folder still exists and that there is enough disk space.');
  h.window.alert('O arquivo world.json está corrompido.');
  assert.equal(h.window.lastAlert, 'The file world.json is corrupted.');
});

test('localização cobre rótulos predefinidos persistidos em projetos de versões anteriores', () => {
  const h = createHarness();
  const translate = h.window.WorldAtelierI18n.translateString;
  assert.equal(translate('Cor favorita'), 'Favorite color');
  assert.equal(translate('Busto'), 'Bust');
  assert.equal(translate('Quem pede desculpas primeiro?'), 'Who apologizes first?');
  assert.equal(translate('Ano bissexto'), 'Leap year');
  assert.equal(translate('Espectros'), 'Spectrums');
  assert.equal(translate('+ Espectro'), '+ Spectrum');
  assert.equal(translate('+ Barra'), '+ Slider');
  assert.equal(translate('Lado A'), 'Side A');
  assert.equal(translate('Lado B'), 'Side B');
  assert.equal(translate('Grupo'), 'Group');
  assert.equal(translate('Geral'), 'General');
  assert.equal(translate('Introvertido'), 'Introverted');
  assert.equal(translate('Extrovertido'), 'Extroverted');
  assert.equal(translate('Caótico'), 'Chaotic');
  assert.equal(translate('Comportado'), 'Orderly');
  assert.equal(translate('Frio'), 'Cold');
  assert.equal(translate('Sensível'), 'Sensitive');
  assert.equal(translate('Introvertido'), 'Introverted');
  assert.equal(translate('Emocional'), 'Emotional');
  assert.equal(translate('Físico'), 'Physical');
  assert.equal(translate('Paleta de cores (5/10)'), 'Color palette (5/10)');
  assert.equal(translate('Hábitos, manias, pequenos costumes...'), 'Habits, quirks, little routines...');
  h.window.WorldAtelierI18n.setLanguage('pt-BR');
  assert.equal(translate('Introverted'), 'Introvertido');
  assert.equal(translate('General'), 'Geral');
});

test('todos os textos D() do aplicativo têm uma tradução correspondente no dicionário', () => {
  const app = fs.readFileSync(path.join(__dirname, '../src/renderer/app.js'), 'utf8');
  const i18n = fs.readFileSync(path.join(__dirname, '../src/renderer/i18n.js'), 'utf8');
  const dictionary = new Map([...i18n.matchAll(/^\s*['"]([^'"]+)['"]\s*:\s*['"]([^'"]*)['"]/gm)].map((match) => [match[1], match[2]]));
  const pairs = [...app.matchAll(/\bD\(\s*(['"])(.*?)\1\s*,\s*(['"])(.*?)\3/gs)];
  const missing = [...new Set(pairs.map((match) => [match[2], match[4]]).filter(([pt, en]) => dictionary.get(pt) !== en).map(([pt, en]) => `${pt} -> ${en}`))];
  assert.deepEqual(missing, []);
});

test('todos os placeholders e data-ph estáticos do aplicativo têm tradução', () => {
  const app = fs.readFileSync(path.join(__dirname, '../src/renderer/app.js'), 'utf8');
  const i18n = fs.readFileSync(path.join(__dirname, '../src/renderer/i18n.js'), 'utf8');
  const keys = new Set([...i18n.matchAll(/^\s*['"]([^'"]+)['"]\s*:/gm)].map((match) => match[1]));
  for (const match of app.matchAll(/\bD\(\s*(['"])(.*?)\1\s*,/gs)) keys.add(match[2]);
  const attributes = [...app.matchAll(/\b(?:placeholder|data-ph)\s*=\s*(['"])(.*?)\1/gs)].map((match) => match[2]);
  const missing = [...new Set(attributes.filter((value) => value && !value.includes('${') && !value.includes('<') && !keys.has(value)))];
  assert.deepEqual(missing, []);
});

test('1.3.2 traduz rótulos dinâmicos de locais e espécies e os controles reportados', () => {
  const h = createHarness();
  const translate = h.window.WorldAtelierI18n.translateString;
  assert.equal(translate('Local principal'), 'Main location');
  assert.equal(translate('Sub-local · nível 3'), 'Sub-location · level 3');
  assert.equal(translate('Variação de Dragão Antigo'), 'Variation of Dragão Antigo');
  assert.equal(translate('4 espécie(s)'), '4 species');
  assert.equal(translate('✔ Fechar tipos'), '✔ Close types');
  assert.equal(translate('← Voltar aos vínculos'), '← Back to relationships');
  assert.equal(translate('＋ Adicionar marcador'), '＋ Add marker');
  assert.equal(translate('Concluir marcadores'), 'Finish markers');
  assert.equal(translate('Origem, aparência e importância...'), 'Origin, appearance, and significance...');
  assert.equal(translate('Registre pais, filhos e irmãos. Os vínculos de pais e filhos são recíprocos na árvore; irmãos também podem ser vinculados diretamente ou identificados por pais em comum.'), 'Add parents, children, and siblings. Parent-child links are reciprocal in the family tree; siblings can also be linked directly or identified through shared parents.');
  assert.equal(translate('Nova História'), 'New story');
  h.window.WorldAtelierI18n.setLanguage('pt-BR');
  assert.equal(translate('Variation of Dragão Antigo'), 'Variação de Dragão Antigo');
  assert.equal(translate('3 species'), '3 espécie(s)');
  assert.equal(translate('Main location'), 'Local principal');
});

test('1.3.2 inclui notas livres recolhíveis e coloridas no módulo Habilidades e Poderes', () => {
  const app = fs.readFileSync(path.join(__dirname, '../src/renderer/app.js'), 'utf8');
  assert.match(app, /w\.skillNotes\|\|=\[\]/);
  assert.match(app, /data-act="addSkillNote"/);
  assert.match(app, /data-act="toggleSkillNote"/);
  assert.match(app, /data-act="delSkillNote"/);
  assert.match(app, /skillNotes\.\$\{i\}\.color/);
  assert.match(app, /skillNotes\.\$\{i\}\.v/);
  assert.match(app, /D\('Notas livres','Freeform notes'\)/);
  assert.match(app, /note\.cl\?'':T\('w',`skillNotes\.\$\{i\}\.v`/);
  assert.match(app, /storyDisplayName\(lastStory\)/);
});
