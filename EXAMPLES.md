# Examples - Itzamna PromptOS Usage

## Complete Usage Examples

### Example 1: Creating a React Hooks Skill

**Step 1: Research the topic**
```bash
$ python core/cli.py research --topic "React Hooks" --domain programming

🔍 Pesquisando: React Hooks

🔍 [RESEARCH] Pesquisando: React Hooks (domínio: programming)
✅ [RESEARCH] Pesquisa concluída para: React Hooks

domain: programming
findings:
  best_practices: []
  description: Pesquisa sobre React Hooks
  key_concepts: []
  use_cases: []
status: completed
timestamp: '2026-02-02T17:00:00.000000'
topic: React Hooks
```

**Step 2: Generate the skill**
```bash
$ python core/cli.py generate --topic "React Hooks" --type skill

🔄 Gerando skill sobre: React Hooks

🔍 [RESEARCH] Pesquisando: React Hooks (domínio: programming)
✅ [RESEARCH] Pesquisa concluída para: React Hooks
⚙️  [GENERATE] Gerando skill para: React Hooks
✅ [GENERATE] Skill gerado com sucesso

📄 Conteúdo gerado:
============================================================
# Skill: React Hooks

## Domínio
programming

## Descrição
Pesquisa sobre React Hooks

## Conceitos Principais
- useState: Gerenciamento de estado em componentes funcionais
- useEffect: Efeitos colaterais e ciclo de vida
- useContext: Consumo de contexto

## Melhores Práticas
1. Sempre chame Hooks no nível superior
2. Use apenas em componentes React ou custom Hooks
3. Prefira múltiplos useEffect específicos

[... rest of content ...]
============================================================
```

**Step 3: Run complete workflow with approval**
```bash
$ python core/cli.py workflow --topic "React Hooks" --type skill

🚀 Iniciando Workflow Auto-Evolutivo
   Tópico: React Hooks
   Tipo: skill
   Domínio: programming

🔍 [RESEARCH] Pesquisando: React Hooks (domínio: programming)
✅ [RESEARCH] Pesquisa concluída para: React Hooks
⚙️  [GENERATE] Gerando skill para: React Hooks
✅ [GENERATE] Skill gerado com sucesso

============================================================
👤 [APPROVAL] REVISÃO HUMANA NECESSÁRIA
============================================================

Tipo: skill
Nome: programming_react_hooks

[Content displayed for review...]

✓ Aprovação automática desabilitada - requer revisão manual
📝 Use o CLI para aprovar: python core/cli.py approve <id>
⚠️  [COMMIT] Conteúdo não aprovado - commit cancelado

⏸️  Workflow pausado - aguardando aprovação
```

---

### Example 2: Creating a DevOps Expert Persona

```bash
$ python core/cli.py generate --topic "DevOps" --type persona

🔄 Gerando persona sobre: DevOps

🔍 [RESEARCH] Pesquisando: DevOps (domínio: programming)
✅ [RESEARCH] Pesquisa concluída para: DevOps
⚙️  [GENERATE] Gerando persona para: DevOps
✅ [GENERATE] Persona gerado com sucesso

📄 Conteúdo gerado:
============================================================
metadata:
  generated_at: '2026-02-02T17:00:00.000000'
  status: pending_approval
  version: 1.0.0
name: devops_expert
role: Expert em DevOps
type: persona

capabilities:
- Conhecimento avançado em DevOps
- Resolução de problemas
- Melhores práticas

[... rest of content ...]
============================================================
```

---

### Example 3: Batch Generation of Multiple Skills

Create a bash script `generate_skills.sh`:

