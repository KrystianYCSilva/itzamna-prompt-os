# setup-promptos-brain.ps1
# Execute: .\setup-promptos-brain.ps1

$ErrorActionPreference = "Stop"

Write-Host "Criando estrutura do PromptOS Brain..." -ForegroundColor Cyan

# Diretorio base
$BaseDir = Get-Location

# Criar estrutura
$dirs = @(
    "skills",
    "personas",
    ".prompt-os\core",
    ".prompt-os\templates",
    ".prompt-os\scripts",
    ".prompt-os\prompts"
)

foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Force -Path (Join-Path $BaseDir $dir) | Out-Null
}

# Criar INDEX.md para skills
@"
# Skills do PromptOS

| Nome | Dominio | Status | Data | Autor |
|------|---------|--------|------|-------|
"@ | Set-Content (Join-Path $BaseDir "skills\INDEX.md")

# Criar INDEX.md para personas
@"
# Personas do PromptOS

| Nome | Tipo | Status | Data | Autor |
|------|------|--------|------|-------|
"@ | Set-Content (Join-Path $BaseDir "personas\INDEX.md")

# Criar MEMORY.md
$timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ss"
@"
# MEMORY.md - Estado Persistente do PromptOS Brain

**Ultima Atualizacao:** $timestamp
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
"@ | Set-Content (Join-Path $BaseDir "MEMORY.md")

Write-Host "Estrutura criada em $BaseDir" -ForegroundColor Green
Write-Host ""
Write-Host "Proximos passos:" -ForegroundColor Yellow
Write-Host "1. Configurar AGENTS.md"
Write-Host "2. Inicializar Spec-Kit: speckit init --here --ai claude"
Write-Host "3. Testar geracao de skill"
