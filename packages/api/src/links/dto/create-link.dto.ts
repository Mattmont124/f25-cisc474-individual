import { z } from "zod";

// Zod schema for validation & type inference
export const createLinkSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  description: z.string().optional(),
});

// TypeScript type inferred from schema
export type CreateLinkDto = z.infer<typeof createLinkSchema>;