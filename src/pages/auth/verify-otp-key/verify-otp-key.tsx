import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/ui/button';
import UIOtpInput from 'components/core/otp-input/otp-input';
import { useGenerateOTP, useGetVerifyOTP } from 'features/profile/hooks/use-mfa';
import { VerifyOTP } from 'features/profile/services/mfa.services';
import { useGetAccount } from 'features/profile/hooks/use-account';
import { useToast } from 'hooks/use-toast';
import API_CONFIG from '../../../config/api';

export function VerifyOtpKey() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [otpValue, setOtpValue] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');
  const [twoFactorId, setTwoFactorId] = useState('');
  const { data: userInfo } = useGetAccount();
  const { mutate: generateOTP } = useGenerateOTP();
  const { mutate: verifyOTP, isPending: verfiyOtpPending } = useGetVerifyOTP();

  useEffect(() => {
    if (!userInfo) return;
    generateOTP(userInfo.itemId, {
      onSuccess: (data) => {
        if (data && data.isSuccess) {
          setTwoFactorId(data.twoFactorId);
        }
      },
    });
  }, [generateOTP, userInfo]);

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
    });
  };

  const maskEmail = (email: string | undefined) => {
    if (!email) return '';
    const [name, domain] = email.split('@');
    return `${name[0]}****@${domain}`;
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold text-high-emphasis">Verifying key</div>
        <div className="text-sm font-normal text-medium-emphasis">
          Please enter the verification key that has been sent to your email (
          {maskEmail(userInfo?.email)})
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
          disabled={verfiyOtpPending}
        >
          {verfiyOtpPending ? 'Verifying' : 'Verify'}
        </Button>
        <Button disabled className="font-extrabold" size="lg" variant="ghost">
          Resend Key (in 0:30s)
        </Button>
      </div>
    </div>
  );
}
