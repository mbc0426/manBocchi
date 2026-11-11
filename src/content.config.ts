import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    kind: z.enum(['essay', 'note']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    demo: z.boolean().default(false),
  }),
});

export const collections = { posts };
