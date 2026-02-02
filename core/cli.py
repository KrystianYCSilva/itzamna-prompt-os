#!/usr/bin/env python3
"""
Itzamna PromptOS - CLI Interface
Interface de linha de comando para o sistema auto-evolutivo
"""

import sys
import argparse
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from core.orchestrator import PromptOSOrchestrator


def main():
    parser = argparse.ArgumentParser(
        description='Itzamna PromptOS - Sistema Auto-Evolutivo para Programação Paralela Humano-Agente',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemplos de uso:
  # Gerar uma skill sobre Python Async
  python core/cli.py generate --topic "Python Async" --type skill
  
  # Gerar uma persona para React
  python core/cli.py generate --topic "React" --type persona
  
  # Gerar um prompt para TypeScript
  python core/cli.py generate --topic "TypeScript" --type prompt
  
  # Workflow completo (Research → Generate → Approve → Commit)
  python core/cli.py workflow --topic "Docker" --type skill
        """
    )
    
    subparsers = parser.add_subparsers(dest='command', help='Comandos disponíveis')
    
    # Comando: generate
    generate_parser = subparsers.add_parser('generate', help='Gera conteúdo baseado em pesquisa')
    generate_parser.add_argument('--topic', required=True, help='Tópico a ser pesquisado')
    generate_parser.add_argument('--type', choices=['skill', 'persona', 'prompt'], 
                                default='skill', help='Tipo de conteúdo a gerar')
    generate_parser.add_argument('--domain', default='programming', 
                                help='Domínio da pesquisa')
    generate_parser.add_argument('--save', action='store_true', 
                                help='Salva o conteúdo gerado')
    
    # Comando: workflow
    workflow_parser = subparsers.add_parser('workflow', 
                                           help='Executa workflow completo')
    workflow_parser.add_argument('--topic', required=True, help='Tópico a processar')
    workflow_parser.add_argument('--type', choices=['skill', 'persona', 'prompt'],
                                default='skill', help='Tipo de conteúdo')
    workflow_parser.add_argument('--domain', default='programming', help='Domínio')
    workflow_parser.add_argument('--auto-approve', action='store_true',
                                help='Aprova automaticamente (use com cuidado!)')
    
    # Comando: research
    research_parser = subparsers.add_parser('research', help='Apenas pesquisa um tópico')
    research_parser.add_argument('--topic', required=True, help='Tópico a pesquisar')
    research_parser.add_argument('--domain', default='programming', help='Domínio')
    
    # Comando: list
    list_parser = subparsers.add_parser('list', help='Lista conteúdo gerado')
    list_parser.add_argument('--type', choices=['skills', 'personas', 'prompts', 'all'],
                           default='all', help='Tipo de conteúdo a listar')
    
    # Comando: info
    info_parser = subparsers.add_parser('info', help='Informações do sistema')
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        return 1
    
    orchestrator = PromptOSOrchestrator()
    
    try:
        if args.command == 'generate':
            print(f"\n🔄 Gerando {args.type} sobre: {args.topic}\n")
            research_data = orchestrator.research(args.topic, args.domain)
            content = orchestrator.generate(research_data, args.type)
            
            print("\n📄 Conteúdo gerado:")
            print("="*60)
            if 'content' in content:
                print(content['content'])
            else:
                import yaml
                print(yaml.dump(content, default_flow_style=False, allow_unicode=True))
            print("="*60)
            
            if args.save:
                approved = input("\n✓ Aprovar e salvar? (s/N): ").lower() == 's'
                if approved:
                    orchestrator.commit(content, approved=True)
                else:
                    print("⏸️  Salvamento cancelado")
        
        elif args.command == 'workflow':
            orchestrator.run_workflow(
                topic=args.topic,
                content_type=args.type,
                domain=args.domain,
                auto_approve=args.auto_approve
            )
        
        elif args.command == 'research':
            print(f"\n🔍 Pesquisando: {args.topic}\n")
            research_data = orchestrator.research(args.topic, args.domain)
            import yaml
            print(yaml.dump(research_data, default_flow_style=False, allow_unicode=True))
        
        elif args.command == 'list':
            print(f"\n📋 Listando conteúdo: {args.type}\n")
            base_path = Path(__file__).parent.parent
            
            types_to_list = []
            if args.type == 'all':
                types_to_list = ['skills', 'personas', 'prompts']
            else:
                types_to_list = [args.type]
            
            for content_type in types_to_list:
                content_dir = base_path / content_type
                if content_dir.exists():
                    files = list(content_dir.glob('*'))
                    if files:
                        print(f"\n{content_type.upper()}:")
                        for file in sorted(files):
                            print(f"  - {file.name}")
                    else:
                        print(f"\n{content_type.upper()}: (vazio)")
                else:
                    print(f"\n{content_type.upper()}: (diretório não existe)")
        
        elif args.command == 'info':
            print("\n" + "="*60)
            print("🧠 Itzamna PromptOS - Sistema Auto-Evolutivo")
            print("="*60)
            print("\nSistema para programação paralela humano-agente")
            print("\nFluxo: Research → Generation → Approval → Commit")
            print("\nCompatível com:")
            print("  - GitHub Spec-Kit")
            print("  - Claude Code")
            print("  - Cursor")
            print("  - Copilot")
            print("\nDiretórios:")
            base_path = Path(__file__).parent.parent
            for dir_name in ['skills', 'personas', 'prompts', 'core', 'templates', 'config']:
                dir_path = base_path / dir_name
                status = "✓" if dir_path.exists() else "✗"
                print(f"  {status} {dir_name}/")
            print("="*60 + "\n")
        
        return 0
        
    except Exception as e:
        print(f"\n❌ Erro: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        return 1


if __name__ == "__main__":
    sys.exit(main())
