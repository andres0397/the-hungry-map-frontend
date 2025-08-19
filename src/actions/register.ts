'use server';
import * as z from 'zod';

import { signupSchema } from '@/shared/lib/zod-schemas';

export const signup = async (values: z.infer<typeof signupSchema>) => {
  const validatedFields = signupSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid Fields' };
  }

  return { success: 'Email sent' };
};
