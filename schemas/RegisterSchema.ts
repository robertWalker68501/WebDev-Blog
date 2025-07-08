import { z } from 'zod';

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: 'Name must be at least 4 characters' })
      .max(30, { message: 'Name must be at most 30 characters' }),
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .min(1, { message: 'Email is required' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(15, { message: 'Password must be at most 15 characters' }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    { message: 'Passwords do not match', path: ['confirmPassword'] }
  );

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
