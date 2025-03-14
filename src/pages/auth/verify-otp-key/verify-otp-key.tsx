import { useState } from 'react';
import { Button } from 'components/ui/button';
import BCOtpInput from 'components/core/otp-input/otp-input';

export function VerifyOtpKey() {
  const [otpValue, setOtpValue] = useState<string>('');

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold text-high-emphasis">Verifying key</div>
        <div className="text-sm font-normal text-medium-emphasis">
          Please enter the verification key that has been sent to your email
          (d****@blocks.construct)
        </div>
      </div>
      <BCOtpInput value={otpValue} onChange={setOtpValue} />
      <div className="flex w-full flex-col gap-6">
        <Button className="font-extrabold mt-4" size="lg">
          Verify
        </Button>
        <Button disabled className="font-extrabold" size="lg" variant="ghost">
          Resend Key (in 0:30s)
        </Button>
      </div>
    </div>
  );
}
