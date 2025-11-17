import { z } from 'zod';

// Output DTOs (API responses)
export const SubmissionOut = z.object({
  id: z.uuid(),
  content: z.string(),
  grade: z.string(),
  assignmentId: z.uuid(),
  userId: z.uuid(),
  courseId: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});
export type SubmissionOut = z.infer<typeof SubmissionOut>;

// Creation DTOs (API request bodies)
export const SubmissionCreateIn = z.object({
  content: z.string().min(1),
  grade: z.string().min(1),
  assignmentId: z.uuid(),
  userId: z.uuid(),
  courseId: z.uuid(),
});
export type SubmissionCreateIn = z.infer<typeof SubmissionCreateIn>;

// Update DTOs (API request bodies)
export const SubmissionUpdateIn = z.object({
  content: z.string().min(1).optional(),
  grade: z.string().min(1).optional(),
  assignmentId: z.uuid().optional(),
  userId: z.uuid().optional(),
  courseId: z.uuid().optional(),
});
export type SubmissionUpdateIn = z.infer<typeof SubmissionUpdateIn>;

