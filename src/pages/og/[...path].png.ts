/**
 * Dynamic OG image endpoint — a 1200×630 card per blog post plus a home/default
 * card (/og/default.png), built at build time with Satori. Cards are English-only
 * (never the Korean post title), so a Latin font suffices. Gated by site.og.enabled.
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { site } from '@config/site';
import { Resvg } from '@resvg/resvg-js';
import type { APIContext, GetStaticPathsResult } from 'astro';
import { getCollection } from 'astro:content';
import React from 'react';
import satori from 'satori';

// Load fonts once at module level (build-time only — never runs in the browser).
// Pass the Buffer straight to satori; extracting `.buffer` would hand it the whole
// pooled ArrayBuffer (can start at a non-zero offset → "Unsupported OpenType signature").
const fontRoot = resolve('node_modules/@fontsource/roboto/files');
const fontRegular = readFileSync(resolve(fontRoot, 'roboto-latin-400-normal.woff'));
const fontBold = readFileSync(resolve(fontRoot, 'roboto-latin-700-normal.woff'));

const FONTS = [
  {
    name: 'Roboto',
    data: fontRegular,
    weight: 400 as const,
    style: 'normal' as const,
  },
  {
    name: 'Roboto',
    data: fontBold,
    weight: 700 as const,
    style: 'normal' as const,
  },
];

const W = 1200;
const H = 630;
const ACCENT = '#4e76a0'; // default accent; overridden below if theme.color is set

function accentColor(): string {
  const c = site.theme?.color?.light;
  return c && c !== 'auto' ? c : ACCENT;
}

/** Satori element tree for a card. Cards are English-only (Latin) — never the Korean title. */
function ogCard(kicker: string, heading: string, sub: string) {
  const accent = accentColor();
  const hostname = site.url.replace(/^https?:\/\//, '');

  return React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: W,
        height: H,
        backgroundColor: '#0b1220',
        fontFamily: 'Roboto',
        color: '#f8fafc',
        position: 'relative',
      },
    },
    // Left accent bar
    React.createElement('div', {
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 12,
        backgroundColor: accent,
      },
    }),
    // Top stripe
    React.createElement('div', {
      style: { width: W, height: 12, backgroundColor: accent, flexShrink: 0 },
    }),
    // Main content
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: '64px 84px 56px 96px',
          justifyContent: 'space-between',
        },
      },
      // Kicker (author / section)
      React.createElement(
        'div',
        { style: { display: 'flex', fontSize: 26, color: '#94a3b8', fontWeight: 400 } },
        kicker,
      ),
      // Hero: heading + sub-line
      React.createElement(
        'div',
        { style: { display: 'flex', flexDirection: 'column' } },
        React.createElement(
          'div',
          {
            style: {
              fontSize: heading.length > 22 ? 66 : 84,
              fontWeight: 700,
              color: '#f8fafc',
              lineHeight: 1.1,
            },
          },
          heading,
        ),
        React.createElement(
          'div',
          {
            style: {
              fontSize: 30,
              fontWeight: 700,
              color: accent,
              marginTop: 22,
              letterSpacing: '0.02em',
            },
          },
          sub,
        ),
      ),
      // Footer
      React.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        React.createElement('div', { style: { fontSize: 24, color: '#64748b' } }, hostname),
        React.createElement(
          'div',
          {
            style: {
              fontSize: 20,
              color: accent,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            },
          },
          'OS / Systems / Rust',
        ),
      ),
    ),
  );
}

/** Map a post category to a readable English heading for the card. */
const CATEGORY_HEADING: Record<string, string> = {
  Review: 'Paper Review',
  'Interview Prep': 'Interview Prep',
};

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  // Per-page OG cards, gated by site.og.enabled. Includes a default/home card
  // (/og/default.png) that non-post pages point at via site.og.image.
  if (!site.og.enabled) return [];

  const fmtDate = (d: Date) =>
    d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const posts = await getCollection('posts', (p) => !p.data.hidden && !p.data.draft);
  const projects = await getCollection('projects');

  return [
    // Default / home card — used by the homepage and all listing pages via site.og.image.
    {
      params: { path: 'default' },
      props: {
        kicker: 'M.S. Student  /  KAIST School of Computing',
        heading: site.author.name,
        sub: 'Paper reviews and study notes',
      },
    },
    ...posts.map((post) => {
      const category = post.data.categories?.[0] ?? 'Blog';
      return {
        params: { path: `blog/${post.id}` },
        props: {
          kicker: `${site.author.name}  /  Blog`,
          heading: CATEGORY_HEADING[category] ?? category,
          sub: `${post.id}  /  ${fmtDate(post.data.date)}`,
        },
      };
    }),
    ...projects.map((project) => ({
      params: { path: `project/${project.id}` },
      props: {
        kicker: `${site.author.name}  /  Projects`,
        heading: project.data.title,
        sub: project.id,
      },
    })),
  ];
}

export async function GET({ props }: APIContext) {
  const { kicker, heading, sub } = props as { kicker: string; heading: string; sub: string };

  const svg = await satori(ogCard(kicker, heading, sub), {
    width: W,
    height: H,
    fonts: FONTS,
  });

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
  const pngData = resvg.render().asPng();

  return new Response(new Uint8Array(pngData), {
    headers: { 'Content-Type': 'image/png' },
  });
}
