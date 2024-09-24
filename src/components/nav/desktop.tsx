import { Settings } from 'lucide-react';
import Link from 'next/link';

import { Logo } from '@/src/components/icons';
import { NavItem } from '@/src/components/nav-item';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/src/components/ui/tooltip';

import type { MenuItem } from './mobile';

export function DesktopNav({ items }: { items: MenuItem[] }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="https://www.dynsub.pro"
          className="group flex size-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:size-8 md:text-base"
        >
          <div className="size-8 transition-all group-hover:scale-110">
            <Logo />
          </div>
          <span className="sr-only">DynSub</span>
        </Link>
        {items.map((item, index) => (
          <NavItem key={`item-${index}`} href={item.href} label={item.label}>
            {item.icon}
          </NavItem>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/settings"
              className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
            >
              <Settings className="size-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
