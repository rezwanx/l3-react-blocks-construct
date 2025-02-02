import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import { Button } from 'components/ui/button';
import { UPasswordInput } from 'components/core/u-password-input';
import PasswordStrengthChecker from 'components/core/password-strength-checker';

interface BasePasswordFormProps {
  code: string;
  onSubmit: (password: string, code: string) => Promise<void>;
  validationSchema: z.ZodSchema;
  defaultValues: {
    password: string;
    confirmPassword: string;
  };
  isPending: boolean;
}

export const BasePasswordForm = ({
  code,
  onSubmit,
  validationSchema,
  defaultValues,
  isPending,
}: BasePasswordFormProps) => {
  const navigate = useNavigate();
  const [passwordRequirementsMet, setPasswordRequirementsMet] = useState(false);

  const form = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const onSubmitHandler = async (values: { password: string; confirmPassword: string }) => {
    try {
      await onSubmit(values.password, code);
      navigate('/success');
    } catch (_error) {
      // Error handling can be added here
    }
  };

  const arePasswordsMatching = () => {
    const { password, confirmPassword } = form.getValues();
    return password === confirmPassword && confirmPassword !== '';
  };

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

        <div className="mt-2">
          <PasswordStrengthChecker
            password={form.watch('password')}
            onRequirementsMet={setPasswordRequirementsMet}
          />
        </div>

        <div className="flex gap-10 mt-5">
          <Button
            className="flex-1 font-extrabold"
            size="lg"
            type="submit"
            loading={isPending}
            disabled={isPending || !passwordRequirementsMet || !arePasswordsMatching()}
          >
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  );
};
