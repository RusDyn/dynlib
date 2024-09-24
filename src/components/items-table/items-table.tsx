import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/src/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/src/components/ui/table';

import { ItemsTableFooter } from './items-table-footer';
import { NoItemComponent } from './no-item';

interface ItemProps {
  id: string | number;
}
interface ComponentProps<T extends ItemProps> {
  item: T;
}

// Interface for the table headers
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

export function ItemsTable<T extends ItemProps>({
  items,
  offset,
  totalItems,
  title,
  description,
  Component,
  headers,
  emptyMessage,
  itemsName,
  children,
  showFooter = true,
  tableClassName
}: ItemsTableProps<T>) {
  if (items.length === 0) {
    return <NoItemComponent>{emptyMessage}</NoItemComponent>;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:p-1 md:p-2 lg:p-6">
        {children}
        <Table className={tableClassName}>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={'header-' + index} className={header.className}>
                  {header.child}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <Component key={item.id} item={item} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {showFooter && (
        <CardFooter>
          <ItemsTableFooter
            offset={offset}
            count={items.length}
            totalItems={totalItems}
            name={itemsName}
          />
        </CardFooter>
      )}
    </Card>
  );
}
