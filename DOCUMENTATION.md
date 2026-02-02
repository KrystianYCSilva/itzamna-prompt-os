# Itzamna PromptOS - Sistema Auto-Evolutivo

🧠 **Cérebro simplificado para programação paralela humano-agente**

## Visão Geral

O Itzamna PromptOS é um sistema auto-evolutivo que automatiza a criação de skills, personas e prompts para programação e desenvolvimento de software. O sistema segue um fluxo estruturado que garante qualidade através de aprovação humana.

### Fluxo do Sistema

```
┌─────────────┐      ┌────────────┐      ┌──────────┐      ┌────────┐
│  Research   │ ───▶ │ Generation │ ───▶ │ Approval │ ───▶ │ Commit │
│  (Pesquisa) │      │  (Geração) │      │ (Humana) │      │        │
└─────────────┘      └────────────┘      └──────────┘      └────────┘
```

1. **Research**: Pesquisa informações sobre um tópico
2. **Generation**: Gera conteúdo baseado na pesquisa
3. **Approval**: Revisão e aprovação humana
4. **Commit**: Salva o conteúdo aprovado no repositório

## Instalação

### Requisitos
- Python 3.8+
- PyYAML (para parsing de configurações)

```bash
# Clone o repositório
git clone https://github.com/KrystianYCSilva/itzamna-prompt-os.git
cd itzamna-prompt-os

# Instale dependências
pip install pyyaml
```

## Uso Rápido

### Gerar uma Skill

```bash
python core/cli.py generate --topic "Python Async" --type skill
```

### Gerar uma Persona

```bash
python core/cli.py generate --topic "React" --type persona
```

### Gerar um Prompt

```bash
python core/cli.py generate --topic "Code Review" --type prompt
```

### Workflow Completo

```bash
python core/cli.py workflow --topic "Docker" --type skill
```

## Estrutura do Projeto

```
itzamna-prompt-os/
├── config/
│   └── system.yaml          # Configuração do sistema
├── core/
│   ├── orchestrator.py      # Orquestrador principal
│   └── cli.py               # Interface de linha de comando
├── templates/
│   ├── skill_template.yaml
│   ├── persona_template.yaml
│   └── prompt_template.yaml
├── skills/                  # Skills geradas
│   └── example_python_async.md
├── personas/                # Personas geradas
│   └── example_python_expert.yaml
└── prompts/                 # Prompts gerados
    └── example_python_review.md
```

## Tipos de Conteúdo

### 1. Skills
Habilidades técnicas de programação documentadas de forma estruturada.

**Estrutura:**
- Descrição
- Conceitos Principais
- Melhores Práticas
- Casos de Uso
- Exemplos de Código
- Referências

**Exemplo:**
```bash
python core/cli.py generate --topic "TypeScript Generics" --type skill --save
```

### 2. Personas
Definições de agentes especializados com capacidades e personalidades definidas.

**Estrutura:**
- Role e Especialização
- Capabilities
- Personality Traits
- Communication Style
- Knowledge Domains

**Exemplo:**
```bash
python core/cli.py generate --topic "DevOps" --type persona --save
```

### 3. Prompts
Templates de prompts para assistentes especializados.

**Estrutura:**
- System Message
- Capabilities
- Guidelines
- Response Format
- Interaction Examples

**Exemplo:**
```bash
python core/cli.py generate --topic "API Design" --type prompt --save
```

## Comandos CLI

### `generate`
Gera conteúdo baseado em pesquisa.

```bash
python core/cli.py generate --topic "GraphQL" --type skill --save
```

Opções:
- `--topic`: Tópico a ser pesquisado (obrigatório)
- `--type`: Tipo de conteúdo (skill/persona/prompt)
- `--domain`: Domínio da pesquisa (default: programming)
- `--save`: Salva automaticamente após aprovação

### `workflow`
Executa o workflow completo (Research → Generate → Approve → Commit).

```bash
python core/cli.py workflow --topic "Rust" --type skill
```

Opções:
- `--topic`: Tópico a processar (obrigatório)
- `--type`: Tipo de conteúdo
- `--domain`: Domínio
- `--auto-approve`: Aprova automaticamente (use com cuidado!)

