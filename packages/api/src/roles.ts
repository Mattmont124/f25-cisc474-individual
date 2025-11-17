import { z } from 'zod';

/* ------------------------------------------
 * Enums
 * ----------------------------------------*/
export const RoleType = z.enum(['STUDENT', 'INSTRUCTOR', 'TA', 'ADMIN']);
export type RoleType = z.infer<typeof RoleType>;

// Output DTOs (API responses)
export const RoleOut = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  courseId: z.uuid(),
  role: RoleType,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});
export type RoleOut = z.infer<typeof RoleOut>;

// Creation DTOs (API request bodies)
export const RoleCreateIn = z.object({
  userId: z.uuid(),
  courseId: z.uuid(),
  role: RoleType,
});
export type RoleCreateIn = z.infer<typeof RoleCreateIn>;

// Update DTOs (API request bodies)
export const RoleUpdateIn = z.object({
  role: RoleType.optional(),
});
export type RoleUpdateIn = z.infer<typeof RoleUpdateIn>;