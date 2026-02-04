# COMMAND ROUTER PROTOCOL

> **Version:** 0.2.0 (Draft)
> **Source:** `specs/006-command-router/spec.md`
> **Type:** Core Protocol
> **Status:** Experimental

---

## 1. IDENTITY & PURPOSE

**Role:** The Command Router is the central dispatcher for all CLI-style interactions in PromptOS.
**Goal:** Parse strictly formatted commands from user input and trigger the corresponding workflows or agents.

---

## 2. CORE GRAMMAR

Formal definition of the supported command structure (EBNF).

```ebnf
command_message = command_prefix , command_name , [ space , subcommand ] , { space , argument } , { space , flag } ;
command_prefix = "#" | "/" ;
command_name = hash_command | slash_command ;
hash_command = "init" | "ini" | "add" | "sync" | "update" | "impl" | "docs" | "new" | "bug" | "review" | "test" | "arch" | "refactor" | "deploy" | "db" | "security" ;
slash_command = "itzamna." , hash_command ;
subcommand = string ;
argument = quoted_string | unquoted_string ;
flag = "--" , flag_name , [ space , flag_value ] ;
flag_name = "here" | "ia" | "help" | "dry-run" | "context-only" | "no-core-copy" | "persona" | "skills" ;
space = " " ;
```

### Alias Translation
When a slash command is detected (`/itzamna.{cmd}`), translate to equivalent hash command (`#{cmd}`) before routing:
- `/itzamna.init my-project` → `#init my-project`
- `/itzamna.impl --persona architect` → `#impl --persona architect`

Arguments, flags, and quoted strings are preserved during translation.

### Parsing Rules
1. **Strict Start:** Commands MUST appear at the very beginning of the message (regex: `^(#|/)`).
2. **Quoting:** Arguments with spaces MUST be enclosed in quotes (e.g., `"my arg"`).
3. **Flags:** Last flag wins if duplicates exist.

## 2.1 PARSING INSTRUCTIONS

### Argument Parsing (Quoted Strings)
When parsing arguments, the system must respect standard shell-style quoting to handle spaces and special characters.

- **Double Quotes (`"`)**: Preserve spaces within. `foo "bar baz"` -> `[foo, "bar baz"]`
- **Single Quotes (`'`)**: Preserve spaces and treat contents literally. `foo 'bar baz'` -> `[foo, "bar baz"]`
- **Mixed**: `foo "bar's"` -> `[foo, "bar's"]`
- **Unquoted**: Spaces act as delimiters. `foo bar baz` -> `[foo, bar, baz]`

### Flag Parsing (Last Flag Wins)
Flags are optional modifiers starting with `--`.
- **Precedence**: If a flag is repeated or conflicts with another flag of the same type, the **last occurrence** in the command string takes precedence.
    - Input: `#init --here --dry-run --here`
    - Result: `--here` is active (set twice), `--dry-run` is active.
- **Values**: Some flags accept values (e.g., `--ia agent`). The value immediately follows the flag.
    - Input: `#add --ia architect --ia dev`
    - Result: `--ia` value is `dev` (Last Flag Wins).

### Interactive Fallback
If a command requires a target (like `--ia {agent}`) that is missing or invalid:
1. **List Available Options**: Show the user the valid options (e.g., available agents).
2. **Prompt for Selection**: Ask the user to choose one of the valid options.
3. **Do Not Fail Silently**: Never guess; always ask if ambiguous.


---

## 3. STANDARD FLAGS

| Flag | Argument | Description |
|------|----------|-------------|
| `--here` | None | Execute command in the current directory/context only. |
| `--ia` | `{agent}` | Route the command to a specific agent (e.g., `--ia architect`). |
| `--help` | None | Display usage information for the specific command. |
| `--dry-run` | None | Simulate the command execution without making changes. |
| `--context-only` | None | Generate only `.context/` and `MEMORY.md` (skip core copy). |
| `--no-core-copy` | None | Alias of `--context-only`. |
| `--persona` | `{persona}` | Override the default persona for the workflow (e.g., `--persona architect`). |
| `--skills` | `{skill1,skill2}` | Add specific skills to the active skill set (e.g., `--skills tdd,security-basics`). |

---

