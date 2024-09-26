import React from 'react';
interface ItemProps {
    id: string | number;
}
interface ComponentProps<T extends ItemProps> {
    item: T;
}
interface TableHeaderProps {
    child: React.ReactNode;
    className?: string;
}
interface ItemsTableProps<T extends ItemProps> {
    items: T[];
    offset: number;
    totalItems: number;
    title: string;
    description: string;
    Component: React.ComponentType<ComponentProps<T>>;
    headers: TableHeaderProps[];
    emptyMessage?: React.ReactNode;
    itemsName: string;
    children?: React.ReactNode;
    showFooter?: boolean;
    tableClassName?: string;
}
export declare function ItemsTable<T extends ItemProps>({ items, offset, totalItems, title, description, Component, headers, emptyMessage, itemsName, children, showFooter, tableClassName }: ItemsTableProps<T>): React.JSX.Element;
export {};
