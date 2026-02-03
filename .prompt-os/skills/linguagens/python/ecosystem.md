# Python Ecosystem — Detalhes (JIT)

> **Load JIT quando:** Precisa entender pip, PyPI, virtual environments, ou frameworks populares  
> **Parent skill:** [Python Baseline](SKILL.md)

## Package Management

### pip (Package Installer for Python)

Gerenciador de pacotes padrão do Python, instalado por default:

```bash
# Instalar pacote
pip install requests

# Instalar versão específica
pip install django==4.2.0

# Instalar de requirements.txt
pip install -r requirements.txt

# Listar pacotes instalados
pip list

# Mostrar info de pacote
pip show requests

# Desinstalar
pip uninstall requests
```

**requirements.txt** — Lista de dependências:

```
# requirements.txt
requests==2.31.0
flask>=2.0.0,<3.0.0
pytest  # Última versão
```

### PyPI (Python Package Index)

Repositório central de pacotes Python (https://pypi.org):
- **400.000+ pacotes** disponíveis
- Qualquer pessoa pode publicar (após autenticação)
- Comandos: `twine upload` (publish), `pip install` (consume)

**Pacotes populares:**
- **Web:** Django, Flask, FastAPI
- **Data science:** NumPy, pandas, Matplotlib
- **ML:** TensorFlow, PyTorch, scikit-learn
- **Testing:** pytest, unittest
- **HTTP:** requests, aiohttp

## Virtual Environments

**Problema:** Projetos diferentes podem precisar de versões diferentes do mesmo pacote.

### venv (Padrão desde Python 3.3)

```bash
# Criar virtual environment
python -m venv myenv

# Ativar (Linux/Mac)
source myenv/bin/activate

# Ativar (Windows)
myenv\Scripts\activate

# Instalar pacotes (isolado do sistema)
pip install requests

# Desativar
deactivate
```

**Como funciona:**
- Cria diretório com cópia do interpretador Python
- Pacotes instalados via pip vão para `myenv/lib/pythonX.Y/site-packages`
- `activate` modifica `PATH` para usar interpretador isolado

### virtualenv (Predecessor do venv)

Biblioteca externa com mais recursos:

```bash
pip install virtualenv

# Criar environment com Python específico
virtualenv -p python3.9 myenv
```

**Diferença de venv:** Suporta Python 2.7, mais opções de customização.

### conda (Anaconda/Miniconda)

Gerenciador de pacotes E ambientes (não apenas Python):

```bash
# Criar environment com Python 3.10
conda create -n myenv python=3.10

# Ativar
conda activate myenv

# Instalar pacotes (conda tem próprio repositório)
conda install numpy pandas

# Também suporta pip
pip install requests

# Listar environments
conda env list
```

**Vantagens:**
- Gerencia dependências não-Python (bibliotecas C, compiladores)
- Popular em data science (pré-compila NumPy, SciPy, etc.)
- Resolve conflitos de dependências

**Desvantagens:**
- Mais pesado que venv (download inicial ~500MB)
- Repositório conda às vezes defasado em relação ao PyPI

## Frameworks Populares

### Web Frameworks

**Django** — "Batteries included" (ORM, admin, auth built-in):

```python
# myapp/models.py
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
```

**Flask** — Microframework minimalista:

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello, World!"

if __name__ == '__main__':
    app.run()
```

**FastAPI** — Moderno, async, type hints:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}
```

**Comparação:**

| Framework | Filosofia | Performance | Use When |
|-----------|-----------|-------------|----------|
| Django | Full-stack | Moderada | MVP rápido, CMS, admin complexo |
| Flask | Minimalista | Moderada | APIs simples, microservices |
| FastAPI | Moderno | Alta (async) | APIs REST/GraphQL com alta carga |

### Data Science

**NumPy** — Arrays n-dimensionais, operações vetorizadas:

```python
import numpy as np

arr = np.array([1, 2, 3, 4])
print(arr * 2)  # [2, 4, 6, 8] (operação vetorizada, sem loop)
```

**pandas** — DataFrames para análise de dados:

```python
import pandas as pd

df = pd.DataFrame({
    'name': ['Alice', 'Bob'],
    'age': [25, 30]
})
print(df[df['age'] > 26])
```

**Matplotlib/Seaborn** — Visualização de dados:

```python
import matplotlib.pyplot as plt

plt.plot([1, 2, 3], [1, 4, 9])
plt.show()
```

### Machine Learning

**scikit-learn** — ML clássico (regressão, classificação, clustering):

```python
from sklearn.ensemble import RandomForestClassifier

clf = RandomForestClassifier()
clf.fit(X_train, y_train)
predictions = clf.predict(X_test)
```

**TensorFlow/Keras** — Deep learning:

```python
from tensorflow import keras

model = keras.Sequential([
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dense(10, activation='softmax')
])
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy')
model.fit(X_train, y_train, epochs=10)
```

**PyTorch** — Deep learning com API mais Pythônica:

```python
import torch
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(784, 128),
    nn.ReLU(),
    nn.Linear(128, 10)
)
```

### Testing

**pytest** — Framework de testes moderno:

```python
# test_example.py
def test_sum():
    assert sum([1, 2, 3]) == 6

def test_exception():
    with pytest.raises(ValueError):
        int('invalid')
```

```bash
pytest  # Descobre e executa todos os test_*.py
```

**unittest** — Framework padrão (estilo JUnit):

```python
import unittest

class TestMath(unittest.TestCase):
    def test_sum(self):
        self.assertEqual(sum([1, 2, 3]), 6)
```

## Build Tools e Dependency Management

### setuptools

Empacotamento tradicional de bibliotecas Python:

```python
# setup.py
from setuptools import setup

setup(
    name='mypackage',
    version='1.0.0',
    install_requires=['requests>=2.0.0'],
)
```

### Poetry (Moderno)

Gerenciamento de dependências e build:

```bash
poetry init  # Cria pyproject.toml
poetry add requests  # Adiciona dependência
poetry install  # Instala dependências + cria lock file
poetry build  # Cria wheel/sdist
```

**pyproject.toml** (PEP 518):

```toml
[tool.poetry]
name = "myproject"
version = "1.0.0"

[tool.poetry.dependencies]
python = "^3.9"
requests = "^2.31.0"
```

**Vantagens sobre requirements.txt:**
- Lock file determínistico (poetry.lock)
- Resolve conflitos de dependências
- Gerencia ambientes virtuais automaticamente

## Estrutura de Projeto Típica

```
myproject/
├── myproject/           # Pacote principal
│   ├── __init__.py
│   ├── core.py
│   └── utils.py
├── tests/               # Testes
│   ├── __init__.py
│   └── test_core.py
├── requirements.txt     # Dependências (pip)
├── pyproject.toml       # Metadados (Poetry/setuptools)
├── README.md
└── .gitignore
```

**`__init__.py`** — Marca diretório como pacote Python:

```python
# myproject/__init__.py
from .core import main_function

__version__ = "1.0.0"
```

## Ferramentas de Desenvolvimento

**Black** — Formatador de código (sem configuração):

```bash
black myproject/  # Formata todos os .py
```

**Flake8** — Linter (PEP 8 style guide):

```bash
flake8 myproject/  # Reporta violações
```

**mypy** — Type checker (valida type hints):

```bash
mypy myproject/  # Verifica anotações de tipo
```

**isort** — Organiza imports automaticamente:

```bash
isort myproject/
```

## Comparação: pip vs conda vs Poetry

| Aspecto | pip + venv | conda | Poetry |
|---------|-----------|-------|--------|
| Gerencia Python | ❌ (usa sistema) | ✅ | ❌ (usa sistema) |
| Gerencia não-Python | ❌ | ✅ (C libs) | ❌ |
| Lock file | ❌ | ✅ | ✅ |
| Resolve conflitos | Básico | Avançado | Avançado |
| Tamanho | Leve | Pesado (~500MB) | Leve |
| Velocidade | Rápida | Lenta | Moderada |

**Recomendação:**
- **Data science:** conda (gerencia NumPy compilado, CUDA, etc.)
- **Web/backend:** Poetry (lock files, deploy consistente)
- **Scripts simples:** pip + venv (padrão, sem dependências externas)

---

**Voltar para:** [Python Baseline Skill](SKILL.md)
