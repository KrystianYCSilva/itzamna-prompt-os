---
name: static-site-generators
description: |
  Tools that generate static HTML websites from templates and content files (Markdown, YAML, JSON).
  Use for blogs, documentation sites, portfolios, and content-heavy sites without backend requirements.
keywords:
  - static-site-generator
  - ssg
  - jamstack
  - hugo
  - jekyll
  - gatsby
  - nextjs
  - eleventy
category: technology
subcategory: web-mobile
version: "3.5.0"
created: 2026-02-02
type: skill
---

# Static Site Generators

> **Quick Reference:** Build fast, static HTML sites from templates and content files
> **Use when:** Creating blogs, docs, portfolios without needing dynamic backend

## When to Use

- ✅ Building blogs, portfolios, and marketing sites
- ✅ Creating documentation websites (technical docs, wikis)
- ✅ Deploying fast, SEO-friendly sites with minimal infrastructure
- ✅ Sites where content changes infrequently (generate on content update)
- ✅ JAMstack architecture (JavaScript, APIs, Markup)
- ❌ **NOT for:** Real-time data, user-generated content, complex web applications requiring server logic

## Core Concepts

### 1. Static Site Generation Architecture

```
WORKFLOW static_generation
    1. Content Creation
       - Write Markdown/MDX files
       - Define data in YAML/JSON
       - Create templates/layouts
    
    2. Build Process
       - Parse content files
       - Apply templates
       - Generate HTML/CSS/JS
       - Optimize assets (images, minify)
    
    3. Deployment
       - Upload static files to CDN/host
       - No server-side rendering needed
       - Instant page loads

STRUCTURE SiteGenerator
    content_sources: [markdown_files, yaml_data, apis]
    templates: [layouts, partials, components]
    build_output: static_html_directory
    
    FUNCTION build()
        FOR each content_file IN content_sources DO
            data = parse(content_file)
            html = render_template(template, data)
            write_output(html)
        optimize_assets()
        generate_sitemap()
```

### 2. Popular Static Site Generators

**Hugo (Go-based, fastest):**
```bash
# Install Hugo
brew install hugo  # macOS
# or download from https://gohugo.io

# Create new site
hugo new site my-site
cd my-site

# Add theme
git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke themes/ananke
echo "theme = 'ananke'" >> config.toml

# Create content
hugo new posts/my-first-post.md

# Run dev server
hugo server -D

# Build for production
hugo
```

**Jekyll (Ruby-based, GitHub Pages default):**
```bash
# Install Jekyll
gem install bundler jekyll

# Create site
jekyll new my-site
cd my-site

# Run dev server
bundle exec jekyll serve

# Build
bundle exec jekyll build
```

**Next.js (React-based, hybrid SSG/SSR):**
```bash
# Create Next.js app
npx create-next-app@latest my-site
cd my-site

# Run dev server
npm run dev

# Build static export
npm run build
npm run export
```

**Eleventy (11ty - JavaScript, flexible):**
```bash
# Install Eleventy
npm install -g @11ty/eleventy

# Create site structure
mkdir my-site && cd my-site
npm init -y
npm install --save-dev @11ty/eleventy

# Run dev server
npx eleventy --serve

# Build
npx eleventy
```

### 3. Content Structure and Frontmatter

**Markdown with YAML frontmatter:**
```markdown
---
title: "Getting Started with SSGs"
date: 2026-02-02
author: "Jane Doe"
tags: ["web", "jamstack", "tutorial"]
description: "Learn how to build static sites efficiently"
featured_image: "/images/ssg-cover.jpg"
draft: false
---

# Getting Started with SSGs

Static site generators transform plain text files into complete websites...

## Why Use SSGs?

1. **Performance**: Pre-rendered HTML loads instantly
2. **Security**: No database or server-side code to exploit
3. **Scalability**: Serve from CDN, handle millions of requests
```

