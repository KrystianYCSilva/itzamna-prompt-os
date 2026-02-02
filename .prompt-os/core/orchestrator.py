#!/usr/bin/env python3
"""
Itzamna PromptOS v1.0.0 - Orchestrator
Sistema Auto-Evolutivo para Programacao Paralela Humano-Agente

Gerencia o fluxo completo: Classify -> Research -> Generate -> Validate -> Approve -> Commit
Baseado na arquitetura CoALA simplificada documentada em ARCHITECTURE.md
"""

import os
import re
import yaml
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from datetime import datetime


class PromptOSOrchestrator:
    """
    Orquestrador principal do sistema auto-evolutivo.
    Implementa o pipeline de 6 fases conforme documentacao.
    """

    def __init__(self, config_path: str = None):
        # .prompt-os/core/ -> .prompt-os/ -> project root
        self.prompt_os_dir = Path(__file__).parent.parent
        self.base_path = self.prompt_os_dir.parent

        # Config dentro de .prompt-os/
        self.config_path = (
            self.prompt_os_dir / "system.yaml"
            if config_path is None
            else Path(config_path)
        )
        self.config = self._load_config()

        # Diretorios conforme nova estrutura documentada
        self.skills_dir = self.base_path / "skills"
        self.personas_dir = self.base_path / "personas"
        self.memory_file = self.base_path / "MEMORY.md"

        # Templates e prompts dentro de .prompt-os/
        self.templates_dir = self.prompt_os_dir / "templates"
        self.prompts_dir = self.prompt_os_dir / "prompts"

    def _load_config(self) -> Dict:
        """Carrega a configuracao do sistema"""
        if self.config_path.exists():
            with open(self.config_path, "r", encoding="utf-8") as f:
                return yaml.safe_load(f) or {}
        return self._default_config()

    def _default_config(self) -> Dict:
        """Configuracao padrao do sistema"""
        return {
            "system": {"name": "Itzamna PromptOS", "version": "1.0.0"},
            "generation": {"min_examples": 2, "require_constraints": True},
            "approval": {"mode": "human", "auto_approve": False},
        }

    # =========================================================================
    # FASE 1: CLASSIFY
    # =========================================================================

    def classify(self, description: str) -> Dict:
        """
        Fase 1: Classify
        Identifica tipo, dominio e complexidade do pedido.

        Args:
            description: Descricao do usuario (ex: "skill para GraphQL")

        Returns:
            Classificacao estruturada
        """
        print(f"[1] CLASSIFY - Analisando pedido...")

        # Detectar dominio
        domain_keywords = {
            "graphql": ["graphql", "apollo", "schema", "resolver", "mutation"],
            "react": ["react", "hook", "component", "jsx", "tsx", "redux", "nextjs"],
            "nodejs": ["node", "express", "fastify", "npm", "backend", "server"],
            "devops": ["docker", "kubernetes", "k8s", "ci/cd", "terraform", "ansible"],
            "security": ["auth", "jwt", "oauth", "security", "encryption", "owasp"],
            "database": [
                "sql",
                "postgres",
                "mysql",
                "mongodb",
                "redis",
                "orm",
                "prisma",
            ],
            "testing": ["test", "jest", "pytest", "cypress", "coverage", "tdd"],
            "api": ["rest", "api", "endpoint", "swagger", "openapi", "grpc"],
            "python": ["python", "django", "flask", "fastapi", "pandas", "numpy"],
            "typescript": ["typescript", "ts", "type", "interface", "generic"],
        }

        lower_desc = description.lower()
        detected_domain = "general"
        max_matches = 0

        for domain, keywords in domain_keywords.items():
            matches = sum(1 for kw in keywords if kw in lower_desc)
            if matches > max_matches:
                max_matches = matches
                detected_domain = domain

        # Detectar complexidade
        complex_indicators = [
            "arquitetura",
            "sistema completo",
            "enterprise",
            "avancado",
            "full",
        ]
        simple_indicators = ["basico", "simples", "introducao", "hello", "starter"]

        complexity = "medium"
        if any(ind in lower_desc for ind in complex_indicators):
            complexity = "complex"
        elif any(ind in lower_desc for ind in simple_indicators):
            complexity = "simple"

        # Determinar nivel cognitivo
        level = (
            "L1" if complexity == "simple" else "L2" if complexity == "medium" else "L3"
        )

        classification = {
            "description": description,
            "domain": detected_domain,
            "complexity": complexity,
            "level": level,
            "triggers": self._generate_triggers(description, detected_domain),
            "timestamp": datetime.now().isoformat(),
        }

        print(f"    Dominio: {detected_domain}")
        print(f"    Complexidade: {complexity}")
        print(f"    Nivel Cognitivo: {level}")

        return classification

    def _generate_triggers(self, description: str, domain: str) -> List[str]:
        """Gera triggers para a skill"""
        keywords = [w for w in description.split() if len(w) > 3]
        main_keyword = keywords[0] if keywords else domain

        return [
            f"trabalhar com {main_keyword}",
            f"criar {main_keyword}",
            f"usar {main_keyword}",
            description.lower()[:60],
        ]

    # =========================================================================
    # FASE 2: RESEARCH
    # =========================================================================

    def research(self, classification: Dict) -> Dict:
        """
        Fase 2: Research
        Pesquisa padroes e melhores praticas para o dominio.

        Args:
            classification: Resultado da fase Classify

        Returns:
            Dados de pesquisa estruturados
        """
        print(f"\n[2] RESEARCH - Pesquisando fontes...")

        domain = classification["domain"]

        # Padroes por dominio (mock - em producao, usar web search)
        domain_patterns = {
            "graphql": {
                "patterns": [
                    "Usar DataLoader para evitar N+1 queries",
                    "Implementar rate limiting por query complexity",
                    "Separar schema em modulos por dominio",
                    "Usar fragments para queries reutilizaveis",
                ],
                "antipatterns": [
                    "Expor todos os campos do banco diretamente",
                    "Ignorar depth limiting em queries aninhadas",
                    "Nao implementar autenticacao no context",
                ],
                "sources": [
                    {
                        "url": "https://graphql.org/learn/best-practices/",
                        "type": "official_docs",
                    },
                    {
                        "url": "https://www.apollographql.com/docs/",
                        "type": "official_docs",
                    },
                ],
            },
            "react": {
                "patterns": [
                    "Usar React.memo para componentes puros",
                    "Implementar custom hooks para logica reutilizavel",
                    "Separar componentes de apresentacao e logica",
                    "Usar useCallback e useMemo para otimizacao",
                ],
                "antipatterns": [
                    "Mutar estado diretamente",
                    "Usar indice como key em listas dinamicas",
                    "Fazer chamadas API dentro do render",
                ],
                "sources": [
                    {"url": "https://react.dev/learn", "type": "official_docs"},
                ],
            },
            "python": {
                "patterns": [
                    "Usar async/await para operacoes I/O",
                    "Implementar type hints para clareza",
                    "Usar context managers para recursos",
                    "Seguir PEP 8 para estilo de codigo",
                ],
                "antipatterns": [
                    "Usar variaveis globais mutaveis",
                    "Ignorar tratamento de excecoes",
                    "Nao documentar funcoes publicas",
                ],
                "sources": [
                    {"url": "https://docs.python.org/3/", "type": "official_docs"},
                    {"url": "https://peps.python.org/pep-0008/", "type": "style_guide"},
                ],
            },
        }

        # Padrao default
        default_research = {
            "patterns": [
                "Seguir principios SOLID",
                "Documentar funcoes publicas",
                "Escrever testes unitarios",
                "Usar nomes descritivos para variaveis",
            ],
            "antipatterns": [
                "Codigo duplicado",
                "Funcoes muito longas (>50 linhas)",
                "Acoplamento forte entre modulos",
            ],
            "sources": [
                {"url": "https://refactoring.guru/", "type": "best_practices"},
            ],
        }

        research = domain_patterns.get(domain, default_research)

        print(f"    Fontes encontradas: {len(research['sources'])}")
        print(f"    Padroes identificados: {len(research['patterns'])}")
        print(f"    Antipadroes: {len(research['antipatterns'])}")

        return {
            "domain": domain,
            "summary": f"Pesquisa sobre {domain} concluida.",
            **research,
        }

    # =========================================================================
    # FASE 3: GENERATE
    # =========================================================================

    def generate(
        self, classification: Dict, research: Dict, content_type: str = "skill"
    ) -> Dict:
        """
        Fase 3: Generate
        Gera conteudo seguindo template canonico.

        Args:
            classification: Resultado da fase Classify
            research: Resultado da fase Research
            content_type: Tipo de conteudo (skill, persona, prompt)

        Returns:
            Conteudo gerado com metadata
        """
        print(f"\n[3] GENERATE - Gerando {content_type}...")

        generators = {
            "skill": self._generate_skill,
            "persona": self._generate_persona,
        }

        generator = generators.get(content_type, self._generate_skill)
        content = generator(classification, research)

        print(f"    Nome: {content['metadata']['name']}")
        print(f"    Tamanho: {len(content['content'])} caracteres")

        return content

    def _generate_skill(self, classification: Dict, research: Dict) -> Dict:
        """
        Gera skill seguindo SKILL.template.md
        Estrutura: skills/{name}/SKILL.md
        """
        # Gerar nome em kebab-case
        name = self._to_kebab_case(classification["description"])
        title = classification["description"].title()
        today = datetime.now().strftime("%Y-%m-%d")

        # Construir YAML frontmatter
        frontmatter = {
            "name": name,
            "description": f"Skill para {classification['description']}. Gerada pelo PromptOS Brain.",
            "version": "1.0.0",
            "domain": classification["domain"],
            "level": classification["level"],
            "tags": [classification["domain"], "auto-generated"],
            "triggers": classification["triggers"],
            "dependencies": [],
            "author": "promptos-brain",
            "created": today,
            "status": "pending",
            "sources": research["sources"],
        }

        # Construir conteudo Markdown
        yaml_header = yaml.dump(
            frontmatter, default_flow_style=False, allow_unicode=True, sort_keys=False
        )

        patterns_list = "\n".join(
            f"{i + 1}. {p}" for i, p in enumerate(research["patterns"])
        )
        antipatterns_list = "\n".join(
            f"{i + 1}. **NUNCA** {a}" for i, a in enumerate(research["antipatterns"])
        )
        sources_list = "\n".join(
            f"{i + 1}. {s['url']} ({s['type']})"
            for i, s in enumerate(research["sources"])
        )

        content = f"""---
{yaml_header.strip()}
---

# {title}

## Visao Geral

Esta skill fornece diretrizes e padroes para trabalhar com {classification["domain"]}. 
Gerada automaticamente pelo PromptOS Brain com base em pesquisa de melhores praticas.
Nivel de complexidade: {classification["complexity"]}.

---

## Instrucoes

### Ao receber uma tarefa relacionada a {classification["domain"]}:

1. **Analise** o contexto e requisitos especificos da tarefa
2. **Verifique** se ha codigo existente relacionado no projeto
3. **Aplique** os padroes documentados abaixo
4. **Valide** o resultado executando testes apropriados
5. **Documente** decisoes tecnicas relevantes

---

## Guidelines (SEMPRE)

{patterns_list}

## Constraints (NUNCA)

{antipatterns_list}

---

## Exemplos

### Exemplo 1: Caso Basico

**Cenario:** Implementacao padrao de {classification["domain"]}

**Input:**
```
// Requisicao do usuario para implementar funcionalidade
```

**Output esperado:**
```
// Codigo seguindo os padroes documentados
// Com comentarios explicativos
```

**Explicacao:** Este e o caso mais comum de uso.

### Exemplo 2: Tratamento de Erros

**Cenario:** Situacao onde erros podem ocorrer

**Input:**
```
// Requisicao que pode resultar em erro
```

**Output esperado:**
```
try {{
  // Operacao principal
}} catch (error) {{
  // Tratamento especifico por tipo de erro
  // Logging apropriado
}}
```

**Explicacao:** Sempre implementar tratamento de erros robusto.

---

## Referencias

{sources_list}
"""

        return {
            "type": "skill",
            "metadata": {
                "name": name,
                "domain": classification["domain"],
                "level": classification["level"],
            },
            "content": content,
            "path": self.skills_dir / name / "SKILL.md",
        }

    def _generate_persona(self, classification: Dict, research: Dict) -> Dict:
        """Gera persona seguindo PERSONA.template.md"""
        name = self._to_kebab_case(classification["description"]) + "-expert"
        title = f"{classification['description'].title()} Expert"
        today = datetime.now().strftime("%Y-%m-%d")

        frontmatter = {
            "name": name,
            "type": "persona",
            "description": f"Persona especializada em {classification['description']}",
            "version": "1.0.0",
            "expertise": [classification["domain"]],
            "communication_style": "technical",
            "skills": [],
            "author": "promptos-brain",
            "created": today,
            "status": "pending",
        }

        yaml_header = yaml.dump(
            frontmatter, default_flow_style=False, allow_unicode=True, sort_keys=False
        )

        content = f"""---
{yaml_header.strip()}
---

# {title}

## Identidade

- **Role:** Especialista em {classification["domain"]}
- **Especialidades:** {", ".join([classification["domain"]])}
- **Estilo:** Tecnico e direto
- **Mindset:** Foco em qualidade e melhores praticas

---

## Comportamentos Core

1. **Precisao Tecnica**
   - Sempre verificar fatos antes de afirmar
   - Citar fontes quando apropriado

2. **Clareza**
   - Explicar conceitos complexos de forma acessivel
   - Usar exemplos praticos

---

## Padroes de Interacao

| Situacao | Comportamento |
|----------|---------------|
| Tarefa vaga | Fazer perguntas clarificadoras |
| Bug encontrado | Analisar causa raiz antes de sugerir fix |
| Codigo novo | Revisar seguindo melhores praticas |

---

## Constraints

1. **NAO** inventar informacoes ou especulacoes
2. **SEMPRE** priorizar seguranca e performance
"""

        return {
            "type": "persona",
            "metadata": {
                "name": name,
                "domain": classification["domain"],
            },
            "content": content,
            "path": self.personas_dir / name / "PERSONA.md",
        }

    def _to_kebab_case(self, text: str) -> str:
        """Converte texto para kebab-case"""
        text = re.sub(r"[^a-zA-Z0-9\s]", "", text.lower())
        return "-".join(text.split())[:50]

    # =========================================================================
    # FASE 4: VALIDATE
    # =========================================================================

    def validate(self, content: Dict) -> Tuple[bool, List[str], List[str]]:
        """
        Fase 4: Validate
        Valida schema, completude e consistencia.

        Args:
            content: Conteudo gerado

        Returns:
            (valido, erros, avisos)
        """
        print(f"\n[4] VALIDATE - Validando draft...")

        errors = []
        warnings = []

        # Verificar metadata
        if not content.get("metadata", {}).get("name"):
            errors.append("Nome e obrigatorio")

        # Verificar conteudo
        text = content.get("content", "")

        if "## Exemplos" not in text and "## Exemplo" not in text:
            errors.append("Secao de exemplos ausente")

        if "## Constraints" not in text and "## Constraint" not in text:
            errors.append("Secao de constraints ausente")

        # Contar exemplos
        example_count = len(re.findall(r"### Exemplo \d+", text))
        min_examples = self.config.get("generation", {}).get("min_examples", 2)
        if example_count < min_examples:
            warnings.append(
                f"Apenas {example_count} exemplo(s) - recomendado: {min_examples}+"
            )

        # Verificar YAML frontmatter
        if not text.startswith("---"):
            errors.append("YAML frontmatter ausente")

        valid = len(errors) == 0

        if valid:
            print(f"    [OK] Draft valido!")
        else:
            for e in errors:
                print(f"    [ERRO] {e}")

        for w in warnings:
            print(f"    [AVISO] {w}")

        return valid, errors, warnings

    # =========================================================================
    # FASE 5: APPROVE (Human Gate)
    # =========================================================================

    def approve(self, content: Dict) -> Tuple[str, str]:
        """
        Fase 5: Approve (Human Gate)
        Apresenta conteudo para aprovacao humana.

        Args:
            content: Conteudo validado

        Returns:
            (acao, motivo) - acao pode ser: approve, edit, reject, cancel
        """
        print("\n" + "=" * 70)
        print("HUMAN GATE - APROVACAO NECESSARIA")
        print("=" * 70)

        # Mostrar preview
        print(f"\nTipo: {content['type']}")
        print(f"Nome: {content['metadata']['name']}")
        print(f"Caminho: {content['path']}")

        print("\n" + "-" * 50)
        print("PREVIEW:")
        print("-" * 50)

        lines = content["content"].split("\n")
        preview = "\n".join(lines[:40])
        print(preview)

        if len(lines) > 40:
            print(f"\n... [{len(lines) - 40} linhas omitidas]")

        print("-" * 50)

        print("\nOPCOES:")
        print("  approve  - Salvar como esta")
        print("  edit     - Salvar draft para edicao manual")
        print("  reject   - Rejeitar (informe motivo)")
        print("  cancel   - Cancelar operacao")
        print()

        try:
            answer = input("Sua decisao: ").strip().lower()
        except EOFError:
            return "cancel", ""

        parts = answer.split(" ", 1)
        action = parts[0] if parts else "cancel"
        reason = parts[1] if len(parts) > 1 else ""

        return action, reason

    # =========================================================================
    # FASE 6: COMMIT
    # =========================================================================

    def commit(self, content: Dict, action: str, reason: str = "") -> bool:
        """
        Fase 6: Commit
        Salva conteudo aprovado e atualiza indices.

        Args:
            content: Conteudo a ser salvo
            action: Acao do Human Gate (approve, edit, reject, cancel)
            reason: Motivo (para reject)

        Returns:
            True se commit bem-sucedido
        """
        print(f"\n[6] COMMIT - Processando decisao...")

        if action == "approve":
            return self._commit_approved(content)
        elif action == "edit":
            return self._save_draft(content)
        elif action == "reject":
            self._record_rejection(content, reason)
            print(f"    Rejeitado. Motivo: {reason or 'Nao especificado'}")
            return False
        else:
            print("    Operacao cancelada.")
            return False

    def _commit_approved(self, content: Dict) -> bool:
        """Salva conteudo aprovado"""
        path = Path(content["path"])

        # Criar diretorio
        path.parent.mkdir(parents=True, exist_ok=True)

        # Atualizar status para approved
        final_content = content["content"].replace(
            'status: "pending"', 'status: "approved"'
        )
        final_content = final_content.replace("status: pending", "status: approved")

        # Salvar arquivo
        with open(path, "w", encoding="utf-8") as f:
            f.write(final_content)

        print(f"    [OK] Arquivo salvo: {path}")

        # Atualizar INDEX.md
        self._update_index(content)

        # Registrar em MEMORY.md
        self._update_memory(content, "approved")

        return True

    def _save_draft(self, content: Dict) -> bool:
        """Salva draft para edicao manual"""
        path = Path(content["path"])
        draft_path = path.parent / f"_DRAFT_{path.name}"

        path.parent.mkdir(parents=True, exist_ok=True)

        with open(draft_path, "w", encoding="utf-8") as f:
            f.write(content["content"])

        print(f"    Draft salvo em: {draft_path}")
        return True

    def _record_rejection(self, content: Dict, reason: str):
        """Registra rejeicao em MEMORY.md"""
        self._update_memory(content, f"rejected: {reason}")

    def _update_index(self, content: Dict):
        """Atualiza INDEX.md do tipo de conteudo"""
        content_type = content["type"]

        if content_type == "skill":
            index_path = self.skills_dir / "INDEX.md"
        elif content_type == "persona":
            index_path = self.personas_dir / "INDEX.md"
        else:
            return

        # Criar INDEX.md se nao existir
        if not index_path.exists():
            header = f"# {'Skills' if content_type == 'skill' else 'Personas'} do PromptOS\n\n"
            header += "| Nome | Dominio | Status | Data | Autor |\n"
            header += "|------|---------|--------|------|-------|\n"

            index_path.parent.mkdir(parents=True, exist_ok=True)
            with open(index_path, "w", encoding="utf-8") as f:
                f.write(header)

        # Adicionar entrada
        with open(index_path, "r", encoding="utf-8") as f:
            index_content = f.read()

        name = content["metadata"]["name"]
        if name not in index_content:
            today = datetime.now().strftime("%Y-%m-%d")
            domain = content["metadata"].get("domain", "general")
            new_entry = f"| {name} | {domain} | approved | {today} | promptos-brain |\n"

            with open(index_path, "a", encoding="utf-8") as f:
                f.write(new_entry)

            print(f"    [OK] INDEX.md atualizado")

    def _update_memory(self, content: Dict, status: str):
        """Atualiza MEMORY.md com registro da operacao"""
        if not self.memory_file.exists():
            return

        try:
            with open(self.memory_file, "r", encoding="utf-8") as f:
                memory_content = f.read()

            timestamp = datetime.now().isoformat()
            name = content["metadata"]["name"]
            content_type = content["type"]

            entry = f"| {timestamp[:10]} | {content_type} | {name} | {status} |\n"

            # Inserir apos cabecalho da tabela
            if "## Memoria Episodica Recente" in memory_content:
                # Encontrar a tabela e inserir
                memory_content = memory_content.replace(
                    "|------|------|------|--------|\n",
                    f"|------|------|------|--------|\n{entry}",
                )

                with open(self.memory_file, "w", encoding="utf-8") as f:
                    f.write(memory_content)

                print(f"    [OK] MEMORY.md atualizado")
        except Exception as e:
            print(f"    [AVISO] Nao foi possivel atualizar MEMORY.md: {e}")

    # =========================================================================
    # WORKFLOW COMPLETO
    # =========================================================================

    def run_workflow(
        self, description: str, content_type: str = "skill", auto_approve: bool = False
    ) -> bool:
        """
        Executa workflow completo: Classify -> Research -> Generate -> Validate -> Approve -> Commit

        Args:
            description: Descricao do que gerar
            content_type: Tipo de conteudo (skill, persona)
            auto_approve: Se True, pula Human Gate (usar com cuidado!)

        Returns:
            True se workflow completado com sucesso
        """
        print("\n" + "=" * 70)
        print("ITZAMNA PROMPTOS - WORKFLOW AUTO-EVOLUTIVO")
        print("=" * 70)
        print(f'\nInput: "{description}"')
        print(f"Tipo: {content_type}")
        print()

        try:
            # Fase 1: Classify
            classification = self.classify(description)

            # Fase 2: Research
            research = self.research(classification)

            # Fase 3: Generate
            content = self.generate(classification, research, content_type)

            # Fase 4: Validate
            valid, errors, warnings = self.validate(content)

            if not valid and not auto_approve:
                print(
                    "\n[AVISO] Draft com erros, mas prosseguindo para revisao humana..."
                )

            # Fase 5: Approve
            if auto_approve:
                action, reason = "approve", ""
                print("\n[5] APPROVE - Auto-aprovado")
            else:
                action, reason = self.approve(content)

            # Fase 6: Commit
            success = self.commit(content, action, reason)

            if success and action == "approve":
                print("\n" + "=" * 70)
                print("SKILL CRIADA COM SUCESSO!")
                print("=" * 70)
                print(f"Localizacao: {content['path']}")

            return success

        except Exception as e:
            print(f"\n[ERRO] Falha no workflow: {e}")
            import traceback

            traceback.print_exc()
            return False


if __name__ == "__main__":
    # Exemplo de uso
    orchestrator = PromptOSOrchestrator()

    # Executar workflow de exemplo
    orchestrator.run_workflow(
        description="Python Async Programming", content_type="skill"
    )
