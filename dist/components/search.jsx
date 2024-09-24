'use client';
import { Search } from 'lucide-react';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { useTransition } from 'react';
import { Spinner } from '@/src/components/icons';
import { Input } from '@/src/components/ui/input';
export function SearchInput() {
    var router = useRouter();
    var segment = useSelectedLayoutSegment();
    var _a = useTransition(), isPending = _a[0], startTransition = _a[1];
    if (segment === 'settings' || segment === null) {
        return <div className="relative ml-auto flex-1 md:grow-0"/>;
    }
    function searchAction(formData) {
        var value = formData.get('q');
        var currentUrl = new URL(window.location.href);
        var params = currentUrl.searchParams;
        params.set('q', value);
        var newUrl = "".concat(currentUrl.pathname, "?").concat(params.toString());
        //router.replace(newUrl, { scroll: false });
        startTransition(function () {
            router.replace(newUrl);
        });
    }
    return (<form action={searchAction} className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-[.75rem] size-4 text-muted-foreground"/>
      <Input name="q" type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"/>
      {isPending && <Spinner />}
    </form>);
}
