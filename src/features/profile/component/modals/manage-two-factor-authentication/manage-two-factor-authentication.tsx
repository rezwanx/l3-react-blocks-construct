import { Download, Mail, RefreshCw, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import { useAuthStore } from 'state/store/auth';
import { useSignoutMutation } from 'features/auth/hooks/use-auth';
import { useToast } from 'hooks/use-toast';
import { MfaDialogState } from 'features/profile/enums/mfa-dialog-state.enum';
import { User } from '/types/user.type';
import { UserMfaType } from '../../../enums/user-mfa-type-enum';
import { useManageUserMFA } from '../../../hooks/use-mfa';
// import { useState } from 'react';

type ManageTwoFactorAuthenticationProps = {
  userInfo?: User;
  onClose: () => void;
  dialogState: MfaDialogState;
};

export const ManageTwoFactorAuthentication: React.FC<
  Readonly<ManageTwoFactorAuthenticationProps>
> = ({ userInfo, onClose, dialogState }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useAuthStore();
  const { mutateAsync, isPending } = useSignoutMutation();
  const { mutate: manageUserMFA } = useManageUserMFA();
  // const [disableMfa, setDisableMfa] = useState(userInfo?.mfaEnabled)

  const logoutHandler = async () => {
    try {
      const res = await mutateAsync();
      if (res.isSuccess) {
        logout();
        navigate('/login');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Logout Error!',
        description: 'Something went wrong while logging out.',
      });
    }
  };

  const handleDisable = () => {
    if (!userInfo) return;

    const userMfaType =
      dialogState === MfaDialogState.AUTHENTICATOR_APP_SETUP
        ? UserMfaType.AUTHENTICATOR_APP
        : UserMfaType.EMAIL_VERIFICATION;

    manageUserMFA({
      userId: userInfo.itemId,
      mfaEnabled: false,
      userMfaType,
    });
  };

  const getSuccessMessage = () => {
    if (dialogState === MfaDialogState.AUTHENTICATOR_APP_SETUP) {
      return 'Authentication app linked successfully! For your security, we will sign you out of all your sessions. Please log in again to continue.';
    } else if (dialogState === MfaDialogState.EMAIL_VERIFICATION) {
      return 'Email verification enabled successfully! For your security, we will sign you out of all your sessions. Please log in again to continue.';
    }
    return '';
  };

  const getMethodName = () => {
    if (dialogState === MfaDialogState.AUTHENTICATOR_APP_SETUP) {
      return 'Authenticator App';
    } else if (dialogState === MfaDialogState.EMAIL_VERIFICATION) {
      return 'Email Verification';
    }
    return '';
  };

  const initialMfaEnable = !userInfo?.mfaEnabled && userInfo?.userMfaType === UserMfaType.NONE;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent hideClose className="rounded-md sm:max-w-[432px] overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>Manage 2-factor authentication</DialogTitle>
          <DialogDescription>
            Add an extra layer of security by choosing how you`d like to receive verification codes.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col w-full">
          {initialMfaEnable && (
            <div className="rounded-lg bg-success-background border border-success p-4 my-6">
              <p className="text-xs font-normal text-success-high-emphasis">
                {getSuccessMessage()}
              </p>
            </div>
          )}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-surface rounded-md">
                {dialogState === MfaDialogState.AUTHENTICATOR_APP_SETUP && (
                  <Smartphone className="text-secondary" size={24} />
                )}
                {dialogState === MfaDialogState.EMAIL_VERIFICATION && (
                  <Mail className="text-secondary" size={24} />
                )}
              </div>
              <h3 className="text-sm font-semibold text-high-emphasis">{getMethodName()}</h3>
            </div>
            <div className="py-[6px] px-3 cursor-pointer">
              <Button
                variant="ghost"
                size="sm"
                disabled={initialMfaEnable}
                onClick={handleDisable}
                className={`font-bold text-sm ${initialMfaEnable ? 'text-neutral-400' : 'text-destructive hover:text-destructive'}`}
              >
                Disable
              </Button>
            </div>
          </div>
          {dialogState === MfaDialogState.AUTHENTICATOR_APP_SETUP && (
            <div className="flex items-center gap-2 cursor-pointer py-[6px] px-4 text-primary hover:text-primary-700">
              <Download className="w-4 h-4" />
              <span className="text-sm font-bold">Download recovery codes</span>
            </div>
          )}
        </div>
        <DialogFooter className="mt-5 flex w-full items-center !justify-between">
          <div
            className={`flex items-center gap-2 py-[6px] px-4 ${!initialMfaEnable ? 'text-primary hover:text-primary-700 cursor-pointer' : 'text-neutral-400 cursor-not-allowed'}`}
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm font-bold">Switch Authenticator</span>
          </div>
          <div className="flex">
            {initialMfaEnable ? (
              <Button onClick={logoutHandler} disabled={isPending} className="min-w-[118px]">
                Log out
              </Button>
            ) : (
              <Button variant="outline" onClick={() => onClose()} className="min-w-[118px]">
                Close
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
