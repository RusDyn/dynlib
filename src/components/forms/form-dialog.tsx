'use client';

import va from '@vercel/analytics';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { Spinner } from '../icons';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';

export interface FormDialogProps {
  children: React.ReactNode;
  submitButtonText: string | React.ReactNode;
  title?: string;
  description?: string;
  openButtonText?: string | React.ReactNode;
  openButtonClassName?: string | undefined;
  handleSubmit?: (
    data: FormData
  ) => Promise<{ error?: string; success?: string }>;
  onClose?: () => void;
  open?: boolean;
}

function FormDialog({
  children,
  submitButtonText,
  title,
  description,
  openButtonText,
  openButtonClassName,
  onClose,
  open: isOpen = false,
  handleSubmit
}: FormDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(isOpen);

  const [loading, setTransition] = useTransition();
  const onSubmit = async (data: FormData) => {
    if (typeof handleSubmit === 'function') {
      setTransition(() => {
        handleSubmit(data).then((res) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            const successMessage = res.success || `Successfully updated!`;
            va.track(`Updated `);
            handleClose(false);
            router.refresh();
            toast.success(successMessage);
          }
        });
      });
      return;
    }
  };

  const handleClose = (value: boolean) => {
    setOpen(value);
    if (value === false && onClose) {
      onClose();
    }
  };

  const isIcon = (element: any): boolean => {
    return element?.type === 'svg';
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      {openButtonText && (
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size={isIcon(openButtonText) ? 'icon' : 'default'}
            className={openButtonClassName}
          >
            {openButtonText}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <form action={onSubmit}>
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <div className="flex items-center space-x-2 py-4">{children}</div>
          <DialogFooter>
            {loading && (
              <div className="relative">
                <Spinner />
              </div>
            )}
            <Button disabled={loading} type="submit">
              {submitButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default FormDialog;
