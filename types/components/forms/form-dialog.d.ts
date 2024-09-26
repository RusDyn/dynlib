import React from 'react';
export interface FormDialogProps {
    children: React.ReactNode;
    submitButtonText: string | React.ReactNode;
    title?: string;
    description?: string;
    openButtonText?: string | React.ReactNode;
    openButtonClassName?: string | undefined;
    handleSubmit?: (data: FormData) => Promise<{
        error?: string;
        success?: string;
    }>;
    onClose?: () => void;
    open?: boolean;
}
declare function FormDialog({ children, submitButtonText, title, description, openButtonText, openButtonClassName, onClose, open: isOpen, handleSubmit }: FormDialogProps): React.JSX.Element;
export default FormDialog;
