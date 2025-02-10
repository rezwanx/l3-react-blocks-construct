import React, { useState, useEffect } from 'react';
import { DataTable } from 'components/blocks/data-table/data-table';
import { useGetUsersQuery } from 'features/Iam/hooks/use-iam';
import { ColumnDef } from '@tanstack/react-table';
import { IamData } from 'features/Iam/services/user-service';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import { Button } from 'components/ui/button';
import { ArrowUpDown, MoreVertical } from 'lucide-react';
import UserDetails from 'features/Iam/components/user-details/user-details';
import ConfirmationModal from 'components/blocks/confirmation-modal/confirmation-modal';
import { useForgotPassword, useResendActivation } from 'features/auth/hooks/use-auth';
import { IamTableToolbar } from 'features/Iam/components/iam-table/iam-table-toolbar';

interface PaginationState {
  pageIndex: number;
  pageSize: number;
  totalCount?: number;
}

const IamTablePage: React.FC = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IamData | null>(null);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [isResendActivationModalOpen, setIsResendActivationModalOpen] = useState(false);
  const { mutateAsync: resetPassword } = useForgotPassword();
  const { mutateAsync: resendActivation } = useResendActivation();

  const [filters, setFilters] = useState({
    email: '',
    name: '',
  });

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
    totalCount: undefined,
  });

  const { data, isLoading, error } = useGetUsersQuery({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    filter: {
      email: filters.email,
      name: filters.name,
    },
  });

  useEffect(() => {
    if (data?.totalCount) {
      setPagination((prev) => ({
        ...prev,
        totalCount: data.totalCount,
      }));
    }
  }, [data?.totalCount]);

  const handleSearch = (newFilters: { email: string; name: string }) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

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
      console.error('Failed to resend activation:', error);
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

  useEffect(() => {
    document.body.style.overflow = openSheet ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [openSheet]);

  const columns: ColumnDef<IamData>[] = [
    {
      id: 'fullName',
      accessorFn: (row) => `${row.firstName || ''} ${row.lastName || ''}`.trim(),
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="p-0 hover:bg-transparent"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
      enableSorting: true,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="p-0 hover:bg-transparent"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'mfaEnabled',
      header: 'MFA',
      cell: ({ row }) => <span>{row.original.mfaEnabled ? 'Enabled' : 'Disabled'}</span>,
    },
    {
      accessorKey: 'createdDate',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="p-0 hover:bg-transparent"
        >
          Joined On
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => new Date(row.original.createdDate).toLocaleDateString(),
      sortingFn: (rowA, rowB) => {
        const a = new Date(rowA.original.createdDate).getTime();
        const b = new Date(rowB.original.createdDate).getTime();
        return a < b ? -1 : a > b ? 1 : 0;
      },
    },
    {
      accessorKey: 'lastLoggedInTime',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="p-0 hover:bg-transparent"
        >
          Last log in
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.lastLoggedInTime);
        if (date.getFullYear() === 1) {
          return <div className="flex justify-center items-center h-full">-</div>;
        } else {
          const formattedDate = date.toLocaleString();
          return <div className="">{formattedDate}</div>;
        }
      },
      sortingFn: (rowA, rowB) => {
        const a = new Date(rowA.original.lastLoggedInTime).getTime();
        const b = new Date(rowB.original.lastLoggedInTime).getTime();
        return a < b ? -1 : a > b ? 1 : 0;
      },
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
      cell: ({ row }) => (
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
            <DropdownMenuItem onClick={() => handleViewDetails(row.original)}>
              View details
            </DropdownMenuItem>
            {row.original.active ? (
              <>
                <DropdownMenuItem onClick={(e) => handleResetPassword(row.original, e)}>
                  Reset password
                </DropdownMenuItem>
                <DropdownMenuItem disabled className="text-error cursor-not-allowed opacity-50">
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
      ),
    },
  ];

  if (error) {
    return <div className="p-4 text-error">Error loading users: {error.error?.message}</div>;
  }

  const handlePaginationChange = (newPagination: { pageIndex: number; pageSize: number }) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: newPagination.pageIndex,
      pageSize: newPagination.pageSize,
    }));
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-full flex-col space-y-8 flex w-full">
        <div className="flex w-full items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Identity Access Management</h2>
          </div>
        </div>

        <DataTable
          data={data?.data || []}
          columns={columns}
          onRowClick={handleViewDetails}
          isLoading={isLoading}
          error={error}
          toolbar={(table) => <IamTableToolbar table={table} onSearch={handleSearch} />}
          // pagination={pagination}
          pagination={{
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize,
            totalCount: pagination.totalCount,
          }}
          onPaginationChange={handlePaginationChange}
        />
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
    </div>
  );
};

export default IamTablePage;
