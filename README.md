# Business Feasibility Toolkit

Static bilingual (ES/EN) site with web calculators, deployed to GitHub Pages at
<https://dinoesau.github.io/business-feasibility-toolkit/>.
Stack: Astro (static output) + React islands. Web only, no Python/XLSX.

## Quickstart

Requires Node 20+ and npm.

```sh
npm ci
npm run dev      # local dev server
npm test         # unit tests (node:test) + astro check
npm run build    # static build into dist/
npm run preview  # serve dist/ locally
```

Override the subpath base locally (defaults to the repo name) with:

```sh
ASTRO_BASE=/ npm run dev
```

## Deploy to GitHub Pages

Deployment is automatic via `.github/workflows/deploy.yml`:

1. Push to `main`. The `build` job runs `npm ci` + `npm run build` on Node 20
   and uploads `dist/` with `upload-pages-artifact`. The `deploy` job
   publishes it with `deploy-pages@v4`.
2. In the repo, go to Settings - Pages and choose **GitHub Actions** as Source
   (one-time setup).
3. The site goes live at `https://dinoesau.github.io/business-feasibility-toolkit/`.

No-blank-page checklist (project site gotchas, already handled):

- `astro.config.mjs` sets `site` + `base: '/business-feasibility-toolkit/'`.
- All internal links and assets use `import.meta.env.BASE_URL`, never `/`.
- `public/.nojekyll` is committed so Pages serves Astro's `_astro/` assets.

## Acceptance criteria (Given-When-Then)

1. Given a fresh clone, when `npm ci && npm run build` runs, then `dist/`
   contains `index.html`, `es/index.html`, `en/index.html` and `404.html`
   with every asset URL prefixed by the configured base.
2. Given a visitor loads the site root, when their browser language is
   Spanish or English, then client JS redirects to `/es/` or `/en/`; without
   JS the ES/EN selector links still work under the base.
3. Given a push to `main`, when the deploy workflow runs on Node 20, then
   `upload-pages-artifact` uploads `dist/` and `deploy-pages@v4` publishes
   without a blank page.
