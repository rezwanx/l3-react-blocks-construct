import { Link } from 'react-router-dom';
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
import { UCheckbox } from '../../../../components/core/uCheckbox';
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
        <div className="flex justify-between items-center">
          <UCheckbox label="Remember me" labelClassName="text-medium-emphasis" />
          <Link to="/reset-password" className="ml-auto inline-block text-sm text-primary">
            Forgot password?
          </Link>
        </div>
        <div className="flex gap-10 mt-6">
          <Button
            className="flex-1 font-extrabold"
            size="lg"
            type="submit"
            // loading={isPending}
            // disabled={isPending}
          >
            Log in
          </Button>
        </div>
      </form>
    </Form>
  );
};
