import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/table';
import { DataTablePagination } from './data-table-pagination';
import { IamTableToolbar } from 'features/Iam/components/iam-table/iam-table-toolbar';

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (data: TData) => void;
  isLoading?: boolean;
  error?: Error | null;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  isLoading = false,
  error = null,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const renderPlaceholderData = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return Array.from({ length: 1 }).map((_, index) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const placeholderRow: Record<string, any> = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      columns.forEach((column: any) => {
        if (column.accessorKey || column.id) {
          placeholderRow[column.accessorKey || column.id] = 'No user found';
        }
      });
      return placeholderRow;
    });
  };

  const tableData = error ? renderPlaceholderData() : data;

  const table = useReactTable({
    data: tableData as TData[],
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const renderSkeletonRows = () => {
    return Array.from({ length: 10 }).map((_, rowIndex) => (
      <TableRow key={`skeleton-${rowIndex}`}>
        {columns.map((_, colIndex) => (
          <TableCell key={`skeleton-cell-${rowIndex}-${colIndex}`}>
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <div className="space-y-4">
      <IamTableToolbar table={table} />
      <div className="rounded-md border bg-white">
        <div className="w-full overflow-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {isLoading
                    ? renderSkeletonRows()
                    : table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && 'selected'}
                          onClick={() => !error && onRowClick?.(row.original)}
                          className={error ? 'text-gray-500' : 'cursor-pointer hover:bg-gray-50'}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
