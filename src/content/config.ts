import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    type: z.enum(['article', 'website']).default('article'),
    readingTime: z.number().optional(),
    author: z.string().optional(),
  }),
});

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    categories: z.array(z.string()).default([]),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    publishDate: z.date().optional(),
    type: z.enum(['website', 'article']).default('website'),
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectCollection,
}; 