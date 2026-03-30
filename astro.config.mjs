import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.github.io', // ← update with your site URL
  base: '', // ← set to '/repo-name' for GitHub project pages, leave '' for user/org pages
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  image: {
    // Allow Astro's <Image> component to optimise images from these remote domains.
    // Used for book covers (Open Library) and GitHub stats cards.
    domains: [
      'covers.openlibrary.org',
      'github-readme-stats.vercel.app',
      'github-profile-trophy.vercel.app',
    ],
  },
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        // Homepage: highest priority, frequent updates
        if (
          /\/$/.test(item.url) &&
          !item.url.includes('/blog/') &&
          !item.url.includes('/projects/')
        ) {
          item.priority = 1.0;
          item.changefreq = 'weekly';
          return item;
        }
        // Blog posts
        if (item.url.includes('/blog/')) {
          item.changefreq = 'monthly';
          item.priority = 0.7;
          return item;
        }
        // Publications, projects, CV
        if (
          item.url.includes('/publications/') ||
          item.url.includes('/projects/') ||
          item.url.includes('/cv/')
        ) {
          item.changefreq = 'monthly';
          item.priority = 0.8;
          return item;
        }
        item.changefreq = 'yearly';
        item.priority = 0.5;
        return item;
      },
    }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    icon({
      include: {
        'fa-brands': [
          'twitter',
          'linkedin',
          'github',
          'gitlab',
          'youtube',
          'medium',
          'mastodon',
          'discord',
          'whatsapp',
          'telegram',
          'weibo',
          'instagram',
          'facebook',
          'pinterest',
        ],
        'fa-solid': [
          'envelope',
          'file-pdf',
          'rss',
          'moon',
          'sun',
          'bars',
          'times',
          'certificate',
          'code',
          'quote-left',
          'chevron-up',
          'search',
          'link',
          'star',
          'book',
          'graduation-cap',
          'user',
          'users',
          'building',
          'calendar',
          'tag',
          'tags',
          'newspaper',
          'chalkboard-teacher',
          'flask',
          'award',
          'language',
          'briefcase',
          'globe',
          'info-circle',
          'video',
          'music',
          'map-pin',
          'hashtag',
          'magnifying-glass',
          'thumbtack',
          'external-link-alt',
          'circle-arrow-right',
          'book-open',
          'check',
          'clock',
          'pause',
          'eye',
          'redo',
          'share-alt',
        ],
        'fa-regular': ['comment', 'star', 'bookmark', 'heart'],
        academicons: [
          'google-scholar',
          'orcid',
          'researchgate',
          'inspire',
          'arxiv',
          'hal',
          'semantic-scholar',
          'ieee',
          'acm',
          'springer',
          'elsevier',
          'pubmed',
          'clarivate',
          'zotero',
          'mendeley',
          'academia',
          'cv',
          'figshare',
          'zenodo',
          'dataverse',
          'open-access',
          'open-data',
          'open-materials',
          'osf',
          'overleaf',
          'impactstory',
          'scirate',
          'isidore',
          'hypothesis',
        ],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@styles': '/src/styles',
        '@assets': '/src/assets',
        '@config': '/src/config',
        '@utils': '/src/utils',
        '@content': '/src/content',
        '@data': '/src/data',
      },
    },
    build: {
      rollupOptions: {
        output: {
          // Shorter, readable asset paths (e.g. _s/abc123.js instead of _astro/abc123.js)
          assetFileNames: '_s/[hash][extname]',
          chunkFileNames: '_s/[hash].js',
          entryFileNames: '_s/[hash].js',
        },
      },
    },
  },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [rehypeKatex, { strict: false }],
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener', 'noreferrer'],
        },
      ],
    ],
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
