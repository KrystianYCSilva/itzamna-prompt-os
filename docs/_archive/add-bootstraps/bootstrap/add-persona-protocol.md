# PROTOCOLO #ADD-PERSONA - Adicionar Persona Customizada

> **Versão:** 3.5.0
> **Status:** Production Ready
> **Script:** `add-persona.ps1`

---

## 🎯 OBJETIVO

Adiciona uma persona customizada ao projeto.

---

## 📋 FASES DO #ADD-PERSONA

### FASE 1: Template
```
1.1. [Passo 1 da fase]
1.2. [Passo 2 da fase]
1.3. [Passo 3 da fase]
```

### FASE 2: Skills
```
2.1. [Passo 1 da fase]
2.2. [Passo 2 da fase]
2.3. [Passo 3 da fase]
```

### FASE 3: Workflows
```
3.1. [Passo 1 da fase]
3.2. [Passo 2 da fase]
3.3. [Passo 3 da fase]
```

### FASE 4: Registro
```
4.1. [Passo 1 da fase]
4.2. [Passo 2 da fase]
4.3. [Passo 3 da fase]
```


---

## 🔧 USO DO COMANDO

### Sintaxe
```bash
#add-persona {nome} [OPTIONS]

Options:
  --force                Força execução
  --dry-run              Simula sem fazer mudanças
  --verbose              Output detalhado
```

### Exemplos
```bash
# Uso básico
#add-persona {nome}

# Com força
#add-persona {nome} --force

# Simular
#add-persona {nome} --dry-run
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
function Validate-addpersonaProtocol {
    # Validação específica
    Write-Host "✅ Validação OK" -ForegroundColor Green
}
```

---

## 📚 PRÓXIMOS PASSOS

Mensagem exibida ao usuário após sucesso:

```
🎉 #ADD-PERSONA {NOME} EXECUTADO COM SUCESSO!

✅ [Resumo da operação]

🚀 PRÓXIMOS PASSOS:
  1. [Passo 1]
  2. [Passo 2]
```

---

**Versão:** 3.5.0
**Autor:** Prompt OS Team
**Última Atualização:** 2026-01-30
**Script:** `add-persona.ps1` disponível em `~/src/prompt-os/bootstrap/`
