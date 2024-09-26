interface SwitchFormProps<T> {
    title: string;
    description: string | JSX.Element;
    name: T;
    defaultValue: boolean;
    data?: {
        [key: string]: string;
    };
    handleSubmit: (data: FormData) => Promise<{
        error: string;
    } | {
        success: string;
    } | any | void>;
}
declare const SwitchForm: <T extends string>(params: SwitchFormProps<T>) => import("react").JSX.Element;
export { SwitchForm };
