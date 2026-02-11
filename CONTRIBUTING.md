# Contributing to Itzamna PromptOS

> **Obrigado por considerar contribuir com o Itzamna!**

---

## Code of Conduct

Este projeto adere ao [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md).

---

## How Can I Contribute?

### 1. Reportar Bugs

- **Verifique** se o bug ja foi reportado nas [Issues](../../issues)
- **Inclua**: versao do Itzamna (`itzamna version`), CLIs instalados, SO, passos para reproduzir

### 2. Sugerir Features

- **Leia** o [CONSTITUTION.md](./CONSTITUTION.md) (regras T0)
- **Revise** a arquitetura no README
- **Inclua**: problema, solucao proposta, impacto em T0 rules

### 3. Contribuir com Codigo

- **Fork** o repositorio
- **Crie** um branch (`git checkout -b feature/nome-descritivo`)
- **Siga** os padroes abaixo
- **Envie** um Pull Request

### 4. Melhorar Documentacao

Contribuicoes para `README.md`, `templates/`, `.context/` sao bem-vindas.

---

## Development Setup

### Pre-requisitos

- **Python 3.11+** - para rodar o CLI
- **uv** ou **pip** - para instalacao
- **Git** para controle de versao
- **Pelo menos 1 CLI de IA** instalado (Claude, Gemini, Codex, etc.)

### Clone e Setup

```bash
git clone https://github.com/seu-usuario/itzamna-prompt-os.git
cd itzamna-prompt-os

# Instale em modo development
pip install -e .

# Ou com uv
uv tool install --editable .

# Rode o init para verificar status
itzamna init
itzamna check

# Teste um comando
/itzamna.status
```

### Estrutura do Projeto

```
itzamna-prompt-os/
  CONSTITUTION.md           # T0 rules (NUNCA violar)
  README.md                 # Documentacao principal
  src/itzamna_cli/          # CLI Python
    __init__.py             # Logica principal (Typer/Rich)
  templates/                # Templates fonte
    kernel.md               # 3-level cognitive kernel (K1/K2/K3)
    agents-template.md      # AGENTS.md template
    constitution-template.md # T0/T1/T2 rules
    memory-template.md      # Episodic memory
    skill-template.md       # Skill creation
    commands/               # 4 slash commands
      itzamna.init.md
      itzamna.status.md
      itzamna.memory.md
      itzamna.context.md
    context/                # .context/ templates
      project.md
      tech.md
      rules.md
      enterprise/           # Enterprise structure
  core/                     # Core system files
    WORKFLOWS.md
    QUALITY-GATES.md
  pyproject.toml            # Package definition
```

---

## Coding Standards

### Conventional Commits

```
feat: adiciona suporte para novo CLI
fix: corrige deteccao de AI CLIs
docs: atualiza README com instrucoes de instalacao
refactor: simplifica logica do kernel K2
chore: atualiza templates
```

### Python Code Style

- **PEP 8** compliant
- **Type hints** obrigatorios
- **Docstrings** para funcoes publicas
- **Rich** para output formatado
- **Typer** para CLI interface

### Markdown Documentation

- **CommonMark** compliant
- **Titulos**: hierarquia correta (H1 -> H2 -> H3)
- **Codigo**: sempre usar fenced blocks com syntax highlight
- **Links**: relativos para arquivos locais

### T0 Rules Compliance

**Toda contribuicao DEVE seguir** [CONSTITUTION.md](./CONSTITUTION.md) T0 rules. Violacao = PR rejeitado.

---

## Testing

### Manual Testing Checklist

```
- [ ] itzamna init - Detecta CLIs corretamente
- [ ] itzamna check - Mostra status correto
- [ ] /itzamna.status - Retorna info do sistema
- [ ] /itzamna.memory - Le/atualiza MEMORY.md
- [ ] /itzamna.context - Gerencia .context/ directory
- [ ] Multi-CLI - Instala em todos CLIs detectados
- [ ] Templates validos - Kernel, agents, constitution carregam sem erro
```

### Testing New CLI Support

Quando adicionar suporte para novo CLI:

1. Adicione mapeamento em `CLI_CONFIGS`
2. Teste deteccao: `itzamna check`
3. Teste instalacao: `itzamna init --ai <novo-cli>`
4. Verifique que comandos foram instalados corretamente
5. Teste que comandos funcionam no CLI

---

## Pull Request Process

1. Branch atualizado com `main`
2. Conventional commits
3. T0 rules validadas
4. Documentacao atualizada (se aplicavel)
5. Testing checklist completado
6. Self-review feito

### PR Template

```markdown
## Descricao
[Descreva a mudanca]

## Motivacao
[Por que esta mudanca e necessaria?]

## Testing
- [ ] Testado manualmente
- [ ] CLIs detectados corretamente
- [ ] Comandos funcionam

## T0 Compliance
- [ ] Sem violacoes T0
- [ ] Sem secrets hardcoded
- [ ] Sem mudancas destrutivas automaticas

## Documentacao
- [ ] README atualizado (se necessario)
- [ ] CONSTITUTION.md respeitado
```

---

## Governance

Modelo **Ditador Benevolente** (fase inicial):
- Decisoes finais pelo mantenedor principal
- Contribuicoes via PR com review obrigatorio
- Comunicacao aberta via Issues/Discussions

---

## Links Uteis

| Recurso | Link |
|---------|------|
| CoALA Paper | https://arxiv.org/abs/2309.02427 |
| Context Engineering | [.context/ structure](templates/context/) |
| T0 Rules | [CONSTITUTION.md](./CONSTITUTION.md) |

---

**CONTRIBUTING.md** | Itzamna PromptOS v3.0.0
