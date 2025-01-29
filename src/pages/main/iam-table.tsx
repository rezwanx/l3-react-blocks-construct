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
import { useForgotPassword, useResendActivation } from 'features/auth/hooks/use-auth';
import { Skeleton } from 'components/ui/skeleton';
import { Card, CardContent } from 'components/ui/card';

const IamTablePage: React.FC = () => {
  const [openSheet, setOpenSheet] = React.useState(false);
  const { mutate: getUsers, status, data, error } = useGetUsersMutation();

  const [selectedUser, setSelectedUser] = React.useState<IamData | null>(null);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [isResendActivationModalOpen, setIsResendActivationModalOpen] = useState(false);
  const { mutateAsync: resetPassword } = useForgotPassword();
  const { mutateAsync: resendActivation } = useResendActivation();

  const handleConfirmResetPassword = async () => {
    if (!selectedUser) return;

    try {
      await resetPassword({ email: selectedUser.email });
      setIsResetPasswordModalOpen(false);
    } catch (error) {
      console.error('Failed to reset password:', error);
    }
  };

  const handleConfirmActivation = async () => {
    if (!selectedUser) return;

    try {
      await resendActivation({ userId: selectedUser.itemId });
      setIsResendActivationModalOpen(false);
    } catch (error) {
      console.error('Failed to reset password:', error);
    }
  };

  const handleActivationLink = (user: IamData, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedUser(user);
    setIsResendActivationModalOpen(true);
  };

  const handleResetPassword = (user: IamData, e: React.MouseEvent) => {
    e.stopPropagation();
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
      cell: ({ row }) => new Date(row.original.lastLoggedInTime).toLocaleString(),
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
              <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="text-medium-emphasis"
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetails(row.original);
                }}
              >
                View details
              </DropdownMenuItem>

              {row.original.active ? (
                <>
                  <DropdownMenuItem onClick={(e) => handleResetPassword(row.original, e)}>
                    Reset password
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-error">
                    Deactivate user
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={(e) => handleActivationLink(row.original, e)}>
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
          <Card className="w-full border-none rounded-[8px] shadow-sm">
            <CardContent>
              <div className="flex gap-8 flex-col">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton key={i} className="w-full h-12" />
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="min-w-full">
            <DataTable data={data?.data || []} columns={columns} onRowClick={handleViewDetails} />
          </div>
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
