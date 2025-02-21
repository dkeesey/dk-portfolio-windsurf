import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    completionDate: z.date().optional(),
    heroImage: z.string().optional(),
    technologies: z.array(z.string()).default([]),
    liveUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
  }),
});

export const collections = {
  'blog': blog,
  'projects': projects,
};
