import { Table } from '@tanstack/react-table';
import { AdvanceTableViewOptions } from '../advance-table-view-options/advance-table-view-options';

interface AdvancedTableColumnsToolbarProps<TData> {
  table: Table<TData>;
}

export function AdvancedTableColumnsToolbar<TData>({
  table,
}: AdvancedTableColumnsToolbarProps<TData>) {
  const selectedLength = table.getSelectedRowModel().rows.length;

  return (
    <div className="flex w-full items-center justify-between">
      <p className="text-medium-emphasis text-sm font-normal">
        {selectedLength} item{selectedLength <= 1 ? null : '(s)'} selected
      </p>
      <AdvanceTableViewOptions table={table} />
    </div>
  );
}
