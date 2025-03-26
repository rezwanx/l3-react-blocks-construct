import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from 'components/ui/button';
import UIOtpInput from 'components/core/otp-input/otp-input';
import { useSigninMutation } from 'features/auth/hooks/use-auth';
import { useAuthStore } from 'state/store/auth';
import { useToast } from 'hooks/use-toast';
import { MFASigninResponse } from 'features/auth/services/auth.service';
import { UserMfaType } from 'features/profile/enums/user-mfa-type-enum';

export function VerifyOtpKey() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [otpError, setOtpError] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const { mutateAsync, isPending } = useSigninMutation();
  const [searchParams] = useSearchParams();
  const lastVerifiedOtpRef = useRef<string>('');

  const twofactorId = searchParams.get('two_factor_id');
  const mfaType = Number(searchParams.get('mfa_type'));
  const userEmail = searchParams.get('user_name');

  const maskEmail = (email: string | undefined) => {
    if (!email) return '';
    const [name, domain] = email.split('@');
    return `${name[0]}****@${domain}`;
  };

  const onVerify = useCallback(async () => {
    try {
      const res = (await mutateAsync(
        {
          grantType: 'mfa_code',
          code: otpValue,
          two_factor_id: twofactorId ?? '',
          mfaType: mfaType,
        },
        {
          onSuccess: () => {
            toast({
              variant: 'success',
              title: 'Success',
              description: 'You are successfully logged in',
            });
          },
        }
      )) as MFASigninResponse;

      login(res.access_token, res.refresh_token);
      navigate('/');
    } catch {
      setOtpError('Mfa code is not valid');
    }
  }, [otpValue, twofactorId, mfaType, mutateAsync, login, navigate, toast]);

  useEffect(() => {
    const requiredLength = mfaType === UserMfaType.AUTHENTICATOR_APP ? 6 : 5;

    if (
      otpValue.length === requiredLength &&
      !isPending &&
      otpValue !== lastVerifiedOtpRef.current
    ) {
      lastVerifiedOtpRef.current = otpValue;
      onVerify();
    }
  }, [otpValue, mfaType, isPending, onVerify]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-high-emphasis">Verifying key</h1>
        <p className="text-sm font-normal text-medium-emphasis">
          {mfaType === UserMfaType.AUTHENTICATOR_APP
            ? 'Please enter the verification code from your authenticator app'
            : `Please enter the verification key sent to your email (${maskEmail(userEmail ?? '')})`}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <UIOtpInput
          numInputs={mfaType === UserMfaType.AUTHENTICATOR_APP ? 6 : 5}
          value={otpValue}
          inputStyle={otpError && '!border-error !text-destructive'}
          onChange={(value) => {
            setOtpValue(value);
            setOtpError('');
          }}
        />
        {otpError && <span className="text-destructive text-sm">{otpError}</span>}
      </div>
      <div className="flex w-full flex-col gap-6">
        <Button
          className="font-extrabold mt-4"
          size="lg"
          onClick={onVerify}
          disabled={isPending || !otpValue}
        >
          {isPending ? 'Verifying...' : 'Verify'}
        </Button>
        {/* TODO FE: Might need later for now backend endpoint doesn`t have this implementation */}
        {/* {mfaType === UserMfaType.EMAIL_VERIFICATION && (
          <Button
            // className={`${isResendDisabled && 'font-extrabold'}`}
            size="lg"
            variant="ghost"
            // disabled={isResendDisabled}
            // onClick={handleResendOTP}
          >
            Resend Key
          </Button>
        )} */}
      </div>
    </div>
  );
}
