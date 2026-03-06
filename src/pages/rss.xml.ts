import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  const projects = await getCollection('projects');

  return rss({
    title: 'Dean Keesey',
    description: 'AI Systems Architect — production AI systems, multi-agent orchestration, and enterprise automation',
    site: context.site!,
    items: [
      ...posts.map((post) => ({
        title: post.data.title,
        pubDate: post.data.publishDate,
        description: post.data.description,
        link: `/blog/${post.id}/`,
      })),
      ...projects.map((project) => ({
        title: project.data.title,
        pubDate: project.data.publishDate,
        description: project.data.description,
        link: `/projects/${project.id}/`,
      })),
    ],
    customData: `<language>en-us</language>`,
  });
} 