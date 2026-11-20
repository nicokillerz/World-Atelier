## 1.3.2

- Completa traduções de histórias retomadas, parentescos, tipos de vínculo, locais, espécies, mapas e descrições de itens.
- Traduz rótulos dinâmicos de variação de espécie, quantidade de espécies e níveis de sublocais.
- Adiciona uma área de notas livres ao final de Habilidades e Poderes, com blocos independentes, título editável, cor configurável e recolhimento.
- Preserva notas e configurações de mundos existentes; os novos blocos são salvos junto aos dados do mundo.

## 1.3.1

- Corrige textos de ajuda e placeholders que ainda apareciam em português na interface em inglês.
- Traduz o controle de visibilidade de submundos e o resumo da ficha de apresentação.
- Localiza os presets de espectros (lados, grupos e exemplos padrão) ao criar personagens e ao alternar idiomas.
- Permite traduzir atributos de interface como `data-ph` em editores sem traduzir o conteúdo editável.
- Preserva rótulos personalizados; somente termos conhecidos dos presets são alternados entre idiomas.

## 1.3.0

- Revisão estrutural da localização: placeholders, títulos, rótulos de acessibilidade e atributos `data-ph` agora são traduzidos sem alterar valores digitados pelo usuário.
- A tradução reconhece diferenças de caixa (maiúsculas/minúsculas) e mantém emojis/símbolos antes dos rótulos.
- Reduzidas as áreas de proteção excessivas: nomes personalizados continuam protegidos, enquanto rótulos fixos vizinhos voltam a ser traduzidos.
- Mensagens de alerta/confirmação e títulos dos diálogos nativos do Electron passam a respeitar o idioma selecionado.
- Ampliado o vocabulário da interface para cenários, notas, sistemas, espécies, galeria, mapas, diálogos, calendário e configurações.
- Atualização de versão sem modificar os dados salvos dos projetos.
- Todos os presets criados por `D(português, inglês)` passaram a ter correspondência no dicionário, inclusive rótulos de aparência, favoritos, relações, categorias de sistema e regras de calendário usados por projetos antigos.
- Adicionados testes de regressão para placeholders, `title`, `aria-label`, `alt`, mensagens dinâmicas, alternância de idioma e presets persistidos.
- Documentada a convenção para manter novas telas e módulos traduzíveis em `docs/LOCALIZACAO.md`.

## 1.2.9

- Corrige a tradução dos rótulos com emojis na navegação do perfil OC.
- Permite traduzir chips de interface com rótulos padrão (ex.: tags predefinidas), sem traduzir textos arbitrários.

## 1.2.8
- Expanded English localization for calendar, character cycles, event categories, confirmation dialogs, navigation labels, and common interface actions.
- User-created story and world content remains unchanged.

# Changelog

## 1.2.7
- Corrigido um ciclo infinito no tradutor de interface: atributos HTML só são atualizados quando a tradução realmente altera seu valor.
- A inicialização do aplicativo deixa de ficar bloqueada pelo MutationObserver ao abrir a interface.


## 1.2.5
- Corrigida a atualização visual do nome da espécie enquanto é digitado, sem exigir troca de seção.
- Os nomes dos grupos do bestiário e dos campos personalizados agora atualizam seus rótulos imediatamente.
- Reforçada a validação ao criar campos/categorias personalizados, evitando identificadores duplicados ou reservados.

- Recursos rastreáveis agora ocupam uma seção de largura integral abaixo da área de retrato e dados básicos, com campos maiores e sem alterar o posicionamento da imagem.
- Corrigida a inicialização do estado de recolhimento do bestiário, que podia causar erro ao abrir a seção.

# Changelog

