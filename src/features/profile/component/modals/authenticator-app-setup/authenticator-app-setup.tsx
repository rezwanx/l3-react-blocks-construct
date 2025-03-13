import { useState } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import BCOtpInput from 'components/core/otp-input/otp-input';

type AuthenticatorAppSetupProps = {
  onClose: () => void;
};

export const AuthenticatorAppSetup: React.FC<AuthenticatorAppSetupProps> = ({ onClose }) => {
  const [otpValue, setOtpValue] = useState<string>('');

  return (
    <DialogContent className="rounded-md sm:max-w-[432px] overflow-y-auto max-h-screen">
      <DialogHeader>
        <DialogTitle>Set up your authenticator app</DialogTitle>
        <DialogDescription>Please follow the instructions below</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col w-full gap-4">
        <div className="flex w-full text-high-emphasis text-sm gap-1 font-normal">
          <span>1.</span>
          <span>
            Scan the QR code below or enter the setup key to connect your account with an
            authenticator app.
          </span>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="w-40 h-40 border border-border rounded-[8px] p-2">
            <img src="" alt="otp qr code" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center justify-center flex-col gap-2">
            <p className="text-medium-emphasis text-center font-normal">
              Or enter this code manually in your app:
            </p>
            <p className="text-center text-sm font-semibold text-high-emphasis">
              4A7R4GH12HWSNFE44G521GH52A5SD5AS1D
            </p>
          </div>
        </div>
        <div className="flex w-full text-high-emphasis text-sm gap-1 font-normal">
          <span>2.</span>
          <span>Verify the pairing was successful by entering the key displayed on the app</span>
        </div>
        <BCOtpInput value={otpValue} onChange={setOtpValue} />
      </div>
      <DialogFooter className="mt-5 flex justify-end gap-2">
        <Button variant="outline" onClick={() => onClose()}>
          Cancel
        </Button>
        <Button>Verify</Button>
      </DialogFooter>
    </DialogContent>
  );
};
