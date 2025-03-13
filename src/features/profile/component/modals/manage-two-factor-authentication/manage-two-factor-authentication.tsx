import { Download, RefreshCw, Smartphone } from 'lucide-react';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog';
import { Button } from 'components/ui/button';

type ManageTwoFactorAuthenticationProps = {
  onClose: () => void;
};

export const ManageTwoFactorAuthentication: React.FC<ManageTwoFactorAuthenticationProps> = ({
  onClose,
}) => {
  return (
    <DialogContent className="rounded-md sm:max-w-[432px] overflow-y-auto max-h-screen">
      <DialogHeader>
        <DialogTitle>Manage 2-factor authentication</DialogTitle>
        <DialogDescription>
          Add an extra layer of security by choosing how you`d like to receive verification codes.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col w-full gap-4">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-surface rounded-md">
              <Smartphone className="text-secondary" size={24} />
            </div>
            <h3 className="text-sm font-semibold text-high-emphasis">Authenticator App</h3>
          </div>
          <Button variant="ghost">Disable</Button>
        </div>
        <div className="flex items-center gap-2 cursor-auto py-[6px] px-4">
          <Download className="w-5 h-5 text-primary hover:text-primary-700" />
          <span className="text-sm font-bold text-primary hover:text-primary-700">
            Download recovery codes
          </span>
        </div>
      </div>
      <DialogFooter className="mt-5 flex items-center justify-between">
        <Button variant="ghost">
          <RefreshCw /> Switch Authenticator
        </Button>
        <Button>Log out</Button>
        <Button variant="outline" onClick={() => onClose()}>
          Close
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
