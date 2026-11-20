# Arquitetura

O World Atelier é uma aplicação HTML + CSS + JavaScript puro executada pelo Electron. A interface continua trabalhando com um único estado em memória (`S`), enquanto a camada `STORE` distribui e reúne os dados no Workspace.

## Camadas

```
Renderer (interface)
  app.js ── save() ──► STORE (storage.js) ──► window.atelier (preload)
                                             │ IPC seguro
Main (Electron) ──► workspace.js ──► Workspace do usuário
```

- **`app.js`** mantém o estado da interface e chama `save()` após alterações.
- **`storage.js`** mantém compatibilidade com `localStorage` no navegador. No desktop, transforma imagens novas em arquivos e converte URLs `atelier://` em caminhos relativos antes de salvar.
- **`preload.js`** expõe somente operações específicas por `contextBridge`; a interface não recebe acesso direto a `fs` ou Node.js.
- **`main.js`** registra o protocolo `atelier://`, valida a origem das chamadas IPC, exibe os seletores nativos de pasta/arquivo e delega as operações à camada de Workspace.
- **`workspace.js`** não depende do Electron. Implementa gravação atômica, backups, migração, organização por projeto e pacotes `.worldatelier`.

## Organização do Workspace

```text
World Atelier/
├── world-atelier.json          índice global: coleções e lista de projetos
├── worlds/
│   ├── <hash-do-mundo-a>/
│   │   ├── world.json          mundo principal + todos os seus sub-mundos
│   │   ├── assets/             imagens usadas por essa árvore de mundos
│   │   └── backups/             versões diárias do JSON do projeto
│   └── <hash-do-mundo-b>/
│       ├── world.json
│       ├── assets/
│       └── backups/
└── backups/
    ├── auto-AAAA-MM-DD.json    backups diários do índice
    ├── imagens-sem-uso/        assets que não estão mais referenciados
    └── deleted-worlds/         projetos removidos do app, arquivados por segurança
```

O índice global guarda os metadados das coleções e uma entrada para cada mundo principal. Cada pasta dentro de `worlds/` representa uma árvore completa: o `world.json` contém o mundo principal e todos os descendentes, mantendo os relacionamentos entre IDs. As imagens ficam na pasta `assets/` daquela árvore.

O nome da pasta de projeto é um hash estável do ID do mundo principal. Assim, renomear o mundo não exige mover arquivos nem quebrar referências. No JSON, as imagens usam caminhos relativos como `worlds/ab12.../assets/imagem.png`; na memória, viram URLs `atelier://app/@ws/...` para que a interface continue usando `<img>` e `background-image` normalmente.

## Migração e compatibilidade

Ao abrir um Workspace antigo que contenha um `world-atelier.json` monolítico, `readData()` migra automaticamente os dados para o formato por projeto. As imagens que estavam em `assets/` na raiz são copiadas para os diretórios dos respectivos projetos e os caminhos são atualizados. O arquivo anterior é mantido em backup antes de ser substituído.

A interface continua recebendo um único objeto `{ shelves, worlds, ... }`. Essa decisão evita reescrever a lógica de personagens, Lore, calendário, relacionamentos e histórias apenas para mudar o formato físico de armazenamento.

## Exportar e importar projetos

Um arquivo `.worldatelier` é um ZIP com:

- `manifest.json`: formato, versão, ID e nome do mundo principal;
- `world.json`: mundo principal e sua árvore completa de sub-mundos;
- `assets/`: imagens referenciadas por qualquer mundo daquela árvore.

Na exportação, as referências de imagem são convertidas para caminhos internos `assets/<arquivo>`. Na importação, os caminhos são adaptados para a pasta do projeto no Workspace de destino. Se algum ID já existir, o importador gera novos IDs para os elementos em conflito e atualiza referências, links internos e chaves de pares. A importação adiciona o projeto à coleção padrão e nunca substitui automaticamente os dados existentes.

O leitor ZIP valida os caminhos, CRCs, métodos de compressão e limites de tamanho antes de gravar qualquer asset, para evitar traversal e arquivos inválidos.

## Segurança

`contextIsolation`, `sandbox` e `nodeIntegration: false` permanecem ativos. A interface não recebe acesso direto ao sistema de arquivos. O protocolo `atelier://app/` só serve arquivos do app e assets contidos nos caminhos permitidos do Workspace. Chamadas IPC são aceitas somente da origem `atelier://app/`.
