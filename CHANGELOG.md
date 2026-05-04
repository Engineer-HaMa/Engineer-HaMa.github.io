# Changelog

All notable changes to as-folio are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [1.0.0] — Initial public release

### Features

- Publications page with BibTeX parser, author highlighting, citation badges (Altmetric, Dimensions, Google Scholar, InspireHEP), co-author profile links, and auto-updated citation counts via OpenAlex
- Blog with MDX, KaTeX math, syntax highlighting, reading time, table of contents, image zoom, related posts, year groupings, draft support, and per-post CDN widgets (Mermaid, Chart.js, ECharts, Vega, Plotly, Pseudocode, TikzJax, Leaflet, img-comparison-slider, diff2html, PhotoSwipe)
- Projects card grid with GitHub star counts, category groupings, and project detail pages
- CV page supporting RenderCV YAML and JSONResume JSON formats with PDF download
- Books shelf with Open Library cover art, star ratings, and reading status badges
- GitHub Repositories page with readme-stats cards, repo pins, and trophy cards
- Teaching page with current/past groupings and optional Google Calendar embed
- People page with current members and alumni sections
- Full-text search via Pagefind + ninja-keys (⌘K)
- System-aware dark mode with flash-free toggle
- Distill layout for academic paper posts
- JupyterNotebook component for rendering `.ipynb` cells
- Dynamic OG image generation via Satori
- Analytics: GA4, Pirsch, OpenPanel, Cronitor (all via Partytown)
- Comments: Giscus (GitHub Discussions) and Disqus
- Newsletter via Loops.so integration
- Cookie consent via vanilla-cookieconsent
- RSS feed and XML sitemap with git-based `lastmod` dates
- Announcements section on homepage
- Social sharing buttons on blog posts
- Breadcrumb navigation and JSON-LD structured data
- Back-to-top button and reading progress bar
- `withBase` utility for consistent asset path handling across all deploy targets
- GitHub Pages, Netlify, Vercel, Cloudflare Pages deployment configs
- Husky pre-commit hooks with lint-staged, ESLint, Prettier, and Commitlint
- Vitest unit tests and Playwright e2e tests
- GitHub Actions: deploy, CI, and weekly citation auto-update workflows
- `template.json` for `create-astro` CLI integration

### Bug Fixes

- Navbar dropdown hover text invisible in certain themes — fixed with dedicated CSS tokens
- Light/dark mode secondary text contrast improved to meet WCAG AA
- `width`/`height` attributes added to all images to prevent layout shift (CLS)
- Profile photo marked `fetchpriority="high"` as LCP element
- Repository page switched from `fs.readFileSync` to `?raw` Vite import
- Medium-zoom attaches only to `img[data-zoomable]` with `transitionend` failsafe
- BibTeX internal fields (`selected`, `altmetric`, etc.) stripped from copyable citation block
- Inline code background changed to neutral `#f3f4f6` (was purple-tinted)

---

## [0.0.2] — Pre-release

### Added

- `template.json` for richer `create-astro` CLI integration
- `CHANGELOG.md`
- `bugs` field in `package.json` pointing to GitHub Issues
- `astro-theme`, `astro-component`, `bibtex`, `publications` keywords in `package.json`
- `files` field in `package.json` for clean npm distribution
- `peerDependencies` declaring `astro >= 6.0.0`
- `--global-dropdown-hover-bg` and `--global-dropdown-hover-text` CSS tokens for accessible navbar dropdown hover
- `--color-purple-dark: #8a0686` to base color palette

### Fixed

- Navbar dropdown hover text was invisible (used theme color as both background and text)
- Light mode body text softened from pure `#000` to `#1a1a1a`
- Light mode secondary text improved from `#828282` to `#6c757d` (WCAG AA: 5.0:1 on white)
- Dark mode secondary text improved from `#828282` to `#9e9e9e` (WCAG AA: 6.7:1 on dark bg)
- Link hover color differentiated from normal link color (darker purple in light mode)
- Inline code background changed from purple-tinted `rgba(181,9,172,0.05)` to neutral `#f3f4f6`
- Card background in light mode changed from `#ffffff` (same as page) to `#f8f9fa` (subtle elevation)
- `width`/`height` attributes added to all images preventing layout shift (CLS)
- Profile photo marked with `fetchpriority="high"` (LCP element)
- Repository page no longer uses `fs.readFileSync` — switched to `?raw` Vite import

### Changed

- `@types/js-yaml`, `@types/react`, `@types/react-dom` moved from `dependencies` → `devDependencies`
- `@astrojs/check`, `typescript` moved from `dependencies` → `devDependencies`
- `node-addon-api` removed (was never used)
- `notebookjs` removed (was never imported; `JupyterNotebook.astro` is self-contained)
- README tech stack: corrected BibTeX entry from "citation-js" to "Custom build-time parser"

---

## [0.0.1] — Initial development release

### Added

- Astro 6 + Tailwind CSS v4 + TypeScript strict mode
- Publications page with BibTeX parser, author highlighting, Altmetric/Dimensions/Scholar badges
- Blog with MDX, KaTeX math, syntax highlighting, reading time, TOC, image zoom, related posts, year groupings, draft support
- Projects card grid with GitHub star counts and detail pages
- CV page supporting RenderCV YAML and JSONResume JSON
- Books page with Open Library cover art, star ratings, reading status badges
- GitHub Repositories page with readme-stats cards
- Teaching page with current/past groupings
- People page with current members and alumni sections
- Full-text search via Pagefind + ninja-keys (⌘K)
- System-aware dark mode with flash-free toggle
- Distill layout for academic paper posts
- JupyterNotebook component for rendering `.ipynb` cells
- Per-post CDN widgets: Mermaid, Chart.js, ECharts, Vega, Plotly, Pseudocode, TikzJax, Leaflet, img-comparison-slider, diff2html, PhotoSwipe
- Analytics: GA4, Pirsch, OpenPanel, Cronitor
- Comments: Giscus and Disqus
- Newsletter: Loops.so integration
- Cookie consent via vanilla-cookieconsent
- RSS feed and XML sitemap
- GitHub Pages, Netlify, Vercel, Cloudflare Pages deployment configs
- Security headers in `netlify.toml` and `vercel.json`
- Husky pre-commit hooks with lint-staged
- ESLint + Prettier configuration
- Vitest unit tests and Playwright e2e tests
- GitHub Actions workflow for GitHub Pages deployment

---

[Unreleased]: https://github.com/dadangnh/as-folio/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/dadangnh/as-folio/releases/tag/v1.0.0
[0.0.2]: https://github.com/dadangnh/as-folio/releases/tag/v0.0.2
[0.0.1]: https://github.com/dadangnh/as-folio/releases/tag/v0.0.1
