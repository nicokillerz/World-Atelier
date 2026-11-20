# Publicar uma versão (GitHub Releases)

## Uma vez só

1. Crie o repositório no GitHub e envie o código:
   ```bash
   git init && git add . && git commit -m "World Atelier 1.0.0"
   git branch -M main
   git remote add origin https://github.com/nicokillerz/World-Atelier.git
   git push -u origin main
   ```
2. O projeto está configurado para `https://github.com/nicokillerz/World-Atelier`. Confirme que o `origin` do seu clone aponta para esse repositório.
3. No GitHub: *Settings → Actions → General → Workflow permissions* = **Read and write permissions**.

## A cada versão

```bash
# 1) edite "version" em package.json (ex.: 1.2.0) e o CHANGELOG.md
git commit -am "Versão 1.2.0"
# 2) crie a tag e envie
git tag v1.2.0
git push origin main --tags
```

O workflow `.github/workflows/release.yml` roda num Windows do GitHub, executa os testes, gera
`WorldAtelier-Setup-x.y.z.exe` (instalador) e `WorldAtelier-x.y.z-portable.exe` e os anexa à Release da tag
(com notas automáticas).

## Compilar localmente (opcional)

```bash
npm install
npm run dist      # arquivos em dist/
```

## Assinatura de código e o aviso do SmartScreen

Sem certificado, o Windows mostra um aviso na primeira execução. Para removê-lo é preciso um certificado de assinatura
(pago). Quando tiver um, defina os segredos `CSC_LINK` e `CSC_KEY_PASSWORD` no GitHub e remova a linha
`CSC_IDENTITY_AUTO_DISCOVERY: 'false'` do workflow.

## Atualizações automáticas

Não estão incluídas (o app não se conecta à internet). Quem quiser atualizar baixa a nova Release; os dados
ficam na pasta escolhida e continuam compatíveis.
