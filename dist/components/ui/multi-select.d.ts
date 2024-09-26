import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
declare const multiSelectVariants: (props?: ({
    variant?: "default" | "secondary" | "destructive" | "inverted" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
type ButtonElementProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type MultiProps = VariantProps<typeof multiSelectVariants>;
/**
 * Props for MultiSelect component
 */
interface MultiSelectProps extends ButtonElementProps, MultiProps {
    /**
     * An array of option objects to be displayed in the multi-select component.
     * Each option object has a label, value, and an optional icon.
     */
    options: {
        /** The text to display for the option. */
        label: string;
        /** The unique value associated with the option. */
        value: string;
        /** Optional icon component to display alongside the option. */
        icon?: React.ComponentType<{
            className?: string;
        }>;
    }[];
    /**
     * Callback function triggered when the selected values change.
     * Receives an array of the new selected values.
     */
    onValueChange: (value: string[]) => void;
    /** The default selected values when the component mounts. */
    defaultValue?: string[];
    /**
     * Placeholder text to be displayed when no values are selected.
     * Optional, defaults to "Select options".
     */
    placeholder?: string;
    /**
     * Animation duration in seconds for the visual effects (e.g., bouncing badges).
     * Optional, defaults to 0 (no animation).
     */
    animation?: number;
    /**
     * Maximum number of items to display. Extra selected items will be summarized.
     * Optional, defaults to 3.
     */
    maxCount?: number;
    /**
     * The modality of the popover. When set to true, interaction with outside elements
     * will be disabled and only popover content will be visible to screen readers.
     * Optional, defaults to false.
     */
    modalPopover?: boolean;
    /**
     * If true, renders the multi-select component as a child of another component.
     * Optional, defaults to false.
     */
    asChild?: boolean;
    /**
     * Additional class names to apply custom styles to the multi-select component.
     * Optional, can be used to add custom styles.
     */
    className?: string;
}
export declare const MultiSelect: React.ForwardRefExoticComponent<MultiSelectProps & React.RefAttributes<HTMLButtonElement>>;
export {};
