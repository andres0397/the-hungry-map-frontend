import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const signupSchema = z
  .object({
    confirmPassword: z.string().min(6, 'Confirm your password'),
    email: z.string().email('Invalid email address'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phone: z
      .string()
      .min(8, 'Phone should be at least 8 characters')
      .max(10, 'Phone should be at most 10 characters'),
    role: z.string().min(1, 'Role is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // highlight confirmPassword field
  });
