# SYNC-CONTEXT - Sincronizacao de Contexto e Indices

> **Versao:** 1.0.0
> **Tipo:** Core Workflow
> **Comandos:** `#sync`

---

## Objetivo

Garantir que os arquivos de contexto (.context/), as regras da constituicao e os indices de skills/personas estejam atualizados e consistentes.

---

## Fluxo de Execucao

1. **Sincronizar Constituicao**: Executar `sync-constitution.ps1` para propagar as regras T0 para as pastas de agentes (.claude, .gemini, etc.).
2. **Validar Indices**: Executar `validate-indices.py` para garantir que `INDEX.md` de skills e personas reflete a realidade do sistema de arquivos.
3. **Atualizar Estatisticas**: Garantir que as contagens de skills e personas nos indices estao corretas.
4. **Verificar Links**: Garantir que todos os caminhos nos indices apontam para arquivos existentes.
5. **Atualizar MEMORY.md**: Registrar a sincronizacao na memoria do projeto.

---

## Comandos de Suporte

### Windows (PowerShell)
```powershell
# Sincronizar Constituicao
pwsh .prompt-os/tools/ps1/sync-constitution.ps1 -Direction push -Force

# Validar Indices
py .prompt-os/scripts/validate-indices.py
```

### Unix/Mac/Bash
```bash
# Validar Indices
python3 .prompt-os/scripts/validate-indices.py
```

---

## Observacoes

- Se a validacao de indices falhar, corrija os erros apontados antes de prosseguir.
- O Human Gate e necessario se houver mudancas nos arquivos INDEX.md.
