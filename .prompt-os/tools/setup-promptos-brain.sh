#!/bin/bash
# setup-promptos-brain.sh
# Execute: chmod +x setup-promptos-brain.sh && ./setup-promptos-brain.sh

set -e  # Para em caso de erro

echo "Criando estrutura do PromptOS Brain..."

# Diretorio base (ajuste conforme necessario)
BASE_DIR="${PWD}"

# Criar estrutura de diretorios
mkdir -p "${BASE_DIR}"/{skills,personas,.prompt-os/{core,templates,scripts,prompts}}

# Criar arquivos de indice
cat > "${BASE_DIR}/skills/INDEX.md" << 'EOF'
# Skills do PromptOS

| Nome | Dominio | Status | Data | Autor |
|------|---------|--------|------|-------|
EOF

cat > "${BASE_DIR}/personas/INDEX.md" << 'EOF'
# Personas do PromptOS

| Nome | Tipo | Status | Data | Autor |
|------|------|--------|------|-------|
EOF

# Criar MEMORY.md inicial
cat > "${BASE_DIR}/MEMORY.md" << 'EOF'
# MEMORY.md - Estado Persistente do PromptOS Brain

**Ultima Atualizacao:** $(date -Iseconds)
**Versao:** 1.0.0
**Sessoes Totais:** 0

---

## Estatisticas

| Metrica | Valor |
|---------|-------|
| Skills Geradas | 0 |
| Personas Geradas | 0 |
| Taxa de Aprovacao | N/A |

---

## Memoria Episodica Recente

(Vazio - nenhuma interacao registrada)

---

## Pendencias

- [ ] Criar primeira skill de teste
EOF

echo "Estrutura criada em ${BASE_DIR}"
echo ""
echo "Proximos passos:"
echo "1. Configurar AGENTS.md"
echo "2. Inicializar Spec-Kit: speckit init --here --ai claude"
echo "3. Testar geracao de skill"
