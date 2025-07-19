'use server';

import { LoginSchema, LoginSchemaType } from '@/schemas/LoginSchema';
import { getUserByEmail } from '@/lib/user';
import { signIn } from '@/auth';
import { LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import {
  generateEmailVerificationToken,
  sendEmailVerificationToken,
} from '@/lib/emailVerification';

export const login = async (values: LoginSchemaType) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }

  const { email, password } = validateFields.data;

  const user = await getUserByEmail(email);

  if (!user || !email || !password || !user.password) {
    return { error: 'Invalid credentials' };
  }

  if (!user.emailVerified) {
    const emailVerificationToken = await generateEmailVerificationToken(
      user.email
    );

    const { error } = await sendEmailVerificationToken(
      emailVerificationToken.email,
      emailVerificationToken.token
    );

    if (error) {
      return {
        error:
          'Something went wrong sending the verification email. Try to login to resend the verification email.',
      };
    }

    return { success: 'Verification email sent' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: LOGIN_REDIRECT[0],
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' };
        default:
          return { error: 'An unexpected error occurred' };
      }
    }
  }
};
