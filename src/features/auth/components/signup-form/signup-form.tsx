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
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { signupFormDefaultValue, signupFormType, signupFormValidationSchema } from './utils';

export const SignupForm = () => {
  const form = useForm<signupFormType>({
    defaultValues: signupFormDefaultValue,
    resolver: zodResolver(signupFormValidationSchema),
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="username"
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

        <div className="flex gap-10 mt-2">
          <Button className="flex-1 font-extrabold" size="lg" type="submit">
            Sign up
          </Button>
        </div>
      </form>
    </Form>
  );
};
