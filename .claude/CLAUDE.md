# CLAUDE.md

Guidance for Claude Code working on this repository — **SeungJong Ha's personal site**
(Astro + as-folio theme).

## Working agreement

- **Do NOT push after every change to trigger the CD deploy.** Every push to `main` runs
  the GitHub Actions workflow that builds and deploys to `gh-pages`. Instead: make the
  change locally, build/preview it for review, and **commit/push only when explicitly
  asked**. The user reviews locally, then commits/pushes.
- Verify non-trivial changes with a local build (`yarn build`) or dev server (`yarn dev`)
  before proposing a commit.

## Project

- **Astro 6** site on the **as-folio** theme (academic portfolio). **English only**
  (as-folio has no i18n); blog post bodies are Korean, site chrome is English.
- Package manager **yarn 4** (corepack; `.yarnrc.yml` → `nodeLinker: node-modules`),
  **Node ≥24**. This machine defaults to Node 22 → run via
  `fnm exec --using=24 -- corepack yarn ...` (or `corepack enable`, then `yarn ...`).
- Commands: `yarn dev` (preview), `yarn build` (prebuild citations → astro build → pagefind).
- Content & config:
  - Blog posts: `src/content/posts/*.md` (YAML frontmatter; categories `Review` / `Interview Prep`).
  - About / bio: `src/data/about.mdx`. Identity, socials, nav, theme color: `src/config/site.ts`.
  - Profile photo: `public/assets/img/prof_pic.jpg`.
- Accent color: light = sky blue `#0ea5e9`, dark = `auto` (cyan). Override lives in
  `src/config/site.ts` (`theme.color`) + an `!important` fix in `src/layouts/Base.astro`.
- Deploy: only `.github/workflows/deploy.yml` remains — builds with yarn and pushes `dist/`
  to `gh-pages` via peaceiris (GitHub Pages = "deploy from a branch"). No Pages-source change
  needed. The theme's CI / release-please / update-citations workflows were removed.
- Demo sections (publications / projects / cv / books / people / teaching) are **unlinked
  from the nav and their demo data emptied**; the pages still build empty until filled in.
- The previous **Zola** version of this site is archived on the `zola-site` branch.

## Tracking upstream (as-folio)

Goal: keep our changes as a small patch stack sitting directly on top of `upstream/main`.
`upstream` remote = `https://github.com/dadangnh/as-folio`. **Maintenance = rebase, not merge.**
To take a new theme version:

```
git fetch upstream
git rebase upstream/main        # replay our commit(s); resolve conflicts in the files below
git push --force-with-lease
```

`origin/main` history is therefore `upstream/main` + our commit(s); it gets rewritten on every
rebase (that's expected — always push with `--force-with-lease`, never a plain force). The repo was
not forked with shared history, so the first upstream base was established with `git commit-tree`.

Our divergence is confined to:

- **Content / config — ours, upstream won't touch:** `src/config/site.ts`, `src/data/about.mdx`,
  `src/data/{cv.yml,resume.json,papers.bib,coauthors.yml,venues.yml,repositories.yml}` (emptied to a
  real minimal stub), `src/content/**` (our posts; demo collections emptied with `.gitkeep`),
  `public/assets/img/prof_pic.jpg`, `src/components/EmailCopy.astro` (our anti-harvest email button —
  a new file, not in upstream; see the anti-harvest note below).
- **Deploy — ours (only divergence in workflows):** `.github/workflows/deploy.yml` is our gh-pages
  version (builds with yarn → pushes `dist/` to `gh-pages` via `peaceiris/actions-gh-pages@v4`, so
  GitHub Pages stays on "Deploy from a branch" — **no Pages-source change needed**). Uses
  `checkout@v5`/`setup-node@v5` with **`corepack enable` BEFORE `setup-node`** — required on v5 (it
  auto-probes `yarn cache dir` in its own step; Yarn 4 must already be active), do NOT reorder. Also
  ours: `astro.config.mjs` (site URL default), `public/.nojekyll`, `.gitattributes`.
- **Kept identical to upstream:** `ci.yml` and `update-citations.yml` (original theme workflows, now
  on `v5` + `corepack`-before-`setup-node` after upstream #6 — verified green on our content).
  `release-please.yml` (+ its config/manifest) is **NOT on main**; if wanted, it lives on a separate
  `release-please` branch (files available from `upstream/main`).
- **Anti-harvest (email/PII) — kept entirely in OUR files, zero theme divergence:** the raw email
  must never reach the shipped HTML (no `mailto:`, no plain `@` address). Instead of patching theme
  files, the address is suppressed at the source: `site.author.email` and `socials.email` are left
  **empty**, so the theme's own consumers — `SocialLinks.astro`, the Person JSON-LD in `Base.astro`,
  and the RSS `<author>`/`<managingEditor>` in `rss.xml.ts` — all omit it automatically. Those three
  theme files therefore stay **byte-identical to upstream** (do NOT edit them for this). The real
  address lives in `site.author.contactEmail` and is rendered ONLY by **`src/components/EmailCopy.astro`**
  (ours — a new file upstream never has): a copy-to-clipboard `<button>`, never a `mailto:` link, with
  the address base64-split into `data-u`/`data-d` and reassembled by a client `<script>` — hover reveals
  `user [at] domain (click to copy)`, click copies the real address (falls back to revealing it if the
  clipboard API is blocked). `src/pages/index.astro` renders `<EmailCopy/>` next to `<SocialLinks/>` in
  the contact row. `src/data/{cv.yml,resume.json}` (our stubs) also have `email` **emptied** (the `/cv/`
  page would otherwise render it as plain text). Contact is provided solely by that copy button.
- **Small theme patches — re-apply these if an upstream merge overwrites them:**
  - `src/pages/og/[...path].png.ts` — dynamic OG cards, **English-only** (never the Korean post
    title — just category/slug/date), so a Latin font (`@fontsource/roboto` WOFF) suffices. Pass the
    font **Buffer straight to satori** — do NOT re-add a `.buffer` extraction: `buf.buffer` is the
    whole *pooled* ArrayBuffer, which can start at a non-zero offset → satori reads garbage and throws
    "Unsupported OpenType signature". That (not the WOFF format) was the real cause of the old crash;
    fixed the idiomatic way upstream in **as-folio#7**, and our OG font-loading now matches it. (An
    earlier version here "fixed" it by swapping to a KaTeX TTF + `.buffer.slice()` — reverted, it was
    treating a symptom.) Our remaining divergence is the **home/default card `/og/default.png`** (which
    `site.og.image` points at, used by non-post pages) + the dark card styling; `og.enabled` gates both
    the meta tags and generation. No static PNG. (~35s build for ~15 cards.)
  - `src/layouts/Base.astro` — `!important` on the `theme.color` override (upstream emits that
    `<style>` before the stylesheet, so the default accent wins the cascade otherwise).
  - `src/pages/index.astro` — homepage restructure: profile floats top-aligned with the name header;
    the Bio is rendered as an "education" listing (shared fixed date column with latest posts);
    scoped `<style>` for bio paragraph rhythm + the `.listing-table` column width; renders
    `<EmailCopy/>` next to `<SocialLinks/>` in the contact row (see anti-harvest note above).
- **Everything else stays identical to upstream** — package.json, yarn.lock, .yarnrc.yml, husky,
  eslint/tsconfig/prettier/vitest/playwright/commitlint/lint-staged, netlify.toml, vercel.json.
  Do not diverge these.
