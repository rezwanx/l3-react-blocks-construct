import React, { useEffect } from 'react';
import { DataTable } from 'components/blocks/data-table/data-table';
import { useGetUsersMutation } from 'features/Iam/hooks/use-iam';
import { ColumnDef } from '@tanstack/react-table';
import { IamData } from 'features/Iam/services/user-service';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import { Button } from 'components/ui/button';
import { MoreVertical } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from 'components/ui/sheet';

const TaskPage: React.FC = () => {
  const [openSheet, setOpenSheet] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<IamData | null>(null);
  const { mutate: getUsers, status, data, error } = useGetUsersMutation();

  const handleViewDetails = (user: IamData) => {
    setSelectedUser(user);
    setOpenSheet(true);
  };

  const columns: ColumnDef<IamData>[] = [
    {
      id: 'fullName',
      header: 'Name',
      cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    // {
    //   accessorKey: 'phoneNumber',
    //   header: 'Phone Number',
    // },

    {
      accessorKey: 'mfaEnabled',
      header: 'MFA',
      cell: ({ row }) => <span>{row.original.mfaEnabled ? 'Enabled' : 'Disabled'}</span>,
    },
    {
      accessorKey: 'createdDate',
      header: 'Joined On',
      cell: ({ row }) => new Date(row.original.createdDate).toLocaleDateString(),
    },
    {
      accessorKey: 'lastUpdatedDate',
      header: 'Last log in',
      cell: ({ row }) => new Date(row.original.createdDate).toLocaleDateString(),
    },
    {
      accessorKey: 'active',
      header: 'Status',
      cell: ({ row }) => (
        <span className={row.original.active ? 'text-success' : 'text-error'}>
          {row.original.active ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-medium-emphasis">
              <DropdownMenuItem onClick={() => handleViewDetails(row.original)}>
                View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('Delete:', row.original.itemId)}>
                {' '}
                Resend activation link
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  useEffect(() => {
    handleFetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchUsers = () => {
    getUsers({
      page: 0,
      pageSize: 10,
    });
  };

  if (error) {
    return <div className="p-4 text-error">Error loading users: {error.message}</div>;
  }

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Identity Access Management</h2>
          </div>
        </div>

        {status === 'pending' ? (
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-12 w-full space-y-1">
                  <div className="h-12 animate-pulse rounded bg-muted"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <DataTable data={data?.data || []} columns={columns} />
        )}
      </div>
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-gray-200" />
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedUser?.firstName} {selectedUser?.lastName}
                </h2>
                <div className="flex items-center space-x-2 mt-1">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${selectedUser?.active ? 'bg-success' : 'bg-error'}`}
                  ></span>
                  <span
                    className={`text-sm ${selectedUser?.active ? 'text-success' : 'text-error'}`}
                  >
                    {selectedUser?.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </SheetTitle>
            <div>
              <hr />
            </div>
          </SheetHeader>

          {selectedUser && (
            <div className="mt-6">
              <div className="flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase">JOINED ON</div>
                    <div className="text-sm text-high-emphasis font-normal">
                      {new Date(selectedUser.createdDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase">LAST LOG IN</div>
                    <div className="text-sm text-high-emphasis font-normal">
                      {new Date(selectedUser.lastUpdatedDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase">MOBILE NO.</div>
                    <div className="text-sm text-high-emphasis font-normal">
                      {selectedUser.phoneNumber || 'Not provided'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase">EMAIL</div>
                    <div className="text-sm text-high-emphasis font-normal break-all">
                      {selectedUser.email}
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex space-x-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => console.log('Reset password')}
                  >
                    Reset Password
                  </Button>
                  <Button
                    variant={selectedUser?.active ? 'outline' : 'default'}
                    className={`flex-1 ${
                      selectedUser?.active ? 'text-error hover:bg-red-50' : 'null'
                    }`}
                    onClick={() => console.log(selectedUser?.active ? 'Deactivate' : 'Activate')}
                  >
                    {selectedUser?.active ? 'Deactivate User' : 'Activate User'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default TaskPage;
