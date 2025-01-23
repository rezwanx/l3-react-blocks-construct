import 'react-phone-number-input/style.css';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import { Label } from 'components/ui/label';
import { Input } from 'components/ui/input';

type ChangePasswordProps = {
  onClose: () => void;
};

export const ChangePassword: React.FC<ChangePasswordProps> = () => {
  return (
    <DialogContent className="rounded-md sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Update Password</DialogTitle>
        <DialogDescription>
          Your new password should be at least 8 characters long and include a mix of uppercase
          letters, lowercase letters, numbers, and special characters.
        </DialogDescription>
      </DialogHeader>
      <Separator />
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="old-password">Old Password*</Label>
          <Input id="old-password" placeholder="Enter your old password" />
        </div>
        <div>
          <Label htmlFor="new-password">New Password</Label>
          <Input id="new-password" placeholder="Enter your new password" />
        </div>
      </div>
      <DialogFooter className="mt-5 flex justify-end gap-2">
        <DialogTrigger asChild>
          <Button variant="outline">Cancel</Button>
        </DialogTrigger>
        <Button type="submit">Change</Button>
      </DialogFooter>
    </DialogContent>
  );
};
