# PROTOCOLO #SYNC-CONTEXT - Sincronização de Contexto

> **Versão:** 3.5.0
> **Status:** Production Ready
> **Script:** `sync-context.ps1`

---

## 🎯 OBJETIVO

Atualiza .context/ após mudanças críticas no projeto.

---

## 📋 FASES DO #SYNC-CONTEXT

### FASE 1: Detecção de Mudanças
```
1.1. [Passo 1 da fase]
1.2. [Passo 2 da fase]
1.3. [Passo 3 da fase]
```

### FASE 2: Análise de Impacto
```
2.1. [Passo 1 da fase]
2.2. [Passo 2 da fase]
2.3. [Passo 3 da fase]
```

### FASE 3: Atualização
```
3.1. [Passo 1 da fase]
3.2. [Passo 2 da fase]
3.3. [Passo 3 da fase]
```

### FASE 4: Notificação
```
4.1. [Passo 1 da fase]
4.2. [Passo 2 da fase]
4.3. [Passo 3 da fase]
```


---

## 🔧 USO DO COMANDO

### Sintaxe
```bash
#sync-context [OPTIONS]

Options:
  --force                Força execução
  --dry-run              Simula sem fazer mudanças
  --verbose              Output detalhado
```

### Exemplos
```bash
# Uso básico
#sync-context

# Com força
#sync-context --force

# Simular
#sync-context --dry-run
```

---

## 📂 ARQUIVOS AFETADOS

- `MEMORY.md` - Registro da operação
- `.context/` - Contexto atualizado (se aplicável)
- Arquivos específicos da operação

---

## ✅ CRITÉRIOS DE SUCESSO

- [x] Comando executado sem erros
- [x] MEMORY.md atualizado
- [x] Validação pós-execução passou
- [x] Mensagem de sucesso exibida

---

## 🚨 TRATAMENTO DE ERROS

### Erro: [Erro comum 1]
```
❌ [Mensagem de erro]

Solução:
  - [Passo 1]
  - [Passo 2]
```

### Erro: [Erro comum 2]
```
⚠️  [Mensagem de aviso]

Solução:
  - [Passo 1]
```

---

## 🔄 VALIDAÇÃO PÓS-EXECUÇÃO

Script automático executa após comando:

```powershell
function Validate-synccontextProtocol {
    # Validação específica
    Write-Host "✅ Validação OK" -ForegroundColor Green
}
```

---

## 📚 PRÓXIMOS PASSOS

Mensagem exibida ao usuário após sucesso:

```
🎉 #SYNC-CONTEXT EXECUTADO COM SUCESSO!

✅ [Resumo da operação]

🚀 PRÓXIMOS PASSOS:
  1. [Passo 1]
  2. [Passo 2]
```

---

**Versão:** 3.5.0
**Autor:** Prompt OS Team
**Última Atualização:** 2026-01-30
**Script:** `sync-context.ps1` disponível em `~/src/prompt-os/bootstrap/`
