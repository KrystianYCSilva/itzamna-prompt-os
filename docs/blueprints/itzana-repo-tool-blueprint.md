# Itzana Repo Tool Blueprint (Spec-Kit-Style)

> **Status:** Blueprint (draft)  
> **Created:** 2026-02-04  
> **Scope:** Ferramenta estilo Spec-Kit para baixar/instalar/atualizar/remover repositorios GitHub  
> **Separacao Critica:** NAO usa grammar de chat (#commands). E uma ferramenta propria.

---

## 1. Visao Geral

Este blueprint define uma ferramenta chamada **itzana** com comandos no estilo Spec-Kit para:
- baixar e instalar repositorios GitHub no projeto,
- atualizar repos instalados,
- remover repos instalados,
- listar/status dos repos gerenciados.

**Objetivo principal:** fornecer um fluxo claro e repetivel de gestao de repos sem conflitar com comandos de chat (`#init`, `#add`, etc.).

---

## 2. Decisoes Chave

- **Nome da ferramenta:** `itzana`
- **Diretorio padrao de instalacao:** `external/`
- **Indice local:** `.prompt-os/repos/INDEX.md` (ou `.prompt-os/repos.json` se optar por formato maquina)
- **Separacao de canais:** comandos da ferramenta NAO sao comandos de chat.

---

## 3. Comandos (estilo Spec-Kit)

### 3.1. Base
```
itzana repo <action> [args] [flags]
```

### 3.2. Comandos principais
| Comando | Exemplo | Acao |
|--------|---------|------|
| `itzana repo add <git_url>` | `itzana repo add https://github.com/foo/bar` | Clona repo para `external/` e registra |
| `itzana repo update <name|path>` | `itzana repo update bar` | Atualiza repo instalado |
| `itzana repo remove <name|path>` | `itzana repo remove bar` | Remove do indice |
| `itzana repo list` | `itzana repo list` | Lista repos instalados |
| `itzana repo status [name|path]` | `itzana repo status bar` | Mostra status do repo |

### 3.3. Flags padrao
| Flag | Tipo | Descricao |
|------|------|-----------|
| `--dir <path>` | opcional | Define diretorio de instalacao (default: `external/`) |
| `--name <id>` | opcional | Nome logico do repo (slug) |
| `--ref <branch|tag|sha>` | opcional | Checkout especifico |
| `--dry-run` | opcional | Simula sem alteracoes |
| `--help` | opcional | Mostra ajuda |

---

## 4. Estrutura de Diretorios

```
external/
└── <repo-name>/

.prompt-os/
└── repos/
    ├── INDEX.md
    └── (opcional) repos.json
```

---

## 5. Fluxos de Operacao

### 5.1. Add (instalacao)
1. Validar URL.
2. Resolver nome (via `--name` ou slug do repo).
3. Verificar se ja existe.
4. Clonar para `external/<name>`.
5. Registrar no indice local.
6. Exibir resumo e status.

### 5.2. Update
1. Localizar repo (por nome ou path).
2. `git fetch` + `git pull` (ou `git checkout <ref>` se flag usada).
3. Atualizar `last_updated` no indice.

### 5.3. Remove
1. Localizar repo.
2. Remover do indice.
3. Se `--hard`, deletar diretorio fisico.

### 5.4. List/Status
1. Ler indice local.
2. Mostrar nome, path, ref, status.

---

## 6. Modelo de Indice (proposta)

### 6.1. INDEX.md (humano)
```markdown
# Repos Externos

| Nome | URL | Path | Ref | Status | Last Updated |
|------|-----|------|-----|--------|--------------|
| itzana-core | https://github.com/org/itzana-core | external/itzana-core | main | ok | 2026-02-04 |
```

### 6.2. repos.json (maquina, opcional)
```json
[
  {
    "name": "itzana-core",
    "url": "https://github.com/org/itzana-core",
    "path": "external/itzana-core",
    "ref": "main",
    "last_updated": "2026-02-04"
  }
]
```

---

## 7. Erros e Mensagens

- URL invalida -> erro claro + exemplo correto.
- Repo ja instalado -> sugerir `update`.
- Nome nao encontrado -> mostrar `list`.
- Falha no git -> retornar output e sugerir `--verbose`.

---

## 8. Compatibilidade e Seguranca

- Nunca executar comandos destrutivos sem confirmacao.
- `--dry-run` disponivel em todas as operacoes.
- Nao aceitar URLs locais por padrao (evitar path traversal).

---

## 9. Integracao com PromptOS (sem conflito com chat)

- **Chat** continua usando `#commands`.
- **Ferramenta** usa `itzana repo ...`.
- Nenhum parsing de chat e reutilizado.

---

## 10. Roadmap (futuro)

- Suporte a registries privados
- Cache de versions/tags
- Suporte a `git submodule` opcional
- "Lockfile" de dependencias externas

---

**EOF**
