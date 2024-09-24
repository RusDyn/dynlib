import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/src/components/ui/table';
import { ItemsTableFooter } from './items-table-footer';
import { NoItemComponent } from './no-item';
export function ItemsTable(_a) {
    var items = _a.items, offset = _a.offset, totalItems = _a.totalItems, title = _a.title, description = _a.description, Component = _a.Component, headers = _a.headers, emptyMessage = _a.emptyMessage, itemsName = _a.itemsName, children = _a.children, _b = _a.showFooter, showFooter = _b === void 0 ? true : _b, tableClassName = _a.tableClassName;
    if (items.length === 0) {
        return <NoItemComponent>{emptyMessage}</NoItemComponent>;
    }
    return (<Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:p-1 md:p-2 lg:p-6">
        {children}
        <Table className={tableClassName}>
          <TableHeader>
            <TableRow>
              {headers.map(function (header, index) { return (<TableHead key={'header-' + index} className={header.className}>
                  {header.child}
                </TableHead>); })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(function (item) { return (<Component key={item.id} item={item}/>); })}
          </TableBody>
        </Table>
      </CardContent>
      {showFooter && (<CardFooter>
          <ItemsTableFooter offset={offset} count={items.length} totalItems={totalItems} name={itemsName}/>
        </CardFooter>)}
    </Card>);
}
