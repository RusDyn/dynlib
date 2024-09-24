'use client';
import { LineChart, PanelLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/src/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/src/components/ui/sheet';
import { Logo } from '../icons';
export function MobileNav(_a) {
    var items = _a.items;
    var _b = useState(false), menuOpen = _b[0], setMenuOpen = _b[1];
    var pathname = usePathname();
    var searchParams = useSearchParams();
    useEffect(function () {
        setMenuOpen(false);
    }, [pathname, searchParams]);
    return (<Sheet open={menuOpen} onOpenChange={function (open) { return setMenuOpen(open); }}>
      <SheetTrigger asChild onClick={function () { return setMenuOpen(true); }}>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="size-5"/>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link href="https://www.dynsub.pro" className="group flex size-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
            <div className="size-8 transition-all group-hover:scale-110">
              <Logo />
            </div>
            <span className="sr-only">DynSub</span>
          </Link>
          {items.map(function (item, index) { return (<Link key={"item-".concat(index)} href={item.href} className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              {item.icon}
              {item.label}
            </Link>); })}
          <Link href="/settings" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
            <LineChart className="size-5"/>
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>);
}
