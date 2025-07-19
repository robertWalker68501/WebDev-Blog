'use server';

import {
  PasswordResetSchema,
  PasswordResetSchemaType,
} from '@/schemas/PasswordResetSchema';
import { getPasswordResetTokenByToken } from '@/lib/passwordResetToken';
import { getUserByEmail } from '@/lib/user';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export const passwordReset = async (
  values: PasswordResetSchemaType,
  token?: string | null
) => {
  if (!token) return { error: 'Token does not exist!' };

  const validatedFields = PasswordResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid Email!' };
  }

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) return { error: 'Invalid token!' };

  const isExpired = new Date(existingToken.expires) < new Date();

  if (isExpired) {
    return { error: 'Token expired!' };
  }

  const user = await getUserByEmail(existingToken.email);

  if (!user) return { error: 'User does not exist!' };

  const { password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.passwordRestToken.delete({ where: { id: existingToken.id } });

  return { success: 'Password reset successfully!' };
};
