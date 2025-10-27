import { z } from 'zod';

export const UserRef = z.object({
    id: z.uuid(),
    name: z.string().nullable().optional(),
    email: z.string().nullable().optional(), 

})
