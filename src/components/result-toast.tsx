'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export function ResultToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const error = searchParams.get('error');
    const success = searchParams.get('success');
    if (error) {
      toast.error(error);
    } else if (success) {
      toast.success(success);
    }
    if (error || success) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('error');
      params.delete('success');
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.replace(newUrl);
    }
  }, [searchParams, router]);

  return null;
}
