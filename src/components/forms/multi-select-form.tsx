'use client';
import { useState, useTransition } from 'react';

import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { MultiSelect } from '../ui/multi-select';
import { getSubmitHandler } from './base';
import { SwitchForm } from './switch-form';

interface MultiSelectFormProps<T> {
  title: string;
  name: T;
  defaultValue: string[];
  data?: { [key: string]: string };
  items: { value: string; label: string }[];
  handleSubmit: (
    data: FormData
  ) => Promise<{ error: string } | { success: string } | any | void>;
}

export const MultiSelectForm = <T extends string>(
  params: MultiSelectFormProps<T>
) => {
  const { defaultValue, title } = params;
  const [loading, setTransition] = useTransition();

  const [_selectedLanguages, setSelectedLanguages] =
    useState<string[]>(defaultValue);
  const onSubmit = getSubmitHandler({ ...params, setTransition });

  const onValueChange = async (value: string[]) => {
    setSelectedLanguages(value);
    await onSubmit(value.join(','));
  };
  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle>
          <div className="flex justify-between text-xl">{title}</div>
        </CardTitle>
        <CardDescription>
          <MultiSelect
            disabled={loading}
            options={params.items}
            asChild
            onValueChange={onValueChange}
            defaultValue={defaultValue}
            placeholder="Select auto added languages"
            variant="inverted"
            className="w-full"
            //animation={1}
            maxCount={1}
          />
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export { SwitchForm };
