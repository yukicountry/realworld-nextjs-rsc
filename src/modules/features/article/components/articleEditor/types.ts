import { z } from "zod";

export const inputsSchema = z.object({
  slug: z.string().optional(),
  title: z.string(),
  description: z.string(),
  body: z.string(),
  tagList: z.array(z.string()),
  tag: z.string().optional(),
});

export type Inputs = z.infer<typeof inputsSchema>;
