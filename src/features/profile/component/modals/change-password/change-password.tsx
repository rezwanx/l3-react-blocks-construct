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
import { useChangePassword } from 'features/profile/hooks/use-account';

type ChangePasswordProps = {
  onClose: () => void;
};

export const ChangePassword: React.FC<ChangePasswordProps> = ({ onClose }) => {
  const form = useForm<changePasswordFormType>({
    defaultValues: changePasswordFormDefaultValue,
    resolver: zodResolver(changePasswordFormValidationSchema),
  });

  const { mutate: changePassword, isPending } = useChangePassword();

  const onSubmitHandler = async (values: changePasswordFormType) => {
    if (values.newPassword !== values.confirmNewPassword) {
      form.setError('confirmNewPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      });
      return;
    }

    changePassword(
      {
        newPassword: values.newPassword,
        oldPassword: values.oldPassword,
      },
      {
        onSuccess: () => {
          form.reset();
          onClose();
        },
        onError: (error) => {
          form.setError('oldPassword', {
            type: 'manual',
            message: error?.message || 'Failed to change password',
          });
        },
      }
    );
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
              <Button variant="outline" disabled={isPending} onClick={onClose}>
                Cancel
              </Button>
            </DialogTrigger>
            <Button type="submit" disabled={isPending}>
              Change
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
