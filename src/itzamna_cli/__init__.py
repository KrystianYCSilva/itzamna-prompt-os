"""Itzamna CLI - Cognitive orchestrator for AI coding agents."""

from __future__ import annotations

import os
import platform
import shutil
import subprocess
from pathlib import Path

import typer
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.tree import Tree

__version__ = "3.0.0"

app = typer.Typer(
    name="itzamna",
    help="Cognitive orchestrator for AI coding agents.",
    no_args_is_help=True,
)
console = Console()

# ── Agent Configuration ──────────────────────────────────────────────────────

AGENT_CONFIG: dict[str, dict] = {
    "claude": {
        "name": "Claude Code",
        "folder": ".claude",
        "agent_file": "CLAUDE.md",
        "commands_dir": "commands",
        "format": "md",
    },
    "gemini": {
        "name": "Gemini CLI",
        "folder": ".gemini",
        "agent_file": "GEMINI.md",
        "commands_dir": "commands",
        "format": "md",
    },
    "codex": {
        "name": "Codex CLI",
        "folder": ".codex",
        "agent_file": "AGENTS.md",
        "commands_dir": "prompts",
        "format": "md",
    },
    "cursor": {
        "name": "Cursor",
        "folder": ".cursor",
        "agent_file": ".cursorrules",
        "commands_dir": "commands",
        "format": "md",
    },
    "opencode": {
        "name": "OpenCode",
        "folder": ".opencode",
        "agent_file": "AGENTS.md",
        "commands_dir": "command",
        "format": "md",
    },
    "qwen": {
        "name": "Qwen",
        "folder": ".qwen",
        "agent_file": "AGENTS.md",
        "commands_dir": "commands",
        "format": "md",
    },
}

TEMPLATES_DIR = Path(__file__).parent.parent.parent / "templates"
CORE_DIR = Path(__file__).parent.parent.parent / "core"


# ── Utility Functions ────────────────────────────────────────────────────────


def get_templates_dir() -> Path:
    """Resolve templates directory (works installed or from source)."""
    # Try relative to source first (development)
    src_templates = Path(__file__).parent.parent.parent / "templates"
    if src_templates.exists():
        return src_templates

    # Try installed location (wheel shared-data)
    import sys

    if sys.prefix:
        # Standard wheel installation puts shared-data in share/
        wheel_templates = Path(sys.prefix) / "share" / "itzamna_cli" / "templates"
        if wheel_templates.exists():
            return wheel_templates

    # Fallback: try package resources
    try:
        import importlib.resources as pkg_resources

        pkg_path = Path(str(pkg_resources.files("itzamna_cli")))
        if (pkg_path / "templates").exists():
            return pkg_path / "templates"
    except Exception:
        pass

    # Last resort: raise error with helpful message
    raise FileNotFoundError(
        "Could not find templates directory. "
        "Please ensure itzamna-cli is properly installed or run from source."
    )


def get_core_dir() -> Path:
    """Resolve core directory."""
    # Try relative to source first (development)
    src_core = Path(__file__).parent.parent.parent / "core"
    if src_core.exists():
        return src_core

    # Try installed location (wheel shared-data)
    import sys

    if sys.prefix:
        wheel_core = Path(sys.prefix) / "share" / "itzamna_cli" / "core"
        if wheel_core.exists():
            return wheel_core

    # Fallback: try package resources
    try:
        import importlib.resources as pkg_resources

        pkg_path = Path(str(pkg_resources.files("itzamna_cli")))
        if (pkg_path / "core").exists():
            return pkg_path / "core"
    except Exception:
        pass

    # Core is optional, return a dummy path
    return Path("/nonexistent/core")


def detect_binary(name: str) -> str | None:
    """Check if a binary is in PATH."""
    return shutil.which(name)


def detect_dir(target: Path, folder: str) -> bool:
    """Check if a CLI config directory exists."""
    return (target / folder).is_dir()


def detect_agents(target: Path) -> dict[str, dict]:
    """Detect installed AI CLIs by binary and directory presence."""
    results = {}
    for cli_id, config in AGENT_CONFIG.items():
        has_binary = detect_binary(cli_id) is not None
        has_dir = detect_dir(target, config["folder"])

        if has_binary or has_dir:
            status = (
                "PATH + dir"
                if (has_binary and has_dir)
                else ("PATH only" if has_binary else "dir only")
            )
            results[cli_id] = {**config, "status": status}

    return results


