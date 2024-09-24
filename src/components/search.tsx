'use client';

import { Search } from 'lucide-react';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { useTransition } from 'react';

import { Spinner } from '@/src/components/icons';
import { Input } from '@/src/components/ui/input';

export function SearchInput() {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const [isPending, startTransition] = useTransition();

  if (segment === 'settings' || segment === null) {
    return <div className="relative ml-auto flex-1 md:grow-0" />;
  }

  function searchAction(formData: FormData) {
    let value = formData.get('q') as string;
    const currentUrl = new URL(window.location.href);
    const params = currentUrl.searchParams;
    params.set('q', value);
    const newUrl = `${currentUrl.pathname}?${params.toString()}`;
    //router.replace(newUrl, { scroll: false });
    startTransition(() => {
      router.replace(newUrl);
    });
  }

  return (
    <form action={searchAction} className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-[.75rem] size-4 text-muted-foreground" />
      <Input
        name="q"
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
      {isPending && <Spinner />}
    </form>
  );
}
