#!/usr/bin/env python3
"""
Itzamna PromptOS v1.0.0 - CLI Interface
Interface de linha de comando para o sistema auto-evolutivo
"""

import sys
import argparse
from pathlib import Path

# Add .prompt-os directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from core.orchestrator import PromptOSOrchestrator

# Get project root (2 levels up from .prompt-os/core/)
PROJECT_ROOT = Path(__file__).parent.parent.parent


def main():
    parser = argparse.ArgumentParser(
        description="Itzamna PromptOS v1.0.0 - Sistema Auto-Evolutivo",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemplos de uso:
  # Gerar uma skill sobre Python Async
  python .prompt-os/core/cli.py generate skill "Python Async Programming"
  
  # Gerar uma persona para DevOps
  python .prompt-os/core/cli.py generate persona "DevOps Engineer"
  
  # Workflow completo (Classify -> Research -> Generate -> Validate -> Approve -> Commit)
  python .prompt-os/core/cli.py workflow "Docker containers com multi-stage builds"
  
  # Listar skills existentes
  python .prompt-os/core/cli.py list skills
  
  # Buscar por termo
  python .prompt-os/core/cli.py search "react"
        """,
    )

    subparsers = parser.add_subparsers(dest="command", help="Comandos disponiveis")

    # Comando: generate
    generate_parser = subparsers.add_parser(
        "generate", help="Gera conteudo (skill ou persona)"
    )
    generate_parser.add_argument(
        "type", choices=["skill", "persona"], help="Tipo de conteudo a gerar"
    )
    generate_parser.add_argument("description", help="Descricao do conteudo")
    generate_parser.add_argument(
        "--auto-approve",
        action="store_true",
        help="Aprova automaticamente (use com cuidado!)",
    )

    # Comando: workflow
    workflow_parser = subparsers.add_parser(
        "workflow", help="Executa workflow completo"
    )
    workflow_parser.add_argument("description", help="Descricao do que gerar")
    workflow_parser.add_argument(
        "--type",
        choices=["skill", "persona"],
        default="skill",
        help="Tipo de conteudo (default: skill)",
    )
    workflow_parser.add_argument(
        "--auto-approve",
        action="store_true",
        help="Aprova automaticamente (use com cuidado!)",
    )

    # Comando: list
    list_parser = subparsers.add_parser("list", help="Lista conteudo existente")
    list_parser.add_argument(
        "type",
        choices=["skills", "personas", "all"],
        default="all",
        nargs="?",
        help="Tipo de conteudo a listar",
    )

    # Comando: search
    search_parser = subparsers.add_parser("search", help="Busca por termo")
    search_parser.add_argument("term", help="Termo a buscar")

    # Comando: info
    info_parser = subparsers.add_parser("info", help="Informacoes do sistema")

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        return 1

    orchestrator = PromptOSOrchestrator()
    base_path = PROJECT_ROOT

    try:
        if args.command == "generate":
            return handle_generate(orchestrator, args)

        elif args.command == "workflow":
            success = orchestrator.run_workflow(
                description=args.description,
                content_type=args.type,
                auto_approve=args.auto_approve,
            )
            return 0 if success else 1

        elif args.command == "list":
            return handle_list(base_path, args.type)

        elif args.command == "search":
            return handle_search(base_path, args.term)

        elif args.command == "info":
            return handle_info(base_path)

        return 0

    except KeyboardInterrupt:
        print("\n\nOperacao cancelada pelo usuario.")
        return 130
    except Exception as e:
        print(f"\n[ERRO] {e}", file=sys.stderr)
        import traceback

        traceback.print_exc()
        return 1


def handle_generate(orchestrator: PromptOSOrchestrator, args) -> int:
    """Handler para comando generate"""
    print(f'\nGerando {args.type}: "{args.description}"\n')

    # Executar pipeline completo
    success = orchestrator.run_workflow(
        description=args.description,
        content_type=args.type,
        auto_approve=args.auto_approve,
    )

    return 0 if success else 1


def handle_list(base_path: Path, content_type: str) -> int:
    """Handler para comando list"""
    print(f"\nListando conteudo: {content_type}\n")

    types_to_list = []
    if content_type == "all":
        types_to_list = ["skills", "personas"]
    else:
        types_to_list = [content_type]

    for ct in types_to_list:
        content_dir = base_path / ct
        print(f"{ct.upper()}:")

        if not content_dir.exists():
            print("  (diretorio nao existe)")
            continue

        # Listar subdiretorios (cada skill/persona tem seu proprio diretorio)
        subdirs = [
            d
            for d in content_dir.iterdir()
            if d.is_dir() and not d.name.startswith("_")
        ]

        if not subdirs:
            print("  (vazio)")
        else:
            for subdir in sorted(subdirs):
                # Verificar se tem SKILL.md ou PERSONA.md
                skill_file = subdir / "SKILL.md"
                persona_file = subdir / "PERSONA.md"

                if skill_file.exists() or persona_file.exists():
                    print(f"  - {subdir.name}")

            print(f"\n  Total: {len(subdirs)}")

        print()

    return 0


def handle_search(base_path: Path, term: str) -> int:
    """Handler para comando search"""
    print(f'\nBuscando "{term}"...\n')

    results = []
    term_lower = term.lower()

    for content_type in ["skills", "personas"]:
        content_dir = base_path / content_type
        if not content_dir.exists():
            continue

        for subdir in content_dir.iterdir():
            if subdir.is_dir() and term_lower in subdir.name.lower():
                results.append(
                    {
                        "type": content_type[:-1],  # Remove 's' do plural
                        "name": subdir.name,
                    }
                )

    if not results:
        print("Nenhum resultado encontrado.")
    else:
        print("Resultados:\n")
        for r in results:
            print(f"  [{r['type']}] {r['name']}")
        print(f"\n  Total: {len(results)}")

    return 0


def handle_info(base_path: Path) -> int:
    """Handler para comando info"""
    print("\n" + "=" * 60)
    print("ITZAMNA PROMPTOS v1.0.0 (Piloto)")
    print("Sistema Auto-Evolutivo para Programacao Paralela Humano-Agente")
    print("=" * 60)

    print("\nArquitetura: CoALA Simplificado")
    print("Pipeline: Classify -> Research -> Generate -> Validate -> Approve -> Commit")

    prompt_os_dir = base_path / ".prompt-os"

    print("\nDiretorios (raiz):")
    root_dirs = ["skills", "personas"]
    for dir_name in root_dirs:
        dir_path = base_path / dir_name
        status = "[OK]" if dir_path.exists() else "[  ]"
        count = ""
        if dir_path.exists():
            items = [
                d
                for d in dir_path.iterdir()
                if d.is_dir() and not d.name.startswith("_")
            ]
            if items:
                count = f" ({len(items)} itens)"
        print(f"  {status} {dir_name}/{count}")

    print("\nDiretorios (.prompt-os/):")
    internal_dirs = ["core", "templates", "prompts", "scripts"]
    for dir_name in internal_dirs:
        dir_path = prompt_os_dir / dir_name
        status = "[OK]" if dir_path.exists() else "[  ]"
        count = ""
        if dir_path.exists():
            items = [
                d
                for d in dir_path.iterdir()
                if not d.name.startswith("_") and not d.name.startswith(".")
            ]
            if items:
                count = f" ({len(items)} itens)"
        print(f"  {status} .prompt-os/{dir_name}/{count}")

    print("\nArquivos de configuracao (raiz):")
    root_files = ["README.md", "AGENTS.md", "MEMORY.md"]
    for file_name in root_files:
        file_path = base_path / file_name
        status = "[OK]" if file_path.exists() else "[  ]"
        print(f"  {status} {file_name}")

    print("\nDocumentacao (docs/):")
    doc_files = [
        "ARCHITECTURE.md",
        "IMPLEMENTATION-GUIDE.md",
        "GLOSSARIO-TECNICO-PROMPTOS.md",
    ]
    for file_name in doc_files:
        file_path = base_path / "docs" / file_name
        status = "[OK]" if file_path.exists() else "[  ]"
        print(f"  {status} docs/{file_name}")

    print("\nOutras estruturas:")
    other_paths = [
        ".specify/memory/constitution.md",
        ".context/_meta",
        ".context/standards",
    ]
    for path_str in other_paths:
        path = base_path / path_str
        status = "[OK]" if path.exists() else "[  ]"
        print(f"  {status} {path_str}")

    print("=" * 60 + "\n")

    return 0


if __name__ == "__main__":
    sys.exit(main())
