# AGENTS.md — as-folio

Guidelines for AI agents (Claude Code, Codex, Copilot Workspace, etc.) contributing to as-folio.

---

## Repository layout

```
as-folio-template/
├── al-folio/     ← upstream Jekyll reference (READ ONLY — never modify)
├── as-folio/     ← this Astro template (your working directory)
└── docs/         ← planning documents
```

Your working directory is `as-folio/`. All paths below are relative to it.

---

## Build command

```bash
cd as-folio
yarn build        # must exit 0 before submitting any PR
```

Run this after every non-trivial change. If the build fails, fix it before proceeding.

---

## What to do first

1. **Read `CLAUDE.md`** — coding conventions, architecture, common pitfalls
2. **Read `src/config/site.ts`** — understand the config shape before touching features
3. **Read `src/content.config.ts`** — understand content schemas before adding fields
4. **Run `yarn build`** — confirm baseline passes

---

## Key rules

### Package manager
Use `yarn`. Never `npm` or `npx`. Never `yarn add --dev` — use `yarn add -D`.

### Content Layer API
Use Astro 6 API: `const { Content } = await render(entry)` — not `entry.render()`.

### CSS
- CSS custom properties for all theming (see `src/styles/_colors.css`)
- Dark mode via `[data-theme='dark']` selector — never Tailwind's `dark:` prefix
- No `innerHTML` with untrusted content — use `textContent`

### Config changes
Any new feature must have:
- A flag in `site.ts` with a JSDoc comment
- Documentation in `CUSTOMIZE.md`
- Build verified to exit 0

### Schema changes
When adding BibTeX fields, frontmatter fields, or collection fields:
- Update `src/content.config.ts` with the Zod schema
- Use `z.coerce.string()` for fields that YAML may parse as numbers (ISBN, IDs)
- Add `optional()` with a default for fields that may not be present

---

## Patterns to follow

### Clickable card with inner link (avoid nested `<a>`)

```astro
<div class="card" data-href={url} role="link" tabindex="0">
  {/* inner GitHub link — real <a> */}
  <a href={githubUrl} class="github-link" onclick="event.stopPropagation()">...</a>
</div>

<script>
  document.querySelectorAll('[data-href]').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (!(e.target as Element).closest('a')) {
        window.location.href = card.dataset.href!;
      }
    });
  });
</script>
```

### Per-post CDN widget (in Post.astro)

```astro
---
const { chart_js = false } = post.data;
---

{chart_js && (
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js" defer></script>
)}
```

### Analytics injection (in Base.astro)

```astro
---
const { pirsch } = site.analytics;
---

{pirsch && (
  <script defer src="https://api.pirsch.io/pa.js" data-code={pirsch}></script>
)}
```

---

## Files you should NOT modify

- `../al-folio/**` — upstream reference, read-only
- `yarn.lock` — managed by yarn automatically
- `dist/` — build output, not tracked in git
- `.husky/` — hooks managed by husky

---

## Files you will frequently modify

| File | Purpose |
|---|---|
| `src/config/site.ts` | Add feature flags, config options |
| `src/content.config.ts` | Add collection fields |
| `src/layouts/Post.astro` | Add per-post CDN widgets |
| `src/layouts/Base.astro` | Add global scripts (analytics, consent) |
| `src/components/*.astro` | New UI components |
| `src/pages/*.astro` | New or modified pages |
| `src/content/**/*.md` | Demo content |
| `src/data/papers.bib` | BibTeX demo entries |
| `CUSTOMIZE.md` | Document new features |

---

## Testing

```bash
yarn test           # unit tests (Vitest)
yarn lint           # ESLint
yarn format         # Prettier (check only in CI)
yarn build          # full production build + pagefind index
```

The build is the primary acceptance test. All pages must generate without errors.

---

## Pull request checklist

- [ ] `yarn build` exits 0 with 0 TypeScript errors
- [ ] `yarn lint` passes
- [ ] New feature has a flag in `site.ts`
- [ ] New feature documented in `CUSTOMIZE.md`
- [ ] New collection fields added to `src/content.config.ts`
- [ ] Demo content updated if needed
- [ ] No modifications to `../al-folio/`
