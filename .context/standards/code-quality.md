# Code Quality Standards - T1 (Normative)

> **Tier**: T1 - Normativo. Siga estas práticas para manter qualidade consistente.

## Princípios Gerais

### SOLID Principles
1. **Single Responsibility Principle**: Cada função/módulo deve ter uma única razão para mudar
2. **Open/Closed Principle**: Entidades devem estar abertas para extensão mas fechadas para modificação
3. **Liskov Substitution Principle**: Objetos devem ser substituíveis por instâncias de seus subtipos
4. **Interface Segregation Principle**: Clientes não devem ser forçados a depender de interfaces que não usam
5. **Dependency Inversion Principle**: Dependa de abstrações, não de implementações concretas

### Clean Code Guidelines
- **Nomenclatura Clara**: Use nomes descritivos para variáveis, funções e classes
- **Funções Pequenas**: Mantenha funções com no máximo 20 linhas
- **Comentários Significativos**: Comente o "por quê", não o "o quê"
- **Formatação Consistente**: Siga estilo definido no projeto
- **Testes Automatizados**: Cada funcionalidade deve ter testes correspondentes

## JavaScript/Node.js Standards

### Estilo
```javascript
// CORRETO - Nomenclatura clara e consistente
function validateUserInput(input) {
  if (!input || typeof input !== 'string') {
    throw new Error('Invalid input: expected non-empty string');
  }
  return input.trim();
}

// PROIBIDO - Nomenclatura obscura e sem padrão
function chk(x) {
  if(!x){throw Error("err")}
  return x
}
```

### Estrutura de Código
- Use const por padrão, let quando necessário, evite var
- Use arrow functions para callbacks simples
- Evite callback hell usando async/await
- Use destructuring para acessar propriedades de objetos

## Python Standards

### Estilo
```python
# CORRETO - Seguindo PEP 8
def calculate_total_price(items):
    """
    Calcula o preço total de uma lista de itens.
    
    Args:
        items: Lista de dicionários com 'price' e 'quantity'
        
    Returns:
        float: Preço total calculado
    """
    total = 0
    for item in items:
        total += item['price'] * item['quantity']
    return total

# PROIBIDO - Violações de PEP 8
def calcTP(items):
    total=0
    for i in items:total+=i['price']*i['quantity']
    return total
```

### Estrutura de Código
- Use docstrings para todas as funções públicas
- Siga convenções de nomenclatura (snake_case para funções/variáveis)
- Importações no topo do arquivo, organizadas por tipo
- Evite imports wildcard (*)

## PowerShell Standards

### Estilo
```powershell
# CORRETO - Função bem documentada e clara
function Get-SystemInfo {
    <#
    .SYNOPSIS
        Retorna informações básicas do sistema.
    .DESCRIPTION
        Esta função coleta informações básicas do sistema como nome, versão do SO e memória.
    #>
    $systemInfo = Get-ComputerInfo
    return @{
        ComputerName = $systemInfo.CsName
        OSVersion = $systemInfo.WindowsVersion
        TotalMemoryGB = [math]::Round($systemInfo.TotalPhysicalMemory / 1GB, 2)
    }
}

# PROIBIDO - Falta documentação e clareza
function gsi { Get-ComputerInfo }
```

## Markdown Standards (Skills/Personas)

### Estrutura Padrão
- Use frontmatter YAML para metadados
- Seções obrigatórias: Descrição, Exemplos, Restrições
- Links para referências oficiais
- Código com highlighting adequado

```markdown
---
name: docker-containerization
category: devops
level: L2
---

# Docker Containerization

## Descrição
Explica conceitos e melhores práticas para containerização com Docker.

## Exemplos
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## Restrições
- Não usar latest tag em produção
- Sempre limpar pacotes temporários após instalação
```

## Testes

### Princípios de Teste
- Um teste por comportamento específico
- Nomes descritivos indicando o que está sendo testado
- Testes independentes entre si
- Cobertura mínima de 90% para novas funcionalidades

### Estrutura de Teste
```javascript
describe('validateUserInput', () => {
  test('should trim whitespace from input', () => {
    const result = validateUserInput('  hello world  ');
    expect(result).toBe('hello world');
  });

  test('should throw error for invalid input', () => {
    expect(() => validateUserInput(null)).toThrow('Invalid input');
  });
});
```