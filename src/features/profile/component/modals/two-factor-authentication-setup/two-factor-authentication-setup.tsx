import { useNavigate } from 'react-router-dom';
import { ChevronRight, Mail, Smartphone } from 'lucide-react';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';

export const TwoFactorAuthenticationSetup = () => {
  const navigate = useNavigate();

  return (
    <DialogContent className="rounded-md sm:max-w-[700px] overflow-y-auto max-h-screen">
      <DialogHeader>
        <DialogTitle>Set up 2-factor authentication</DialogTitle>
        <DialogDescription>
          Add an extra layer of security by choosing how you`d like to receive verification codes.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer">
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
          <Button onClick={() => navigate('/profile')}>Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};
