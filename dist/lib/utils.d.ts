import { type ClassValue } from 'clsx';
export declare function cn(...inputs: ClassValue[]): string;
export declare function deleteForbiddenFields<T>(data: Partial<T>, forbiddenFields: (keyof T)[]): void;
export declare const processError: (error: {
    error: string;
    code?: number;
}) => never;
export declare function extractFormData<T>(formData: FormData, booleanKeys: Array<keyof T>, arrayKeys: Array<keyof T>): Partial<T>;
