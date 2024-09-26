export interface MenuItem {
    icon: JSX.Element;
    label: string;
    href: string;
}
export declare function MobileNav({ items }: {
    items: MenuItem[];
}): import("react").JSX.Element;
