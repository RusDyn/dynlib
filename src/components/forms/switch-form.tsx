'use client';

import { useState, useTransition } from 'react';

import { Switch } from '@/src/components/ui/switch';

import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { getSubmitHandler } from './base';

interface SwitchFormProps<T> {
  title: string;
  description: string | JSX.Element;
  name: T;
  defaultValue: boolean;
  data?: { [key: string]: string };
  handleSubmit: (
    data: FormData
  ) => Promise<{ error: string } | { success: string } | any | void>;
}

const SwitchForm = <T extends string>(params: SwitchFormProps<T>) => {
  const { title, description, defaultValue } = params;
  const [state, setState] = useState(defaultValue);
  const [loading, setTransition] = useTransition();

  const onSubmit = getSubmitHandler({ ...params, setTransition });
  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle>
          <div className="flex justify-between text-xl">
            {title}
            <Switch
              disabled={loading}
              checked={state}
              onCheckedChange={async (value: boolean) => {
                setState(value);
                await onSubmit(value ? 'true' : 'false');
              }}
            />
          </div>
        </CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export { SwitchForm };
