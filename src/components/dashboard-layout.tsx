import { Analytics } from '@vercel/analytics/react';
import { Suspense } from 'react';

import { DashboardBreadcrumb } from '@/src/components/breadcrumb';
import { CrispChat } from '@/src/components/chrisp-chat';
import { DesktopNav } from '@/src/components/nav/desktop';
import type { MenuItem } from '@/src/components/nav/mobile';
import { MobileNav } from '@/src/components/nav/mobile';
import Providers from '@/src/components/providers';
import { ResultToast } from '@/src/components/result-toast';
import { SearchInput } from '@/src/components/search';
import { Skeleton } from '@/src/components/ui/skeleton';
import { User } from '@/src/components/user';

export default function DashboardLayout({
  menuItems,
  children
}: {
  menuItems: MenuItem[];
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <CrispChat />
        <Suspense fallback={null}>
          <ResultToast />
        </Suspense>
        <DesktopNav items={menuItems} />
        <div className="flex min-h-screen flex-col sm:gap-4 sm:py-4 sm:pl-14 ">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Suspense fallback={<Skeleton />}>
              <MobileNav items={menuItems} />
              <DashboardBreadcrumb />
              <SearchInput />
            </Suspense>
            <User />
          </header>
          <main className="grid flex-1 items-start gap-2 bg-muted/40 p-4 sm:px-6 sm:py-0  md:gap-4 ">
            {children}
          </main>
        </div>
        <Analytics />
      </main>
    </Providers>
  );
}
