---
name: html
description: |
  HyperText Markup Language - standard markup for creating web pages and applications.
  Use for structuring web content with semantic elements and accessible markup.
keywords:
  - html
  - html5
  - markup
  - web-development
  - semantic-html
  - dom
category: technology
subcategory: languages
version: "3.5.0"
created: 2026-02-02
type: skill
---

# HTML

> **Quick Reference:** Standard markup language for structuring web content
> **Use when:** Building web pages, web apps, or any browser-rendered content

## When to Use

- ✅ Creating the structure and content of web pages
- ✅ Building semantic, accessible web applications
- ✅ Embedding multimedia content (video, audio, images)
- ✅ Creating forms for user input and data collection
- ✅ Structuring email templates (with limitations)
- ❌ **NOT for:** Styling (use CSS), behavior (use JavaScript), or dynamic server logic

## Core Concepts

### 1. Document Structure and Semantics

HTML5 provides semantic elements that describe content meaning.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
    <meta name="description" content="Page description for SEO">
</head>
<body>
    <header>
        <nav><!-- Navigation --></nav>
    </header>
    
    <main>
        <article>
            <h1>Main Heading</h1>
            <section>
                <h2>Section Heading</h2>
                <p>Content paragraph</p>
            </section>
        </article>
        
        <aside><!-- Sidebar content --></aside>
    </main>
    
    <footer><!-- Footer content --></footer>
</body>
</html>
```

**Key semantic elements:**
- `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- Use semantic tags instead of generic `<div>` when meaning is clear

### 2. Forms and Input Elements

```html
<form action="/submit" method="POST" novalidate>
    <!-- Text inputs -->
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" 
           required minlength="3" maxlength="20"
           placeholder="Enter username">
    
    <!-- Email with validation -->
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <!-- Select dropdown -->
    <label for="country">Country:</label>
    <select id="country" name="country">
        <option value="">Select...</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
    </select>
    
    <!-- Radio buttons -->
    <fieldset>
        <legend>Plan:</legend>
        <label><input type="radio" name="plan" value="free"> Free</label>
        <label><input type="radio" name="plan" value="pro"> Pro</label>
    </fieldset>
    
    <!-- Checkboxes -->
    <label>
        <input type="checkbox" name="terms" required>
        I agree to terms
    </label>
    
    <!-- Textarea -->
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4"></textarea>
    
    <button type="submit">Submit</button>
</form>
```

### 3. Multimedia and Embeds

```html
<!-- Responsive images -->
<picture>
    <source media="(min-width: 800px)" srcset="large.jpg">
    <source media="(min-width: 400px)" srcset="medium.jpg">
    <img src="small.jpg" alt="Descriptive alt text" loading="lazy">
</picture>

<!-- Video with fallback -->
<video width="640" height="360" controls poster="thumbnail.jpg">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <track src="subtitles-en.vtt" kind="subtitles" srclang="en" label="English">
    Your browser doesn't support video.
</video>

<!-- Audio -->
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    Your browser doesn't support audio.
</audio>

<!-- Iframe for embedding -->
<iframe src="https://example.com" 
        width="600" height="400"
        title="Embedded content"
        sandbox="allow-scripts allow-same-origin">
</iframe>
```

### 4. Tables for Tabular Data

```html
<table>
    <caption>Sales Report Q1 2026</caption>
    <thead>
        <tr>
            <th scope="col">Month</th>
            <th scope="col">Revenue</th>
            <th scope="col">Growth</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">January</th>
            <td>$45,000</td>
            <td>+12%</td>
        </tr>
        <tr>
            <th scope="row">February</th>
            <td>$52,000</td>
            <td>+15%</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th scope="row">Total</th>
            <td>$97,000</td>
            <td>+13.5%</td>
        </tr>
    </tfoot>
</table>
```

### 5. Accessibility (A11y) Features

```html
<!-- ARIA landmarks and labels -->
<nav aria-label="Main navigation">
    <ul>
        <li><a href="/" aria-current="page">Home</a></li>
        <li><a href="/about">About</a></li>
    </ul>
</nav>

<!-- Skip link for keyboard users -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<main id="main-content">
    <!-- Button with accessible name -->
    <button aria-label="Close dialog" type="button">
        <span aria-hidden="true">×</span>
    </button>
    
    <!-- Live region for dynamic updates -->
    <div role="status" aria-live="polite" aria-atomic="true">
        Loading...
    </div>
    
    <!-- Expandable section -->
    <button aria-expanded="false" aria-controls="details-1">
        Show details
    </button>
    <div id="details-1" hidden>
        Hidden content
    </div>
</main>
```

## Best Practices

1. **Use semantic HTML:** Choose elements by meaning, not appearance (`<button>` not `<div onclick>`)
2. **Always include alt text:** Describe images meaningfully for screen readers and SEO
3. **Label form inputs properly:** Use `<label>` with `for` attribute matching input `id`
4. **Validate with HTML5 constraints:** Use `required`, `pattern`, `min/max` for client-side validation
5. **Include lang attribute:** `<html lang="en">` helps screen readers and translation tools
6. **Use proper heading hierarchy:** Don't skip levels (H1 → H2 → H3, not H1 → H3)
7. **Keep structure separate from style:** Use CSS for presentation, not `<b>`, `<i>`, `<font>`
8. **Make interactive elements keyboard accessible:** Ensure tab order is logical, add focus styles

## Common Pitfalls

- ❌ **Using divs for everything:** Reduces accessibility → Use semantic elements (`<nav>`, `<article>`, etc.)
- ❌ **Missing alt attributes on images:** Fails accessibility → Always include descriptive alt text
- ❌ **Inline styles and scripts:** Hard to maintain → Use external CSS/JS files
- ❌ **Not closing tags properly:** Causes rendering issues → Validate HTML structure
- ❌ **Using tables for layout:** Outdated practice → Use CSS Grid or Flexbox
- ❌ **Forgetting viewport meta tag:** Breaks mobile responsiveness → Include `<meta name="viewport">`
- ❌ **Non-unique IDs:** Breaks JavaScript/CSS selectors → Ensure each ID is unique on page

## Related Skills

- [css](../css) - Styling HTML content
- javascript - Adding interactivity to HTML
- accessibility - Building inclusive web experiences
- seo - Optimizing HTML for search engines
- [markdown](../../markup/markdown) - Lightweight alternative for simple content

## Examples

📚 **Detailed implementations:** → View [html-examples](examples/html-examples.md)