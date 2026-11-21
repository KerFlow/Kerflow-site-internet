import { defineCollection, z } from "astro:content";

const imageCropSchema = z.object({
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
  zoom: z.number().min(1).max(3).optional(),
});
const photoSchema = z.object({
  image: z.string().nullable().optional(),
  crops: z.record(imageCropSchema),
  wide: z.boolean().optional(),
});

const blog = defineCollection({
  type: "data",
  schema: z.object({
    order: z.number(),
    archived: z.boolean().optional(),
    title: z.string(),
    tag: z.string(),
    date: z.string(),
    readingTime: z.string(),
    excerpt: z.string(),
    visualMode: z.enum(["color", "image"]).optional(),
    photo: photoSchema.optional(),
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
    archived: z.boolean().optional(),
    featured: z.boolean(),
    date: z.string(),
    time: z.string(),
    title: z.string(),
    sections: z.array(
      z.object({
        heading: z.string(),
        paragraphs: z.array(z.string()),
      })
    ),
    summary: z.string(),
    duration: z.string(),
    price: z.string(),
    ctaLabel: z.string(),
    ctaUrl: z.string(),
    bookingRequired: z.boolean(),
    imageClass: z.string(),
    imageLabel: z.string(),
    photo: photoSchema.optional(),
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
    rentalPdfs: z
      .object({
        studio: z.string().nullable().optional(),
        bulle: z.string().nullable().optional(),
        cocon: z.string().nullable().optional(),
      })
      .optional(),
    testimonials: z
      .array(
        z.object({
          visible: z.boolean(),
          author: z.string(),
          context: z.string(),
          rating: z.number().min(1).max(5).optional(),
          quote: z.string(),
        })
      )
      .optional(),
  }),
});

// Keystatic validates profiles before saving. The site reads their JSON directly.
const people = defineCollection({ type: "data" });

export const collections = { blog, people, courses, pricing, workshops, settings };