```bash
#!/bin/bash

# Topics to generate skills for
topics=(
    "Python Async"
    "React Hooks"
    "TypeScript Generics"
    "Docker Compose"
    "Kubernetes Pods"
    "GraphQL Queries"
    "PostgreSQL Indexes"
    "Redis Caching"
)

echo "🚀 Starting batch generation of skills..."
echo ""

for topic in "${topics[@]}"; do
    echo "─────────────────────────────────────────"
    echo "📚 Processing: $topic"
    echo "─────────────────────────────────────────"
    
    python core/cli.py workflow --topic "$topic" --type skill
    
    echo ""
    echo "✅ Completed: $topic"
    echo ""
    
    # Wait a moment between generations
    sleep 1
done

echo "─────────────────────────────────────────"
echo "🎉 Batch generation complete!"
echo ""
echo "📋 Listing generated skills:"
python core/cli.py list --type skills
```

Run it:
```bash
$ chmod +x generate_skills.sh
$ ./generate_skills.sh
```

---

### Example 4: Creating a Complete Ecosystem

**Goal**: Create skills, personas, and prompts for a Python project

```bash
# 1. Create skills for Python technologies
python core/cli.py workflow --topic "FastAPI" --type skill
python core/cli.py workflow --topic "Pydantic" --type skill
python core/cli.py workflow --topic "SQLAlchemy" --type skill
python core/cli.py workflow --topic "Pytest" --type skill

# 2. Create expert personas
python core/cli.py workflow --topic "Python Backend" --type persona
python core/cli.py workflow --topic "API Design" --type persona
python core/cli.py workflow --topic "Testing" --type persona

# 3. Create specialized prompts
python core/cli.py workflow --topic "Python Code Review" --type prompt
python core/cli.py workflow --topic "API Documentation" --type prompt
python core/cli.py workflow --topic "Test Writing" --type prompt

# 4. Review what was created
echo "📊 Project Ecosystem Overview:"
echo ""
echo "Skills:"
python core/cli.py list --type skills
echo ""
echo "Personas:"
python core/cli.py list --type personas
echo ""
echo "Prompts:"
python core/cli.py list --type prompts
```

---

### Example 5: Custom Research and Refinement

```bash
# Step 1: Research thoroughly
python core/cli.py research --topic "Microservices Architecture" --domain technology

# Step 2: Generate initial content
python core/cli.py generate --topic "Microservices Architecture" --type skill > microservices_draft.md

# Step 3: Review and edit manually
vim microservices_draft.md

# Step 4: When satisfied, copy to skills directory
cp microservices_draft.md skills/technology_microservices_architecture.md

# Step 5: Verify it's there
python core/cli.py list --type skills | grep microservices
```

---

### Example 6: Using Generated Content with AI Tools

#### With Claude Code
```python
# Load persona for context
with open('personas/example_python_expert.yaml', 'r') as f:
    persona = yaml.safe_load(f)

# Use as system prompt
system_prompt = f"""
You are a {persona['role']} with these capabilities:
{', '.join(persona['capabilities'])}

Communication style:
{', '.join(persona['communication_style'])}
"""
```

#### With Cursor
```python
# Add skill as context in Cursor
# File: .cursor/context.md

# Python Async Programming Skill
[Content from skills/example_python_async.md]

# React Hooks Skill
[Content from skills/programming_react_hooks.md]
```

#### With GitHub Copilot
```python
# Use prompts as inline comments
# Based on: prompts/example_python_review.md

# Review this code following Python best practices:
# - Check for type hints
# - Verify error handling
# - Suggest pythonic improvements

def process_data(data):
    # ... your code here ...
    pass
```

---

### Example 7: Programmatic Usage

Create `custom_workflow.py`:

