# Quickstart: Command Router

## Usage

Commands must be typed at the **very beginning** of your message.

### Basic Commands

| Action | Command | Example |
|--------|---------|---------|
| Initialize Project | `#init` | `#init --here` |
| Add Agent | `#add agent` | `#add agent qwen` |
| Sync Context | `#sync` | `#sync context` |
| Update Docs | `#docs` | `#docs update` |

### Flags

| Flag | Description |
|------|-------------|
| `--here` | Execute in current directory |
| `--ia {agent}` | Target specific agent (e.g., `--ia copilot`) |
| `--dry-run` | Simulate without changes |
| `--help` | Show usage info |

## Troubleshooting

- **Command ignored?** Ensure it is the first thing in the message.
- **Agent not found?** Check available agents with `#list agents` (if available) or check `AGENTS.md`.
- **Argument error?** Use quotes for arguments with spaces: `#add agent "my agent"`
