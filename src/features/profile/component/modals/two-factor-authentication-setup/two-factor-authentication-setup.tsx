import { useState } from 'react';
import { ChevronRight, Mail, Smartphone } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import { AuthenticatorAppSetup } from '../authenticator-app-setup/authenticator-app-setup';

type TwoFactorAuthenticationSetupProps = {
  onClose: () => void;
  open?: boolean;
  onOpenChange?(open: boolean): void;
};

export const TwoFactorAuthenticationSetup: React.FC<TwoFactorAuthenticationSetupProps> = ({
  onClose,
  open,
  onOpenChange,
}) => {
  const [authenticatorAppSetupModalOpen, setAuthenticatorAppSetupModalOpen] = useState(false);

  const handleOpenAuthenticatorSetup = () => {
    onClose();
    setAuthenticatorAppSetupModalOpen(true);
  };

  const handleAuthenticatorClose = () => {
    setAuthenticatorAppSetupModalOpen(false);
    onClose();
  };

  return (
    <>
      {/* Parent Modal */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="rounded-md sm:max-w-[432px] overflow-y-auto max-h-screen">
          <DialogHeader>
            <DialogTitle>Set up 2-factor authentication</DialogTitle>
            <DialogDescription>
              Add an extra layer of security by choosing how you`d like to receive verification
              codes.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col w-full">
            <div
              onClick={handleOpenAuthenticatorSetup}
              className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-surface rounded-md">
                  <Smartphone className="text-secondary" size={24} />
                </div>
                <h3 className="text-sm font-semibold text-high-emphasis">Authenticator App</h3>
              </div>
              <ChevronRight className="text-primary" size={20} />
            </div>
            <Separator />
            <div className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-surface rounded-md">
                  <Mail className="text-secondary" size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-high-emphasis">Email Verification</h3>
                  <p className="text-xs text-medium-emphasis">demo@blocks.construct</p>
                </div>
              </div>
              <ChevronRight className="text-primary" size={20} />
            </div>
          </div>

          <DialogFooter className="mt-5 flex justify-end">
            <DialogClose asChild>
              <Button onClick={onClose}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={authenticatorAppSetupModalOpen}
        onOpenChange={setAuthenticatorAppSetupModalOpen}
      >
        <AuthenticatorAppSetup onClose={handleAuthenticatorClose} />
      </Dialog>
    </>
  );
};