**Hugo config (config.toml):**
```toml
baseURL = "https://example.com/"
languageCode = "en-us"
title = "My Awesome Site"
theme = "ananke"

[params]
  description = "A blog about tech"
  author = "Jane Doe"
  
[menu]
  [[menu.main]]
    name = "Home"
    url = "/"
    weight = 1
  [[menu.main]]
    name = "Blog"
    url = "/posts/"
    weight = 2

[markup]
  [markup.highlight]
    style = "monokai"
```

### 4. Templates and Layouts

**Hugo template example (layouts/_default/single.html):**
```html
<!DOCTYPE html>
<html lang="{{ .Site.LanguageCode }}">
<head>
    <meta charset="UTF-8">
    <title>{{ .Title }} | {{ .Site.Title }}</title>
    <meta name="description" content="{{ .Description }}">
</head>
<body>
    {{ partial "header.html" . }}
    
    <main>
        <article>
            <h1>{{ .Title }}</h1>
            <time>{{ .Date.Format "January 2, 2006" }}</time>
            
            {{ .Content }}
            
            <div class="tags">
                {{ range .Params.tags }}
                    <a href="/tags/{{ . | urlize }}">{{ . }}</a>
                {{ end }}
            </div>
        </article>
    </main>
    
    {{ partial "footer.html" . }}
</body>
</html>
```

**Jekyll template (Liquid):**
```liquid
---
layout: default
---

<article>
  <h1>{{ page.title }}</h1>
  <time datetime="{{ page.date | date_to_xmlschema }}">
    {{ page.date | date: "%B %d, %Y" }}
  </time>
  
  {{ content }}
  
  {% if page.tags %}
    <div class="tags">
      {% for tag in page.tags %}
        <a href="/tags/{{ tag | slugify }}">{{ tag }}</a>
      {% endfor %}
    </div>
  {% endif %}
</article>
```

### 5. Deployment Strategies

```bash
# Deploy to Netlify
# 1. Connect Git repository
# 2. Configure build settings:
#    Build command: hugo
#    Publish directory: public

# Deploy to Vercel
vercel --prod

# Deploy to GitHub Pages (Jekyll)
# Push to gh-pages branch or use GitHub Actions

# Deploy to AWS S3 + CloudFront
hugo
aws s3 sync public/ s3://my-bucket --delete
aws cloudfront create-invalidation --distribution-id XXXXX --paths "/*"

# Deploy with GitHub Actions (Hugo example)
# .github/workflows/deploy.yml
name: Deploy Hugo Site
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
      - name: Build
        run: hugo --minify
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

## Best Practices

1. **Organize content logically:** Use clear directory structure (posts/, pages/, projects/)
2. **Use frontmatter consistently:** Standardize metadata fields across content
3. **Optimize images:** Use responsive images, lazy loading, modern formats (WebP)
4. **Implement caching strategies:** Set proper cache headers for static assets
5. **Use partial templates:** DRY principle - reuse headers, footers, navigation
6. **Enable syntax highlighting:** Configure for code blocks in technical content
7. **Generate sitemaps and RSS:** Built-in features for SEO and syndication
8. **Version control everything:** Track content, config, and templates in Git

## Common Pitfalls

- ❌ **Rebuilding entire site for small changes:** Use incremental builds when available
- ❌ **Not optimizing images:** Large images slow down sites → Use image processing plugins
- ❌ **Hardcoding URLs:** Breaks when deploying to different domains → Use relative paths or config variables
- ❌ **Ignoring build performance:** Large sites slow down → Use caching, partial rebuilds
- ❌ **Not testing locally:** Builds fail in production → Always test `hugo`/`jekyll build` before deploying
- ❌ **Missing 404 pages:** Poor UX for broken links → Create custom 404.html
- ❌ **No search functionality:** Users can't find content → Add client-side search (Algolia, Lunr.js)

## Related Skills

- [markdown](../../markup/markdown) - Primary content format for SSGs
- [yaml-configuration-best-practices](../../config/yaml-configuration-best-practices) - Configuration and frontmatter
- [html](../html) - Template language
- jamstack - Modern web architecture using SSGs
- [git](../../devops/git) - Version control for content and code

## Examples

📚 **Detailed implementations:** → View [static-site-generators-examples](examples/static-site-generators-examples.md)