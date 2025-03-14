import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { isPossiblePhoneNumber, isValidPhoneNumber, Value } from 'react-phone-number-input';
import { User } from '@/types/user.type';
import { ACCOUNT_QUERY_KEY, useUpdateAccount } from 'features/profile/hooks/use-account';
import { useQueryClient } from '@tanstack/react-query';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';
import { IamData } from 'features/iam/services/user-service';
import UIPhoneInput from 'components/core/phone-input/phone-input';

type FormData = {
  itemId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
};

type EditIamProfileDetailsProps = {
  userInfo: User | IamData;
  onClose: () => void;
};

const AVAILABLE_ROLES = ['admin', 'user', 'manager', 'viewer', 'editor'];

export const EditIamProfileDetails: React.FC<EditIamProfileDetailsProps> = ({
  userInfo,
  onClose,
}) => {
  const queryClient = useQueryClient();

  const { mutate: updateAccount, isPending } = useUpdateAccount({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ACCOUNT_QUERY_KEY });

      await queryClient.refetchQueries({
        queryKey: ACCOUNT_QUERY_KEY,
        type: 'active',
        exact: false,
      });

      onClose();
      window.location.reload();
    },
  });

  const [isFormChanged, setIsFormChanged] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      itemId: '',
      fullName: '',
      email: '',
      phoneNumber: '',
      role: '',
    },
  });

  const { watch, setValue, handleSubmit, control } = form;
  const watchedValues = watch();

  useEffect(() => {
    if (userInfo) {
      setValue('fullName', `${userInfo.firstName ?? ''} ${userInfo.lastName ?? ''}`.trim());
      setValue('email', userInfo.email ?? '');
      setValue('phoneNumber', userInfo.phoneNumber ?? '');
      setValue('itemId', userInfo.itemId ?? '');
      if (userInfo.roles && Array.isArray(userInfo.roles) && userInfo.roles.length > 0) {
        setValue('role', userInfo.roles[0]);
      }
    }
  }, [userInfo, setValue]);

  useEffect(() => {
    if (!userInfo) return;

    const initialValues = {
      fullName: `${userInfo.firstName || ''} ${userInfo.lastName || ''}`.trim(),
      phoneNumber: userInfo.phoneNumber || '',
      profileImageUrl: userInfo.profileImageUrl || '',
      role: userInfo.roles && userInfo.roles.length > 0 ? userInfo.roles[0] : '',
    };

    setIsFormChanged(
      watchedValues.fullName !== initialValues.fullName ||
        watchedValues.phoneNumber !== initialValues.phoneNumber ||
        watchedValues.role !== initialValues.role
    );
  }, [watchedValues, userInfo]);

  const onSubmit = async (data: FormData) => {
    const names = data.fullName.trim().split(' ');
    const firstName = names[0] || '';
    const lastName = names.slice(1).join(' ') || '';

    const payload = {
      itemId: data.itemId,
      firstName,
      lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      roles: data.role ? [data.role] : [],
    };

    updateAccount(payload);
  };

  const handleDialogClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <DialogContent
      className="rounded-md sm:max-w-[700px] overflow-y-auto max-h-screen"
      onClick={handleDialogClick}
    >
      <DialogHeader>
        <DialogTitle>Edit profile details</DialogTitle>
        <DialogDescription>Keep your details accurate and up to date.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="fullName"
              rules={{ required: 'Full Name is required' }}
              render={({ field }) => (
                <FormItem>
                  <Label>Full Name*</Label>
                  <FormControl>
                    <Input {...field} placeholder="Enter your full name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <Label>Role</Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {AVAILABLE_ROLES.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label>Email</Label>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="phoneNumber"
              rules={{
                validate: (value) => {
                  if (!value) return 'Phone number is required';
                  if (!isPossiblePhoneNumber(value)) return 'Phone number length is invalid';
                  if (!isValidPhoneNumber(value)) return 'Invalid phone number';
                  return true;
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <Label>Mobile No.</Label>
                  <FormControl>
                    <UIPhoneInput
                      {...field}
                      onChange={(value: Value) => setValue('phoneNumber', value ?? '')}
                      placeholder="Enter your mobile number"
                      defaultCountry="CH"
                      countryCallingCodeEditable={false}
                      international
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter className="mt-5 flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isPending}
              disabled={isPending || !isFormChanged}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
