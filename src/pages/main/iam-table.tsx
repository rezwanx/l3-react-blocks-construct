/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
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
import UserDetails from 'features/Iam/components/user-details/user-details';
import ConfirmationModal from 'components/blocks/confirmation-modal/confirmation-modal';

const IamTablePage: React.FC = () => {
  const [openSheet, setOpenSheet] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<IamData | null>(null);
  const { mutate: getUsers, status, data, error } = useGetUsersMutation();
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [isResendActivationModalOpen, setIsResendActivationModalOpen] = useState(false);

  const handleConfirmResetPassword = () => {
    setIsResetPasswordModalOpen(false);
  };

  const handleConfirmActivation = () => {
    setIsResendActivationModalOpen(false);
  };

  const handleActivationLink = (user: IamData) => {
    setSelectedUser(user);
    setIsResetPasswordModalOpen(true);
  };

  const handleResetPassword = (user: IamData) => {
    setSelectedUser(user);
    setIsResetPasswordModalOpen(true);
  };

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
      accessorKey: 'lastLoggedInTime',
      header: 'Last log in',
      cell: ({ row }) => new Date(row.original.lastLoggedInTime).toLocaleDateString(),
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

              {row.original.active ? (
                <>
                  <DropdownMenuItem onClick={() => handleResetPassword(row.original)}>
                    Reset password
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onClick={() => {}}
                    className="text-error"
                  >
                    Deactivate user
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={() => handleActivationLink(row.original)}>
                  Resend activation link
                </DropdownMenuItem>
              )}
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
      <div className="h-full flex-1 flex-col space-y-8 md:flex">
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
                  <div className="h-12 animate-pulse rounded bg-[#E5E7EB]"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <DataTable data={data?.data || []} columns={columns} />
        )}
      </div>
      <UserDetails open={openSheet} onOpenChange={setOpenSheet} selectedUser={selectedUser} />
      <ConfirmationModal
        open={isResetPasswordModalOpen}
        onOpenChange={setIsResetPasswordModalOpen}
        title="Reset password for this user?"
        description={`Resetting the password for ${selectedUser?.firstName} ${selectedUser?.lastName} (${selectedUser?.email}) will send a password reset email to the user. Are you sure you want to proceed?`}
        onConfirm={handleConfirmResetPassword}
      />
      <ConfirmationModal
        open={isResendActivationModalOpen}
        onOpenChange={setIsResendActivationModalOpen}
        title="Activate this user?"
        description={`Activating the user ${selectedUser?.firstName} ${selectedUser?.lastName} (${selectedUser?.email}) will restore their access. Are you sure you want to proceed?`}
        onConfirm={handleConfirmActivation}
      />
    </>
  );
};

export default IamTablePage;
