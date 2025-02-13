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
  const selectFilterColumns = new Set(['category', 'itemLoc', 'status']);

  return (
    <TableRow className="border-b">
      {table.getHeaderGroups()[0]?.headers.map((header) => {
        if (!header.column.getCanFilter()) return <TableHead key={header.id} className="p-3" />;

        return (
          <TableHead key={header.id} className="p-3">
            {selectFilterColumns.has(header.column.id) ? (
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
                value={(header.column.getFilterValue() as string) || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  header.column.setFilterValue(value || undefined);
                }}
                className="rounded-[6px] h-10"
              />
            )}
          </TableHead>
        );
      })}
    </TableRow>
  );
}
