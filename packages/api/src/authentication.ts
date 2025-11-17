import { z } from 'zod';

// Output DTOs (API responses)
export const AuthenticationOut = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  provider: z.string(),
  providerId: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});
export type AuthenticationOut = z.infer<typeof AuthenticationOut>;

// Creation DTOs (API request bodies)
export const AuthenticationCreateIn = z.object({
  userId: z.uuid(),
  provider: z.string().min(1),
  providerId: z.string().min(1),
});
export type AuthenticationCreateIn = z.infer<typeof AuthenticationCreateIn>;

// Update DTOs (API request bodies)
export const AuthenticationUpdateIn = z.object({
  provider: z.string().min(1).optional(),
  providerId: z.string().min(1).optional(),
});
export type AuthenticationUpdateIn = z.infer<typeof AuthenticationUpdateIn>;