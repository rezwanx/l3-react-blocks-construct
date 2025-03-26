import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
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
import { useToast } from 'hooks/use-toast';
import { User } from '/types/user.type';
import { useGenerateOTP, useGetVerifyOTP } from '../../../hooks/use-mfa';
import QRCodeDummyImage from 'assets/images/image_off_placeholder.webp';
import { VerifyOTP } from '../../../types/mfa.types';
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
  const { toast } = useToast();
  const [otpValue, setOtpValue] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');
  const [isImageError, setIsImageError] = useState<boolean>(false);
  const { mutate: generateOTP, isPending: generateOtpPending } = useGenerateOTP();
  const { mutate: verifyOTP, isPending: verfiyOtpPending } = useGetVerifyOTP();
  const [qrCodeUri, setQrCodeUri] = useState('');
  const [twoFactorId, setTwoFactorId] = useState('');
  const lastVerifiedOtpRef = useRef<string>('');

  useEffect(() => {
    if (!userInfo) return;
    generateOTP(userInfo.itemId, {
      onSuccess: (data) => {
        if (data) {
          setQrCodeUri(data.imageUri);
          setTwoFactorId(data.twoFactorId);
        }
      },
    });
  }, [generateOTP, userInfo]);

  const onVerify = useCallback(() => {
    if (!twoFactorId) {
      toast({
        variant: 'destructive',
        title: 'Setup Incomplete',
        description: 'Please generate the QR code first',
      });
      return;
    }

    const verifyParams: VerifyOTP = {
      verificationCode: otpValue,
      twoFactorId: twoFactorId,
      authType: userInfo?.userMfaType ?? 0,
      projectKey: API_CONFIG.blocksKey,
    };

    verifyOTP(verifyParams, {
      onSuccess: (data) => {
        if (data?.isValid && data?.userId) {
          onNext();
        } else {
          setOtpError('Invalid OTP. Please try again.');
        }
      },
    });
  }, [onNext, otpValue, toast, twoFactorId, userInfo?.userMfaType, verifyOTP]);

  useEffect(() => {
    if (
      otpValue.length === 6 &&
      twoFactorId &&
      !verfiyOtpPending &&
      otpValue !== lastVerifiedOtpRef.current
    ) {
      lastVerifiedOtpRef.current = otpValue;
      onVerify();
    }
  }, [onVerify, otpValue, twoFactorId, verfiyOtpPending]);

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
              {!generateOtpPending ? (
                <img
                  src={qrCodeUri && !isImageError ? qrCodeUri : QRCodeDummyImage}
                  alt="otp qr code"
                  className="w-full h-full object-cover"
                  onError={() => setIsImageError(true)}
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}
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
          <div className="flex flex-col gap-1">
            <UIOtpInput
              value={otpValue}
              inputStyle={otpError && '!border-error !text-destructive'}
              onChange={(value) => {
                setOtpValue(value);
                setOtpError('');
              }}
            />
            {otpError && <span className="text-destructive text-xs">{otpError}</span>}
          </div>
        </div>
        <DialogFooter className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onClose()} className="min-w-[118px]">
            Cancel
          </Button>
          <Button
            onClick={onVerify}
            disabled={verfiyOtpPending || !otpValue}
            className="min-w-[118px]"
          >
            {verfiyOtpPending ? 'Verifying' : 'Verify'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
