//import Google from "next-auth/providers/google"
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import type { CredentialsSignin, Session } from 'next-auth';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';

const prisma = new PrismaClient();

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true
    }),
    Resend({
      from: process.env.AUTH_RESEND_FROM,
      name: 'Magic link'
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user!.id = token.sub;
      return session;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    async jwt({ token, user }: { token: JWT; user?: { id?: string } }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },

  cookies: {
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true
      }
    }
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions) as {
  handlers: any;
  signIn: (credentials?: any) => Promise<CredentialsSignin>;
  signOut: (options?: any) => Promise<void>;
  auth: () => Promise<Session | null>;
};

export async function getUserIdFromSession() {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error('Not authenticated');
  }
  return session!.user!.id! as string;
}

export function withGuard<T extends any[], Y>(
  handler: (data: FormData, ...params: T) => Promise<Y>,
  guardAction: (data: FormData) => Promise<T>
) {
  return async (data: FormData) => {
    const result = await guardAction(data);
    try {
      return await handler(data, ...result);
    } catch (error) {
      console.error('Error handling request:', error);
      return {
        error: 'Error handling request'
      };
    }
  };
}

const getUserIdFromSession2 = async (): Promise<[string]> => {
  const userId = await getUserIdFromSession();
  return [userId];
};

export const withUser = <T>(
  handler: (formData: FormData, userId: string) => Promise<T>
) => withGuard(handler, getUserIdFromSession2);
