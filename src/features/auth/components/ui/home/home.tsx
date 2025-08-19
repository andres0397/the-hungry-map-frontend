'use client';
import { Button } from '@heroui/react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Our App</h1>
          <p className="text-lg text-gray-600">Get started by signing in or creating an account</p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button as={Link} className="px-8 bg-amber-500" href="/login" size="lg">
            Sign In
          </Button>
          <Button
            as={Link}
            className="px-8 border-amber-500"
            href="/signup"
            size="lg"
            variant="bordered"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}
