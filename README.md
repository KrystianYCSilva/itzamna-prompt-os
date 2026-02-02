# Itzamna PromptOS

🧠 **Sistema Auto-Evolutivo para Programação Paralela Humano-Agente**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)

## 🎯 Sobre

O Itzamna PromptOS é um "cérebro" simplificado que **auto-gera skills, personas e prompts** para desenvolvimento de software através de um fluxo estruturado:

```
Research → Generation → Human Approval → Commit
```

### Características

- ✅ **Auto-evolutivo**: Gera conteúdo automaticamente baseado em pesquisa
- ✅ **Aprovação Humana**: Garante qualidade através de revisão manual
- ✅ **Compatível**: GitHub Spec-Kit, Claude Code, Cursor, Copilot
- ✅ **Extensível**: Templates customizáveis e workflow modular
- ✅ **Focado**: Escopo inicial em Skills de Programação/Tecnologia

## 🚀 Quick Start

```bash
# Instalar dependências
pip install pyyaml

# Gerar uma skill de programação
python core/cli.py generate --topic "Python Async" --type skill

# Executar workflow completo
python core/cli.py workflow --topic "Docker" --type skill
```

## 📁 Estrutura

```
itzamna-prompt-os/
├── skills/      # Skills de programação geradas
├── personas/    # Personas de agentes especializados
├── prompts/     # Templates de prompts
├── core/        # Sistema principal (orchestrator, CLI)
├── templates/   # Templates para geração
└── config/      # Configurações do sistema
```

## 📖 Documentação

Para documentação completa, veja [DOCUMENTATION.md](DOCUMENTATION.md)

### Comandos Principais

- `generate` - Gera conteúdo (skill/persona/prompt)
- `workflow` - Executa fluxo completo
- `research` - Pesquisa um tópico
- `list` - Lista conteúdo gerado
- `info` - Informações do sistema

## 💡 Exemplos

### Gerar Skill
```bash
python core/cli.py generate --topic "React Hooks" --type skill --save
```

### Gerar Persona
```bash
python core/cli.py generate --topic "DevOps" --type persona --save
```

### Gerar Prompt
```bash
python core/cli.py generate --topic "Code Review" --type prompt --save
```

## 🔧 Configuração

Edite `config/system.yaml` para customizar o comportamento do sistema.

## 🤝 Compatibilidade

- **GitHub Spec-Kit**: Conteúdo estruturado para specs
- **Claude Code**: Personas otimizadas para Claude
- **Cursor**: Skills como contexto para Cursor
- **Copilot**: Prompts compatíveis com Copilot

## 📝 Status

**Especificação Completa para Implementação** ✅

O sistema implementa:
- ✅ Pesquisa de tópicos
- ✅ Geração automática de conteúdo
- ✅ Fluxo de aprovação humana
- ✅ Commit de conteúdo aprovado
- ✅ CLI para interação
- ✅ Templates extensíveis
- ✅ Exemplos de uso

## 🗺️ Roadmap

### v1.1
- Integração com LLMs para pesquisa
- Interface web para aprovação
- Versionamento automático

### v2.0
- Aprendizado baseado em uso
- Sugestões automáticas
- Dashboard de métricas

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja [DOCUMENTATION.md](DOCUMENTATION.md) para detalhes.

## 📄 Licença

MIT License - veja LICENSE para detalhes

---

**Desenvolvido para programação paralela humano-agente** 🚀
