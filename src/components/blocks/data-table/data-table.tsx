/* eslint-disable @typescript-eslint/no-explicit-any */
// import * as React from 'react';
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFacetedRowModel,
//   getFacetedUniqueValues,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
//   Table as TableInstance,
// } from '@tanstack/react-table';

// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/table';
// import { DataTablePagination } from './data-table-pagination';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
// import { Skeleton } from 'components/ui/skeleton';
// import { ScrollArea, ScrollBar } from 'components/ui/scroll-area';

// export interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   onRowClick?: (data: TData) => void;
//   isLoading?: boolean;
//   error?: Error | null;
//   toolbar?: (table: TableInstance<TData>) => React.ReactNode;
//   pagination: {
//     pageIndex: number;
//     pageSize: number;
//     totalCount: number;
//   };
//   onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
//   manualPagination?: boolean;
// }

// export function DataTable<TData, TValue>({
//   columns,
//   data,
//   onRowClick,
//   isLoading = false,
//   error = null,
//   toolbar,
//   pagination,
//   onPaginationChange,
//   manualPagination = false,
// }: DataTableProps<TData, TValue>) {
//   const [rowSelection, setRowSelection] = React.useState({});
//   const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
//   const [sorting, setSorting] = React.useState<SortingState>([]);

//   const table = useReactTable({
//     data: error ? [] : data,
//     columns,
//     state: {
//       sorting,
//       columnVisibility,
//       rowSelection,
//       columnFilters,
//       pagination: {
//         pageIndex: pagination.pageIndex,
//         pageSize: pagination.pageSize,
//       },
//     },
//     manualPagination,
//     pageCount: Math.ceil(pagination.totalCount / pagination.pageSize),
//     onPaginationChange: (updater) => {
//       if (typeof updater === 'function') {
//         const newPagination = updater({
//           pageIndex: pagination.pageIndex,
//           pageSize: pagination.pageSize,
//         });
//         onPaginationChange?.(newPagination);
//       } else {
//         onPaginationChange?.(updater);
//       }
//     },
//     enableRowSelection: true,
//     onRowSelectionChange: setRowSelection,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     onColumnVisibilityChange: setColumnVisibility,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues(),
//   });

//   const renderSkeletonRows = () => {
//     return Array.from({ length: pagination.pageSize }).map((_, rowIndex) => (
//       <TableRow key={`skeleton-${rowIndex}`}>
//         {columns.map((_, colIndex) => (
//           <TableCell key={`skeleton-cell-${rowIndex}-${colIndex}`}>
//             <Skeleton className="h-4 w-3/4" />
//           </TableCell>
//         ))}
//       </TableRow>
//     ));
//   };

//   return (
//     <div className="flex flex-col gap-5">
//       {toolbar ? toolbar(table) : null}
//       <div className="flex">
//         <Card className="w-full border-none rounded-[4px] shadow-sm">
//           <CardHeader className="hidden">
//             <CardTitle />
//             <CardDescription />
//           </CardHeader>
//           <CardContent>
//             <ScrollArea className="w-full">
//               <Table>
//                 <TableHeader>
//                   {table.getHeaderGroups().map((headerGroup) => (
//                     <TableRow key={headerGroup.id} className="hover:bg-transparent">
//                       {headerGroup.headers.map((header) => (
//                         <TableHead key={header.id} colSpan={header.colSpan}>
//                           {header.isPlaceholder
//                             ? null
//                             : flexRender(header.column.columnDef.header, header.getContext())}
//                         </TableHead>
//                       ))}
//                     </TableRow>
//                   ))}
//                 </TableHeader>
//                 <TableBody>
//                   {isLoading ? (
//                     renderSkeletonRows()
//                   ) : error ? (
//                     <TableRow>
//                       <TableCell colSpan={columns.length} className="h-24 text-center text-error">
//                         Error loading data: {error.message}
//                       </TableCell>
//                     </TableRow>
//                   ) : table.getRowModel().rows.length ? (
//                     table.getRowModel().rows.map((row) => (
//                       <TableRow
//                         key={row.id}
//                         data-state={row.getIsSelected() && 'selected'}
//                         onClick={() => onRowClick?.(row.original)}
//                         className="cursor-pointer"
//                       >
//                         {row.getVisibleCells().map((cell) => (
//                           <TableCell
//                             key={cell.id}
//                             className={cell.column.id === 'actions' ? 'flex justify-end' : ''}
//                           >
//                             {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={columns.length} className="h-24 text-center">
//                         No results found.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//               <ScrollBar orientation="horizontal" />
//             </ScrollArea>
//           </CardContent>
//         </Card>
//       </div>
//       <DataTablePagination table={table} onPaginationChange={onPaginationChange} />
//     </div>
//   );
// }

import * as React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
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
  Table as TableInstance,
  Header,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/table';
import { DataTablePagination } from './data-table-pagination';
import { Card, CardContent } from 'components/ui/card';
import { Skeleton } from 'components/ui/skeleton';
import { ScrollArea, ScrollBar } from 'components/ui/scroll-area';
import { useIsMobile } from 'hooks/use-mobile';

export interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  onRowClick?: (data: TData) => void;
  isLoading?: boolean;
  error?: Error | null;
  toolbar?: (table: TableInstance<TData>) => React.ReactNode;
  pagination: {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
  };
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
  manualPagination?: boolean;
  expandedContent?: (data: TData) => React.ReactNode;
  mobileColumns?: string[];
  expandable?: boolean;
}

const getHeaderContent = <TData,>(
  col: ColumnDef<TData, any>,
  cell: any,
  table: TableInstance<TData>
): React.ReactNode => {
  if (typeof col.header === 'string') {
    return col.header;
  }

  if (typeof col.header === 'function') {
    return col.header({
      column: cell.column,
      header: cell.column.columnDef.header as Header<TData, any>,
      table,
    });
  }

  return col.id || '';
};

export function DataTable<TData>({
  columns,
  data,
  onRowClick,
  isLoading = false,
  error = null,
  toolbar,
  pagination,
  onPaginationChange,
  manualPagination = false,
  expandedContent,
  mobileColumns = [],
  expandable = true,
}: DataTableProps<TData>) {
  const isMobile = useIsMobile();
  const [expandedRows, setExpandedRows] = React.useState(new Set<string>());
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Filter columns for mobile view based on mobileColumns prop
  const visibleColumns = React.useMemo(() => {
    if (!isMobile || !expandable) return columns;

    return columns.filter((col) => {
      const columnId = (col.id || '').toString();
      return mobileColumns.includes(columnId) || columnId === 'actions';
    });
  }, [columns, isMobile, mobileColumns, expandable]);

  const table = useReactTable({
    data: error ? [] : data,
    columns: visibleColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
    },
    manualPagination,
    pageCount: Math.ceil(pagination.totalCount / pagination.pageSize),
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newPagination = updater({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
        });
        onPaginationChange?.(newPagination);
      } else {
        onPaginationChange?.(updater);
      }
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

  const toggleRow = (rowId: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(rowId)) {
        next.delete(rowId);
      } else {
        next.add(rowId);
      }
      return next;
    });
  };

  const renderExpandedContent = (rowData: TData) => {
    if (expandedContent) {
      return expandedContent(rowData);
    }

    const expandedColumns = columns.filter((col) => {
      const columnId = (col.id || '').toString();
      return !mobileColumns.includes(columnId) && columnId !== 'actions' && columnId !== 'expand';
    });

    const dummyRow =
      table.getRowModel().rows.find((row) => row.original === rowData) ||
      table.getPrePaginationRowModel().rows.find((row) => row.original === rowData);

    if (!dummyRow) return null;

    return (
      <div className="p-4 bg-gray-50 space-y-4">
        {expandedColumns.map((col) => {
          const columnId = (col.id || '').toString();
          const cell = dummyRow.getAllCells().find((cell) => cell.column.id === columnId);

          if (!cell) return null;

          return (
            <div key={columnId} className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-500">
                {getHeaderContent(col, cell, table)}
              </span>
              <span className="text-sm">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      {toolbar ? toolbar(table) : null}
      <div className="flex">
        <Card className="w-full border-none rounded-lg shadow-sm">
          <CardContent>
            <ScrollArea className="w-full">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="hover:bg-transparent">
                      {isMobile && expandable && <TableHead className="w-8" />}
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
                  {isLoading ? (
                    Array.from({ length: pagination.pageSize }).map((_, idx) => (
                      <TableRow key={`skeleton-${idx}`}>
                        {isMobile && expandable && <TableCell className="w-8" />}
                        {visibleColumns.map((_, colIdx) => (
                          <TableCell key={`skeleton-cell-${idx}-${colIdx}`}>
                            <Skeleton className="h-4 w-3/4" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : error ? (
                    <TableRow>
                      <TableCell
                        colSpan={visibleColumns.length + (isMobile && expandable ? 1 : 0)}
                        className="h-24 text-center text-error"
                      >
                        Error loading data: {error.message}
                      </TableCell>
                    </TableRow>
                  ) : table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <React.Fragment key={row.id}>
                        <TableRow
                          data-state={row.getIsSelected() && 'selected'}
                          className="cursor-pointer"
                        >
                          {isMobile && expandable && (
                            <TableCell
                              className="w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleRow(row.id);
                              }}
                            >
                              {expandedRows.has(row.id) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </TableCell>
                          )}
                          {row.getVisibleCells().map((cell) => (
                            <TableCell
                              key={cell.id}
                              onClick={() => {
                                if (isMobile && expandable) {
                                  toggleRow(row.id);
                                } else if (onRowClick) {
                                  onRowClick(row.original);
                                }
                              }}
                              className={cell.column.id === 'actions' ? 'text-right' : ''}
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                        {isMobile && expandable && expandedRows.has(row.id) && (
                          <TableRow>
                            <TableCell colSpan={visibleColumns.length + 1} className="p-0">
                              {renderExpandedContent(row.original)}
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={visibleColumns.length + (isMobile && expandable ? 1 : 0)}
                        className="h-24 text-center"
                      >
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <DataTablePagination table={table} onPaginationChange={onPaginationChange} />
    </div>
  );
}

export default DataTable;
