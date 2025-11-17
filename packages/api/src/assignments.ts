import { z } from 'zod';

// Reference DTOs (lightweight relation embeds)
export const AssignmentRef = z.object({
  id: z.uuid(),
  title: z.string(),
});
export type AssignmentRef = z.infer<typeof AssignmentRef>;

// Output DTOs (API responses)
export const AssignmentOut = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string().nullable(),
  ownerId: z.uuid(),
  courseId: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});
export type AssignmentOut = z.infer<typeof AssignmentOut>;

// Creation DTOs (API request bodies)
export const AssignmentCreateIn = z.object({
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  ownerId: z.uuid(),
  courseId: z.uuid(),
});
export type AssignmentCreateIn = z.infer<typeof AssignmentCreateIn>;

// Update DTOs (API request bodies)
export const AssignmentUpdateIn = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
  ownerId: z.uuid().optional(),
  courseId: z.uuid().optional(),
});
export type AssignmentUpdateIn = z.infer<typeof AssignmentUpdateIn>;
