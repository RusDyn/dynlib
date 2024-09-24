import 'server-only';

import type { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getStripeCustomerId(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user?.stripeCustomerId || null;
}

// Define the guard function
export function deleteForbiddenFields<T>(
  data: Partial<T>,
  forbiddenFields: (keyof T)[]
): void {
  for (const field of forbiddenFields) {
    if (field in data) {
      delete data[field];
    }
  }
}

export async function updateUser(
  userId: string,
  data: Prisma.UserUpdateArgs['data']
) {
  await prisma.user.update({ where: { id: userId }, data });
}
