import { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';
import { cn } from 'lib/utils';
import { Button } from 'components/ui/button';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

const getSortIcon = <TData, TValue>(column: Column<TData, TValue>) => {
  if (column.getIsSorted() === 'desc') return <ArrowDown className="ml-2 h-4 w-4" />;
  if (column.getIsSorted() === 'asc') return <ArrowUp className="ml-2 h-4 w-4" />;
  return <ChevronsUpDown className="ml-2 h-4 w-4" />;
};

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: Readonly<DataTableColumnHeaderProps<TData, TValue>>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const handleSort = () => {
    const currentSort = column.getIsSorted();
    if (currentSort === false) {
      column.toggleSorting(false); // Set to ascending
    } else if (currentSort === 'asc') {
      column.toggleSorting(true); // Set to descending
    } else {
      column.clearSorting(); // Clear sorting
    }
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button variant="ghost" size="sm" onClick={handleSort} className="-ml-3 h-8 hover:bg-accent">
        <span>{title}</span>
        {getSortIcon(column)}
      </Button>
    </div>
  );
}
