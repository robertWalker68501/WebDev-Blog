import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(15, { message: 'Password must be at most 15 characters' }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
