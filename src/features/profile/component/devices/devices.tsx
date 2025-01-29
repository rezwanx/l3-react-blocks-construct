// import { Monitor, Smartphone, Trash } from 'lucide-react';
// import { Button } from 'components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/table';
// import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
// import { useMemo } from 'react';

// const devicesData = [
//   {
//     deviceName: 'iPhone 13 Pro',
//     sessions: '12 sessions',
//     lastAccessed: '10/01/2025',
//     icon: <Smartphone className="w-5 h-5 text-blue" />,
//   },
//   {
//     deviceName: 'iMac19,1',
//     sessions: '20 sessions',
//     lastAccessed: '19/12/2024',
//     icon: <Monitor className="w-5 h-5 text-blue" />,
//   },
//   {
//     deviceName: 'Windows',
//     sessions: '8 sessions',
//     lastAccessed: '19/12/2024',
//     icon: <Monitor className="w-5 h-5 text-blue" />,
//   },
// ];

// export const Devices = () => {
//   const columns = useMemo<ColumnDef<(typeof devicesData)[0]>[]>(
//     () => [
//       {
//         id: 'icon',
//         header: () => <span>Device</span>,
//         cell: ({ row }) => (
//           <div className="flex items-center">
//             {row.original.icon}
//             <span className="ml-2">{row.original.deviceName}</span>
//           </div>
//         ),
//       },
//       {
//         id: 'sessions',
//         header: () => <span>Sessions</span>,
//         cell: ({ row }) => <span>{row.original.sessions}</span>,
//       },
//       {
//         id: 'lastAccessed',
//         header: () => <span>Last Accessed</span>,
//         cell: ({ row }) => <span>{row.original.lastAccessed}</span>,
//       },
//       {
//         id: 'actions',
//         enableHiding: false,
//         cell: () => (
//           <Button size="icon" variant="ghost" className="rounded-full">
//             <Trash className="h-4 w-4 text-destructive" />
//           </Button>
//         ),
//       },
//     ],
//     []
//   );

//   const table = useReactTable({
//     data: devicesData,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <div className="flex">
//       <Card className="w-full border-none rounded-[8px] shadow-sm">
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <CardTitle className="text-xl text-high-emphasis">My Devices</CardTitle>
//             <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
//               <Trash className="w-3 h-3" />
//               <span className="text-sm font-bold sr-only sm:not-sr-only sm:whitespace-nowrap">
//                 Remove all devices
//               </span>
//             </Button>
//           </div>
//           <CardDescription />
//         </CardHeader>
//         <CardContent>
//           <Table className="text-sm">
//             <TableHeader>
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <TableRow key={headerGroup.id} className="px-4 py-3 hover:bg-transparent">
//                   {headerGroup.headers.map((header) => (
//                     <TableHead key={header.id} className="font-bold text-medium-emphasis">
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(header.column.columnDef.header, header.getContext())}
//                     </TableHead>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableHeader>
//             <TableBody>
//               {table?.getRowModel()?.rows?.length ? (
//                 table?.getRowModel()?.rows.map((row) => (
//                   <TableRow
//                     key={row.id}
//                     className="cursor-pointer font-normal text-medium-emphasis"
//                   >
//                     {row.getVisibleCells().map((cell) => (
//                       <TableCell key={cell.id}>
//                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={columns.length} className="h-24 text-center">
//                     No devices found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

import { Monitor, Smartphone, Trash } from 'lucide-react';
import { Button } from 'components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/table';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState, useEffect, useMemo } from 'react';
import SessionsService, { IDeviceSession } from '../../services/device.service';

export const Devices = () => {
  const [deviceSessions, setDeviceSessions] = useState<IDeviceSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const parseMongoDBString = (mongoString: string): IDeviceSession | null => {
    try {
      const cleanedJson = mongoString
        .replace(/ObjectId\(["']([^"']+)["']\)/g, '"$1"')
        .replace(/ISODate\(["']([^"']+)["']\)/g, '"$1"')
        .replace(/([{,])\s*(\w+):/g, '$1 "$2":')
        .replace(/null/g, 'null')
        .replace(/,\s*}/g, '}')
        .replace(/,\s*]/g, ']');

      const parsedLog = JSON.parse(cleanedJson);

      return {
        ...parsedLog,
        IssuedUtc: new Date(parsedLog.IssuedUtc),
        ExpiresUtc: new Date(parsedLog.ExpiresUtc),
        CreateDate: new Date(parsedLog.CreateDate),
        UpdateDate: new Date(parsedLog.UpdateDate),
      };
    } catch (error) {
      console.error('Error parsing MongoDB JSON string:', error, mongoString);
      return null;
    }
  };

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await SessionsService.getActiveDeviceSessions();

        if (response?.data) {
          // Handle the case where data is an array of strings that need parsing
          const parsedSessions = response.data
            .map((session) => (typeof session === 'string' ? parseMongoDBString(session) : session))
            .filter((session): session is IDeviceSession => session !== null);

          setDeviceSessions(parsedSessions);
        } else {
          setDeviceSessions([]);
        }
      } catch (error) {
        console.error('Failed to fetch device sessions:', error);
        setDeviceSessions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const getDeviceIcon = (deviceInfo: IDeviceSession['DeviceInformation']) => {
    if (!deviceInfo?.Device) return <Monitor className="w-5 h-5 text-blue" />;

    const deviceType = deviceInfo.Device.toLowerCase();
    if (
      deviceType.includes('mobile') ||
      deviceType.includes('iphone') ||
      deviceType.includes('android') ||
      deviceType.includes('smartphone')
    ) {
      return <Smartphone className="w-5 h-5 text-blue" />;
    }
    return <Monitor className="w-5 h-5 text-blue" />;
  };

  const formatDate = (date: Date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  const columns = useMemo<ColumnDef<IDeviceSession>[]>(
    () => [
      {
        id: 'device',
        header: () => <span>Device</span>,
        cell: ({ row }) => (
          <div className="flex items-center">
            {getDeviceIcon(row.original.DeviceInformation)}
            <span className="ml-2">
              {(row.original.DeviceInformation?.Brand || row.original.DeviceInformation?.Device) ??
                'Unknown Device'}
            </span>
          </div>
        ),
      },
      {
        id: 'browser',
        header: () => <span>Browser</span>,
        cell: ({ row }) => (
          <span>{row.original.DeviceInformation?.Browser ?? 'Unknown Browser'}</span>
        ),
      },
      {
        id: 'lastAccessed',
        header: () => <span>Last Accessed</span>,
        cell: ({ row }) => <span>{formatDate(row.original.UpdateDate)}</span>,
      },
      {
        id: 'actions',
        enableHiding: false,
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
    data: deviceSessions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex">
        <Card className="w-full border-none rounded-[8px] shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-high-emphasis">My Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center h-24">Loading...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              {deviceSessions.length > 0 ? (
                table.getRowModel().rows.map((row) => (
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
                    No devices found.
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

export default Devices;
