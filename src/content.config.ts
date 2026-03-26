import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ─── Posts ─────────────────────────────────────────────────────────────────

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    categories: z.array(z.string()).optional().default([]),
    /** Enable KaTeX math rendering. */
    math: z.boolean().optional().default(false),
    /** Show table of contents sidebar. */
    toc: z.boolean().optional().default(true),
    /** Show related posts section. */
    relatedPosts: z.boolean().optional().default(false),
    /** Pin to top of blog listing. */
    pinned: z.boolean().optional().default(false),
    /** Hide from blog listing (but accessible via direct URL). */
    hidden: z.boolean().optional().default(false),
    /** Redirect to external URL instead of rendering content. */
    redirect: z.string().url().optional(),
    /** Hero/thumbnail image path. */
    image: z.string().optional(),
    /** Distill layout — renders as a Distill article. */
    distill: z.boolean().optional().default(false),
    /** Authors for Distill-style posts. */
    distillAuthors: z.array(z.object({
      name: z.string(),
      url: z.string().url().optional(),
      affiliations: z.object({ name: z.string() }).optional(),
    })).optional(),
    /** BibTeX bibliography file reference for Distill posts. */
    bibliography: z.string().optional(),
    /** Citation key for this post (used in bibliography). */
    citation_key: z.string().optional(),
  }),
});

// ─── Projects ──────────────────────────────────────────────────────────────

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    /** Thumbnail image path. */
    img: z.string().optional(),
    /** Alt text for image. */
    img_alt: z.string().optional(),
    /** External URL (e.g. GitHub repo). */
    url: z.string().url().optional(),
    /** GitHub repo in format owner/repo — auto-links to repo. */
    github: z.string().optional(),
    /** Sort order (lower = shown first). */
    importance: z.number().optional().default(999),
    /** Badge label shown on card (e.g. 'open source'). */
    category: z.string().optional(),
    /** Show redirect to external url instead of project page. */
    redirect: z.string().url().optional(),
  }),
});

// ─── People ────────────────────────────────────────────────────────────────

const people = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/people' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    /** Photo path in public/assets/img/. */
    photo: z.string().optional(),
    /** Brief description shown on profile card. */
    description: z.string().optional(),
    /** Personal website. */
    website: z.string().url().optional(),
    /** GitHub username. */
    github: z.string().optional(),
    /** Google Scholar user ID. */
    scholar: z.string().optional(),
    /** ORCID ID. */
    orcid: z.string().optional(),
    /** Sort order. */
    importance: z.number().optional().default(999),
    /** 'current' | 'alumni' */
    group: z.enum(['current', 'alumni']).optional().default('current'),
  }),
});

// ─── Teaching ──────────────────────────────────────────────────────────────

const teaching = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/teaching' }),
  schema: z.object({
    title: z.string(),
    /** Short code like 'PHY 101'. */
    code: z.string().optional(),
    description: z.string().optional(),
    /** Term, e.g. 'Spring 2024'. */
    term: z.string().optional(),
    /** Institution. */
    institution: z.string().optional(),
    /** Course URL or syllabus. */
    url: z.string().url().optional(),
    /** Sort order. */
    importance: z.number().optional().default(999),
    /** 'current' | 'past' */
    category: z.enum(['current', 'past']).optional().default('current'),
  }),
});

// ─── Announcements ─────────────────────────────────────────────────────────

const announcements = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/announcements' }),
  schema: z.object({
    date: z.coerce.date(),
    /** Pin this announcement to the top. */
    pinned: z.boolean().optional().default(false),
    /** Hide from the announcements list. */
    hidden: z.boolean().optional().default(false),
  }),
});

export const collections = { posts, projects, people, teaching, announcements };
