# Architecture - Itzamna PromptOS

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Itzamna PromptOS                            │
│                 Auto-Evolutionary System                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        User Interface                           │
├─────────────────────────────────────────────────────────────────┤
│  CLI (core/cli.py)                                             │
│  - generate, workflow, research, list, info commands           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Orchestrator Layer                           │
├─────────────────────────────────────────────────────────────────┤
│  PromptOSOrchestrator (core/orchestrator.py)                   │
│  - Coordinates the complete workflow                           │
│  - Manages configuration                                       │
│  - Handles state transitions                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Workflow Stages                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     │
│  │  Research   │ ──▶ │ Generation  │ ──▶ │  Approval   │     │
│  └─────────────┘     └─────────────┘     └─────────────┘     │
│         │                    │                    │            │
│         ↓                    ↓                    ↓            │
│   Topic Analysis      Content Creation     Human Review       │
│   Domain Context      Template-based       Quality Check      │
│   Key Concepts        Structured Output    Validation         │
│                                                  │             │
│                                                  ↓             │
│                                         ┌─────────────┐       │
│                                         │   Commit    │       │
│                                         └─────────────┘       │
│                                                  │             │
│                                                  ↓             │
│                                          File System           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Storage Layer                              │
├─────────────────────────────────────────────────────────────────┤
│  skills/         personas/        prompts/                     │
│  - *.md files    - *.yaml files   - *.md files                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   Configuration & Templates                     │
├─────────────────────────────────────────────────────────────────┤
│  config/system.yaml          templates/                        │
│  - Workflow settings         - skill_template.yaml             │
│  - Approval config           - persona_template.yaml           │
│  - Integration settings      - prompt_template.yaml            │
└─────────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. CLI Layer (core/cli.py)
**Responsibility**: User interaction and command routing

**Commands**:
- `generate`: Generate content without full workflow
- `workflow`: Execute complete Research → Generate → Approve → Commit flow
- `research`: Research only without generation
- `list`: List existing content
- `info`: Display system information

**Input**: Command-line arguments
**Output**: Console output, generated files

### 2. Orchestrator (core/orchestrator.py)
**Responsibility**: Coordinate workflow stages and manage state

**Key Methods**:
- `research(topic, domain)`: Stage 1 - Research phase
- `generate(research_data, content_type)`: Stage 2 - Generation phase
- `approve(content)`: Stage 3 - Approval phase
- `commit(content, approved)`: Stage 4 - Commit phase
- `run_workflow(...)`: Execute complete workflow

**State Management**:
- Configuration loading
- Workflow stage transitions
- Error handling and recovery

### 3. Workflow Stages

#### Stage 1: Research
```python
research(topic, domain) → research_data
```
- Analyzes topic and domain
- Gathers key concepts and best practices
- Returns structured research data

#### Stage 2: Generation
```python
generate(research_data, content_type) → content
```
- Uses templates from `templates/`
- Generates structured content (skill/persona/prompt)
- Applies formatting and metadata
- Returns generated content object

#### Stage 3: Approval
```python
approve(content) → bool
```
- Presents content for human review
- Displays formatted output
- Returns approval status
- Default: requires explicit approval

#### Stage 4: Commit
```python
commit(content, approved) → bool
```
- Validates approval status
- Determines output path
- Writes content to appropriate directory
- Returns success status

### 4. Storage Layer

**skills/**
- Format: Markdown (`.md`)
- Structure: Standardized sections
- Naming: `{domain}_{topic}.md`

**personas/**
- Format: YAML (`.yaml`)
- Structure: Attributes, capabilities, patterns
- Naming: `{name}_persona.yaml`

**prompts/**
- Format: Markdown (`.md`)
- Structure: Purpose, guidelines, examples
- Naming: `{purpose}_prompt.md`

### 5. Configuration Layer

**config/system.yaml**
```yaml
workflow:
  stages: [research, generation, approval, commit]
approval:
  mode: "human"
  auto_approve: false
generation:
  types: [skills, personas, prompts]
```

**templates/**
- Define structure for generated content
- Specify required sections
- Set metadata requirements

## Data Flow

### Workflow Execution
```
User Input (CLI)
    ↓
Orchestrator.run_workflow()
    ↓
[Stage 1] Research
    topic + domain → research_data
    ↓
[Stage 2] Generation
    research_data + template → content
    ↓
[Stage 3] Approval
    content → display → user decision → approved
    ↓
[Stage 4] Commit
    content + approved → file system
    ↓
Success/Failure
```

### Content Object Structure
```python
{
    "type": "skill" | "persona" | "prompt",
    "name": str,
    "content": str,
    "metadata": {
        "generated_at": ISO8601,
        "version": "1.0.0",
        "status": "pending_approval" | "approved"
    }
}
```

## Integration Points

### GitHub Spec-Kit
- Skills as specification documents
- Structured markdown format
- Version control friendly

### Claude Code
- Personas as agent definitions
- Prompts as system messages
- Context-aware content

### Cursor
- Skills as context files
- Inline code examples
- Documentation references

### Copilot
- Prompts as copilot instructions
- Code examples for training
- Best practices documentation

## Extensibility

### Adding New Content Types
1. Add template in `templates/`
2. Implement generator in `orchestrator.py`
3. Update configuration in `config/system.yaml`
4. Add CLI support in `cli.py`

### Custom Generators
```python
class CustomOrchestrator(PromptOSOrchestrator):
    def _generate_custom(self, research_data):
        # Custom generation logic
        pass
```

### External Integrations
- API endpoints for remote access
- Webhook support for automation
- CI/CD pipeline integration
- LLM integration for enhanced research

## Security Considerations

1. **Input Validation**: Validate all user inputs
2. **File System Access**: Restrict to designated directories
3. **Template Injection**: Sanitize template variables
4. **Approval Required**: Default to manual approval
5. **Audit Trail**: Log all operations

## Performance

- **Research**: O(1) - lightweight analysis
- **Generation**: O(1) - template-based
- **Approval**: Human-limited
- **Commit**: O(1) - single file write

**Bottleneck**: Human approval stage (by design)

## Future Enhancements

1. **LLM Integration**: Use AI for enhanced research and generation
2. **Web Interface**: Browser-based approval workflow
3. **Version Control**: Automatic versioning and diff
4. **Collaborative**: Multi-user approval process
5. **Analytics**: Usage metrics and quality tracking
6. **Learning**: Improve generation based on feedback

---

**Design Principles**:
- Simplicity over complexity
- Human in the loop
- Extensible architecture
- Clear separation of concerns
- Fail-safe defaults
