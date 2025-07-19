'use server';

import {
  PasswordEmailSchema,
  PasswordEmailSchemaType,
} from '@/schemas/PasswordEmailSchema';
import { getUserByEmail } from '@/lib/user';
import {
  generatePasswordResetToken,
  sendPasswordResetEmail,
} from '@/lib/passwordResetToken';

export const passwordEmail = async (values: PasswordEmailSchemaType) => {
  const validatedFields = PasswordEmailSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid Email!' };
  }

  const { email } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user || !user.email) {
    return { error: 'Invalid Email!' };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  const { error } = await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  if (error) {
    return {
      error: 'Something went wrong while sending the password reset email!',
    };
  }

  return { success: 'Password reset email sent successfully!' };
};
