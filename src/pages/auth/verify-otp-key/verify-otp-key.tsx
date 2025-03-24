import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/ui/button';
import UIOtpInput from 'components/core/otp-input/otp-input';
import { useGenerateOTP, useGetVerifyOTP } from 'features/profile/hooks/use-mfa';
import { VerifyOTP } from 'features/profile/services/mfa.services';
import { useGetAccount } from 'features/profile/hooks/use-account';
import { useToast } from 'hooks/use-toast';
import useResendOTP from 'hooks/use-resend-otp';
import API_CONFIG from '../../../config/api';

export function VerifyOtpKey() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [otpValue, setOtpValue] = useState('');
  const [otpError, setOtpError] = useState('');
  const [twoFactorId, setTwoFactorId] = useState('');
  const { data: userInfo } = useGetAccount();
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
          navigate('/');
        } else {
          setOtpError('Invalid OTP. Please try again.');
        }
      },
      onError: () => {
        setOtpError('Verification failed. Please check your code.');
      },
    });
  };

  const maskEmail = (email: string | undefined) => {
    if (!email) return '';
    const [name, domain] = email.split('@');
    return `${name[0]}****@${domain}`;
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold text-high-emphasis">Verifying key</div>
        <div className="text-sm font-normal text-medium-emphasis">
          Please enter the verification key sent to your email ({maskEmail(userInfo?.email)})
        </div>
      </div>
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
      <div className="flex w-full flex-col gap-6">
        <Button
          className="font-extrabold mt-4"
          size="lg"
          onClick={handleVerify}
          disabled={verifyOtpPending}
        >
          {verifyOtpPending ? 'Verifying' : 'Verify'}
        </Button>
        <Button
          className="font-extrabold"
          size="lg"
          variant="ghost"
          disabled={isResendDisabled}
          onClick={handleResendOTP}
        >
          Resend Key (in {formatTime(remainingTime)})
        </Button>
      </div>
    </div>
  );
}
