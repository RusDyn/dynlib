import { TableCell, TableRow } from '@/src/components/ui/table';
export function TransactionComponent(_a) {
    var item = _a.item;
    return (<TableRow>
      <TableCell className="font-medium">
        {item.createdAt.toLocaleDateString() +
            ' ' +
            item.createdAt.toLocaleTimeString()}
      </TableCell>
      <TableCell>{item.amount}</TableCell>
      <TableCell>{item.note}</TableCell>
    </TableRow>);
}
