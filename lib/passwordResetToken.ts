import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { Resend } from 'resend';

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const PasswordResetToken = await db.passwordRestToken.findUnique({
      where: { token },
    });
    return PasswordResetToken;
  } catch (error) {
    console.error('Error fetching password token:', error);
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const PasswordResetToken = await db.passwordRestToken.findFirst({
      where: { email },
    });
    return PasswordResetToken;
  } catch (error) {
    console.error('Error fetching password token:', error);
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.emailVerificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordRestToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const resetLink = `${process.env.BASE_URL}/password-reset-form?token=${token}`;

  const res = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Password Reset',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
  });

  return { error: res.error };
};
