<<<<<<< HEAD
# my-blog
Sawrav's BlogSite
=======
# Sawrav Roy — Personal Blog

A personal blog built with [Docusaurus](https://docusaurus.io/), covering
**Science**, **Engineering**, and **Philosophy**. Styled after AWS documentation
aesthetics — clean, professional, and readable.

**Live site:** `https://sawravroy.github.io/my-blog/`

---

## Table of Contents

- [Local development](#local-development)
- [Writing a new post](#writing-a-new-post)
- [Tagging system](#tagging-system)
- [RSS feeds](#rss-feeds)
- [Social sharing](#social-sharing)
- [Hosting on GitHub Pages (step-by-step)](#hosting-on-github-pages-step-by-step)
- [Custom domain (optional)](#custom-domain-optional)
- [Updating the site](#updating-the-site)

---

## Local development

**Prerequisites:** Node.js ≥ 18.

```bash
# Install dependencies
npm install

# Start dev server at http://localhost:3000
npm start

# Build for production
npm run build

# Preview production build locally
npm run serve
```

---

## Writing a new post

Create a new folder under `blog/` named `YYYY-MM-DD-your-post-slug/` and add
an `index.md` file:

```
blog/
└── 2025-06-01-my-new-post/
    └── index.md
```

**Minimum front matter:**

```yaml
---
slug: my-new-post
title: My New Post Title
authors: sawravroy           # matches blog/authors.yml
date: 2025-06-01
tags: [science, engineering]
description: One-sentence summary used in cards and social previews.
---
```

Add `<!-- truncate -->` in the body to mark the "fold" — everything before it
appears on the blog list page; everything after requires clicking through.

**To include social share buttons**, import and render the component:

```mdx
import SocialShare from '@site/src/components/SocialShare';

...your post content...

<SocialShare title="My New Post Title" />
```

---

## Tagging system

Tags are declared in the `tags` array of each post's front matter. Common tags
used in this blog:

| Tag | Topic |
|---|---|
| `science` | Science |
| `engineering` | Engineering |
| `philosophy` | Philosophy |
| `mathematics` | Mathematics |
| `distributed-systems` | Distributed systems |
| `machine-learning` | Machine learning / AI |
| `philosophy-of-science` | Philosophy of science |
| `philosophy-of-mind` | Consciousness, mind |
| `deep-learning` | Neural networks |
| `reliability` | Systems reliability |

Browse all tags at `/tags`. Each tag gets its own page with all matching posts.

---

## RSS feeds

Three feed formats are auto-generated on every build:

| Format | URL |
|---|---|
| RSS 2.0 | `/rss.xml` |
| Atom | `/atom.xml` |
| JSON Feed | `/feed.json` |

Readers can subscribe to these directly, or filter by tag by visiting a tag
page and finding the feed link there.

---

## Social sharing

Every post includes a `<SocialShare>` component that renders one-click share
buttons for:

- **LinkedIn** — uses the LinkedIn share endpoint with the post URL
- **Facebook** — uses the Facebook sharer
- **X / Twitter** — pre-fills the post title and URL
- **Copy link** — copies the current URL to clipboard

The site also sets Open Graph and Twitter Card meta tags automatically, so
sharing any page URL will generate a preview card with the post title, summary,
and cover image.

---

## Hosting on GitHub Pages (step-by-step)

### Step 1 — Create a GitHub repository

1. Go to [github.com/new](https://github.com/new).
2. Name the repository **`my-blog`** (must match `projectName` in
   `docusaurus.config.ts`).
3. Set it to **Public** (required for free GitHub Pages).
4. Do **not** initialise with a README — you'll push your local code.

### Step 2 — Push your code

```bash
cd /path/to/my-blog

git init
git add .
git commit -m "Initial commit: Docusaurus blog"

# Replace with your actual GitHub username
git remote add origin https://github.com/sawravroy/my-blog.git
git branch -M main
git push -u origin main
```

### Step 3 — Enable GitHub Pages with Actions

1. Open your repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select **GitHub Actions**.
4. Click **Save**.

That's it. GitHub Pages is now configured to deploy from the Actions workflow.

### Step 4 — Trigger the first deployment

The workflow triggers automatically on every push to `main`. Your first push
in Step 2 will trigger it.

Watch the deployment:
1. Go to the **Actions** tab in your repository.
2. Click the running workflow to watch it live.
3. Once it completes (usually ~3 minutes), your site is live.

### Step 5 — Visit your site

Your site is live at:

```
https://sawravroy.github.io/my-blog/
```

> **Tip:** GitHub Pages can take 1–2 minutes after the workflow completes
> to propagate. If you see a 404, wait a moment and refresh.

---

## Custom domain (optional)

To use a domain like `blog.sawravroy.com` instead of the GitHub Pages URL:

### Step 1 — Add a CNAME file

Create `static/CNAME` containing only your domain:

```
blog.sawravroy.com
```

### Step 2 — Update your Docusaurus config

In `docusaurus.config.ts`, change `url` and `baseUrl`:

```ts
url: 'https://blog.sawravroy.com',
baseUrl: '/',
```

### Step 3 — Configure your DNS

Add a **CNAME** record at your DNS provider:

| Type | Name | Value |
|---|---|---|
| CNAME | `blog` | `sawravroy.github.io` |

(Or an `A` record pointing to GitHub's IPs if you're using the apex domain.)

### Step 4 — Enable HTTPS in GitHub Settings

Go to **Settings → Pages**, tick **Enforce HTTPS** once the certificate
provisions (usually a few minutes after DNS propagates).

---

## Updating the site

To publish a new post or change the configuration:

```bash
# Write your post, then:
git add blog/
git commit -m "Add post: Your Post Title"
git push origin main
```

The GitHub Actions workflow automatically rebuilds and redeploys. Changes are
live in ~3 minutes.

---

## Project structure

```
my-blog/
├── blog/                          # All blog posts (one folder per post)
│   ├── authors.yml                # Author definitions
│   └── YYYY-MM-DD-post-slug/
│       └── index.md
├── src/
│   ├── components/
│   │   └── SocialShare/           # LinkedIn / Facebook / Twitter share buttons
│   ├── css/
│   │   └── custom.css             # AWS-inspired theme overrides
│   └── pages/
│       ├── about.tsx              # About page
│       └── about.module.css
├── static/
│   ├── img/                       # Logo, social card, blog post images
│   └── robots.txt
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Actions deployment
└── docusaurus.config.ts           # Main site configuration
```
>>>>>>> 31c9cba (Initial commit)
