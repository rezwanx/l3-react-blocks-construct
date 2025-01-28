import 'react-phone-number-input/style.css';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import SecurityOn from '../../../../../assets/images/security_on.svg';
import { Checkbox } from 'components/ui/checkbox';
import { Label } from 'components/ui/label';

// type UpdatePasswordSuccessProps = {
//   onClose?: () => void;
// };

export const UpdatePasswordSuccess = () => {
  return (
    <DialogContent className="rounded-md sm:max-w-[500px]">
      <div className="flex w-full items-center justify-center mb-3">
        <img src={SecurityOn} />
      </div>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">Password updated successfully</DialogTitle>
        <DialogDescription className="font-normal text-high-emphasis">
          Your password has been updated. For your security, we will sign you out of your current
          session. Please log in again to continue.
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center gap-2">
        <Checkbox id="logout-all-devices" />
        <Label htmlFor="logout-all-devices" className="font-normal">
          Log out of all devices
        </Label>
      </div>
      <DialogFooter className="mt-5 flex justify-end">
        <Button type="submit">Log out</Button>
      </DialogFooter>
    </DialogContent>
  );
};
