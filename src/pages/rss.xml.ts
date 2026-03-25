import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '@config/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts'))
    .filter((p) => !p.data.hidden)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: site.title,
    description: site.description,
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description ?? '',
      pubDate: post.data.date,
      link: `${site.base}/blog/${post.id}/`,
    })),
    customData: `<language>${site.lang}</language>`,
  });
}
