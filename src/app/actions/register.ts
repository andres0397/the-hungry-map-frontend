'use server';
import { AxiosError } from 'axios';
import * as z from 'zod';

import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import { axiosInstance } from '@/shared/lib';
import { signupSchema } from '@/shared/lib/zod-schemas';

export const signup = async (values: z.infer<typeof signupSchema>) => {
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' };
  }

  const mappedUserData = {
    email: validatedFields.data.email,
    name: validatedFields.data.name,
    password: validatedFields.data.password,
    phone: validatedFields.data.phone,
    role: validatedFields.data.role,
    status: 'active',
  };

  try {
    //TODO: validate data from the backend to match Userentity
    const { data } = await axiosInstance.post<UserEntity>('/users', mappedUserData);

    if (data?.id) {
      return { success: 'data sended' };
    }

    return { error: 'Signup failed' };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || 'Signup failed' };
    }

    return { error: 'Unexpected error' };
  }
};
