import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import { Button } from 'components/ui/button';
import { UPasswordInput } from 'components/core/u-password-input';
import {
  setPasswordFormDefaultValue,
  setPasswordFormType,
  setPasswordFormValidationSchema,
} from './utils';
import { useAccountActivation } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import PasswordStrengthChecker from 'components/core/password-strength-checker';
import { useState } from 'react';

export const SetpasswordForm = ({ code }: { code: string }) => {
  const navigate = useNavigate();
  const [passwordRequirementsMet, setPasswordRequirementsMet] = useState(false);

  const form = useForm<setPasswordFormType>({
    defaultValues: setPasswordFormDefaultValue,
    resolver: zodResolver(setPasswordFormValidationSchema),
  });

  const { isPending, mutateAsync } = useAccountActivation();

  const onSubmitHandler = async (values: setPasswordFormType) => {
    try {
      await mutateAsync({ password: values.password, code });
      navigate('/success');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
