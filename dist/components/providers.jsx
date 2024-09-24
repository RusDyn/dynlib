'use client';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/src/components/ui/tooltip';
export default function Providers(_a) {
    var children = _a.children;
    return (<TooltipProvider>
      {children}
      <Toaster />
    </TooltipProvider>);
}
