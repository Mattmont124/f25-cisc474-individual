import { z } from 'zod';

// Reference DTOs (lightweight relation embeds)
export const UserRef = z.object({
  id: z.uuid(),
  name: z.string().nullable().optional(),
  email: z.email().nullable().optional(),
});

export type UserRef = z.infer<typeof UserRef>;

// Output DTOs (API responses)
export const UserOut = z.object({
  id: z.uuid(),
  name: z.string().nullable(),
  email: z.string().email().nullable(),
  emailVerified: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});
export type UserOut = z.infer<typeof UserOut>;

// Creation DTOs (API request bodies)
export const UserCreateIn = z.object({
  name: z.string().min(1).optional(),
  email: z.email().optional(),
  // Optional: allow clients to set/clear verification timestamp explicitly
  emailVerified: z.coerce.date().optional().nullable(),
});
export type UserCreateIn = z.infer<typeof UserCreateIn>;

// Update DTOs (API request bodies)
export const UserUpdateIn = z.object({
  name: z.string().min(1).optional().nullable(),
  email: z.email().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
});
export type UserUpdateIn = z.infer<typeof UserUpdateIn>;