### `research`
Apenas pesquisa um tópico sem gerar conteúdo.

```bash
python core/cli.py research --topic "Kubernetes" --domain technology
```

### `list`
Lista conteúdo já gerado.

```bash
python core/cli.py list --type all
```

Opções:
- `--type`: skills/personas/prompts/all

### `info`
Mostra informações sobre o sistema.

```bash
python core/cli.py info
```

## Configuração

O arquivo `config/system.yaml` controla o comportamento do sistema:

```yaml
system:
  name: "Itzamna PromptOS"
  version: "1.0.0"

workflow:
  stages:
    - research
    - generation
    - approval
    - commit

approval:
  mode: "human"
  auto_approve: false
  review_required: true
```

## Integração com Ferramentas

### GitHub Spec-Kit
O sistema gera conteúdo compatível com GitHub Spec-Kit para fácil integração em repositórios.

### Claude Code
As personas e prompts são otimizados para uso com Claude Code.

### Cursor e Copilot
Skills e prompts podem ser usados diretamente como contexto para Cursor e GitHub Copilot.

## Exemplos de Uso

### Exemplo 1: Criar Skill de Next.js

```bash
# Gerar skill
python core/cli.py workflow --topic "Next.js App Router" --type skill

# Revisar conteúdo gerado
cat skills/programming_next.js_app_router.md

# Editar se necessário
vim skills/programming_next.js_app_router.md
```

### Exemplo 2: Criar Persona de Backend Expert

```bash
# Gerar persona
python core/cli.py generate --topic "Node.js Backend" --type persona

# Revisar e salvar
python core/cli.py generate --topic "Node.js Backend" --type persona --save
```

### Exemplo 3: Gerar Múltiplas Skills

```bash
# Script para gerar múltiplas skills
topics=("FastAPI" "SQLAlchemy" "Pytest" "Docker Compose")

for topic in "${topics[@]}"; do
    python core/cli.py workflow --topic "$topic" --type skill
done
```

## Boas Práticas

### Para Research
- Use tópicos específicos e bem definidos
- Especifique o domínio apropriado
- Considere o contexto e audiência

### Para Generation
- Revise o conteúdo gerado cuidadosamente
- Adicione exemplos práticos quando relevante
- Mantenha a consistência com conteúdo existente

### Para Approval
- **SEMPRE** revise antes de aprovar
- Valide a precisão técnica
- Verifique se há informações desatualizadas
- Teste exemplos de código quando possível

### Para Commit
- Use mensagens de commit descritivas
- Organize conteúdo em categorias lógicas
- Mantenha versionamento adequado

## Workflow Avançado

### Customização de Templates

Você pode customizar os templates em `templates/`:

```yaml
# templates/custom_skill_template.yaml
name: "{topic}_advanced_skill"
sections:
  - title: "Advanced Concepts"
  - title: "Architecture Patterns"
  - title: "Performance Optimization"
```

### Programmatic Usage

```python
from core.orchestrator import PromptOSOrchestrator

# Criar orchestrator
orchestrator = PromptOSOrchestrator()

# Executar workflow
research_data = orchestrator.research("FastAPI", "programming")
content = orchestrator.generate(research_data, "skill")
approved = True  # Após revisão manual
orchestrator.commit(content, approved)
```

## Roadmap

### v1.0 (Atual)
- ✅ Sistema base de Research → Generate → Approve → Commit
- ✅ CLI interface
- ✅ Templates para skills/personas/prompts
- ✅ Exemplos de conteúdo

### v1.1 (Próximo)
- [ ] Integração com LLMs para pesquisa automatizada
- [ ] Interface web para aprovação
- [ ] Versionamento automático de conteúdo
- [ ] Sistema de tags e categorização

### v2.0 (Futuro)
- [ ] Aprendizado baseado em uso
- [ ] Sugestões automáticas de novos tópicos
- [ ] Integração com CI/CD
- [ ] Dashboard de métricas

## Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

Este projeto está sob licença MIT. Veja o arquivo LICENSE para detalhes.

## Suporte

Para questões e suporte:
- Abra uma issue no GitHub
- Consulte a documentação
- Entre em contato com os mantenedores

---

**Desenvolvido com ❤️ para a comunidade de desenvolvimento**
