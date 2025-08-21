'use client';
import { CheckBadgeIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { addToast } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import z from 'zod';

import { signupSchema } from '@/shared/lib';

import { authRepository } from '../infrastructure/auth.repository';

export const useAuth = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (values: z.infer<typeof signupSchema>) => authRepository.signUp(values),
    onError: () => {
      addToast({
        color: 'danger',
        description: 'Something went wrong 🤔',
        icon: <ShieldExclamationIcon />,
        timeout: 5000,
        title: 'Error!',
      });
      router.refresh();
    },
    onSuccess: (res) => {
      if (res?.success) {
        addToast({
          color: 'success',
          description: 'Account created successfully 🦐',
          icon: <CheckBadgeIcon />,
          timeout: 5000,
          title: 'Success!!',
        });

        router.push('/login');
      } else {
        addToast({
          color: 'danger',
          description: 'Something went wrong 🤔',
          icon: <ShieldExclamationIcon />,
          timeout: 5000,
          title: 'Error!',
        });
        router.refresh();
      }
    },
  });
};
