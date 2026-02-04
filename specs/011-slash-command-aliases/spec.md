# Feature Specification: Slash Command Aliases for PromptOS

**Feature Branch**: `011-slash-command-aliases`  
**Created**: 2026-02-04  
**Status**: Draft  
**Input**: User description: "Implementar sistema de aliases /itzamna.* para comandos # existentes, permitindo invocação via slash commands no estilo CLI"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Basic Command Invocation via Slash Syntax (Priority: P1)

As a user, I want to invoke PromptOS commands using `/itzamna.{command}` syntax (similar to SpecKit's `/speckit.*` pattern) so that I can use a CLI-friendly interface that feels natural in conversational contexts.

**Why this priority**: This is the core value proposition - enabling users to invoke commands using a familiar slash syntax. Without this, the feature has no value.

**Independent Test**: Can be fully tested by typing `/itzamna.init my-project` in a conversation and verifying that the system routes it to `#init my-project` workflow, delivering the same result as the hash command.

**Acceptance Scenarios**:

1. **Given** user types `/itzamna.init my-project`, **When** system processes the message, **Then** it routes to `#init my-project` workflow and initializes the project
2. **Given** user types `/itzamna.add core my-protocol`, **When** system processes the message, **Then** it routes to `#add core my-protocol` and creates the protocol file
3. **Given** user types `/itzamna.impl --persona "Software Engineer"`, **When** system processes the message, **Then** it routes to `#impl` with the persona override flag
4. **Given** user types `/itzamna.docs --help`, **When** system processes the message, **Then** it shows documentation command help (same as `#docs --help`)

---

### User Story 2 - Special Slash Commands for System Introspection (Priority: P2)

As a user, I want to use special slash commands like `/itzamna.status`, `/itzamna.skill`, and `/itzamna.memory` to query system state without triggering workflows, so that I can understand the current context and configuration.

**Why this priority**: These commands provide essential visibility into the system but aren't required for core command execution. They enhance usability but don't block the primary use case.

**Independent Test**: Can be fully tested by typing `/itzamna.status` and verifying it returns current workflow state, active persona, and loaded skills without triggering any workflow execution.

**Acceptance Scenarios**:

1. **Given** user types `/itzamna.status`, **When** system processes the message, **Then** it displays current workflow state, active persona, and loaded skills
2. **Given** user types `/itzamna.skill code-quality`, **When** system processes the message, **Then** it shows the content and metadata of the code-quality skill
3. **Given** user types `/itzamna.memory`, **When** system processes the message, **Then** it displays recent session history and key decisions from MEMORY.md
4. **Given** user types `/itzamna.skill --list`, **When** system processes the message, **Then** it shows all available skills with brief descriptions

---

### User Story 3 - Help and Discovery via Slash Commands (Priority: P3)

As a user, I want to discover available commands and their usage by typing `/itzamna.help` or `/itzamna.{command} --help`, so that I can learn the system without consulting external documentation.

**Why this priority**: Help commands improve discoverability but aren't essential for users who already know the command syntax. This is a quality-of-life enhancement.

**Independent Test**: Can be fully tested by typing `/itzamna.help` and verifying it returns a complete list of available commands with brief descriptions and usage examples.

**Acceptance Scenarios**:

1. **Given** user types `/itzamna.help`, **When** system processes the message, **Then** it displays all available `/itzamna.*` commands with brief descriptions
2. **Given** user types `/itzamna.impl --help`, **When** system processes the message, **Then** it shows detailed help for the impl command including flags and examples
3. **Given** user types `/itzamna`, **When** system processes the message (without subcommand), **Then** it displays the same help as `/itzamna.help`
4. **Given** user types `/itzamna.unknown`, **When** system processes an invalid command, **Then** it suggests similar valid commands and shows help link

---

### Edge Cases

- What happens when user types `/itzamna` without a subcommand? → Display help message
- What happens when user types `/itzamna.invalid-command`? → Show error with suggestions for similar valid commands
- What happens when user combines slash and hash syntax (e.g., `/itzamna.init #new`)? → Treat as slash command with `#new` as an argument (literal text)
- What happens when user types `/itzamna.add` with complex quoted arguments? → Parse using same shell-style quoting rules as COMMAND-ROUTER.md
- What happens when a slash command has both pre-existing session state and override flags? → Follow "last command wins" rule from WORKFLOW-ORCHESTRATOR.md
- What happens when user types multiple slash commands in one message? → Process each sequentially in order of appearance

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST recognize `/itzamna.{command}` pattern at the absolute start of the message (first character) as a valid command invocation (regex: `^/itzamna\.`)
- **FR-002**: System MUST map each slash command to its equivalent hash command (e.g., `/itzamna.init` → `#init`, `/itzamna.add` → `#add`)
- **FR-003**: System MUST preserve all arguments, flags, and quoted strings when translating from slash to hash syntax
- **FR-004**: System MUST support all existing hash commands as slash equivalents: `init`, `add`, `sync`, `update`, `impl`, `docs`, `new`, `bug`, `review`, `test`, `arch`
- **FR-005**: System MUST implement special slash-only commands: `status`, `skill`, `memory`, `help`
- **FR-006**: System MUST route translated slash commands through INPUT-CLASSIFIER → COMMAND-ROUTER → WORKFLOW-ORCHESTRATOR chain
- **FR-007**: System MUST show help message when user types `/itzamna` without subcommand
- **FR-008**: System MUST provide error messages with suggestions when user invokes non-existent slash command
- **FR-009**: System MUST support `--help` flag for all slash commands to display command-specific help
- **FR-010**: System MUST maintain compatibility with existing hash command syntax (no breaking changes)
- **FR-011**: System MUST document slash command aliases in agent configuration files (AGENTS.md, CLAUDE.md, GEMINI.md, QWEN.md, .cursorrules)
- **FR-012**: Special commands (`status`, `skill`, `memory`) MUST NOT trigger workflow execution or modify system state

### Key Entities *(include if feature involves data)*

- **Slash Command Alias**: Maps `/itzamna.{command}` pattern to equivalent `#{command}` pattern, preserving all arguments and flags
- **Special Command**: Slash-only commands (`status`, `skill`, `memory`, `help`) that provide system introspection without triggering workflows
- **Command Mapping**: Internal structure that defines which slash commands exist and how they map to hash commands or special handlers

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can invoke any existing hash command using slash syntax and receive identical workflow routing (measured by: same workflow target file invoked, same arguments/flags passed)
- **SC-002**: 100% of hash commands have equivalent slash command aliases documented in help system
- **SC-003**: Special commands (`/itzamna.status`, `/itzamna.skill`, `/itzamna.memory`, `/itzamna.help`) return results without triggering workflow execution
- **SC-004**: Error messages for invalid slash commands include at least one suggestion for a valid alternative command (suggestion must share ≥3 characters with the invalid input using Levenshtein distance)
- **SC-005**: All agent configuration files (AGENTS.md, CLAUDE.md, GEMINI.md, QWEN.md, .cursorrules) successfully recognize and process slash command syntax
- **SC-006**: Cross-model validation confirms slash commands work identically across Claude, Gemini, and Copilot agents

## Assumptions *(optional)*

- Slash command syntax follows industry-standard CLI patterns (forward slash prefix, dot separator, kebab-case subcommands)
- Users are already familiar with hash command syntax and workflows from SPEC-006 and SPEC-007
- Agent configuration files support arbitrary command pattern definitions
- INPUT-CLASSIFIER.md can be extended to detect slash command patterns without breaking existing hash command detection
- Special commands (`status`, `skill`, `memory`) can access necessary system state (workflow context, skill registry, memory file) without requiring new protocols

## Out of Scope *(optional)*

- Auto-completion or tab-completion of slash commands in CLI interfaces (future enhancement)
- Slash command history or command recall features (future enhancement)
- Custom user-defined slash command aliases (future enhancement)
- Slash commands for third-party extensions or plugins (future enhancement)
- Migration tooling to convert existing hash commands to slash commands in scripts/docs (not needed - both syntaxes coexist)
- GUI or web interface for command invocation (slash commands are CLI-focused)

## Dependencies *(optional)*

- **SPEC-006 (COMMAND-ROUTER.md)**: Slash commands must integrate with existing command routing and flag parsing logic
- **SPEC-007 (WORKFLOW-ORCHESTRATOR.md)**: Slash commands must respect workflow-to-persona mappings and override flags
- **INPUT-CLASSIFIER.md**: Must be extended to detect and route slash command patterns
- **Agent Configuration Files**: AGENTS.md, CLAUDE.md, GEMINI.md, QWEN.md, .cursorrules must be updated with slash command examples
- **JIT-PROTOCOL.md**: Special commands (`status`, `skill`) need to access Active Context data without violating JIT loading rules

## Constraints *(optional)*

- Slash command implementation must not break existing hash command syntax or workflows
- Special commands must remain read-only and stateless (no side effects)
- Slash command parsing must follow same shell-style quoting rules as COMMAND-ROUTER.md for consistency
- Command naming must avoid conflicts with SpecKit slash commands (`/speckit.*`) or other existing slash patterns in the codebase
- Implementation must work across all supported AI models (Claude, Gemini, Copilot) without model-specific workarounds
