import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import { Button } from 'components/ui/button';
import { UPasswordInput } from 'components/core/u-password-input';
import { SharedPasswordStrengthChecker } from '../../core/shared-password-strength-checker';
import { Captcha } from 'features/captcha';

interface BasePasswordFormProps {
  code: string;
  onSubmit: (password: string, code: string, captchaToken?: string) => Promise<void>;
  validationSchema: z.ZodSchema;
  defaultValues: {
    password: string;
    confirmPassword: string;
  };
  isPending: boolean;
  isCaptchaValid?: boolean;
  onCaptchaValidation?: (isValid: boolean) => void;
}

export const BasePasswordForm: React.FC<BasePasswordFormProps> = ({
  code,
  onSubmit,
  validationSchema,
  defaultValues,
  isPending,
  onCaptchaValidation,
}) => {
  const navigate = useNavigate();
  const [requirementsMet, setRequirementsMet] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);

  const googleSiteKey = process.env.REACT_APP_GOOGLE_SITE_KEY || '';

  const form = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const password = form.watch('password');
  const confirmPassword = form.watch('confirmPassword');

  useEffect(() => {
    if (requirementsMet && password && confirmPassword && password === confirmPassword) {
      setShowCaptcha(true);
    } else {
      setShowCaptcha(false);
      if (captchaToken) {
        setCaptchaToken('');
        if (onCaptchaValidation) {
          onCaptchaValidation(false);
        }
      }
    }
  }, [requirementsMet, password, confirmPassword, captchaToken, onCaptchaValidation]);

  const handleCaptchaVerify = (token: React.SetStateAction<string>) => {
    setCaptchaToken(token);
    if (onCaptchaValidation) {
      onCaptchaValidation(!!token);
    }
  };

  const handleCaptchaExpired = () => {
    setCaptchaToken('');
    if (onCaptchaValidation) {
      onCaptchaValidation(false);
    }
  };

  const onSubmitHandler = async (values: { password: string; confirmPassword: string }) => {
    if (!captchaToken) {
      return;
    }

    try {
      await onSubmit(values.password, code, captchaToken);
      navigate('/success');
    } catch (_error) {
      // Handle error if needed
    }
  };

  const isSubmitDisabled = isPending || !requirementsMet || !captchaToken;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmitHandler)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-high-emphasis font-normal">Password</FormLabel>
              <FormControl>
                <UPasswordInput placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-high-emphasis font-normal">Confirm Password</FormLabel>
              <FormControl>
                <UPasswordInput placeholder="Confirm your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SharedPasswordStrengthChecker
          password={password}
          confirmPassword={confirmPassword}
          onRequirementsMet={setRequirementsMet}
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

        <div className="flex gap-10 mt-5">
          <Button
            className="flex-1 font-extrabold"
            size="lg"
            type="submit"
            loading={isPending}
            disabled={isSubmitDisabled}
          >
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  );
};
