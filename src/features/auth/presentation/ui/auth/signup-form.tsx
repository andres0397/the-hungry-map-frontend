'use client';

import type React from 'react';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Select,
  SelectItem,
} from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuth } from '@/features/auth/application/use-auth';
import { CUSTOM_ROLES } from '@/shared/lib';
import { signupSchema } from '@/shared/lib/zod-schemas';

type SignupFormData = z.infer<typeof signupSchema>;

export const SignUpForm = () => {
  const { error, isPending, onSubmit, success } = useAuth();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  return (
    <div className="w-full">
      <Card>
        <CardHeader className="flex flex-col gap-3 pb-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 mt-2">Sign up to get started</p>
          </div>
        </CardHeader>

        <CardBody className="pt-0">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="md:grid md:grid-cols-2 space-y-4 p-2 md:gap-2">
              <Input
                label="Name"
                {...register('name')}
                disabled={isPending}
                errorMessage={errors.name?.message}
                isInvalid={!!errors.name}
              />

              <Input
                label="Last Name"
                {...register('lastName')}
                disabled={isPending}
                errorMessage={errors.name?.message}
                isInvalid={!!errors.name}
              />

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

              <Input
                label="Confirm Password"
                type="password"
                {...register('confirmPassword')}
                disabled={isPending}
                errorMessage={errors.confirmPassword?.message}
                isInvalid={!!errors.confirmPassword}
              />

              <Select
                label="Role"
                {...register('role')}
                disabled={isPending}
                errorMessage={errors.role?.message}
                isInvalid={!!errors.role}
                placeholder="Select a role"
              >
                {CUSTOM_ROLES.map((role) => (
                  <SelectItem key={role}>{role}</SelectItem>
                ))}
              </Select>

              <Input
                label="Phone"
                type="number"
                {...register('phone')}
                disabled={isPending}
                errorMessage={errors.phone?.message}
                isInvalid={!!errors.phone}
              />
            </div>

            {error && <p className="text-red-500 mt-2 opacity-0 hidden">{error}</p>}

            {success && <p className="text-green-500 mt-2 opacity-0 hidden">{success}</p>}

            <Button
              className="w-full mt-6 bg-amber-500"
              disabled={isPending}
              isLoading={isPending}
              size="lg"
              type="submit"
            >
              {isPending ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <Divider className="my-6" />

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                href="/login"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
