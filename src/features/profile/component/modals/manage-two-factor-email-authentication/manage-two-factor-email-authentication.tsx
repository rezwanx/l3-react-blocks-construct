import { Button } from 'components/ui/button';
import { Dialog, DialogContent, DialogTitle } from 'components/ui/dialog';

type ManageTwoFactorEmailAuthenticationProps = {
  onClose: () => void;
  onNext: () => void;
};

export const ManageTwoFactorEmailAuthentication: React.FC<
  ManageTwoFactorEmailAuthenticationProps
> = ({ onClose, onNext }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Manage Two FactorEmail Authentication</DialogTitle>
        <p className="mb-4">
          Please verify your email address by clicking the link sent to your inbox.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onNext}>Next</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
