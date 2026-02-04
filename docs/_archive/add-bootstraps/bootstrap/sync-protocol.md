# PROTOCOLO #SYNC - Sincronização Multi-Agent

> **Versão:** 3.5.0
> **Status:** Production Ready
> **Script:** `sync.ps1`

---

## 🎯 OBJETIVO

Garantir que múltiplos agentes trabalhando em paralelo mantenham um estado de verdade único no `MEMORY.md`. Este protocolo resolve a divergência de informações e consolida decisões arquiteturais.

---

## 📋 FASES DO #SYNC

### FASE 1: Detecção de Fragmentos
1.1. Verificar a existência do diretório `.memory/`.
1.2. Listar todos os arquivos `session-*.md` pendentes.
1.3. Ler o `MEMORY.md` atual para identificar a versão e o checkpoint mais recente.

### FASE 2: Identificação de Conflitos
2.1. Comparar as seções `## Decisions` de cada sessão com o `MEMORY.md`.
2.2. Se dois agentes tomaram decisões conflitantes (ex: diferentes stacks para a mesma task), marcar para resolução humana.
2.3. Se as decisões são complementares, preparar para o merge.

### FASE 3: Consolidação (Merge)
3.1. Executar o script `sync.ps1`.
3.2. O script moverá o conteúdo de progresso e decisões para o topo da seção `## Recent Actions` no `MEMORY.md`.
3.3. Arquivar as sessões processadas em `.memory/archive/`.

### FASE 4: Validação de Estado
4.1. Verificar se a assinatura do sistema em `.prompt-os-signature` reflete a data do último sync.
4.2. Garantir que o `MEMORY.md` não exceda 500 linhas (arquivar histórico se necessário).
4.3. Confirmar que o "Current State" no `MEMORY.md` reflete a soma de todos os progressos sincronizados.

---

## 🔧 USO DO COMANDO

### Sintaxe
```bash
#sync [OPTIONS]

Options:
  --verbose              Exibe detalhes de cada sessão processada
  --dry-run              Apenas simula a consolidação sem alterar arquivos
```

---

## 📂 ARQUIVOS AFETADOS

- `MEMORY.md` - Ponto central de verdade atualizado.
- `.memory/session-*.md` - Movidos para archive.
- `.prompt-os-signature` - Data de sync atualizada.

---

## ✅ CRITÉRIOS DE SUCESSO

- [x] Nenhuma sessão pendente em `.memory/` (exceto em archive).
- [x] `MEMORY.md` contém o log consolidado de todos os agentes ativos.
- [x] Conflitos explicitamente sinalizados no log de sync.
- [x] Build do projeto continua passando (T0 check).

---

## 🚨 TRATAMENTO DE ERROS

### Erro: Conflito de Decisão
```
❌ Erro: Agentes 'A' e 'B' divergem sobre [Tópico].

Solução:
  - IA pausa a operação.
  - Solicita ao usuário uma decisão final ("Tie-breaker").
  - Após resposta, executa #sync novamente.
```

### Erro: MEMORY.md Bloqueado
```
⚠️  Aviso: Falha ao escrever em MEMORY.md (permissão ou trava).

Solução:
  - Tentar novamente com privilégios elevados.
  - Verificar se o arquivo está aberto em outro processo.
```

---

**Versão:** 3.5.0
**Autor:** Prompt OS Team
**Última Atualização:** 2026-01-29
**Script:** `sync.ps1` disponível em `~/src/prompt-os/bootstrap/`