import z from 'zod';

import { signup } from '@/app/actions/register';
import { signupSchema } from '@/shared/lib';

export const authRepository = {
  signUp: async (values: z.infer<typeof signupSchema>) => await signup(values),
};
