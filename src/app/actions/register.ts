'use server';
import { AxiosError } from 'axios';
import * as z from 'zod';

import { CreateUserEntity } from '@/features/auth/domain/entities/user.entity';
import { axiosInstance } from '@/shared/lib';
import { signupSchema } from '@/shared/lib/zod-schemas';

export const signup = async (values: z.infer<typeof signupSchema>) => {
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' };
  }

  const mappedUserData = {
    email: validatedFields.data.email,
    lastName: validatedFields.data.lastName,
    name: validatedFields.data.name,
    password: validatedFields.data.password,
    phone: validatedFields.data.phone,
    role: Number(validatedFields.data.role),
    status: 'active',
  };

  try {
    //TODO: validate data from the backend to match Userentity
    const { data } = await axiosInstance.post<CreateUserEntity>('/users', mappedUserData);

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
