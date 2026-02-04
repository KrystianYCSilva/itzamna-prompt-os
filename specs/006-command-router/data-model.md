# Data Model: Command Router

## 1. Command Grammar

Formal definition of the supported command structure.

```ebnf
command_message = command_prefix , command_name , [ space , subcommand ] , { space , argument } , { space , flag } ;
command_prefix = "#" ;
command_name = "init" | "add" | "sync" | "update" | "impl" | "docs" ;
subcommand = string ;
argument = quoted_string | unquoted_string ;
flag = "--" , flag_name , [ space , flag_value ] ;
flag_name = "here" | "ia" | "help" | "dry-run" ;
space = " " ;
```

## 2. Entities

### Command Object
*Internal representation passed to Router*

| Field | Type | Description |
|-------|------|-------------|
| `raw_input` | string | The full user message |
| `command` | enum | Primary command (e.g., `init`) |
| `subcommand` | string? | Optional subcommand (e.g., `agent`) |
| `args` | string[] | Positional arguments |
| `flags` | map<string, string> | Key-value pairs of flags |
| `target_workflow` | string | Filename of the workflow to trigger |

### Router Map
*Static configuration mapping commands to workflows*

| Command | Subcommand | Workflow |
|---------|------------|----------|
| `init` | * | `BOOTSTRAP` |
| `add` | `agent` | `BOOTSTRAP-AGENT` |
| `sync` | * | `SYNC-CONTEXT` |
| `impl` | * | `IMPLEMENTATION` |
