/**
 * Custom sitemap endpoint — generates /sitemap.xml at build time with accurate
 * <lastmod> dates sourced from content collection frontmatter.
 *
 * Replaces @astrojs/sitemap which cannot access content-layer dates.
 */

import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '@config/site';

const siteUrl = site.url.replace(/\/$/, '');
const base = (site.base ?? '').replace(/\/$/, '');

function loc(path: string): string {
  return `${siteUrl}${base}${path}`;
}

interface UrlEntry {
  url: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
}

function urlEntry({ url, lastmod, changefreq, priority }: UrlEntry): string {
  return [
    '  <url>',
    `    <loc>${url}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : '',
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : '',
    priority !== undefined ? `    <priority>${priority.toFixed(1)}</priority>` : '',
    '  </url>',
  ]
    .filter(Boolean)
    .join('\n');
}

export async function GET(_ctx: APIContext): Promise<Response> {
  const [posts, projects] = await Promise.all([
    getCollection('posts', (p) => !p.data.draft && !p.data.hidden),
    getCollection('projects', (p) => !p.data.redirect),
  ]);

  const today = new Date().toISOString().split('T')[0];

  const staticUrls: UrlEntry[] = [
    { url: loc('/'), lastmod: today, changefreq: 'weekly', priority: 1.0 },
    { url: loc('/blog/'), changefreq: 'weekly', priority: 0.9 },
    { url: loc('/publications/'), changefreq: 'monthly', priority: 0.8 },
    { url: loc('/projects/'), changefreq: 'monthly', priority: 0.8 },
    { url: loc('/cv/'), changefreq: 'monthly', priority: 0.7 },
    { url: loc('/teaching/'), changefreq: 'monthly', priority: 0.6 },
    { url: loc('/people/'), changefreq: 'monthly', priority: 0.6 },
    { url: loc('/books/'), changefreq: 'monthly', priority: 0.5 },
    { url: loc('/repositories/'), changefreq: 'monthly', priority: 0.5 },
  ];

  const postUrls: UrlEntry[] = posts
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((p) => ({
      url: loc(`/blog/${p.id}/`),
      lastmod: (p.data.lastmod ?? p.data.date).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.7,
    }));

  const projectUrls: UrlEntry[] = projects.map((p) => ({
    url: loc(`/projects/${p.id}/`),
    changefreq: 'monthly',
    priority: 0.7,
  }));

  const allUrls = [...staticUrls, ...postUrls, ...projectUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(urlEntry).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
