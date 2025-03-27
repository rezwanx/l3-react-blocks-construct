import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {
  forgotPasswordFormDefaultValue,
  forgotPasswordFormType,
  forgotPasswordFormValidationSchema,
} from './utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import { Input } from 'components/ui/input';
import { useForgotPassword } from '../../hooks/use-auth';
import { Button } from 'components/ui/button';
import { SetStateAction, useRef, useState, useEffect } from 'react';
import { CaptchaRef } from 'features/captcha/index.type';
import { Captcha } from 'features/captcha';

export const ForgotpasswordForm = () => {
  const navigate = useNavigate();
  const form = useForm<forgotPasswordFormType>({
    defaultValues: forgotPasswordFormDefaultValue,
    resolver: zodResolver(forgotPasswordFormValidationSchema),
  });
  const { isPending, mutateAsync } = useForgotPassword();

  const captchaRef = useRef<CaptchaRef>(null);

  const resetCaptcha = () => {
    captchaRef.current?.reset();
  };

  const [captchaToken, setCaptchaToken] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);

  const googleSiteKey = process.env.REACT_APP_GOOGLE_SITE_KEY || '';

  const emailValue = form.watch('email');

  useEffect(() => {
    if (emailValue && emailValue.trim() !== '') {
      setShowCaptcha(true);
    } else {
      setShowCaptcha(false);
    }
  }, [emailValue]);

  const handleCaptchaVerify = (token: SetStateAction<string>) => {
    setCaptchaToken(token);
  };

  const handleCaptchaExpired = () => {
    setCaptchaToken('');
  };

  const onSubmitHandler = async (values: forgotPasswordFormType) => {
    if (showCaptcha && !captchaToken) {
      return;
    }

    try {
      await mutateAsync({
        email: values.email,
        captchaCode: captchaToken || '',
      });

      navigate('/sent-email');
    } catch (_error) {
      resetCaptcha();
    }
  };

  const emailError = form.formState.errors.email;

  const isEmailValid = emailValue && emailValue.trim() !== '' && !emailError;

  const isButtonDisabled = isPending || !isEmailValid || (showCaptcha && !captchaToken);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmitHandler)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-high-emphasis font-normal">Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {showCaptcha && (
          <div className="my-4">
            <Captcha
              type="reCaptcha"
              siteKey={googleSiteKey}
              theme="light"
              onVerify={handleCaptchaVerify}
              onExpired={handleCaptchaExpired}
              size="normal"
            />
          </div>
        )}

        <Button
          className="font-extrabold mt-4"
          size="lg"
          type="submit"
          loading={isPending}
          disabled={isButtonDisabled}
        >
          Send reset link
        </Button>
        <Link to={'/login'}>
          <Button className="font-extrabold text-primary w-full" size="lg" variant="ghost">
            Go to Log in
          </Button>
        </Link>
      </form>
    </Form>
  );
};
