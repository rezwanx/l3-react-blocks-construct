import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from 'components/blocks/data-table/data-table-column-header';
import { InventoryData, InventoryStatus, statusColors } from '../../services/inventory-service';

export const createAdvanceTableColumns = (): ColumnDef<InventoryData>[] => [
  {
    id: 'select',
    header: () => <span className="text-xs font-medium">Action</span>,
    meta: 'Action',
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'itemName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Item name" />,
    meta: 'Item Name',
    accessorFn: (row) => `${row.itemName || ''}`.trim(),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="w-[100px] truncate font-medium">{row.original.itemName}</span>
        </div>
      );
    },
  },
  {
    id: 'category',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    meta: 'Category',
    accessorFn: (row) => `${row.category || ''}`.trim(),
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="max-w-[300px] truncate">{row.original.category}</span>
      </div>
    ),
  },
  {
    id: 'supplier',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Supplier" />,
    meta: 'Supplier',
    accessorFn: (row) => `${row.supplier || ''}`.trim(),
    cell: ({ row }) => {
      return <div className="flex items-center">{row.original.supplier}</div>;
    },
  },
  {
    id: 'itemLoc',
    accessorFn: (row) => `${row.itemLoc || ''}`.trim(),
    header: ({ column }) => <DataTableColumnHeader column={column} title="Item location" />,
    meta: 'Item location',
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.original.itemLoc}</span>
        </div>
      );
    },
  },
  {
    id: 'stock',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Stock" />,
    meta: 'Stock',
    accessorFn: (row) => `${row.stock || ''}`.trim(),
    cell: ({ row }) => {
      return (
        <div>
          <span>{row.original.stock}</span>
        </div>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue.amount === undefined) return true;

      const stockValue = row.getValue(columnId);
      const { type, amount } = filterValue;
      const parsedStock =
        stockValue !== undefined && stockValue !== null ? Number(stockValue) : null;

      if (parsedStock === null) return false;

      if (type === 'less_than') return parsedStock < amount;
      if (type === 'more_than') return parsedStock > amount;
      if (type === 'equal_to') return parsedStock === Number(amount);
      if (type === 'no_entry') return parsedStock === 0;

      return true;
    },
  },
  {
    id: 'lastupdated',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last updated" />,
    meta: 'Last updated',
    accessorFn: (row) => `${row.lastupdated || ''}`.trim(),
    cell: ({ row }) => {
      const lastUpdated = row.original.lastupdated;
      const date = lastUpdated ? new Date(lastUpdated).toLocaleString() : '-';

      return (
        <div className="flex items-center">
          <span>{date}</span>
        </div>
      );
    },
  },
  {
    id: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
    meta: 'Price',
    accessorFn: (row) => `${row.price || ''}`.trim(),
    cell: ({ row }) => {
      return (
        <div className="flex items-center w-[100px]">
          <span>{row.original.price}</span>
        </div>
      );
    },
  },
  {
    id: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    meta: 'Status',
    accessorFn: (row) => `${row.status || ''}`.trim(),
    cell: ({ row }) => {
      const status: InventoryStatus =
        (row.original.status as InventoryStatus) || InventoryStatus.DISCONTINUED;

      return (
        <div className="flex items-center">
          <span className={`px-2 py-1 rounded-md text-${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      );
    },
  },
];