## 4. ROUTER MAP

Mapping of commands to their respective workflows. Slash commands (`/itzamna.*`) are aliases for hash commands (`#*`).

### Bootstrap & Configuration
| Command | Alias | Subcommand | Workflow Target | Description |
|---------|-------|------------|-----------------|-------------|
| `#init` | `/itzamna.init` | * | `BOOTSTRAP.md` | Initialize a new project or agent structure |
| `#ini` | - | * | `BOOTSTRAP.md` | Alias for init (short form) |
| `#add` | `/itzamna.add` | `agent`, `core`, `skill` | `BOOTSTRAP-AGENT.md` | Add components to the system |
| `#sync` | `/itzamna.sync` | * | `SYNC-CONTEXT.md` | Synchronize context files and indices |
| `#update` | `/itzamna.update` | * | `UPDATE.md` | Update system components or dependencies |

### Development Workflows
| Command | Alias | Subcommand | Workflow Target | Description |
|---------|-------|------------|-----------------|-------------|
| `#new` | `/itzamna.new` | * | `CARD-GENERATION.md` | Create new CARD for feature |
| `#impl` | `/itzamna.impl` | `CARD-XXX` | `IMPLEMENTATION.md` | Implement CARD or feature |
| `#bug` | `/itzamna.bug` | * | `BUG-FIXING.md` | Fix bug or error |
| `#review` | `/itzamna.review` | * | `CODE-REVIEW.md` | Code review workflow |
| `#test` | `/itzamna.test` | * | `TEST-GENERATION.md` | Generate tests |
| `#docs` | `/itzamna.docs` | * | `DOCUMENTATION.md` | Generate documentation |
| `#arch` | `/itzamna.arch` | * | `ARCHITECTURE.md` | Architecture decisions |
| `#refactor` | `/itzamna.refactor` | * | `REFACTORING.md` | Refactor code |
| `#deploy` | `/itzamna.deploy` | * | `DEVOPS.md` | Deploy, CI/CD |
| `#db` | `/itzamna.db` | * | `DATABASE.md` | Database operations |
| `#security` | `/itzamna.security` | * | `SECURITY-AUDIT.md` | Security audit |

### Special Commands (Slash-Only, No Workflow)
These commands are handled by INPUT-CLASSIFIER directly and do NOT trigger workflows.

| Command | Description |
|---------|-------------|
| `/itzamna.status` | Show current system state |
| `/itzamna.skill` | List or view skills |
| `/itzamna.memory` | View session memory |
| `/itzamna.help` | Show available commands |
| `/itzamna` | Same as `/itzamna.help` |

---

## 5. RESPONSE TEMPLATES

Standard formats for system feedback.

### 5.1 Usage Help Template
Used when user requests help (e.g., `#command --help`).

```markdown
### 📖 Usage: `#{command}`

> {Description of what the command does}

**Syntax:**
`#{command} [subcommand] [arguments] [flags]`

**Flags:**
- `--flag`: {Description}

**Examples:**
- `#{command} {arg}`: {Explanation}
```

### 5.2 Error Response Template
Used when command parsing fails or command is unknown.

```markdown
### ⚠️ Error: {Error Type}

> {Specific error message detailing what went wrong}

**Suggestion:**
{Constructive suggestion to fix the issue}

**Help Hint:**
Type `#{command} --help` to see valid usage.
```

## 6. PROCESSING LOGIC

Rules for handling command execution flow and exceptions.

1. **Help Priority:**
   - IF flag `--help` is detected in the argument list:
     - STOP processing the command logic.
     - DISPLAY the **Usage Help Template** for the specified command immediately.

2. **Parsing Failure:**
   - IF command parsing fails (invalid syntax, unmatched quotes):
     - DISPLAY the **Error Response Template**.
     - Set Error Type to "Parsing Error".

3. **Unknown Command:**
   - IF the parsed command is not found in the **Router Map**:
     - DISPLAY the **Error Response Template**.
     - Set Error Type to "Unknown Command".
     - Suggest: "Check the list of available commands in `COMMAND-ROUTER.md`."

4. **Missing Arguments:**
   - IF a required argument is missing:
     - DISPLAY the **Error Response Template**.
     - Set Error Type to "Missing Argument".
