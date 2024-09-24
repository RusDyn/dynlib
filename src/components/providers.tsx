'use client';

import { Toaster } from 'sonner';

import { TooltipProvider } from '@/src/components/ui/tooltip';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      {children}
      <Toaster />
    </TooltipProvider>
  );
}
