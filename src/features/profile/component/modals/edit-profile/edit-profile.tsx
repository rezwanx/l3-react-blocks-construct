import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Trash, Upload } from 'lucide-react';
import { useToast } from 'hooks/use-toast';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import { Label } from 'components/ui/label';
import { Input } from 'components/ui/input';
import DummyProfile from '../../../../../assets/images/dummy_profile.jpg';
import { User } from '@/types/user.type';
import { useUpdateAccount } from 'features/profile/hooks/use-account';

type FormData = {
  itemId: string;
  fullName: string;
  email: string;
  mobile: string;
  profileImageUrl: File | string;
};

type EditProfileProps = {
  userInfo: User;
};

export const EditProfile: React.FC<EditProfileProps> = ({ userInfo }) => {
  const { toast } = useToast();
  const { mutate: updateAccount, status } = useUpdateAccount();
  const isPending = status === 'pending';

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      itemId: '',
      fullName: '',
      email: '',
      mobile: '',
      profileImageUrl: '',
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(DummyProfile);

  useEffect(() => {
    if (userInfo) {
      setValue('fullName', `${userInfo.firstName} ${userInfo.lastName}` || '');
      setValue('email', userInfo.email || '');
      setValue('mobile', userInfo.phoneNumber || '');
      setValue('itemId', userInfo.itemId || '');
      setPreviewImage(userInfo.profileImageUrl || DummyProfile);
    }
  }, [userInfo, setValue]);

  const onSubmit = (data: FormData) => {
    const [firstName, lastName] = data.fullName.split(' ');
    const payload = {
      itemId: data.itemId,
      firstName: firstName || '',
      lastName: lastName || '',
      email: data.email,
      phoneNumber: data.mobile,
      profilePicture: data.profileImageUrl,
    };

    updateAccount(payload, {
      onSuccess: () => {
        toast({
          title: 'Profile Updated',
          description: 'Your changes have been saved!',
        });
      },
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('profileImageUrl', file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setValue('profileImageUrl', '');
    setPreviewImage(DummyProfile);
  };

  return (
    <DialogContent className="rounded-md sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Edit profile details</DialogTitle>
        <DialogDescription>Keep your details accurate and up to date.</DialogDescription>
      </DialogHeader>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center">
          <img
            src={previewImage || DummyProfile}
            alt="Profile"
            className="w-[100px] h-[100px] rounded-full object-cover border shadow-sm"
          />
          <div className="flex flex-col gap-2 ml-9">
            <h1 className="text-xl font-semibold">
              {userInfo.firstName} {userInfo.lastName}
            </h1>
            <p className="text-sm">*.png, *.jpeg files up to 2MB, minimum size 400x400px.</p>
            <div className="flex gap-4">
              <Button size="sm" variant="outline">
                <Upload className="w-4 h-4" />
                <label>
                  Upload Image
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </Button>
              <Button size="sm" variant="outline" onClick={handleRemoveImage}>
                <Trash className="w-4 h-4" />
                Remove
              </Button>
            </div>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1 sm:col-span-2">
            <Label htmlFor="full-name">Full Name*</Label>
            <Controller
              name="fullName"
              control={control}
              rules={{ required: 'Full Name is required' }}
              render={({ field }) => (
                <Input {...field} id="full-name" placeholder="Enter your full name" />
              )}
            />
            {errors.fullName && <span>{errors.fullName.message}</span>}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input {...field} id="email" disabled placeholder="Enter your email" />
              )}
            />
          </div>
          <div>
            <Label htmlFor="mobile">Mobile No.</Label>
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  placeholder="Enter your mobile number"
                  defaultCountry="CH"
                  international
                  countryCallingCodeEditable={false}
                  className="mt-1 flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              )}
            />
            {errors.mobile && <span>{errors.mobile.message}</span>}
          </div>
        </div>
        <DialogFooter className="mt-5 flex justify-end gap-2">
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
