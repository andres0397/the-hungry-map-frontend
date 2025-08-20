'use client';

import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { login } from '@/app/actions/login';
import { loginSchema } from '@/shared/lib/zod-schemas';

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      login(data)
        .then((res) => {
          setError(res.error);
          setSuccess(res.success);
        })
        .catch((err) => {
          setError(err.error);
          setSuccess(err.success);
        });
    });
  };

  return (
    <form className="flex flex-col gap-4 max-w-md w-full" onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-4 w-full max-w-md">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-center w-full">Welcome Back</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <Input
            label="Email"
            type="email"
            {...register('email')}
            disabled={isPending}
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
          />

          <Input
            label="Password"
            type="password"
            {...register('password')}
            disabled={isPending}
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
          />

          {error && <div className="text-red-500 text-center my-2">{error}</div>}
          {success && <div className="text-green-500 text-center my-2">{success}</div>}

          <Button
            className="w-full bg-amber-500"
            disabled={isPending}
            isLoading={isSubmitting}
            type="submit"
          >
            Login
          </Button>
          <CardFooter>
            <p className="text-sm text-gray-600 text-center">
              Don&apos;t have an account?{' '}
              <Link className="text-blue-600 hover:underline" href="/signup">
                Sign up
              </Link>
            </p>
          </CardFooter>

          <div />
        </CardBody>
      </Card>
    </form>
  );
};
