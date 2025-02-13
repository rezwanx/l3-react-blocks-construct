import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from 'components/blocks/data-table/data-table-column-header';
import { InventoryData, InventoryStatus, statusColors } from '../../services/inventory-service';
import { Checkbox } from 'components/ui/checkbox';

export const createAdvanceTableColumns = (): ColumnDef<InventoryData>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border-medium-emphasis data-[state=checked]:border-none border-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-medium-emphasis data-[state=checked]:border-none border-2"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
      const lastUpdated = row.original.lastupdated;
      const date = lastUpdated ? new Date(lastUpdated).toLocaleString() : '-';

      return (
        <div className="flex items-center">
          <span>{date}</span>
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
        <div className="flex items-center w-[100px]">
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
