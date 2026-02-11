# Instalação do Itzamna CLI

## Método 1: Instalar do repositório (recomendado)

```bash
uv tool install itzamna-cli --from git+https://github.com/KrystianYCSilva/itzamna-prompt-os.git
```

## Método 2: Instalar do código local

```bash
cd /caminho/para/itzamna-prompt-os
uv tool install itzamna-cli --from .
```

## Método 3: Pip install (desenvolvimento)

```bash
cd /caminho/para/itzamna-prompt-os
pip install -e .
```

## Testar instalação

```bash
itzamna version
itzamna check
```

## Troubleshooting

### "Template not found: kernel.md"

Isso acontece se você instalou uma versão antiga antes do commit f9d6501.

**Solução:**

```bash
# 1. Desinstalar versão antiga
uv tool uninstall itzamna-cli
# ou
pip uninstall itzamna-cli

# 2. Reinstalar versão mais recente
uv tool install itzamna-cli --from git+https://github.com/KrystianYCSilva/itzamna-prompt-os.git --force
```

### Verificar onde os templates foram instalados

```bash
python -c "import sys; from pathlib import Path; print(Path(sys.prefix) / 'share' / 'itzamna_cli' / 'templates')"
```

Deve mostrar o caminho e o diretório deve existir.
