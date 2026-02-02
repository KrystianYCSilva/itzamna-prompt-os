# Contributing to Itzamna PromptOS

🎉 Thank you for considering contributing to Itzamna PromptOS!

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your environment (OS, Python version, etc.)

### Suggesting Enhancements

We welcome suggestions! Please open an issue with:
- Clear description of the enhancement
- Use cases and benefits
- Any implementation ideas you have

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/KrystianYCSilva/itzamna-prompt-os.git
   cd itzamna-prompt-os
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   ```bash
   python core/cli.py info
   python core/cli.py list --type all
   # Test any new functionality
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: description of your changes"
   ```

6. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then open a Pull Request on GitHub.

## Development Guidelines

### Code Style

- Follow PEP 8 for Python code
- Use meaningful variable and function names
- Add docstrings to functions and classes
- Keep functions focused and single-purpose

### Documentation

- Update README.md if adding major features
- Update DOCUMENTATION.md for detailed changes
- Add examples in EXAMPLES.md for new use cases
- Keep comments clear and concise

### Commit Messages

Use clear, descriptive commit messages:
- `Add: new feature or file`
- `Fix: bug description`
- `Update: modification to existing feature`
- `Docs: documentation changes`
- `Refactor: code restructuring`

### Adding New Features

#### New Content Types

To add a new content type (e.g., "tutorial"):

1. **Add template** in `templates/tutorial_template.yaml`
2. **Update config** in `config/system.yaml`:
   ```yaml
   generation:
     types:
       - tutorials
   output:
     paths:
       tutorials: "./tutorials"
   ```
3. **Implement generator** in `core/orchestrator.py`:
   ```python
   def _generate_tutorial(self, research_data: Dict) -> Dict:
       # Implementation
   ```
4. **Update CLI** in `core/cli.py` to support new type
5. **Add example** in appropriate directory
6. **Update documentation**

#### New Commands

To add a new CLI command:

1. **Add subparser** in `core/cli.py`:
   ```python
   new_parser = subparsers.add_parser('command', help='Description')
   new_parser.add_argument('--arg', help='Argument help')
   ```
2. **Implement handler** in main() function
3. **Update documentation** and examples
4. **Test thoroughly**

### Testing

Before submitting:

```bash
# Test CLI commands
python core/cli.py info
python core/cli.py list --type all
python core/cli.py research --topic "Test" --domain "programming"
python core/cli.py generate --topic "Test" --type skill

# Test workflow
python core/cli.py workflow --topic "Test Topic" --type skill
```

### Areas for Contribution

We especially welcome contributions in:

1. **LLM Integration**: Add real API integration for research
2. **Web Interface**: Create a web UI for easier interaction
3. **Templates**: Improve existing templates or add new ones
4. **Documentation**: More examples, translations, tutorials
5. **Testing**: Add automated tests
6. **CI/CD**: Set up GitHub Actions
7. **Integrations**: Better integration with Claude, Cursor, Copilot
8. **Quality**: Code review tools, linters, formatters

## Project Structure

```
itzamna-prompt-os/
├── core/              # Core system code
│   ├── __init__.py
│   ├── orchestrator.py  # Main orchestrator
│   └── cli.py          # CLI interface
├── config/            # Configuration files
│   └── system.yaml
├── templates/         # Content templates
│   ├── skill_template.yaml
│   ├── persona_template.yaml
│   └── prompt_template.yaml
├── skills/           # Generated skills
├── personas/         # Generated personas
├── prompts/          # Generated prompts
├── *.md              # Documentation
└── requirements.txt  # Python dependencies
```

## Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Share knowledge and insights
- Give constructive feedback
- Celebrate successes together

## Questions?

- Open an issue for questions
- Check existing documentation
- Look at examples for guidance

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Itzamna PromptOS!** 🚀
