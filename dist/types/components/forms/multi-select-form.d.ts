import { SwitchForm } from './switch-form';
interface MultiSelectFormProps<T> {
    title: string;
    name: T;
    defaultValue: string[];
    data?: {
        [key: string]: string;
    };
    items: {
        value: string;
        label: string;
    }[];
    handleSubmit: (data: FormData) => Promise<{
        error: string;
    } | {
        success: string;
    } | any | void>;
}
export declare const MultiSelectForm: <T extends string>(params: MultiSelectFormProps<T>) => import("react").JSX.Element;
export { SwitchForm };
