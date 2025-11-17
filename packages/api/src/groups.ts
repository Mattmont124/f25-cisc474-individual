import { z } from 'zod';

// Reference DTOs (lightweight relation embeds)
export const AssignmentGroupRef = z.object({
  id: z.uuid(),
  name: z.string(),
});
export type AssignmentGroupRef = z.infer<typeof AssignmentGroupRef>;

// Output DTOs (API responses)
export const AssignmentGroupOut = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string().nullable(),
  ownerId: z.uuid(),
  courseId: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});
export type AssignmentGroupOut = z.infer<typeof AssignmentGroupOut>;

// Creation DTOs (API request bodies)
export const AssignmentGroupCreateIn = z.object({
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  ownerId: z.uuid(),
  courseId: z.uuid(),
});
export type AssignmentGroupCreateIn = z.infer<typeof AssignmentGroupCreateIn>;

// Update DTOs (API request bodies)
export const AssignmentGroupUpdateIn = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
  ownerId: z.uuid().optional(),
  courseId: z.uuid().optional(),
});
export type AssignmentGroupUpdateIn = z.infer<typeof AssignmentGroupUpdateIn>;
