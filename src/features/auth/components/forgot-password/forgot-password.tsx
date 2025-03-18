import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {
  forgotPasswordFormDefaultValue,
  forgotPasswordFormType,
  forgotPasswordFormValidationSchema,
} from './utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { Input } from 'components/ui/input';
import { useForgotPassword } from '../../hooks/use-auth';
import { Button } from 'components/ui/button';

export const ForgotpasswordForm = () => {
  const navigate = useNavigate();
  const form = useForm<forgotPasswordFormType>({
    defaultValues: forgotPasswordFormDefaultValue,
    resolver: zodResolver(forgotPasswordFormValidationSchema),
  });
  const { isPending, mutateAsync } = useForgotPassword();

  const onSubmitHandler = async (values: forgotPasswordFormType) => {
    try {
      await mutateAsync({ email: values.email });
      navigate('/sent-email');
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

        <Button
          className="font-extrabold mt-4"
          size="lg"
          type="submit"
          loading={isPending}
          disabled={isPending}
        >
          Send reset link{' '}
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
