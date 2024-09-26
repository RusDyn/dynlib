import 'server-only';
import type { Prisma } from '@prisma/client';
export declare function getStripeCustomerId(userId: string): Promise<string | null>;
export declare function deleteForbiddenFields<T>(data: Partial<T>, forbiddenFields: (keyof T)[]): void;
export declare function updateUser(userId: string, data: Prisma.UserUpdateArgs['data']): Promise<void>;
