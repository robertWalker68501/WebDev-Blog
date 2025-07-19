import { z } from 'zod';

export const PasswordEmailSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
});

export type PasswordEmailSchemaType = z.infer<typeof PasswordEmailSchema>;
