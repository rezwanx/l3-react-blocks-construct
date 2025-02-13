import { Table } from '@tanstack/react-table';
import { TableRow, TableHead } from 'components/ui/table';
import { Input } from 'components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';

interface AdvanceTableFilterToolbarProps<TData> {
  table: Table<TData>;
}

export function AdvanceTableFilterToolbar<TData>({ table }: AdvanceTableFilterToolbarProps<TData>) {
  const selectColumns = new Set(['category', 'itemLoc', 'status']);

  return (
    <TableRow className="border-b">
      {table.getHeaderGroups()[0]?.headers.map((header) => (
        <TableHead key={header.id} className="p-3">
          {header.column.getCanFilter() ? (
            selectColumns.has(header.column.id) ? (
              <Select onValueChange={(value) => header.column.setFilterValue(value)}>
                <SelectTrigger className="rounded-[6px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(header.column.getFacetedUniqueValues().keys()).map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                placeholder="Search"
                value={(header.column.getFilterValue() as string) ?? ''}
                onChange={(e) => header.column.setFilterValue(e.target.value)}
                className="rounded-[6px] h-10"
              />
            )
          ) : null}
        </TableHead>
      ))}
    </TableRow>
  );
}
