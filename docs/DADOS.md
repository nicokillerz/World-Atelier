# Formato dos dados

O Workspace usa um índice global e um arquivo JSON por árvore de mundos.

## Índice global: `world-atelier.json`

```jsonc
{
  "format": "world-atelier-workspace-v2",
  "version": 2,
  "meta": {
    "shelves": [{ "id": "…", "n": "Minha coleção" }],
    "showSub": false
  },
  "projects": [
    { "id": "…", "folder": "hash-estavel-de-16-caracteres", "name": "Vael'Thar", "shelf": "…" }
  ]
}
```

## Projeto: `worlds/<hash>/world.json`

```jsonc
{
  "format": "world-atelier-project-v1",
  "rootId": "…",
  "worlds": [
    {
      "id": "…", "name": "Vael'Thar", "par": "",
      "cv": { "img": "worlds/<hash>/assets/capa.png" },
      "chars": [{ "id": "…", "name": "…", "images": [{ "src": "worlds/<hash>/assets/retrato.png" }] }],
      "wiki": [], "gal": [], "rels": [], "stories": [], "locations": []
    },
    { "id": "…", "name": "Capital", "par": "ID-DO-MUNDO-PAI", "chars": [] }
  ]
}
```

Todos os sub-mundos descendentes ficam no mesmo arquivo do mundo principal. Os IDs e o campo `par` preservam a hierarquia. Cada árvore tem sua própria pasta `assets/`, evitando que imagens de projetos diferentes se misturem.

## Imagens

As imagens nunca ficam embutidas nos JSONs de trabalho: são arquivos em `worlds/<hash>/assets/`, e os dados guardam caminhos relativos. Imagens antigas em `assets/` na raiz são migradas automaticamente quando o Workspace antigo é aberto pela primeira vez.

## Arquivo portátil `.worldatelier`

O arquivo `.worldatelier` é um ZIP padrão com `manifest.json`, `world.json` e `assets/`. Ele contém o mundo principal selecionado, todos os sub-mundos descendentes e todas as imagens referenciadas por essa árvore. Na importação, IDs em conflito são remapeados e o projeto é adicionado sem substituir os demais.
