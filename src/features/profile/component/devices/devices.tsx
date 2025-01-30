import { Loader2, Monitor, Smartphone, Trash } from 'lucide-react';
import { Button } from 'components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/table';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import SessionsService, { IDeviceSession } from '../../services/device.service';
import { getAccount } from '../../services/accounts.service';

export const Devices = () => {
  const [deviceSessions, setDeviceSessions] = useState<IDeviceSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(0);
  const loadingRef = useRef<HTMLDivElement>(null);
  const PAGE_SIZE = 10;

  const parseMongoDBString = (mongoString: string | IDeviceSession): IDeviceSession | null => {
    try {
      if (typeof mongoString === 'object' && mongoString !== null) {
        const typedSession = mongoString as IDeviceSession;
        return {
          ...typedSession,
          IssuedUtc: new Date(typedSession.IssuedUtc),
          ExpiresUtc: new Date(typedSession.ExpiresUtc),
          CreateDate: new Date(typedSession.CreateDate),
          UpdateDate: new Date(typedSession.UpdateDate),
        };
      }

      const cleanedJson = mongoString
        .replace(/ObjectId\("([^"]*)"\)/g, '"$1"')
        .replace(/ISODate\("([^"]*)"\)/g, '"$1"')
        .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');

      const parsedData = JSON.parse(cleanedJson);

      const dateFields = ['IssuedUtc', 'ExpiresUtc', 'CreateDate', 'UpdateDate'];
      dateFields.forEach((field) => {
        if (parsedData[field]) {
          parsedData[field] = new Date(parsedData[field]);
        }
      });

      return parsedData as IDeviceSession;
    } catch (error) {
      console.error('Error parsing MongoDB JSON string:', error);
      return null;
    }
  };

  const fetchSessions = useCallback(async (pageNumber: number) => {
    try {
      setIsLoading(true);
      const response = await SessionsService.getSessions({
        page: pageNumber,
        pageSize: PAGE_SIZE,
        projectkey: 'ef5d4fd7b2fa4c59b6a3df7b17c8c41e',
        filter: {
          userId: await (await getAccount()).itemId,
        },
      });

      const dataToProcess = Array.isArray(response) ? response : response?.data;

      if (dataToProcess && Array.isArray(dataToProcess)) {
        const parsedSessions = dataToProcess
          .map((session) => {
            const parsed = parseMongoDBString(session);
            return parsed;
          })
          .filter((session): session is IDeviceSession => {
            const isValid = session !== null && session.DeviceInformation !== undefined;
            return isValid;
          });

        setDeviceSessions((prev) =>
          pageNumber === 0 ? parsedSessions : [...prev, ...parsedSessions]
        );
        setHasMore(parsedSessions.length === PAGE_SIZE);
      } else {
        console.warn('No valid data array found in response:', response);
        if (pageNumber === 0) {
          setDeviceSessions([]);
        }
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch device sessions:', error);
      if (pageNumber === 0) {
        setDeviceSessions([]);
      }
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions(0);
  }, [fetchSessions]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !isLoading) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            fetchSessions(nextPage);
            return nextPage;
          });
        }
      },
      { threshold: 1.0 }
    );

    const currentLoadingRef = loadingRef.current;
    if (currentLoadingRef) {
      observer.observe(currentLoadingRef);
    }

    return () => {
      if (currentLoadingRef) {
        observer.unobserve(currentLoadingRef);
      }
    };
  }, [hasMore, isLoading, fetchSessions]);

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
    return new Date(date).toLocaleString();
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
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full opacity-50 cursor-not-allowed"
          >
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

  return (
    <div className="flex">
      <Card className="w-full border-none rounded-[8px] shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-high-emphasis">My Devices</CardTitle>
            <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
              <Trash className="w-3 h-3 opacity-50 cursor-not-allowed" />
              <span className="text-sm font-bold sr-only sm:not-sr-only sm:whitespace-nowrap opacity-50 cursor-not-allowed">
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
                <>
                  {table.getRowModel().rows.map((row) => (
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
                  ))}
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      <div ref={loadingRef} className="h-8 flex items-center justify-center">
                        {isLoading && <Loader2 className="h-6 w-6 animate-spin text-primary" />}
                        {!hasMore && <span className="text-gray-500">No more devices</span>}
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    {isLoading ? 'Loading...' : 'No devices found.'}
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