def detect_integrations(target: Path) -> dict[str, bool]:
    """Detect Hefesto and spec-kit presence."""
    hefesto = False
    speckit = False

    # Hefesto: check for command files in any CLI dir
    for config in AGENT_CONFIG.values():
        cmd_dir = target / config["folder"] / config["commands_dir"]
        if cmd_dir.exists():
            for f in cmd_dir.iterdir():
                if f.name.startswith("hefesto.") and f.suffix in (".md", ".toml"):
                    hefesto = True
                    break

    # Also check binary
    if detect_binary("hefesto"):
        hefesto = True

    # Spec-kit: check for .specify/ dir or specify binary
    if (target / ".specify").is_dir():
        speckit = True
    if detect_binary("specify"):
        speckit = True

    return {"hefesto": hefesto, "speckit": speckit}


def read_template(name: str) -> str:
    """Read a template file."""
    path = get_templates_dir() / name
    if not path.exists():
        console.print(f"[red]Template not found: {name}[/red]")
        raise typer.Exit(1)
    return path.read_text(encoding="utf-8")


def write_if_not_exists(path: Path, content: str, label: str = "") -> str:
    """Write file if it doesn't exist. Returns status."""
    if path.exists():
        return "already exists"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    return "created"


def write_force(path: Path, content: str) -> str:
    """Write file, overwriting if exists."""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    return "written"


def customize_template(
    content: str, cli_id: str, config: dict, integrations: dict
) -> str:
    """Customize template content for a specific CLI."""
    # Replace argument placeholders based on CLI
    if cli_id in ("gemini", "qwen"):
        content = content.replace("$ARGUMENTS", "{{args}}")

    # Inject integration hints
    if integrations.get("hefesto"):
        content = content.replace(
            "{{HEFESTO_STATUS}}", "DETECTED - skill operations delegated to Hefesto"
        )
    else:
        content = content.replace(
            "{{HEFESTO_STATUS}}", "NOT DETECTED - using internal workflows"
        )

    if integrations.get("speckit"):
        content = content.replace(
            "{{SPECKIT_STATUS}}", "DETECTED - spec operations delegated to spec-kit"
        )
    else:
        content = content.replace(
            "{{SPECKIT_STATUS}}", "NOT DETECTED - using internal workflows"
        )

    return content


# ── Commands ─────────────────────────────────────────────────────────────────


