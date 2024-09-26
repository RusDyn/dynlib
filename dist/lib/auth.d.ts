import type { CredentialsSignin, Session } from 'next-auth';
export declare const handlers: any, signIn: (credentials?: any) => Promise<CredentialsSignin>, signOut: (options?: any) => Promise<void>, auth: () => Promise<Session | null>;
export declare function getUserIdFromSession(): Promise<string>;
export declare function withGuard<T extends any[], Y>(handler: (data: FormData, ...params: T) => Promise<Y>, guardAction: (data: FormData) => Promise<T>): (data: FormData) => Promise<Y | {
    error: string;
}>;
export declare const withUser: <T>(handler: (formData: FormData, userId: string) => Promise<T>) => (data: FormData) => Promise<T | {
    error: string;
}>;
