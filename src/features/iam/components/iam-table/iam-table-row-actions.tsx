import React, { useState } from 'react';
import { Row } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';
import { IamData } from '../../services/user-service';
import { EditIamProfileDetails } from 'features/profile/component/modals/edit-iam-profile-details/edit-iam-profile-details';
import { Dialog } from '../../../../components/ui/dialog';

interface DataTableRowActionsProps {
  row: Row<IamData>;
  onViewDetails: (user: IamData) => void;
  onResetPassword: (user: IamData) => void;
  onResendActivation?: (user: IamData) => void;
}

export function DataTableRowActions({
  row,
  onViewDetails,
  onResetPassword,
  onResendActivation,
}: Readonly<DataTableRowActionsProps>) {
  const user = row.original;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleItemClick = (action: (user: IamData) => void, e: React.MouseEvent) => {
    e.stopPropagation();
    action(user);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={(e) => handleItemClick(onViewDetails, e)}>
            View details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEditClick}>Edit profile</DropdownMenuItem>
          {user.active ? (
            <>
              <DropdownMenuItem onClick={(e) => handleItemClick(onResetPassword, e)}>
                Reset password
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => e.stopPropagation()}
                disabled
                className="text-error cursor-not-allowed opacity-50"
              >
                Deactivate user
              </DropdownMenuItem>
            </>
          ) : (
            onResendActivation && (
              <DropdownMenuItem onClick={(e) => handleItemClick(onResendActivation, e)}>
                Resend activation link
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        {isEditModalOpen && (
          <EditIamProfileDetails
            userInfo={{
              ...user,
              lastName: user.lastName || '',
              profileImageUrl: user.profileImageUrl || '',
            }}
            onClose={handleEditModalClose}
          />
        )}
      </Dialog>
    </>
  );
}