@app.command()
def init(
    target: str = typer.Argument(".", help="Target project directory"),
    ai: str = typer.Option(
        "all",
        "--ai",
        help="Specific AI CLI to target (claude, gemini, codex, cursor, opencode, qwen, all)",
    ),
    dry_run: bool = typer.Option(False, "--dry-run", help="Show what would be done"),
    force: bool = typer.Option(False, "--force", help="Overwrite existing files"),
):
    """Bootstrap Itzamna in a project. Injects kernel, memory, and workflows into detected AI CLIs."""
    target_path = Path(target).resolve()

    if not target_path.is_dir():
        console.print(f"[red]Directory not found: {target_path}[/red]")
        raise typer.Exit(1)

    console.print(
        Panel(
            f"[bold]Itzamna PromptOS v{__version__}[/bold]\nTarget: {target_path}",
            title="init",
            border_style="cyan",
        )
    )

    # Step 1: Detect agents
    agents = detect_agents(target_path)
    if ai != "all":
        agents = {k: v for k, v in agents.items() if k == ai}

    if not agents:
        console.print(
            "[yellow]No AI CLIs detected. Checking if directories should be created...[/yellow]"
        )
        if ai != "all" and ai in AGENT_CONFIG:
            agents = {ai: {**AGENT_CONFIG[ai], "status": "created by init"}}
        else:
            console.print(
                "[red]No CLIs found. Install at least one AI CLI or specify --ai.[/red]"
            )
            raise typer.Exit(1)

    # Step 2: Detect integrations
    integrations = detect_integrations(target_path)

    # Step 3: Load templates
    templates = {
        "kernel": read_template("kernel.md"),
        "agents": read_template("agents-template.md"),
        "constitution": read_template("constitution-template.md"),
        "memory": read_template("memory-template.md"),
    }

    # Load slash commands
    commands_dir = get_templates_dir() / "commands"
    command_templates = {}
    if commands_dir.exists():
        for cmd_file in commands_dir.glob("*.md"):
            command_templates[cmd_file.stem] = cmd_file.read_text(encoding="utf-8")

    # Step 4: Report detection
    console.print("\n[bold]CLIs detected:[/bold]")
    agent_table = Table(show_header=True)
    agent_table.add_column("CLI", style="cyan")
    agent_table.add_column("Status", style="green")
    for cli_id, info in agents.items():
        agent_table.add_row(info["name"], info["status"])
    console.print(agent_table)

    console.print("\n[bold]Integrations:[/bold]")
    int_table = Table(show_header=True)
    int_table.add_column("Tool", style="cyan")
    int_table.add_column("Status", style="green")
    int_table.add_row(
        "Hefesto",
        "[green]detected[/green]"
        if integrations["hefesto"]
        else "[dim]not found[/dim]",
    )
    int_table.add_row(
        "spec-kit",
        "[green]detected[/green]"
        if integrations["speckit"]
        else "[dim]not found[/dim]",
    )
    console.print(int_table)

    if dry_run:
        console.print("\n[yellow]Dry run mode - no files will be written[/yellow]")

    # Step 5: Inject into each CLI
    results = []

    for cli_id, config in agents.items():
        cli_dir = target_path / config["folder"]
        cmd_dir = cli_dir / config["commands_dir"]

        console.print(
            f"\n[bold cyan]{config['name']}[/bold cyan] ({config['folder']}/)"
        )

        # 5a. Create directories
        if not dry_run:
            cli_dir.mkdir(parents=True, exist_ok=True)
            cmd_dir.mkdir(parents=True, exist_ok=True)
            (cli_dir / "skills").mkdir(parents=True, exist_ok=True)

        # 5b. Write agent file (CLAUDE.md / GEMINI.md / etc.)
        agent_content = customize_template(
            templates["agents"], cli_id, config, integrations
        )
        agent_path = cli_dir / config["agent_file"]
        if not dry_run:
            writer = write_force if force else write_if_not_exists
            status = writer(agent_path, agent_content)
        else:
            status = (
                "would create" if not agent_path.exists() else "would skip (exists)"
            )
        results.append((f"  {config['agent_file']}", status))
        console.print(f"  {config['agent_file']}: {status}")

        # 5c. Write kernel.md
        kernel_content = customize_template(
            templates["kernel"], cli_id, config, integrations
        )
        kernel_path = cli_dir / "kernel.md"
        if not dry_run:
            writer = write_force if force else write_if_not_exists
            status = writer(kernel_path, kernel_content)
        else:
            status = (
                "would create" if not kernel_path.exists() else "would skip (exists)"
            )
        results.append(("  kernel.md", status))
        console.print(f"  kernel.md: {status}")

        # 5d. Write CONSTITUTION.md at project root (once)
        const_path = target_path / "CONSTITUTION.md"
        if not dry_run:
            writer = write_force if force else write_if_not_exists
            status = writer(const_path, templates["constitution"])
        else:
            status = (
                "would create" if not const_path.exists() else "would skip (exists)"
            )

        # 5e. Write MEMORY.md at project root (once)
        mem_path = target_path / "MEMORY.md"
        if not dry_run:
            writer = write_force if force else write_if_not_exists
            status = writer(mem_path, templates["memory"])
        else:
            status = "would create" if not mem_path.exists() else "would skip (exists)"

        # 5f. Write slash commands
        for cmd_name, cmd_content in command_templates.items():
            cmd_content_custom = customize_template(
                cmd_content, cli_id, config, integrations
            )
            cmd_path = cmd_dir / f"{cmd_name}.md"
            if not dry_run:
                writer = write_force if force else write_if_not_exists
                status = writer(cmd_path, cmd_content_custom)
            else:
                status = "would create" if not cmd_path.exists() else "would skip"
            console.print(f"  {config['commands_dir']}/{cmd_name}.md: {status}")

    # Step 6: Write root files
    console.print(f"\n[bold]Project root:[/bold]")
    const_path = target_path / "CONSTITUTION.md"
    if not dry_run:
        status = write_if_not_exists(
            const_path, templates["constitution"], "CONSTITUTION.md"
        )
    else:
        status = "would create" if not const_path.exists() else "exists"
    console.print(f"  CONSTITUTION.md: {status}")

    mem_path = target_path / "MEMORY.md"
    if not dry_run:
        status = write_if_not_exists(mem_path, templates["memory"], "MEMORY.md")
    else:
        status = "would create" if not mem_path.exists() else "exists"
    console.print(f"  MEMORY.md: {status}")

    # Step 7: Create .context/ directory (lean structure)
    console.print(f"\n[bold].context/ (project context):[/bold]")
    context_dir = target_path / ".context"
    context_templates_src = get_templates_dir() / "context"
    if context_templates_src.exists():
        for ctx_file in context_templates_src.glob("*.md"):
            dest = context_dir / ctx_file.name
            if not dry_run:
                context_dir.mkdir(parents=True, exist_ok=True)
                writer = write_force if force else write_if_not_exists
                status = writer(dest, ctx_file.read_text(encoding="utf-8"))
            else:
                status = "would create" if not dest.exists() else "would skip (exists)"
            console.print(f"  .context/{ctx_file.name}: {status}")
    else:
        console.print("  [yellow]context templates not found, skipping[/yellow]")

    # Step 8: Copy core files
    core_src = get_core_dir()
    if core_src.exists():
        for core_file in core_src.glob("*.md"):
            for cli_id, config in agents.items():
                dest = target_path / config["folder"] / "core" / core_file.name
                if not dry_run:
                    dest.parent.mkdir(parents=True, exist_ok=True)
                    writer = write_force if force else write_if_not_exists
                    writer(dest, core_file.read_text(encoding="utf-8"))

    # Summary
    context_exists = context_dir.exists() or dry_run
    console.print(
        Panel(
            f"[green bold]Itzamna initialized![/green bold]\n\n"
            f"CLIs configured: {len(agents)}\n"
            f".context/: {'created' if context_exists else 'skipped'}\n"
            f"Hefesto: {'linked' if integrations['hefesto'] else 'not found'}\n"
            f"spec-kit: {'linked' if integrations['speckit'] else 'not found'}\n\n"
            f"[dim]Next steps:[/dim]\n"
            f"[dim]1. Fill .context/project.md and .context/tech.md with your project info[/dim]\n"
            f"[dim]2. Open your AI CLI - the agent will read the kernel automatically[/dim]",
            border_style="green",
        )
    )


