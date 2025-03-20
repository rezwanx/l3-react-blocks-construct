import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import UIOtpInput from 'components/core/otp-input/otp-input';
import { User } from '/types/user.type';
import { useGenerateOTP, useGetVerifyOTP } from '../../../hooks/use-mfa';
import { VerifyOTP } from '../../../services/mfa.services';
import API_CONFIG from '../../../../../config/api';

type AuthenticatorAppSetupProps = {
  userInfo?: User;
  onClose: () => void;
  onNext: () => void;
};

export const AuthenticatorAppSetup: React.FC<Readonly<AuthenticatorAppSetupProps>> = ({
  userInfo,
  onClose,
  onNext,
}) => {
  const [otpValue, setOtpValue] = useState<string>('');
  const { mutate: generateOTP } = useGenerateOTP();
  const { mutate: verifyOTP, isPending } = useGetVerifyOTP();
  const [qrCodeUri, setQrCodeUri] = useState('');
  const [twoFactorId, setTwoFactorId] = useState('');

  useEffect(() => {
    if (!userInfo) return;
    generateOTP(userInfo.itemId, {
      onSuccess: (data) => {
        if (data && data.isSuccess) {
          setQrCodeUri(data.imageUri);
          setTwoFactorId(data.twoFactorId);
        }
      },
    });
  }, [generateOTP, userInfo]);

  const handleVerify = () => {
    const verifyParams: VerifyOTP = {
      verificationCode: otpValue,
      twoFactorId: twoFactorId,
      authType: userInfo?.userMfaType ?? 0,
      projectKey: API_CONFIG.blocksKey,
    };

    verifyOTP(verifyParams, {
      onSuccess: () => {
        onNext();
      },
      onError: (error) => {
        console.error('Verification failed:', error);
      },
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent hideClose className="rounded-md sm:max-w-[432px] overflow-y-auto max-h-screen">
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
              <img src={qrCodeUri} alt="otp qr code" className="w-full h-full object-cover" />
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
          <UIOtpInput value={otpValue} onChange={setOtpValue} />
        </div>
        <DialogFooter className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button onClick={handleVerify} disabled={isPending}>
            Verify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
