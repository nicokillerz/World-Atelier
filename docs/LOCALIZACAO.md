# Localização da interface

O World Atelier oferece português do Brasil (`pt-BR`) e inglês (`en`). A escolha inicial é salva no perfil do aplicativo e pode ser alterada nas configurações.

## Regras para novos textos

1. **Texto fixo da interface:** adicione o texto em português e sua tradução em inglês ao dicionário em `src/renderer/i18n.js`.
2. **Padrões criados pelo aplicativo:** use `D('Texto em português', 'English text')` em `src/renderer/app.js`. Isso cria valores novos no idioma selecionado. Mantenha também a tradução no dicionário para que presets gravados por versões anteriores apareçam no idioma escolhido.
3. **Placeholders, exemplos e acessibilidade:** `placeholder`, `title`, `aria-label`, `alt` e `data-ph` são textos da interface e devem ser traduzidos — inclusive exemplos e explicações que orientam o que preencher. Não use esses atributos para armazenar texto pessoal do escritor.
4. **Conteúdo do usuário:** não traduza nomes de mundos, personagens, lugares, histórias, sinopses, notas ou texto narrativo digitado. Marque saídas dinâmicas de conteúdo pessoal com `data-no-translate`; o texto interno de editores ricos (`.rt` / `.rte`) e áreas `contenteditable` permanece protegido, mas seus atributos de ajuda (`data-ph`, `placeholder`) continuam localizados.
5. **Valores de formulário:** valores digitados em `input`, `textarea` e `select` não são traduzidos automaticamente. Apenas rótulos e placeholders da interface são localizados.
6. **Presets e exemplos de espectros:** valores padrão fornecidos pelo aplicativo (por exemplo, lados Introvertido/Extrovertido e grupos Mental/Social/Emocional) também são interface e devem ter equivalentes em inglês. Ao adicionar um novo preset, atualize o mapa correspondente em `app.js` e o dicionário em `i18n.js`; preserve valores personalizados que não sejam presets conhecidos.
7. **Electron:** diálogos nativos e menus ficam no processo principal (`src/main/main.js` e `src/main/menu.js`) e devem usar o idioma salvo no perfil do aplicativo.

## Testes

Execute `npm test`. Os testes de `test/i18n.test.js` cobrem atributos de interface, caixa alta, emojis, alternância entre inglês e português, preservação de conteúdo marcado e mensagens de erro.
