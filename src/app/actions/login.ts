'use server';
import * as z from 'zod';

import { loginSchema } from '@/shared/lib/zod-schemas';

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid Fields' };
  }

  return { success: 'Email sent' };
};
