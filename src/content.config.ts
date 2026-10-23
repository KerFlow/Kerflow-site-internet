import { defineCollection, z } from "astro:content";

const imageCropSchema = z.object({ x: z.number().optional(), y: z.number().optional() });

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
    image: z.string().nullable().optional(),
    imagePositionX: z.number().optional(),
    imagePositionY: z.number().optional(),
    imageCrops: z.object({
      list: imageCropSchema.optional(),
      featured: imageCropSchema.optional(),
      home: imageCropSchema.optional(),
      detail: imageCropSchema.optional(),
    }).optional(),
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
    summary: z.string(),
    approachTitle: z.string(),
    approachAccent: z.string(),
    approachSections: z.array(
      z.object({
        heading: z.string(),
        headingStyle: z.enum(["small", "large"]),
        paragraphs: z.array(z.string()),
      })
    ),
    visualMode: z.enum(["color", "image"]).optional(),
    image: z.string().nullable().optional(),
    imagePositionX: z.number().optional(),
    imagePositionY: z.number().optional(),
    imageCrops: z.object({
      profile: imageCropSchema.optional(),
      horizontalCard: imageCropSchema.optional(),
      portraitCard: imageCropSchema.optional(),
      careCard: imageCropSchema.optional(),
    }).optional(),
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
    image: z.string().nullable().optional(),
    imagePositionX: z.number().optional(),
    imagePositionY: z.number().optional(),
    imageCrops: z.object({
      card: imageCropSchema.optional(),
      detail: imageCropSchema.optional(),
    }).optional(),
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

export const collections = { blog, people, courses, pricing, workshops, settings };
