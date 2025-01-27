/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from 'components/ui/sheet';
import { Button } from 'components/ui/button';
import { IamData } from '../../services/user-service';
import ConfirmationModal from 'components/blocks/confirmation-modal/confirmation-modal';

interface UserDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: IamData | null;
}

const UserDetails: React.FC<UserDetailsSheetProps> = ({ open, onOpenChange, selectedUser }) => {
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);

  const handleConfirm = () => {
    setIsResetPasswordModalOpen(false);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent>
          <div className="flex flex-col h-[calc(100vh-2rem)] justify-between">
            <div>
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
                      />
                      <span
                        className={`text-sm ${selectedUser?.active ? 'text-success' : 'text-error'}`}
                      >
                        {selectedUser?.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </SheetTitle>
                <hr />
              </SheetHeader>

              {selectedUser && (
                <div className="mt-6">
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
                </div>
              )}
            </div>

            <div className="pt-6 pb-2">
              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1" onClick={() => {}}>
                  {selectedUser?.active ? 'Reset Password' : 'Resend Activation Link'}
                </Button>

                <Button
                  variant={selectedUser?.active ? 'outline' : 'default'}
                  className={`flex-1 ${selectedUser?.active ? 'text-error hover:bg-red-50' : ''}`}
                  onClick={() => {}}
                >
                  {selectedUser?.active ? 'Deactivate User' : 'Activate User'}
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <ConfirmationModal
        open={isResetPasswordModalOpen}
        onOpenChange={setIsResetPasswordModalOpen}
        title="Reset password for this user?"
        description={`Resetting the password for ${selectedUser?.firstName} ${selectedUser?.lastName} (${selectedUser?.email}) will send a password reset email to the user. Are you sure you want to proceed?`}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default UserDetails;
