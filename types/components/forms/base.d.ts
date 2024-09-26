import type { TransitionStartFunction } from 'react';
export declare const onSubmitResult: (res: any) => void;
export declare const getSubmitHandler: (params: {
    name: string;
    data?: {
        [key: string]: string;
    };
    setTransition: TransitionStartFunction;
    handleSubmit: (data: FormData) => Promise<{
        error: string;
    } | {
        success: string;
    } | any | void>;
}) => (value: string | Blob) => void;
