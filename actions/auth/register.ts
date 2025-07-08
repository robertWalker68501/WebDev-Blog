'use server';

import { RegisterSchema, RegisterSchemaType } from '@/schemas/RegisterSchema';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/lib/user';

export const signUp = async (values: RegisterSchemaType) => {
  // Validate the input fields using the RegisterSchema
  const validateFields = RegisterSchema.safeParse(values);

  // If validation fails, return an error
  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }

  // Destructure validated data
  const { name, email, password } = validateFields.data;

  // Check if user already exists
  const user = await getUserByEmail(email);

  if (user) {
    return { error: 'Email already in use!' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: 'User registered successfully' };
};
