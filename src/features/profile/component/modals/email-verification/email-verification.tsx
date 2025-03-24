import { useEffect, useState } from 'react';
import { Button } from 'components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from 'components/ui/dialog';
import emailSentIcon from 'assets/images/email_sent.svg';
import UIOtpInput from 'components/core/otp-input/otp-input';
import { User } from '/types/user.type';
import { useGenerateOTP, useGetVerifyOTP } from '../../../hooks/use-mfa';
import { useToast } from 'hooks/use-toast';
import useResendOTP from 'hooks/use-resend-otp';
import { VerifyOTP } from '../../../services/mfa.services';
import API_CONFIG from '../../../../../config/api';

type EmailVerificationProps = {
  userInfo: User | undefined;
  onClose: () => void;
  onNext: () => void;
};

export const EmailVerification: React.FC<Readonly<EmailVerificationProps>> = ({
  userInfo,
  onClose,
  onNext,
}) => {
  const { toast } = useToast();
  const [twoFactorId, setTwoFactorId] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [otpError, setOtpError] = useState('');
  const { mutate: generateOTP } = useGenerateOTP();
  const { mutate: verifyOTP, isPending: verifyOtpPending } = useGetVerifyOTP();
  const {
    remainingTime,
    isResendDisabled,
    handleResend: handleResendOTP,
  } = useResendOTP({
    initialTime: 120,
    onResend: () => {
      if (!userInfo) return;
      generateOTP(userInfo.itemId, {
        onSuccess: (data) => {
          if (data?.isSuccess) {
            setTwoFactorId(data.twoFactorId);
            toast({
              variant: 'success',
              title: 'OTP Resent',
              description: 'A new verification code has been sent to your email',
            });
          }
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: 'Resend Failed',
            description: 'Failed to send a new verification code. Please try again.',
          });
        },
      });
    },
  });

  useEffect(() => {
    if (!userInfo) return;

    generateOTP(userInfo.itemId, {
      onSuccess: (data) => {
        if (data?.isSuccess) setTwoFactorId(data.twoFactorId);
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Failed to generate OTP',
          description: 'Please try again later',
        });
      },
    });
  }, [userInfo, generateOTP, toast]);

  const handleVerify = () => {
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
      onError: () => {
        setOtpError('Verification failed. Please check your code.');
      },
    });
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent hideClose className="rounded-md sm:max-w-[432px] overflow-y-auto max-h-screen">
        <DialogHeader>
          <div className="flex items-center justify-center w-full">
            <div className="w-[120px] h-[108px]">
              <img src={emailSentIcon} alt="emailSentIcon" className="w-full h-full object-cover" />
            </div>
          </div>
          <DialogTitle className="!mt-6 text-2xl">Email sent</DialogTitle>
          <DialogDescription className="text-sm text-high-emphasis">
            We’ve sent a verification key to your registered email address
            <span className="font-semibold">({userInfo?.email})</span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center gap-1 text-sm font-normal">
            <span className="text-high-emphasis">Did not receive mail?</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-normal"
              disabled={isResendDisabled}
              onClick={handleResendOTP}
            >
              {isResendDisabled ? `Resend in ${formatTime(remainingTime)}` : 'Resend'}
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-sm text-high-emphasis font-normal">
              Please enter the key below to complete your setup.
            </p>
            <div className="flex flex-col gap-1">
              <UIOtpInput
                numInputs={5}
                value={otpValue}
                inputStyle={otpError && '!border-error'}
                onChange={(value) => {
                  setOtpValue(value);
                  setOtpError('');
                }}
              />
              {otpError && <span className="text-destructive text-xs">{otpError}</span>}
            </div>
          </div>
        </div>
        <DialogFooter className="mt-5 flex justify-end gap-3">
          <Button variant="outline" className="min-w-[118px]" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleVerify}
            disabled={verifyOtpPending || !otpValue}
            className="min-w-[118px]"
          >
            Verify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
