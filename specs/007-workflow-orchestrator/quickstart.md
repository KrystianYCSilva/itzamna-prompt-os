# Quickstart: Workflow & Persona Orchestrator

## How It Works

When you trigger a workflow command (e.g., `#impl`), the Orchestrator automatically:
1. Selects the appropriate **Persona** (e.g., Software Engineer).
2. Loads the relevant **Skills** (e.g., your project's language skill + clean-code).
3. Passes the resolved context to the JIT Protocol for efficient loading.

You don't need to do anything extra. It just works.

---

## Default Workflow Map

| Command | Persona | Skills Loaded |
|---------|---------|---------------|
| `#new` | Product Owner | requirements-gathering, card-templates |
| `#impl` | Software Engineer | {your language}, clean-code, software-testing |
| `#bug` | Debugger | debugging-techniques, error-handling, {your language} |
| `#review` | Code Reviewer | code-quality, security-basics |
| `#docs` | Technical Writer | technical-writing, markdown |
| `#test` | QA Engineer | software-testing, tdd |
| `#arch` | Solutions Architect | system-design, architecture-patterns |

> `{your language}` is auto-detected from `.context/_meta/tech-stack.md`.

---

## Overrides

Need a different persona or extra skills? Use flags:

| Flag | Example | Effect |
|------|---------|--------|
| `--persona` | `#impl --persona architect` | Changes persona to Solutions Architect. Skills still load from `#impl` defaults. |
| `--skills` | `#impl --skills security-basics,tdd` | Adds skills to the default set. If total exceeds 5, lowest-priority defaults are dropped first. |

---

## Troubleshooting

- **"Tech Stack Profile missing"**: Update `.context/_meta/tech-stack.md` with your project's primary language. The orchestrator will then auto-select the right language skill.
- **"Persona 'X' not found"**: The system will show you the list of valid personas. Pick one or omit the flag to use the default.
- **Skills seem wrong**: Check that your tech-stack file is up to date. You can also force specific skills with `--skills`.
