# Vanomation Website

Home automation tutorials for your campervan. Built with [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/).

## Stack

- **Framework:** Astro + Starlight
- **Search:** Pagefind (built-in, zero config)
- **Comments:** Giscus (GitHub Discussions)
- **Hosting:** Cloudflare Pages

## Development

Requires Node.js 24+.

```bash
nvm use 24
npm install
npm run dev      # Start dev server at localhost:4321
npm run build    # Build static site to ./dist
npm run preview  # Preview the built site
```

## Adding a tutorial

1. Create a new `.md` file in `src/content/docs/` (e.g. `my_new_tutorial.md`):

```markdown
---
slug: my_new_tutorial
title: My New Tutorial
description: A short description shown on the home page and in search results.
sidebar:
  order: 11
---

Tutorial content goes here...
```

2. Add it to the sidebar in `astro.config.mjs`:

```js
{ label: 'My New Tutorial', slug: 'my_new_tutorial' },
```

The home page tutorial grid, header dropdown, and Giscus comment detection all update automatically — no other files need to be changed.

## Adding a tutorial category

In `astro.config.mjs`, add a new group to the sidebar array:

```js
sidebar: [
  {
    label: 'Tutorials',
    items: [ /* existing tutorials */ ],
  },
  {
    label: 'My New Category',
    items: [
      { label: 'My New Tutorial', slug: 'my_new_tutorial' },
    ],
  },
],
```

## Setting up Giscus comments

1. Enable GitHub Discussions on your site's GitHub repo (Settings → Features → Discussions)
2. Install the Giscus app: https://github.com/apps/giscus
3. Visit https://giscus.app/, enter your repo name, and copy the generated values
4. Edit `src/components/Footer.astro` and replace the placeholder values:
   - `data-repo="OWNER/REPO"`
   - `data-repo-id="REPO_ID"`
   - `data-category-id="CATEGORY_ID"`

## Deploying to Cloudflare Pages

1. Push this repo to GitHub
2. In the Cloudflare Pages dashboard, connect your GitHub repo
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `NODE_VERSION=24`
6. Connect your custom domain in the Pages project settings
