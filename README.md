# Vanomation Website

Home automation tutorials for your campervan. Built with [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/).

## Stack

- **Framework:** Astro + Starlight
- **Search:** Pagefind (built-in, zero config)
- **Comments:** Giscus (GitHub Discussions)
- **Hosting:** Cloudflare Pages

## Development

Requires Node.js 22+.

```bash
npm install
npm run dev      # Start dev server at localhost:4321
npm run build    # Build static site to ./dist
npm run preview  # Preview the built site
```

## Adding content

All tutorials are Markdown files in `src/content/docs/tutorials/`. Create a new `.md` file there and add it to the sidebar in `astro.config.mjs`.

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
5. Add environment variable: `NODE_VERSION=22`
6. Connect your custom domain (van-automation.com) in the Pages project settings
