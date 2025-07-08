import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import { LoginSchema } from '@/schemas/LoginSchema';
import { getUserByEmail } from '@/lib/user';
import bcryptjs from 'bcryptjs';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const isCorrectPassword = await bcryptjs.compare(
            password,
            user.password
          );

          if (isCorrectPassword) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
