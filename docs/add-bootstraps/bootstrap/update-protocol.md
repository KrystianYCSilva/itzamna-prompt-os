# PROTOCOLO #UPDATE - Atualização de Versão

> **Versão:** 3.5.0
> **Status:** Production Ready
> **Script:** `update.ps1`

---

## 🎯 OBJETIVO

Garantir que o projeto local utilize as melhores práticas, skills e personas mais recentes disponíveis na biblioteca central do Prompt OS. Este protocolo automatiza a transição entre versões e mitiga o risco de breaking changes.

---

## 📋 FASES DO #UPDATE

### FASE 1: Verificação de Compatibilidade
1.1. Comparar a versão em `.prompt-os-signature` com `~/src/prompt-os/VERSION.txt`.
1.2. Identificar se a atualização é um patch (v3.5.1), minor (v3.6.0) ou major (v4.0.0).
1.3. Ler a seção de "Breaking Changes" no `CHANGELOG.md` da biblioteca central.

### FASE 2: Snapshot de Segurança (Backup)
2.1. O script `update.ps1` cria uma cópia temporária do `MEMORY.md` e `.context/`.
2.2. Garante que o diretório `docs/archive/` esteja acessível para logs de migração.

### FASE 3: Aplicação de Patches e Migrações
3.1. Atualizar ponteiros em `AGENTS.md` para as novas localizações de skills/personas.
3.2. Executar scripts de migração de schema (se houver mudança no formato de cards ou memória).
3.3. Substituir templates antigos por novas versões em `src/prompt-os/templates/`.

### FASE 4: Re-Assinatura do Sistema
4.1. Atualizar o arquivo `.prompt-os-signature` com a nova versão e timestamp.
4.2. Registrar a atualização no `MEMORY.md` com o resumo das mudanças aplicadas.
4.3. Notificar o usuário sobre novos comandos ou mudanças de workflow.

---

## 🔧 USO DO COMANDO

### Sintaxe
```bash
#update [OPTIONS]

Options:
  --version <X.X.X>      Força atualização para uma versão específica
  --force                Executa a migração mesmo se a versão já for a atual
  --dry-run              Lista as mudanças sem alterar arquivos locais
```

---

## 📂 ARQUIVOS AFETADOS

- `.prompt-os-signature` - Versão atualizada.
- `MEMORY.md` - Log de atualização registrado.
- `AGENTS.md` - Ponteiros de sistema atualizados.
- `.context/templates/` - Modelos locais atualizados.

---

## ✅ CRITÉRIOS DE SUCESSO

- [x] Assinatura local coincide com a versão global desejada.
- [x] Nenhuma falha de link detectada nos novos templates.
- [x] Log de migração anexado ao `MEMORY.md`.
- [x] Comandos core (#new, #impl) continuam operacionais.

---

## 🚨 TRATAMENTO DE ERROS

### Erro: Versão Incompatível
```
❌ Erro: Salto de versão muito grande (v3.0 → v3.5).

Solução:
  - IA recomenda atualização incremental (v3.0 → v3.1 → ...).
  - Ou executa o script de migração cumulativa se disponível.
```

---

**Versão:** 3.5.0
**Autor:** Prompt OS Team
**Última Atualização:** 2026-01-29
**Script:** `update.ps1` disponível em `~/src/prompt-os/bootstrap/`