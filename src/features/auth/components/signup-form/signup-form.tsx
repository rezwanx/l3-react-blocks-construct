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
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { signupFormDefaultValue, signupFormType, signupFormValidationSchema } from './utils';
import { UCheckbox } from 'components/core/uCheckbox';

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
        <div className="flex justify-between items-center">
          <UCheckbox
            label={
              <>
                I agree to the{' '}
                <span className="text-primary underline">
                  {' '}
                  <a href="https://selisegroup.com/software-development-terms/">
                    Terms of Service
                  </a>{' '}
                </span>{' '}
                and acknowledge that I have read the{' '}
                <span className="text-primary underline">
                  <a href="https://selisegroup.com/privacy-policy/">Privacy policy</a>{' '}
                </span>
                .
              </>
            }
            labelClassName="text-medium-emphasis font-normal mt-5 leading-5"
          />
        </div>

        <div className="flex gap-10 mt-2">
          <Button className="flex-1 font-extrabold" size="lg" type="submit">
            Sign up
          </Button>
        </div>
      </form>
    </Form>
  );
};

<label className="text-medium-emphasis font-normal mt-5 leading-5">
  I agree to the and acknowledge that I have read the{' '}
  <a
    href="/privacy-policy"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 underline"
  >
    Privacy Policy
  </a>
  .
</label>;
