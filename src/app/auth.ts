import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// src/auth.ts
import { AuthorizeType } from '@/shared/types/authorize-type';

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(creds) {
        // const res = await fetch(`${process.env.API_URL}/auth/login`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ email: creds?.email, password: creds?.password }),
        // });
        // if (!res.ok) return null;
        // const data = await res.json();
        const data = {
          access_token: 'token',
          expires_in: 3600,
          refresh_token: 'token',
          user: { email: creds?.email, id: '1', name: 'John Doe' },
        };
        return {
          accessToken: data.access_token,
          accessTokenExpires: Date.now() + data.expires_in * 1000,
          email: data.user.email,
          id: data.user.id,
          name: data.user.name,
          refreshToken: data.refresh_token,
        } as AuthorizeType;
      },
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      name: 'Credentials',
    }),
  ],
  session: { strategy: 'jwt' },
  //   callbacks: {
  //     async jwt({ token, user }) {
  //       // Initial sign-in
  //       if (user) {
  //         token.user = { id: (user as any).id, name: (user as any).name, email: (user as any).email };
  //         token.accessToken = (user as any).accessToken;
  //         token.refreshToken = (user as any).refreshToken;         // kept server-side only
  //         token.accessTokenExpires = (user as any).accessTokenExpires;
  //         return token;
  //       }

  //       // If access token still valid, return it
  //       if (Date.now() < (token.accessTokenExpires as number)) return token;

  //       // Refresh token
  //       const res = await fetch(`${process.env.API_URL}/auth/refresh`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ refresh_token: token.refreshToken }),
  //       });

  //       if (!res.ok) {
  //         return { ...token, error: "RefreshAccessTokenError" as const };
  //       }

  //       const data = await res.json();
  //       token.accessToken = data.access_token;
  //       token.accessTokenExpires = Date.now() + data.expires_in * 1000;
  //       if (data.refresh_token) token.refreshToken = data.refresh_token; // rotate if returned
  //       return token;
  //     },
  //     async session({ session, token }) {
  //       session.user = token.user as any;
  //       // Expose access token & error (but NOT refresh token)
  //       (session as any).accessToken = token.accessToken;
  //       (session as any).error = token.error;
  //       return session;
  //     },
  //     // Used by middleware for route protection
  //     authorized({ auth }) {
  //       return !!auth?.user;
  //     },
  //   },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
