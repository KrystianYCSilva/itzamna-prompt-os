#!/usr/bin/env python3
"""
Itzamna PromptOS - Sistema Auto-Evolutivo
Orchestrator: Gerencia o fluxo completo Research → Generation → Approval → Commit
"""

import os
import yaml
from pathlib import Path
from typing import Dict, List, Optional
from datetime import datetime


class PromptOSOrchestrator:
    """
    Orquestrador principal do sistema auto-evolutivo.
    Gerencia o ciclo completo de pesquisa, geração, aprovação e commit.
    """
    
    def __init__(self, config_path: str = "config/system.yaml"):
        self.base_path = Path(__file__).parent.parent
        self.config_path = self.base_path / config_path
        self.config = self._load_config()
        self.workflow = self.config.get('workflow', {})
        
    def _load_config(self) -> Dict:
        """Carrega a configuração do sistema"""
        if self.config_path.exists():
            with open(self.config_path, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f)
        return {}
    
    def research(self, topic: str, domain: str = "programming") -> Dict:
        """
        Fase 1: Pesquisa
        Pesquisa informações sobre um tópico específico
        
        Args:
            topic: Tópico a ser pesquisado (ex: "Python async", "React hooks")
            domain: Domínio da pesquisa (programming, technology, etc)
        
        Returns:
            Dados da pesquisa estruturados
        """
        print(f"🔍 [RESEARCH] Pesquisando: {topic} (domínio: {domain})")
        
        research_data = {
            "topic": topic,
            "domain": domain,
            "timestamp": datetime.now().isoformat(),
            "status": "completed",
            "findings": {
                "description": f"Pesquisa sobre {topic}",
                "key_concepts": [],
                "best_practices": [],
                "use_cases": []
            }
        }
        
        print(f"✅ [RESEARCH] Pesquisa concluída para: {topic}")
        return research_data
    
    def generate(self, research_data: Dict, content_type: str = "skill") -> Dict:
        """
        Fase 2: Geração
        Gera conteúdo baseado na pesquisa
        
        Args:
            research_data: Dados da pesquisa
            content_type: Tipo de conteúdo (skill, persona, prompt)
        
        Returns:
            Conteúdo gerado
        """
        print(f"⚙️  [GENERATE] Gerando {content_type} para: {research_data['topic']}")
        
        generators = {
            "skill": self._generate_skill,
            "persona": self._generate_persona,
            "prompt": self._generate_prompt
        }
        
        generator = generators.get(content_type, self._generate_skill)
        content = generator(research_data)
        
        print(f"✅ [GENERATE] {content_type.capitalize()} gerado com sucesso")
        return content
    
    def _generate_skill(self, research_data: Dict) -> Dict:
        """Gera uma skill de programação"""
        topic = research_data['topic']
        domain = research_data['domain']
        
        return {
            "type": "skill",
            "topic": topic,
            "domain": domain,
            "name": f"{domain}_{topic.replace(' ', '_').lower()}",
            "content": self._create_skill_content(research_data),
            "metadata": {
                "generated_at": datetime.now().isoformat(),
                "version": "1.0.0",
                "status": "pending_approval"
            }
        }
    
    def _generate_persona(self, research_data: Dict) -> Dict:
        """Gera uma persona de agente"""
        topic = research_data['topic']
        
        return {
            "type": "persona",
            "name": f"{topic.replace(' ', '_').lower()}_expert",
            "role": f"Expert em {topic}",
            "capabilities": [
                f"Conhecimento avançado em {topic}",
                "Resolução de problemas",
                "Melhores práticas"
            ],
            "metadata": {
                "generated_at": datetime.now().isoformat(),
                "version": "1.0.0",
                "status": "pending_approval"
            }
        }
    
    def _generate_prompt(self, research_data: Dict) -> Dict:
        """Gera um template de prompt"""
        topic = research_data['topic']
        
        return {
            "type": "prompt",
            "purpose": f"{topic}_assistant",
            "content": self._create_prompt_content(research_data),
            "metadata": {
                "generated_at": datetime.now().isoformat(),
                "version": "1.0.0",
                "status": "pending_approval"
            }
        }
    
    def _create_skill_content(self, research_data: Dict) -> str:
        """Cria o conteúdo da skill em markdown"""
        topic = research_data['topic']
        domain = research_data['domain']
        
        return f"""# Skill: {topic}

## Domínio
{domain}

## Descrição
{research_data['findings']['description']}

## Conceitos Principais
- Conceito 1
- Conceito 2
- Conceito 3

## Melhores Práticas
1. Prática 1
2. Prática 2
3. Prática 3

## Casos de Uso
- Caso de uso 1
- Caso de uso 2

## Exemplos
```
// Exemplo de código
```

## Referências
- Documentação oficial
- Tutoriais recomendados

---
*Gerado automaticamente pelo Itzamna PromptOS*
*Data: {research_data['timestamp']}*
"""
    
    def _create_prompt_content(self, research_data: Dict) -> str:
        """Cria o conteúdo do prompt"""
        topic = research_data['topic']
        
        return f"""# Prompt: {topic} Assistant

Você é um assistente especializado em {topic}.

## Seu Papel
Auxiliar desenvolvedores com questões relacionadas a {topic}.

## Capacidades
- Responder perguntas sobre {topic}
- Fornecer exemplos de código
- Sugerir melhores práticas
- Identificar problemas comuns

## Instruções
1. Seja claro e conciso
2. Forneça exemplos quando relevante
3. Explique conceitos complexos de forma simples
4. Sempre cite fontes quando apropriado

---
*Gerado automaticamente pelo Itzamna PromptOS*
"""
    
    def approve(self, content: Dict) -> bool:
        """
        Fase 3: Aprovação
        Apresenta o conteúdo para aprovação humana
        
        Args:
            content: Conteúdo gerado
        
        Returns:
            True se aprovado, False caso contrário
        """
        print("\n" + "="*60)
        print("👤 [APPROVAL] REVISÃO HUMANA NECESSÁRIA")
        print("="*60)
        
        content_type = content.get('type', 'unknown')
        print(f"\nTipo: {content_type}")
        print(f"Nome: {content.get('name', content.get('purpose', 'N/A'))}")
        print(f"\nConteúdo gerado:")
        print("-"*60)
        
        if 'content' in content:
            print(content['content'])
        else:
            print(yaml.dump(content, default_flow_style=False, allow_unicode=True))
        
        print("-"*60)
        print("\n✓ Aprovação automática desabilitada - requer revisão manual")
        print("📝 Use o CLI para aprovar: python core/cli.py approve <id>")
        
        # Por padrão, retorna False para forçar aprovação explícita
        return False
    
    def commit(self, content: Dict, approved: bool = False) -> bool:
        """
        Fase 4: Commit
        Salva o conteúdo aprovado no repositório
        
        Args:
            content: Conteúdo aprovado
            approved: Se o conteúdo foi aprovado
        
        Returns:
            True se commit bem-sucedido
        """
        if not approved:
            print("⚠️  [COMMIT] Conteúdo não aprovado - commit cancelado")
            return False
        
        print(f"💾 [COMMIT] Salvando conteúdo aprovado...")
        
        content_type = content.get('type')
        output_path = self._get_output_path(content)
        
        # Criar diretório se não existir
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Salvar conteúdo
        with open(output_path, 'w', encoding='utf-8') as f:
            if content_type == "persona":
                yaml.dump(content, f, default_flow_style=False, allow_unicode=True)
            else:
                f.write(content.get('content', ''))
        
        print(f"✅ [COMMIT] Salvo em: {output_path}")
        return True
    
    def _get_output_path(self, content: Dict) -> Path:
        """Determina o caminho de saída baseado no tipo de conteúdo"""
        content_type = content.get('type')
        output_config = self.config.get('output', {}).get('paths', {})
        
        base_dir = self.base_path / output_config.get(f"{content_type}s", f"./{content_type}s")
        
        if content_type == "skill":
            filename = f"{content['name']}.md"
        elif content_type == "persona":
            filename = f"{content['name']}_persona.yaml"
        elif content_type == "prompt":
            filename = f"{content['purpose']}_prompt.md"
        else:
            filename = f"{content_type}.txt"
        
        return base_dir / filename
    
    def run_workflow(self, topic: str, content_type: str = "skill", 
                    domain: str = "programming", auto_approve: bool = False) -> bool:
        """
        Executa o workflow completo: Research → Generation → Approval → Commit
        
        Args:
            topic: Tópico a ser processado
            content_type: Tipo de conteúdo a gerar
            domain: Domínio da pesquisa
            auto_approve: Se True, aprova automaticamente (use com cuidado!)
        
        Returns:
            True se workflow completado com sucesso
        """
        print("\n🚀 Iniciando Workflow Auto-Evolutivo")
        print(f"   Tópico: {topic}")
        print(f"   Tipo: {content_type}")
        print(f"   Domínio: {domain}\n")
        
        try:
            # Fase 1: Research
            research_data = self.research(topic, domain)
            
            # Fase 2: Generation
            content = self.generate(research_data, content_type)
            
            # Fase 3: Approval
            approved = auto_approve or self.approve(content)
            
            # Fase 4: Commit
            success = self.commit(content, approved)
            
            if success:
                print("\n🎉 Workflow completado com sucesso!")
            else:
                print("\n⏸️  Workflow pausado - aguardando aprovação")
            
            return success
            
        except Exception as e:
            print(f"\n❌ Erro no workflow: {e}")
            return False


if __name__ == "__main__":
    # Exemplo de uso
    orchestrator = PromptOSOrchestrator()
    
    # Executar workflow de exemplo
    orchestrator.run_workflow(
        topic="Python Async Programming",
        content_type="skill",
        domain="programming"
    )