@app.command()
def check(
    target: str = typer.Argument(".", help="Project directory to check"),
):
    """Show detected AI CLIs, integrations, and system status."""
    target_path = Path(target).resolve()

    console.print(
        Panel(
            f"[bold]Itzamna System Check[/bold]\nTarget: {target_path}",
            border_style="cyan",
        )
    )

    # Detect agents
    agents = detect_agents(target_path)
    integrations = detect_integrations(target_path)

    # Agent table
    console.print("\n[bold]AI CLIs:[/bold]")
    table = Table(show_header=True)
    table.add_column("CLI", style="cyan")
    table.add_column("Binary", style="green")
    table.add_column("Directory", style="green")
    table.add_column("Kernel", style="yellow")
    table.add_column("Memory", style="yellow")

    for cli_id, config in AGENT_CONFIG.items():
        has_binary = "yes" if detect_binary(cli_id) else "no"
        has_dir = "yes" if detect_dir(target_path, config["folder"]) else "no"
        has_kernel = (
            "yes" if (target_path / config["folder"] / "kernel.md").exists() else "no"
        )
        has_memory = "yes" if (target_path / "MEMORY.md").exists() else "no"
        table.add_row(config["name"], has_binary, has_dir, has_kernel, has_memory)

    console.print(table)

    # Integrations
    console.print("\n[bold]Integrations:[/bold]")
    int_table = Table(show_header=True)
    int_table.add_column("Tool", style="cyan")
    int_table.add_column("Status", style="green")
    int_table.add_column("Delegation", style="yellow")
    int_table.add_row(
        "Hefesto",
        "[green]detected[/green]"
        if integrations["hefesto"]
        else "[dim]not found[/dim]",
        "skills, agents" if integrations["hefesto"] else "-",
    )
    int_table.add_row(
        "spec-kit",
        "[green]detected[/green]"
        if integrations["speckit"]
        else "[dim]not found[/dim]",
        "specs, plans, tasks" if integrations["speckit"] else "-",
    )
    console.print(int_table)

    # Root files
    console.print("\n[bold]Root files:[/bold]")
    root_files = ["CONSTITUTION.md", "MEMORY.md"]
    for f in root_files:
        path = target_path / f
        if path.exists():
            size = path.stat().st_size
            console.print(f"  [green]{f}[/green] ({size} bytes)")
        else:
            console.print(f"  [red]{f}[/red] (missing)")

    # .context/ directory
    console.print("\n[bold].context/ (project context):[/bold]")
    context_dir = target_path / ".context"
    if context_dir.is_dir():
        context_files = list(context_dir.glob("*.md"))
        for cf in sorted(context_files):
            filled = False
            content = cf.read_text(encoding="utf-8")
            # Check if template placeholders are still present
            if "*(preencha)*" in content or "*(ex:" in content:
                console.print(
                    f"  [yellow]{cf.name}[/yellow] (template - needs filling)"
                )
            else:
                console.print(f"  [green]{cf.name}[/green] ({cf.stat().st_size} bytes)")
        if not context_files:
            console.print("  [yellow]empty - run itzamna init to populate[/yellow]")
    else:
        console.print("  [red].context/ not found[/red] - run itzamna init")


@app.command()
def version():
    """Show Itzamna version."""
    console.print(f"itzamna-cli v{__version__}")


# ── Entry Point ──────────────────────────────────────────────────────────────


def main():
    app()
