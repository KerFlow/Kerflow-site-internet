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
    visualMode: z.enum(["color", "image"]).optional(),
    image: z.string().nullable().optional(),
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

const people = defineCollection({
  type: "data",
  schema: z.object({
    order: z.number(),
    name: z.string(),
    visible: z.boolean(),
    spaces: z.array(z.string()),
    specialty: z.string(),
    bio: z.string(),
    visualMode: z.enum(["color", "image"]).optional(),
    image: z.string().nullable().optional(),
    imageClass: z.string(),
    imageLabel: z.string(),
    primaryLinkLabel: z.string(),
    primaryLinkUrl: z.string(),
    secondaryLinkLabel: z.string(),
    secondaryLinkUrl: z.string(),
  }),
});

const courses = defineCollection({
  type: "data",
  schema: z.object({
    order: z.number(),
    label: z.string(),
    title: z.string(),
    description: z.string(),
    longDescription: z.string(),
    visible: z.boolean(),
  }),
});

const pricing = defineCollection({
  type: "data",
  schema: z.object({
    order: z.number(),
    name: z.string(),
    intro: z.string().optional(),
    featured: z.boolean(),
    features: z.array(z.string()),
    ctaLabel: z.string(),
    ctaUrl: z.string(),
    visible: z.boolean(),
  }),
});

const workshops = defineCollection({
  type: "data",
  schema: z.object({
    order: z.number(),
    visible: z.boolean(),
    featured: z.boolean(),
    date: z.string(),
    time: z.string(),
    title: z.string(),
    description: z.string(),
    duration: z.string(),
    price: z.string(),
    ctaLabel: z.string(),
    ctaUrl: z.string(),
    imageClass: z.string(),
    imageLabel: z.string(),
  }),
});

const settings = defineCollection({
  type: "data",
  schema: z.object({
    featuredArticleSlug: z.string().optional(),
    openingLabel: z.string().optional(),
    phoneVisible: z.boolean().optional(),
    phoneDisplay: z.string().optional(),
    phoneHref: z.string().optional(),
    testimonials: z
      .array(
        z.object({
          visible: z.boolean(),
          author: z.string(),
          context: z.string(),
          quote: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = { blog, people, courses, pricing, workshops, settings };
