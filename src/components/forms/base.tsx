import type { TransitionStartFunction } from 'react';
import { toast } from 'sonner';

export const onSubmitResult = (res: any) => {
  if (res.error) {
    toast.error(res.error);
  } else {
    const successMessage = res.success || `Successfully updated!`;
    //va.track(`Updated `);
    //setOpen(false);
    //router.refresh();
    toast.success(successMessage);
  }
};

export const getSubmitHandler = (params: {
  name: string;
  data?: { [key: string]: string };
  setTransition: TransitionStartFunction;
  handleSubmit: (
    data: FormData
  ) => Promise<{ error: string } | { success: string } | any | void>;
}) => {
  const { name, data = {}, setTransition, handleSubmit } = params;
  return (value: string | Blob) => {
    const formData = new FormData();
    formData.append(name, value);
    // append additional data
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (typeof handleSubmit === 'function') {
      setTransition(() => {
        handleSubmit(formData).then(onSubmitResult);
      });
      return;
    }
  };
};
