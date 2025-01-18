import { Monitor, Smartphone, Trash } from 'lucide-react';
import { Button } from 'components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/table';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

const devicesData = [
  {
    deviceName: 'iPhone 13 Pro',
    sessions: '12 sessions',
    lastAccessed: '10/01/2025',
    icon: <Smartphone className="w-5 h-5 text-blue" />,
  },
  {
    deviceName: 'iMac19,1',
    sessions: '20 sessions',
    lastAccessed: '19/12/2024',
    icon: <Monitor className="w-5 h-5 text-blue" />,
  },
  {
    deviceName: 'Windows',
    sessions: '8 sessions',
    lastAccessed: '19/12/2024',
    icon: <Monitor className="w-5 h-5 text-blue" />,
  },
];

export const Devices = () => {
  const columns = useMemo<ColumnDef<(typeof devicesData)[0]>[]>(
    () => [
      {
        id: 'icon',
        header: () => <span>Device</span>,
        cell: ({ row }) => (
          <div className="flex items-center">
            {row.original.icon}
            <span className="ml-2">{row.original.deviceName}</span>
          </div>
        ),
      },
      {
        id: 'sessions',
        header: () => <span>Sessions</span>,
        cell: ({ row }) => <span>{row.original.sessions}</span>,
      },
      {
        id: 'lastAccessed',
        header: () => <span>Last Accessed</span>,
        cell: ({ row }) => <span>{row.original.lastAccessed}</span>,
      },
      {
        id: 'actions',
        enableHiding: false,
        header: () => <span>Actions</span>,
        cell: () => (
          <Button size="icon" variant="ghost" className="rounded-full">
            <Trash className="h-4 w-4 text-destructive" />
          </Button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: devicesData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex">
      <Card className="w-full border-none rounded-[8px] shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-high-emphasis">My Devices</CardTitle>
            <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
              <Trash className="w-3 h-3" />
              <span className="text-sm font-bold sr-only sm:not-sr-only sm:whitespace-nowrap">
                Remove all devices
              </span>
            </Button>
          </div>
          <CardDescription />
        </CardHeader>
        <CardContent>
          <Table className="text-sm">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="px-4 py-3 hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="font-bold text-medium-emphasis">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table?.getRowModel()?.rows?.length ? (
                table?.getRowModel()?.rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="cursor-pointer font-normal text-medium-emphasis"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No devices found. Please add new devices.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
