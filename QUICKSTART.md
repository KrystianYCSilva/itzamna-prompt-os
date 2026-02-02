# Quick Start Guide - Itzamna PromptOS

## 🚀 Guia Rápido de 5 Minutos

### 1. Instalação

```bash
# Clone o repositório
git clone https://github.com/KrystianYCSilva/itzamna-prompt-os.git
cd itzamna-prompt-os

# Instale dependências
pip install -r requirements.txt
```

### 2. Verifique a Instalação

```bash
python core/cli.py info
```

Você deverá ver informações sobre o sistema e seus diretórios.

### 3. Liste Conteúdo Existente

```bash
python core/cli.py list --type all
```

Você verá alguns exemplos já incluídos no sistema.

### 4. Gere Sua Primeira Skill

```bash
python core/cli.py generate --topic "Python Async" --type skill
```

Isso irá:
1. Pesquisar o tópico "Python Async"
2. Gerar uma skill estruturada
3. Mostrar o conteúdo gerado para revisão

### 5. Execute um Workflow Completo

```bash
python core/cli.py workflow --topic "Docker Compose" --type skill
```

O sistema irá:
- 🔍 Pesquisar sobre Docker Compose
- ⚙️ Gerar uma skill estruturada
- 👤 Aguardar sua aprovação
- 💾 Salvar após aprovação

### 6. Explore os Exemplos

```bash
# Ver skill de exemplo
cat skills/example_python_async.md

# Ver persona de exemplo
cat personas/example_python_expert.yaml

# Ver prompt de exemplo
cat prompts/example_python_review.md
```

## 📚 Próximos Passos

### Gerar Diferentes Tipos de Conteúdo

**Skills:**
```bash
python core/cli.py generate --topic "React Hooks" --type skill
python core/cli.py generate --topic "GraphQL" --type skill
python core/cli.py generate --topic "Kubernetes" --type skill
```

**Personas:**
```bash
python core/cli.py generate --topic "Frontend" --type persona
python core/cli.py generate --topic "DevOps" --type persona
python core/cli.py generate --topic "Backend" --type persona
```

**Prompts:**
```bash
python core/cli.py generate --topic "Code Review" --type prompt
python core/cli.py generate --topic "Testing" --type prompt
python core/cli.py generate --topic "API Design" --type prompt
```

### Workflow Completo com Auto-Aprovação

⚠️ **Atenção:** Só use `--auto-approve` quando tiver certeza!

```bash
python core/cli.py workflow --topic "TypeScript" --type skill --auto-approve
```

### Pesquisar Antes de Gerar

```bash
# Pesquise um tópico
python core/cli.py research --topic "Microservices" --domain technology

# Depois gere conteúdo baseado na pesquisa
python core/cli.py generate --topic "Microservices" --type skill
```

## 🎯 Casos de Uso Comuns

### Caso 1: Documentar Nova Tecnologia

```bash
# Pesquisar
python core/cli.py research --topic "Svelte 5" --domain programming

# Gerar skill
python core/cli.py workflow --topic "Svelte 5" --type skill

# Revisar e editar se necessário
vim skills/programming_svelte_5.md
```

### Caso 2: Criar Assistente Especializado

```bash
# Gerar persona
python core/cli.py generate --topic "Security Expert" --type persona --save

# Gerar prompt correspondente
python core/cli.py generate --topic "Security Review" --type prompt --save
```

### Caso 3: Batch Generation

```bash
# Criar script para gerar múltiplas skills
topics=("FastAPI" "Pydantic" "SQLAlchemy" "Alembic" "Pytest")

for topic in "${topics[@]}"; do
    echo "Gerando skill para: $topic"
    python core/cli.py workflow --topic "$topic" --type skill
done
```

## 🔧 Customização

### Editar Configuração

```bash
vim config/system.yaml
```

### Customizar Templates

```bash
# Editar template de skill
vim templates/skill_template.yaml

# Editar template de persona
vim templates/persona_template.yaml

# Editar template de prompt
vim templates/prompt_template.yaml
```

## 💡 Dicas

1. **Especificidade**: Use tópicos específicos para melhores resultados
   - ✅ "Python Async/Await"
   - ❌ "Python"

2. **Revisão**: Sempre revise conteúdo gerado antes de aprovar
   - Valide informações técnicas
   - Teste exemplos de código
   - Adicione detalhes específicos

3. **Organização**: Mantenha conteúdo organizado
   - Use categorias lógicas
   - Adicione tags e metadata
   - Versione adequadamente

4. **Iteração**: Refine conteúdo gerado
   - Edite após geração
   - Adicione exemplos reais
   - Atualize referências

## 🆘 Solução de Problemas

### Erro: "No module named 'yaml'"
```bash
pip install pyyaml
```

### CLI não funciona
```bash
# Verifique Python
python --version  # Deve ser 3.8+

# Teste importação
python -c "from core.orchestrator import PromptOSOrchestrator"
```

### Diretórios não existem
```bash
# Recrie a estrutura
mkdir -p skills personas prompts core templates config
```

## 📖 Documentação Completa

Para mais detalhes, consulte [DOCUMENTATION.md](DOCUMENTATION.md)

## 🤝 Precisa de Ajuda?

- 📚 Leia a documentação completa
- 💬 Abra uma issue no GitHub
- 🐛 Reporte bugs
- 💡 Sugira melhorias

---

**Bom uso! 🚀**
