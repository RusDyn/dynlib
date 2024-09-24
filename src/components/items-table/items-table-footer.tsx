'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { Button } from '@/src/components/ui/button';

import { Spinner } from '../icons';

export function ItemsTableFooter({
  offset,
  totalItems,
  count,
  name
}: {
  count: number;
  offset: number;
  totalItems: number;
  name: string;
}) {
  let router = useRouter();
  const [isPending, startTransition] = useTransition();

  const changePage = (newOffset: number) => {
    if (isPending) return;

    const currentUrl = new URL(window.location.href);
    const params = currentUrl.searchParams;
    params.set('offset', newOffset.toString());
    const newUrl = `${currentUrl.pathname}?${params.toString()}`;
    startTransition(() => {
      //router.replace(newUrl, { scroll: false });
      router.replace(newUrl);
    });
  };
  function prevPage() {
    const newOffset = offset - count;
    changePage(Math.max(0, newOffset));
  }

  function nextPage() {
    const newOffset = offset + count;
    changePage(Math.min(totalItems - count, newOffset));
  }

  return (
    <form className="flex w-full items-center justify-between">
      <div className="text-xs text-muted-foreground">
        Showing{' '}
        <strong>
          {Math.max(1, Math.min(offset, totalItems) + 1)}-
          {Math.min(offset + count, totalItems)}
        </strong>{' '}
        of <strong>{totalItems}</strong> {name}
      </div>
      <div className="flex">
        {isPending ? (
          <div className="relative ml-auto flex-1 md:grow-0">
            <Spinner />
          </div>
        ) : (
          <>
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === 0}
            >
              <ChevronLeft className="mr-2 size-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={isPending || offset + count >= totalItems}
            >
              Next
              <ChevronRight className="ml-2 size-4" />
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
