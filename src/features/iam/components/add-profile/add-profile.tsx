import React from 'react';
import { useForm } from 'react-hook-form';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import { Label } from 'components/ui/label';
import { Input } from 'components/ui/input';
import { Form, FormField, FormItem, FormControl, FormMessage } from 'components/ui/form';

type FormData = {
  fullName: string;
  email: string;
};

type AddUserProps = {
  onClose: () => void;
};

export const AddUser: React.FC<AddUserProps> = ({ onClose }) => {
  const form = useForm<FormData>({
    defaultValues: {
      fullName: '',
      email: '',
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = (data: FormData) => {
    // eslint-disable-next-line no-console
    console.log(data);
    onClose();
  };

  return (
    <DialogContent className="rounded-md sm:max-w-[480px] overflow-y-auto max-h-screen">
      <DialogHeader>
        <DialogTitle className="mb-2">Add user</DialogTitle>
        <DialogDescription className="text-medium-emphasis font-normal">
          Please enter the user&apos;s email address to send an invitation.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="fullName"
              rules={{ required: 'Full Name is required' }}
              render={({ field }) => (
                <FormItem className="col-span-1 sm:col-span-2">
                  <Label className="text-high-emphasis">First Name*</Label>
                  <FormControl>
                    <Input {...field} placeholder="Enter your first name" className="rounded-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="fullName"
              rules={{ required: 'Full Name is required' }}
              render={({ field }) => (
                <FormItem className="col-span-1 sm:col-span-2">
                  <Label className="text-high-emphasis">Last Name*</Label>
                  <FormControl>
                    <Input {...field} placeholder="Enter your last name" className="rounded-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-1 sm:col-span-2">
                  <Label className="text-high-emphasis">Email</Label>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your email address"
                      className="rounded-lg"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <DialogFooter className="mt-5 flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Invite User</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
