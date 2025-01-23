import 'react-phone-number-input/style.css';
import { useForm } from 'react-hook-form';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import { UPasswordInput } from 'components/core/u-password-input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import {
  changePasswordFormDefaultValue,
  changePasswordFormType,
  changePasswordFormValidationSchema,
} from 'features/profile/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';

type ChangePasswordProps = {
  onClose: () => void;
};

export const ChangePassword: React.FC<ChangePasswordProps> = () => {
  const form = useForm<changePasswordFormType>({
    defaultValues: changePasswordFormDefaultValue,
    resolver: zodResolver(changePasswordFormValidationSchema),
  });

  const onSubmitHandler = async (values: changePasswordFormType) => {
    try {
      console.log('testing', values);
    } catch (_error) {
      // Error handling can be added here
    }
  };

  return (
    <DialogContent className="rounded-md sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Change Your Password</DialogTitle>
        <DialogDescription>
          Your new password should be at least 8 characters long and include a mix of uppercase
          letters, lowercase letters, numbers, and special characters.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-high-emphasis font-normal">
                    Old Password
                  </FormLabel>
                  <FormControl>
                    <UPasswordInput placeholder="Enter your old password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-high-emphasis font-normal">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <UPasswordInput placeholder="Enter your new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-high-emphasis font-normal">
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <UPasswordInput placeholder="Confirm your new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter className="mt-5 flex justify-end gap-2">
            <DialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogTrigger>
            <Button type="submit">Change</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