## 1.2.3
- Recursos rastreáveis: campos de nome, valor e unidade usam entradas de texto independentes e uma grade responsiva para evitar que os campos se comprimam ou desapareçam.
- Modo de leitura: navegação entre as seções do mundo e retorno ao painel continuam clicáveis; os controles de edição permanecem ocultos.
- Itens: categorias podem ser renomeadas e excluídas; ao renomear, os itens e as cores acompanham a nova categoria. Ao excluir, os itens são transferidos para outra categoria existente.
- Galeria: “Tópico relacionado” da imagem agora lista apenas tópicos da Lore. Vínculos antigos para locais continuam abrindo o local correto; os vínculos de áreas clicáveis ainda podem apontar para locais.
- Mapas: removido o controle de tamanho dos marcadores.
- Sistemas: cada lista de vínculos agora oferece “Nenhum” para limpar a seleção.
- Bestiário: navegação dedicada para abrir a seção e normalização defensiva dos dados antigos de espécies.
- O `package-lock.json` incompleto da versão anterior foi removido para que o npm gere um lockfile válido durante a instalação.

## 1.2.2
- Itens do mundo: atualização instantânea dos títulos, ordenação por categoria e nome, cores por categoria e remoção de imagem.
- Inventário: quantidade por item e inclusão de itens já cadastrados no mundo, mantendo vínculo com o registro original.
- Lore: reorganização por arrastar e soltar com destinos antes/depois/como subtópico e zona explícita para mover ao topo.
- Locais: ao abrir uma imagem relacionada na Galeria, há um atalho para retornar ao local de origem.
- Sistemas: atalhos para abrir os registros vinculados e botões separados para adicionar subitens, regras e níveis.
- Ajustes de persistência do estado aberto dos cartões de Sistemas.


## 1.0.0
- Primeira versão desktop (Windows) do World Atelier.
- Pasta de dados escolhida pelo usuário, salvamento automático e backups diários.
- Imagens extraídas para `assets/` (JSON leve com caminhos relativos).
- Fontes embutidas: funciona offline.

## 1.2.0

- Linha do tempo livre, reordenável e sem dependência do calendário, com categorias coloridas.
- Perfil Customizável com ativação individual de módulos por projeto.
- Relacionamentos em cards, filtro por personagem e pares recolhíveis.
- Locais em cards hierárquicos, com Momentos, imagens relacionadas, eventos e notas.
- Galeria com pinos de personagem/evento e vínculos de áreas com Lore e Locais.
- Lore/Wiki com filtro por tag, recolhimento de subtópicos, arrastar e soltar com destaque visual do destino e estado editorial.
- Mapas baseados em imagens comuns, com marcadores coloridos e indicação de capitais; removido o editor de SVG por código.
- Módulo de Itens com imagens, categorias e atributos recolhíveis.
- Espécies/Bestiário separado em grupos Racional e Irracional, com campos editáveis, campos personalizados, variações e imagens da galeria.
- Sistemas unificados por categoria, com overview, fonte, custos, limitações, regras, escalas, subitens recolhíveis e reordenáveis e vínculos a outros módulos.
- Dicionário organizado por idioma e links para termos.
- Campos rastreáveis personalizados nas fichas de personagens.
- Busca global com filtro por mundo.
- Melhorias de persistência dos blocos recolhíveis e de formulários para evitar perder o contexto ao editar.

## 1.2.1 — ajustes de usabilidade
- Datas anuais agora podem ser recolhidas individualmente, mantendo visíveis a cor da tag e o nome.
- Modo de leitura mantém a navegação entre seções disponível enquanto oculta campos de edição.
- Campos de recursos/atributos rastreáveis de personagens passam a usar linhas responsivas com largura controlada para evitar comprimir a imagem e o layout.
- Marcadores dos mapas passam a aceitar tamanho individual ajustável por controle deslizante.


## 1.2.6

- Adicionada escolha de idioma (português do Brasil ou inglês) na primeira abertura, com troca posterior em Configurações.
- Adicionada camada de tradução da interface, sem modificar o conteúdo escrito nos projetos.
- Licença atualizada para PolyForm Noncommercial License 1.0.0, com o aviso obrigatório `Copyright (c) 2026 World Atelier`.
