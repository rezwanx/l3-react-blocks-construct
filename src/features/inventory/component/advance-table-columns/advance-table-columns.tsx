import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from 'components/blocks/data-table/data-table-column-header';
import { InventoryData } from '../../services/inventory-service';

export const createAdvanceTableColumns = (): ColumnDef<InventoryData>[] => [
  {
    id: 'itemsName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Items name" />,
    accessorFn: (row) => `${row.itemsName || ''}`.trim(),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="max-w-[300px] truncate font-medium">{row.original.itemsName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="max-w-[300px] truncate">{row.original.category}</span>
      </div>
    ),
  },
  {
    accessorKey: 'supplier',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Supplier" />,
    cell: ({ row }) => {
      return <div className="flex items-center">{row.original.supplier}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'itemLoc',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Item location" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.original.itemLoc}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Stock" />,
    cell: ({ row }) => {
      return (
        <div>
          <span>{row.original.stock}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'lastupdated',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last updated" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.original.lastupdated}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.original.price}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.original.status}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
