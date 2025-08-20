import { CheckBadgeIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { addToast } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import z from 'zod';

import { signupSchema } from '@/shared/lib';

import { authRepository } from '../infrastructure/auth.repository';

export function useAuth() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      authRepository
        .signUp(data)
        .then((res) => {
          addToast({
            color: 'success',
            description: 'Account created successfully 🦐',
            icon: <CheckBadgeIcon />,
            timeout: 5000,
            title: 'Success!!',
          });

          if (res?.success) {
            router.push('/login');
          }
        })
        .catch((err) => {
          setError(err.error);
          addToast({
            color: 'danger',
            description: 'Something went wrong 🤔',
            icon: <ShieldExclamationIcon />,
            timeout: 5000,
            title: 'Error!',
          });
        });
    });
  };

  return {
    error,
    isPending,
    onSubmit,
    success,
  };
}
