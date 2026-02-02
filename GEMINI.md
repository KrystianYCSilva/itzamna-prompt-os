# Gemini Context: Itzamna PromptOS

## Project Overview

**Itzamna PromptOS** is a "Prompt-based Meta-Programming System." It's a cognitive framework designed to direct AI agents (like me) using a structured set of Markdown files rather than traditional code. The system's primary goal is to standardize human-AI collaborative development, enabling the AI to generate new capabilities (skills), adopt specialized roles (personas), and follow strict rules, all while keeping a human in the loop for approval.

The core of the system resides in the `.prompt-os/` directory, which acts as the AI's "operating system."

**Key Technologies:**
*   **Core Logic:** Markdown (`.md`) files containing structured instructions.
*   **Agent Configuration:** TOML (`.toml`) files in `.gemini/commands/`.
*   **Optional Tooling:** JavaScript (`.js`) and PowerShell (`.ps1`) for human-operated helper scripts.

**Architecture:**
The system is built on a "Just-In-Time" (JIT) loading protocol to manage the AI's context window efficiently.
1.  **Kernel (`.prompt-os/`):** The core instruction set, including the entry point (`PROMPTOS.md`) and the master rulebook (`CONSTITUTION.md`).
2.  **Knowledge Base:**
    *   `skills/`: A library of modular, reusable capabilities.
    *   `personas/`: Specialized roles that compose multiple skills.
3.  **Memory:** `MEMORY.md` tracks the project's state and history.
4.  **Governance:** The `CONSTITUTION.md` defines a tiered set of rules (T0, T1, T2) that govern all AI actions, ensuring safety and consistency.
5.  **Agent-Specific Sync:** The project uses a script (`sync-constitution.ps1`) to synchronize a formal version of the constitution from `.specify/memory/constitution.md` to agent-specific directories like `.gemini/`, ensuring consistent core principles across different AI tools.

---

## Building and Running

This project doesn't have a traditional "build" or "run" process. The system is "executed" by an AI agent reading and interpreting the Markdown files.

However, there are optional helper scripts for human developers:

**Generate a new skill:**
```bash
# Uses a Node.js script to guide the creation of a new skill.
node .prompt-os/tools/brain.js generate skill "New Skill Description" --category devops
```

**Synchronize Constitutions:**
```powershell
# Uses a PowerShell script to push the master constitution 
# from the .specify directory to all agent-specific configs.
.\.prompt-os\tools\sync-constitution.ps1 push
```

---

## Development Conventions

The project follows a strict, instruction-based development model.

*   **Prompt-Centric:** All logic, rules, and capabilities are defined in Markdown files.
*   **Human Gate Protocol:** All significant creations or modifications (new skills, personas, etc.) **must** be approved by a human. The AI will present its work for review and will not proceed without an explicit `approve` command.
*   **JIT Loading:** To conserve tokens, the AI is instructed to load only the minimal context necessary for a given task. This is defined in `.prompt-os/core/JIT-PROTOCOL.md`.
*   **Tiered Rules (T0/T1/T2):** The AI must follow the hierarchy of rules in `CONSTITUTION.md`:
    *   **T0 (Inviolable):** Critical rules for security and human oversight. Never broken.
    *   **T1 (Strong):** Best practices. Can be broken with explicit justification.
    *   **T2 (Conventions):** Naming and style guides. Flexible but followed for consistency.
*   **Generation Pipeline:** New artifacts are created using a formal 6-phase pipeline: Classify -> Research -> Generate -> Self-Critique -> **Human Gate** -> Commit.
*   **Spec-Kit Workflow:** For complex features (estimated >5 days), a formal specification process using "Spec-Kit" commands (e.g., `/speckit.specify`) is required.
