---
name: xml
description: |
  Extensible Markup Language - text-based format for storing and transporting structured data.
  Use for configuration files, data exchange, document formats, and web services (SOAP, RSS).
keywords:
  - xml
  - markup
  - data-format
  - configuration
  - soap
  - rss
  - xsd
category: technology
subcategory: languages
version: "3.5.0"
created: 2026-02-02
type: skill
---

# XML

> **Quick Reference:** Extensible markup language for structured, hierarchical data
> **Use when:** Exchanging data between systems, configuration files, or document storage

## When to Use

- ✅ Configuration files for Java/.NET applications (Maven, Spring, web.xml)
- ✅ Data exchange between heterogeneous systems
- ✅ Document formats requiring strict validation (DocBook, SVG)
- ✅ Legacy web services (SOAP APIs)
- ✅ RSS/Atom feeds for content syndication
- ❌ **NOT for:** Modern REST APIs (use JSON), simple configs (use YAML/TOML), or large datasets (inefficient)

## Core Concepts

### 1. Basic Structure and Syntax

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- XML declaration (optional but recommended) -->

<!-- Root element (required, must be unique) -->
<library>
    <!-- Elements can have attributes -->
    <book id="1" category="fiction">
        <!-- Nested elements -->
        <title>The Great Gatsby</title>
        <author>F. Scott Fitzgerald</author>
        <year>1925</year>
        <price currency="USD">12.99</price>
        
        <!-- Self-closing tag -->
        <available/>
        
        <!-- CDATA for special characters -->
        <description><![CDATA[A novel about <dreams> & "ambition"]]></description>
    </book>
    
    <book id="2" category="non-fiction">
        <title>Sapiens</title>
        <author>Yuval Noah Harari</author>
        <year>2011</year>
        <price currency="USD">18.99</price>
    </book>
</library>
```

**Syntax rules:**
- Must have one root element
- Tags are case-sensitive: `<Book>` ≠ `<book>`
- All tags must be properly closed
- Attributes must be quoted
- Special characters: `&lt;` (<), `&gt;` (>), `&amp;` (&), `&quot;` ("), `&apos;` (')

### 2. Namespaces

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- Namespaces prevent element name conflicts -->

<root xmlns:lib="http://example.com/library"
      xmlns:pub="http://example.com/publisher">
    
    <!-- Elements with namespace prefixes -->
    <lib:book>
        <lib:title>XML Guide</lib:title>
        <pub:publisher>TechBooks Inc.</pub:publisher>
        <pub:isbn>978-0-123456-78-9</pub:isbn>
    </lib:book>
    
    <!-- Default namespace (no prefix needed) -->
    <book xmlns="http://example.com/library">
        <title>Another Book</title>
    </book>
</root>
```

### 3. XML Schema Definition (XSD)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
    
    <!-- Define complex type -->
    <xs:element name="library">
        <xs:complexType>
            <xs:sequence>
                <!-- book can appear 0 or more times -->
                <xs:element name="book" minOccurs="0" maxOccurs="unbounded">
                    <xs:complexType>
                        <xs:sequence>
                            <xs:element name="title" type="xs:string"/>
                            <xs:element name="author" type="xs:string"/>
                            <xs:element name="year" type="xs:integer"/>
                            <xs:element name="price" type="priceType"/>
                        </xs:sequence>
                        <!-- Required attribute -->
                        <xs:attribute name="id" type="xs:integer" use="required"/>
                        <!-- Optional attribute with default -->
                        <xs:attribute name="category" type="xs:string" default="fiction"/>
                    </xs:complexType>
                </xs:element>
            </xs:sequence>
        </xs:complexType>
    </xs:element>
    
    <!-- Custom type definition -->
    <xs:complexType name="priceType">
        <xs:simpleContent>
            <xs:extension base="xs:decimal">
                <xs:attribute name="currency" type="xs:string" fixed="USD"/>
            </xs:extension>
        </xs:simpleContent>
    </xs:complexType>
    
</xs:schema>
```

### 4. Common XML Formats

**Maven POM (pom.xml):**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.example</groupId>
    <artifactId>my-app</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>
    
    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>5.3.20</version>
        </dependency>
    </dependencies>
</project>
```

**Spring Configuration:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans">
    
    <bean id="userService" class="com.example.UserService">
        <property name="repository" ref="userRepository"/>
        <property name="maxRetries" value="3"/>
    </bean>
    
    <bean id="userRepository" class="com.example.UserRepository">
        <constructor-arg value="jdbc:mysql://localhost:3306/mydb"/>
    </bean>
    
</beans>
```

**RSS Feed:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
    <channel>
        <title>My Blog</title>
        <link>https://example.com</link>
        <description>Latest blog posts</description>
        
        <item>
            <title>First Post</title>
            <link>https://example.com/post1</link>
            <description>Post description</description>
            <pubDate>Mon, 02 Feb 2026 10:00:00 GMT</pubDate>
            <guid>https://example.com/post1</guid>
        </item>
    </channel>
</rss>
```

### 5. XPath and Querying

```xpath
/* XPath expressions for navigating XML */

/library/book                   // All book elements under library
/library/book[1]                // First book
/library/book[@id='2']          // Book with id=2
/library/book[price > 15]       // Books priced over 15
//title                          // All title elements anywhere
/library/book/title/text()      // Text content of titles
/library/book[@category='fiction']/author  // Authors of fiction books
/library/*                      // All children of library
//book[year > 2000 and price < 20]  // Complex condition
```

## Best Practices

1. **Always include XML declaration:** Specify version and encoding (`<?xml version="1.0" encoding="UTF-8"?>`)
2. **Use meaningful element names:** Descriptive, lowercase-with-hyphens or camelCase
3. **Validate with schemas:** Use XSD to enforce structure and data types
4. **Prefer elements over attributes:** Use attributes only for metadata, elements for data
5. **Use namespaces for extensibility:** Prevent conflicts when combining XML from different sources
6. **Indent for readability:** Use consistent indentation (2 or 4 spaces)
7. **Escape special characters:** Use entities (`&lt;`, `&amp;`) or CDATA for text with markup
8. **Keep documents shallow:** Avoid excessive nesting (>5 levels) for maintainability

## Common Pitfalls

- ❌ **Missing closing tags:** Invalid XML → Every opening tag needs closing tag
- ❌ **Unquoted attributes:** `<book id=1>` → Must be `<book id="1">`
- ❌ **Multiple root elements:** Only one root allowed → Wrap in single parent element
- ❌ **Unescaped special characters:** `<` in text breaks parsing → Use `&lt;` or CDATA
- ❌ **Case mismatch:** `<Book>` vs `</book>` → XML is case-sensitive, must match exactly
- ❌ **Ignoring encoding:** Non-ASCII characters break → Always specify UTF-8 encoding
- ❌ **Overusing attributes:** Hard to extend → Use elements for data, attributes for metadata

## Related Skills

- [json](../../config/json) - Modern alternative for APIs and configs
- yaml - Human-friendly config format
- xslt - Transforming XML documents
- soap - XML-based web service protocol
- html - Similar markup syntax for web content

## Examples

📚 **Detailed implementations:** → View [xml-examples](../examples/xml-examples.md)