```python
#!/usr/bin/env python3
from core.orchestrator import PromptOSOrchestrator

def main():
    # Initialize orchestrator
    orchestrator = PromptOSOrchestrator()
    
    # List of topics to process
    topics = [
        ("Go Concurrency", "skill"),
        ("Rust Ownership", "skill"),
        ("C++ Smart Pointers", "skill"),
    ]
    
    print("🚀 Starting custom workflow...\n")
    
    for topic, content_type in topics:
        print(f"Processing: {topic}")
        
        # Research
        research_data = orchestrator.research(topic, "programming")
        
        # Generate
        content = orchestrator.generate(research_data, content_type)
        
        # Display for review
        print(f"\n📄 Generated {content_type}: {topic}")
        print("─" * 60)
        print(content.get('content', content)[:200] + "...")
        print("─" * 60)
        
        # In real scenario, you'd add interactive approval here
        print(f"✅ {topic} ready for approval\n")
    
    print("🎉 Custom workflow complete!")

if __name__ == "__main__":
    main()
```

Run it:
```bash
$ python custom_workflow.py
```

---

### Example 8: Integration with Git Workflow

```bash
# Create feature branch for new skills
git checkout -b feature/add-typescript-skills

# Generate TypeScript-related content
python core/cli.py workflow --topic "TypeScript Interfaces" --type skill
python core/cli.py workflow --topic "TypeScript Generics" --type skill
python core/cli.py workflow --topic "TypeScript Decorators" --type skill

# Review generated files
ls -la skills/

# Commit the changes
git add skills/
git commit -m "Add TypeScript skills: Interfaces, Generics, Decorators"

# Push and create PR
git push origin feature/add-typescript-skills
```

---

### Example 9: Automated Quality Check

Create `quality_check.sh`:

```bash
#!/bin/bash

echo "🔍 Running quality checks on generated content..."
echo ""

# Check for empty files
echo "Checking for empty files..."
find skills personas prompts -type f -empty
if [ $? -eq 0 ]; then
    echo "✅ No empty files found"
else
    echo "⚠️  Empty files detected!"
fi

# Check file naming conventions
echo ""
echo "Checking naming conventions..."
python3 << EOF
import os
import re

issues = []

# Check skills
for file in os.listdir('skills'):
    if not re.match(r'^[a-z_]+\.md$', file):
        issues.append(f"Skills: {file} doesn't match naming convention")

# Check personas
for file in os.listdir('personas'):
    if not re.match(r'^[a-z_]+_persona\.yaml$', file) and not file.startswith('example'):
        issues.append(f"Personas: {file} doesn't match naming convention")

if issues:
    print("⚠️  Naming issues found:")
    for issue in issues:
        print(f"  - {issue}")
else:
    print("✅ All files follow naming conventions")
EOF

echo ""
echo "✅ Quality check complete!"
```

---

### Example 10: Interactive Session

```bash
# Start an interactive Python session
python3

>>> from core.orchestrator import PromptOSOrchestrator
>>> orchestrator = PromptOSOrchestrator()

# Explore system info
>>> print(f"System: {orchestrator.config['system']['name']}")
System: Itzamna PromptOS

>>> print(f"Version: {orchestrator.config['system']['version']}")
Version: 1.0.0

# Research interactively
>>> research = orchestrator.research("Elixir GenServer", "programming")
>>> print(research['topic'])
Elixir GenServer

# Generate content
>>> content = orchestrator.generate(research, "skill")
>>> print(content['name'])
programming_elixir_genserver

# Check metadata
>>> print(content['metadata'])
{'generated_at': '2026-02-02T17:00:00.000000', 'version': '1.0.0', 'status': 'pending_approval'}
```

---

## Tips for Best Results

1. **Be Specific**: Use specific topics like "Python Async/Await" instead of just "Python"

2. **Review Generated Content**: Always review and edit generated content before final use

3. **Iterate**: Generate → Review → Refine → Regenerate if needed

4. **Organize**: Keep related skills, personas, and prompts together

5. **Version Control**: Use git to track changes to generated content

6. **Customize Templates**: Modify templates in `templates/` for better results

7. **Add Examples**: Enhance generated content with real-world examples

8. **Document Context**: Add notes about when and why content was generated

---

**Need more examples?** Check [DOCUMENTATION.md](DOCUMENTATION.md) for comprehensive guide.
