import { type ClassValue, clsx } from 'clsx';
import { notFound } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export const processError = (error: { error: string; code?: number }) => {
  if (error.code === 404) {
    return notFound();
  }
  throw new Error(error.error);
};

export function extractFormData<T>(
  formData: FormData,
  booleanKeys: Array<keyof T>,
  arrayKeys: Array<keyof T>
): Partial<T> {
  const data = {} as Partial<T>;

  formData.forEach((value, key) => {
    // Assuming T is an object with string keys
    const typedKey = key as keyof T;
    // write info about t2
    if (booleanKeys.includes(typedKey)) {
      // Convert string to boolean
      data[typedKey] = (value === 'true') as T[typeof typedKey];
    } else if (arrayKeys.includes(typedKey)) {
      // Convert comma-separated string to an array
      data[typedKey] = (value as string).split(',') as any;
    } else {
      // Default to treating the value as a string
      data[typedKey] = value as T[typeof typedKey];
    }
  });
  return data;
}
