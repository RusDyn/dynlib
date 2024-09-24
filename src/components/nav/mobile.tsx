'use client';

import { LineChart, PanelLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/src/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/src/components/ui/sheet';

import { Logo } from '../icons';

export interface MenuItem {
  icon: JSX.Element;
  label: string;
  href: string;
}
export function MobileNav({ items }: { items: MenuItem[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, searchParams]);

  return (
    <Sheet open={menuOpen} onOpenChange={(open) => setMenuOpen(open)}>
      <SheetTrigger asChild onClick={() => setMenuOpen(true)}>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="size-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="https://www.dynsub.pro"
            className="group flex size-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <div className="size-8 transition-all group-hover:scale-110">
              <Logo />
            </div>
            <span className="sr-only">DynSub</span>
          </Link>
          {items.map((item, index) => (
            <Link
              key={`item-${index}`}
              href={item.href}
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <Link
            href="/settings"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <LineChart className="size-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
