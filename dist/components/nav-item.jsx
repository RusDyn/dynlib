'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';
export function NavItem(_a) {
    var href = _a.href, label = _a.label, children = _a.children;
    var pathname = usePathname();
    return (<Tooltip>
      <TooltipTrigger asChild>
        <Link href={href} className={clsx('flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8', {
            'bg-accent text-black': pathname === href
        })}>
          {children}
          <span className="sr-only">{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>);
}
