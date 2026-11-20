# Migração para salvamentos por projeto

A versão com Workspace por projeto continua aceitando a estrutura antiga:

```text
Pasta antiga/
├── world-atelier.json
├── assets/
└── backups/
```

Na primeira abertura desta versão, o aplicativo:

1. Lê o JSON antigo e confirma que ele contém a lista de mundos.
2. Cria `worlds/<hash>/` para cada mundo principal.
3. Agrupa cada sub-mundo junto do mundo principal correspondente.
4. Copia as imagens antigas para o `assets/` da árvore correspondente e atualiza os caminhos relativos.
5. Cria o novo `world-atelier.json` como índice global.
6. Mantém uma cópia do arquivo antigo em `backups/auto-AAAA-MM-DD.json`.

**Recomendação:** antes de abrir uma versão nova, copie a pasta inteira do Workspace para outro lugar. A migração é automática, mas uma cópia manual é a proteção mais simples.

## Arquivo de projeto

Na estante, o botão de exportação do mundo principal gera um `.worldatelier` com o mundo principal, todos os seus sub-mundos descendentes e todas as imagens referenciadas. Na tela inicial, **Importar mundo** adiciona o arquivo à coleção padrão.

Se o projeto importado tiver IDs que já existem no Workspace, os IDs conflitantes são recriados e suas referências conhecidas (parentesco, membros de vínculos, pares e links internos) são atualizadas. Os projetos existentes não são substituídos.
