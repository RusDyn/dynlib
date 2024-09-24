'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
export function ResultToast() {
    var searchParams = useSearchParams();
    var router = useRouter();
    var hasRun = useRef(false);
    useEffect(function () {
        if (hasRun.current)
            return;
        hasRun.current = true;
        var error = searchParams.get('error');
        var success = searchParams.get('success');
        if (error) {
            toast.error(error);
        }
        else if (success) {
            toast.success(success);
        }
        if (error || success) {
            var params = new URLSearchParams(searchParams.toString());
            params.delete('error');
            params.delete('success');
            var newUrl = "".concat(window.location.pathname, "?").concat(params.toString());
            router.replace(newUrl);
        }
    }, [searchParams, router]);
    return null;
}
