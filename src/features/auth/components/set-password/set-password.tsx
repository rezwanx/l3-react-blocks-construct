import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../components/ui/form';
import { Button } from '../../../../components/ui/button';
import { UPasswordInput } from '../../../../components/core/u-password-input';
import {
  setPasswordFormDefaultValue,
  setPasswordFormType,
  setPasswordFormValidationSchema,
} from './utils';
import { useAccountActivation } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const SetpasswordForm = ({ code }: { code: string }) => {
  const navigate = useNavigate();
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

        <div className="w-full mx-auto p-6 rounded-lg shadow-sm border border-primary-shade-50">
          <h2 className="text-sm font-semibold text-high-emphasis mb-2">Password strength</h2>

          <div className="h-1 w-full bg-primary-shade-50 rounded mb-2"></div>

          <p className="text-medium-emphasis mb-2 text-xs">Check your password strength.</p>

          <p className="text-medium-emphasis mb-2 text-xs">Your password must contain:</p>

          <ul className="space-y-1 text-medium-emphasis text-xs">
            <li className="flex items-center">
              <span className="mr-3">—</span>
              At least 8 characters
            </li>
            <li className="flex items-center">
              <span className="mr-3 text-medium-emphasis">—</span>
              At least 1 uppercase and 1 lowercase letter
            </li>
            <li className="flex items-center">
              <span className="mr-3 text-medium-emphasis">—</span>
              At least 1 digit
            </li>
            <li className="flex items-center">
              <span className="mr-3 text-medium-emphasis">—</span>
              At least 1 special character (e.g., !, @, #, $)
            </li>
          </ul>
        </div>

        <div className="flex gap-10 mt-5">
          <Button
            className="flex-1 font-extrabold"
            size="lg"
            type="submit"
            loading={isPending}
            disabled={isPending}
          >
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  );
};
