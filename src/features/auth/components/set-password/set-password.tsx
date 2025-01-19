import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
// src/features/auth/components/signin-form/signin-form.tsx
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
// import { useSigninMutation } from '../../hooks/useAuth';
// import { useAuthStore } from '../../../../state/store/auth';
import {
  setPasswordFormDefaultValue,
  setPasswordFormType,
  setPasswordFormValidationSchema,
} from './utils';

export const SetpasswordForm = () => {
  // const navigate = useNavigate();
  // const { login } = useAuthStore();
  const form = useForm<setPasswordFormType>({
    defaultValues: setPasswordFormDefaultValue,
    resolver: zodResolver(setPasswordFormValidationSchema),
  });
  // const { isPending, mutateAsync } = useSigninMutation();

  // const onSubmitHandler = async (values: setPasswordFormType) => {
  //   try {
  //     const res = await mutateAsync(values);
  //     login(res.access_token, res.refresh_token);
  //     navigate('/');
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   } catch (_error) {
  //     // Error handling can be added here
  //   }
  // };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
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
            // loading={isPending}
            // disabled={isPending}
          >
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  );
};
