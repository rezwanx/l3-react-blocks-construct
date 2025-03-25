import { BasePasswordForm } from 'components/blocks/base-password-form/base-password-form';
import { useAccountActivation } from '../../hooks/use-auth';
import { setPasswordFormDefaultValue, setPasswordFormValidationSchema } from './utils';
import { useState } from 'react';

export const SetpasswordForm = ({ code }: { code: string }) => {
  const { isPending, mutateAsync } = useAccountActivation();
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const handleSubmit = async (password: string, code: string, captchaToken?: string) => {
    if (!captchaToken) {
      return;
    }

    await mutateAsync({
      password,
      code,
      captchaCode: captchaToken,
    });
  };

  const handleCaptchaValidation = (isValid: boolean) => {
    setIsCaptchaValid(isValid);
  };

  return (
    <BasePasswordForm
      code={code}
      onSubmit={handleSubmit}
      validationSchema={setPasswordFormValidationSchema}
      defaultValues={setPasswordFormDefaultValue}
      isPending={isPending}
      isCaptchaValid={isCaptchaValid}
      onCaptchaValidation={handleCaptchaValidation}
    />
  );
};
