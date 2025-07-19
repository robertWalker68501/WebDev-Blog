import { z } from 'zod';

export const PasswordResetSchema = z
  .object({
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

export type PasswordResetSchemaType = z.infer<typeof PasswordResetSchema>;
