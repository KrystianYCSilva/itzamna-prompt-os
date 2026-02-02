# Testing Strategy - T1 (Normative)

> **Tier**: T1 - Normativo. Siga esta estratégia para garantir qualidade e confiabilidade.

## Filosofia de Teste

### Princípios
- **Testes Automatizados**: Toda funcionalidade deve ter testes correspondentes
- **Testes Rápidos**: Suite de testes deve executar em tempo razoável (< 5 minutos)
- **Testes Isolados**: Cada teste deve ser independente dos demais
- **Testes Legíveis**: Testes devem ser compreensíveis como especificação do comportamento
- **Testes Completos**: Cobrir casos positivos, negativos e de borda

## Estratégia de Cobertura

### Métricas Obrigatórias
| Tipo de Cobertura | Meta Mínima |
|-------------------|-------------|
| **Line Coverage** | >= 90% |
| **Branch Coverage** | >= 80% |
| **Function Coverage** | >= 95% |

### Exceções Controladas
- Código de inicialização de aplicações (bootstrap)
- Código de tratamento de erros específicos de ambiente
- Código de logging em produção (separadamente testado)

## Tipos de Testes

### Unitários (70% da cobertura)
- Testam funções/métodos isoladamente
- Mock de dependências externas
- Execução rápida, feedback imediato
- Foco em lógica de negócio e regras de validação

### Integração (20% da cobertura)
- Testam interação entre módulos/componentes
- Validam contrato entre interfaces
- Podem incluir acesso a banco de dados ou serviços externos (mockados)
- Verificam fluxos completos de funcionalidades

### E2E (10% da cobertura)
- Testam fluxos completos do usuário
- Validam experiência do usuário final
- Executados em ambiente semelhante ao produção
- Foco em cenários críticos de negócio

## Frameworks e Ferramentas

### JavaScript/Node.js
- **Test Runner**: Jest
- **Mocking**: Jest built-in mocking
- **Assertions**: Jest expect
- **Coverage**: Jest built-in coverage

### Python
- **Test Runner**: pytest
- **Mocking**: unittest.mock
- **Assertions**: pytest assertions
- **Coverage**: pytest-cov

### PowerShell
- **Test Runner**: Pester
- **Mocking**: Pester built-in mocking
- **Assertions**: Pester Should

## Estrutura de Testes

### Organização
```
tests/
├── unit/                 # Testes unitários
│   ├── core/
│   │   └── orchestrator.test.js
│   └── utils/
│       └── validators.test.js
├── integration/          # Testes de integração
│   ├── api/
│   │   └── skill-generation.test.js
│   └── cli/
│       └── brain.test.js
└── e2e/                 # Testes end-to-end
    └── generation-flow.test.js
```

### Nomenclatura de Testes
- Use o padrão: `describe` e `test` para organizar
- Nomeie testes como frases descrevendo o comportamento
- Inclua o caso de teste (sucesso, falha, borda) no nome

```javascript
// CORRETO
test('should return validated input when string is provided', () => {
  // ...
});

test('should throw error when null is provided', () => {
  // ...
});

// PROIBIDO
test('test1', () => {
  // ...
});

test('error case', () => {
  // ...
});
```

## Pipelines de CI/CD

### Validações Obrigatórias
1. **Linting**: Código deve passar por análise estática
2. **Testes Unitários**: Todos os testes devem passar
3. **Cobertura Mínima**: Deve atingir métricas definidas
4. **Análise de Vulnerabilidades**: Não deve conter vulnerabilidades críticas

### Critérios de Bloqueio
- Testes falhando
- Cobertura abaixo do mínimo
- Vulnerabilidades críticas ou altas
- Duplicação excessiva de código

## Padrões de Teste

### AAA Pattern (Arrange, Act, Assert)
```javascript
test('should validate user input correctly', () => {
  // Arrange
  const input = '  hello world  ';
  
  // Act
  const result = validateUserInput(input);
  
  // Assert
  expect(result).toBe('hello world');
});
```

### Testes Parametrizados
```javascript
test.each([
  ['', 'Invalid input'],
  [null, 'Invalid input'],
  [undefined, 'Invalid input'],
])('should throw error for invalid input: %s', (input, expectedError) => {
  expect(() => validateUserInput(input)).toThrow(expectedError);
});
```

## Manutenção de Testes

### Refatoração
- Testes devem ser refatorados junto com o código
- Manter a legibilidade e clareza dos testes
- Remover testes duplicados ou obsoletos

### Documentação
- Documentar cenários complexos de teste
- Manter exemplos atualizados com o comportamento esperado
- Registrar exceções e motivos para skips condicionais