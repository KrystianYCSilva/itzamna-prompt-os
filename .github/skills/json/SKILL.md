---
name: json
description: |
  JavaScript Object Notation - lightweight data interchange format that is easy to read and write.
  Use for REST APIs, configuration files, data storage, and any language-agnostic data exchange.
keywords:
  - json
  - data-format
  - rest-api
  - configuration
  - serialization
  - jsonschema
category: technology
subcategory: languages
version: "3.5.0"
created: 2026-02-02
type: skill
---

# JSON

> **Quick Reference:** Lightweight, human-readable data interchange format
> **Use when:** Building REST APIs, storing configs, or exchanging structured data

## When to Use

- ✅ REST API request/response payloads
- ✅ Configuration files (package.json, tsconfig.json, settings)
- ✅ NoSQL database storage (MongoDB, Elasticsearch)
- ✅ Data exchange between different programming languages
- ✅ Storing structured data in files or local storage
- ❌ **NOT for:** Binary data (use base64 or separate files), comments needed (use JSON5/JSONC), or when whitespace matters

## Core Concepts

### 1. Data Types and Syntax

```json
{
  "string": "Hello, World!",
  "number": 42,
  "float": 3.14159,
  "boolean": true,
  "null": null,
  "array": [1, 2, 3, "mixed", true],
  "object": {
    "nested": "value",
    "deeply": {
      "nested": "data"
    }
  }
}
```

**Syntax rules:**
- Keys must be strings in double quotes
- Strings use double quotes only (no single quotes)
- No trailing commas
- No comments (standard JSON)
- Values: string, number, boolean, null, array, object
- Numbers: integer or float, no leading zeros, no hex/octal

### 2. Common Structures

**User object:**
```json
{
  "id": 12345,
  "username": "johndoe",
  "email": "john@example.com",
  "isActive": true,
  "roles": ["user", "admin"],
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "age": 30,
    "address": {
      "street": "123 Main St",
      "city": "Boston",
      "zip": "02101"
    }
  },
  "createdAt": "2026-01-15T10:30:00Z",
  "lastLogin": null
}
```

**API Response with pagination:**
```json
{
  "status": "success",
  "data": [
    {"id": 1, "name": "Item 1"},
    {"id": 2, "name": "Item 2"}
  ],
  "pagination": {
    "page": 1,
    "perPage": 20,
    "total": 156,
    "totalPages": 8
  },
  "meta": {
    "requestId": "abc-123",
    "timestamp": "2026-02-02T14:30:00Z"
  }
}
```

**Error response:**
```json
{
  "status": "error",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format",
        "value": "not-an-email"
      }
    ]
  }
}
```

### 3. JSON Schema Validation

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "User",
  "type": "object",
  "required": ["id", "username", "email"],
  "properties": {
    "id": {
      "type": "integer",
      "minimum": 1
    },
    "username": {
      "type": "string",
      "minLength": 3,
      "maxLength": 20,
      "pattern": "^[a-zA-Z0-9_]+$"
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 120
    },
    "roles": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": ["user", "admin", "moderator"]
      },
      "uniqueItems": true
    },
    "profile": {
      "type": "object",
      "properties": {
        "firstName": {"type": "string"},
        "lastName": {"type": "string"}
      }
    }
  },
  "additionalProperties": false
}
```

### 4. Working with JSON (Pseudo-code)

```
STRUCTURE JSON
    parse(json_string) -> object
    stringify(object) -> json_string
    validate(json_string, schema) -> boolean

// Parsing
FUNCTION parse_json(json_text)
    TRY
        data = JSON.parse(json_text)
        RETURN data
    CATCH ParseError as e
        LOG "Invalid JSON: " + e.message
        RETURN null

// Serialization
FUNCTION to_json(object, pretty=false)
    IF pretty THEN
        RETURN JSON.stringify(object, null, 2)  // 2-space indent
    ELSE
        RETURN JSON.stringify(object)

// Deep clone
FUNCTION clone_object(obj)
    RETURN JSON.parse(JSON.stringify(obj))
    // Note: Loses functions, undefined, Date objects

// Safe access with optional chaining
FUNCTION get_nested_value(obj, path)
    // path = "user.profile.address.city"
    keys = path.split(".")
    result = obj
    FOR key IN keys DO
        IF result AND key IN result THEN
            result = result[key]
        ELSE
            RETURN null
    RETURN result
```

### 5. Common Patterns

**Configuration file (package.json):**
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "My awesome application",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest",
    "build": "webpack"
  },
  "dependencies": {
    "express": "^4.18.0",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  },
  "keywords": ["web", "api"],
  "author": "John Doe <john@example.com>",
  "license": "MIT"
}
```

**REST API Collection (Postman/Thunder Client):**
```json
{
  "name": "API Tests",
  "requests": [
    {
      "name": "Get Users",
      "method": "GET",
      "url": "https://api.example.com/users",
      "headers": {
        "Authorization": "Bearer {{token}}",
        "Content-Type": "application/json"
      }
    },
    {
      "name": "Create User",
      "method": "POST",
      "url": "https://api.example.com/users",
      "body": {
        "username": "newuser",
        "email": "new@example.com"
      }
    }
  ]
}
```

**Data export:**
```json
{
  "exportDate": "2026-02-02T14:00:00Z",
  "version": "1.0",
  "records": [
    {
      "id": "rec_1",
      "type": "transaction",
      "amount": 150.00,
      "currency": "USD",
      "timestamp": "2026-02-01T09:30:00Z"
    }
  ],
  "checksum": "sha256:abc123..."
}
```

## Best Practices

1. **Use consistent key naming:** Stick to camelCase or snake_case throughout
2. **Keep structure flat when possible:** Avoid excessive nesting (>3-4 levels)
3. **Use ISO 8601 for dates:** `"2026-02-02T14:30:00Z"` instead of timestamps or custom formats
4. **Include metadata:** Add version, timestamp, requestId for debugging
5. **Validate with JSON Schema:** Enforce structure and types programmatically
6. **Use pretty printing in dev:** 2-space indentation for human readability
7. **Avoid large arrays:** Paginate or stream large datasets instead
8. **Handle null vs missing:** Decide convention (include null fields or omit?)

## Common Pitfalls

- ❌ **Trailing commas:** `{"key": "value",}` → Invalid, remove trailing comma
- ❌ **Single quotes:** `{'key': 'value'}` → Must use double quotes
- ❌ **Comments:** `// comment` or `/* */` → Not allowed in standard JSON (use JSON5 if needed)
- ❌ **Unquoted keys:** `{key: "value"}` → Keys must be quoted strings
- ❌ **Undefined values:** JavaScript undefined doesn't exist → Use null or omit property
- ❌ **Functions in JSON:** Can't serialize functions → Convert to strings or remove
- ❌ **Circular references:** Object references itself → Causes serialization error
- ❌ **Loss of precision:** Very large integers (>2^53) lose precision → Use strings for big numbers

## Related Skills

- rest-api - Using JSON for API communication
- jsonschema - Validating JSON structure
- yaml - Alternative format with more features
- xml - Older structured data format
- graphql - Query language that uses JSON

## Examples

📚 **Detailed implementations:** → View [json-examples](../examples/json-examples.md)