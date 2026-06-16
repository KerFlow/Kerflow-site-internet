import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "data",
  schema: z.object({
    order: z.number(),
    title: z.string(),
    tag: z.string(),
    date: z.string(),
    readingTime: z.string(),
    excerpt: z.string(),
    imageClass: z.string(),
    imageLabel: z.string(),
    intro: z.string(),
    sections: z.array(
      z.object({
        heading: z.string(),
        paragraphs: z.array(z.string()),
      })
    ),
  }),
});

export const collections = { blog };
