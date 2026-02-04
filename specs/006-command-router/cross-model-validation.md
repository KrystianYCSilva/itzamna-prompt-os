# Cross-Model Validation Checklist

> **Goal:** Verify that the Command Router behaves consistently across different AI models (Claude, GPT-4, Gemini, etc.).

## Validation Matrix

| Command Scenario | Expected Outcome | Claude | Gemini | Copilot |
|------------------|------------------|--------|--------|---------|
| **Basic Command** | | | | |
| `#init` | Triggers Bootstrap Workflow. Asks for confirmation. | [ ] | [ ] | [ ] |
| **Subcommand & Args** | | | | |
| `#add agent "TestBot"` | Triggers Agent Bootstrap for "TestBot". | [ ] | [ ] | [ ] |
| **Flags** | | | | |
| `#sync --dry-run` | Shows what would be synced but makes no changes. | [ ] | [ ] | [ ] |
| **Help** | | | | |
| `#init --help` | Displays usage docs for `#init`. | [ ] | [ ] | [ ] |
| **Error Handling** | | | | |
| `#unknowncmd` | "Command not recognized" error with help. | [ ] | [ ] | [ ] |
| **Strict Parsing** | | | | |
| `Please #init` | **IGNORED**. Standard chat response (not router). | [ ] | [ ] | [ ] |
| **Quoting** | | | | |
| `#echo "hello world"` | Parsed as single argument `hello world`. | [ ] | [ ] | [ ] |
| **Interactive Fallback**| | | | |
| `#add agent` | **INTERACTIVE**. Asks user for agent name. | [ ] | [ ] | [ ] |

## How to Test

1. **Open a session** with the specific model.
2. **Load Context:** Ensure `.prompt-os/core/COMMAND-ROUTER.md` and `.prompt-os/core/INPUT-CLASSIFIER.md` are in context.
3. **Execute** the commands in the matrix.
4. **Mark [x]** if the behavior matches the Expected Outcome exactly.
5. **Note Deviations** if the model hallucinates or fails to parse correctly.
