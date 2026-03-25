import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import rss from '@astrojs/rss';
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
  integrations: [
    react(),
    mdx(),
    sitemap(),
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
