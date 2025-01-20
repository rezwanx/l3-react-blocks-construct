import React, { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';
import DummyProfile from '../../../../../assets/images/dummy_profile.jpg';

type FormData = {
  fullName: string;
  designation: string;
  department: string;
  email: string;
  mobile: string;
  address: string;
  profilePicture: File | null;
};

export const EditProfile = () => {
  const { toast } = useToast();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      designation: '',
      department: '',
      email: '',
      mobile: '',
      address: '',
      profilePicture: null,
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(DummyProfile);

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data); // eslint-disable-line no-console

    toast({
      title: 'Profile Updated',
      description: 'Changes saved!',
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('profilePicture', file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setValue('profilePicture', null);
    setPreviewImage(DummyProfile);
  };

  return (
    <DialogContent className="rounded-md sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle className="text-left">Edit profile details</DialogTitle>
        <DialogDescription>Keep your details accurate and up to date.</DialogDescription>
      </DialogHeader>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center">
          <img
            src={previewImage || DummyProfile}
            alt="Profile"
            className="w-[100px] h-[100px] rounded-full object-cover border border-white shadow-sm"
          />
          <div className="flex flex-col gap-2 ml-9">
            <h1 className="text-xl text-high-emphasis font-semibold">Block Smith</h1>
            <p className="text-sm text-medium-emphasis">
              *.png, *.jpeg files up to 2MB, minimum size 400x400px.
            </p>
            <div className="flex gap-4">
              <Button
                size="sm"
                variant="outline"
                className="text-high-emphasis hover:text-high-emphasis text-[10px] font-bold"
              >
                <Upload className="w-2.5 h-2.5" />
                <label className="cursor-pointer">
                  Upload Image
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-destructive hover:text-destructive text-[10px] font-bold"
                onClick={handleRemoveImage}
              >
                <Trash className="w-2.5 h-2.5" />
                Remove
              </Button>
            </div>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1 sm:col-span-2">
            <Label htmlFor="full-name" className="text-sm font-normal text-high-emphasis">
              Full Name*
            </Label>
            <Controller
              name="fullName"
              control={control}
              rules={{ required: 'Full Name is required' }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="full-name"
                  placeholder="Block Smith"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            />
            {errors.fullName && (
              <span className="text-sm text-destructive">{errors.fullName.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="designation" className="text-sm font-normal text-high-emphasis">
              Designation
            </Label>
            <Controller
              name="designation"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label htmlFor="department" className="text-sm font-normal text-high-emphasis">
              Department
            </Label>
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="administration">Administration</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-normal text-high-emphasis">
              Email
            </Label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address',
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  placeholder="demo@blocks.construct"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            />
            {errors.email && (
              <span className="text-sm text-destructive">{errors.email.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="mobile" className="text-sm font-normal text-high-emphasis">
              Mobile No.
            </Label>
            <Controller
              name="mobile"
              control={control}
              rules={{
                required: 'Mobile number is required',
              }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  placeholder="+41 XX XXX XXXX"
                  onChange={(value) => field.onChange(value)}
                  defaultCountry="CH"
                  international
                  countryCallingCodeEditable={false}
                  className="mt-1 flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              )}
            />
            {errors.mobile && (
              <span className="text-sm text-destructive">{errors.mobile.message}</span>
            )}
          </div>

          <div className="col-span-1 sm:col-span-2">
            <Label htmlFor="address" className="text-sm font-normal text-high-emphasis">
              Address
            </Label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="address"
                  placeholder="Via della Posta 15, 6600 Locarno, Switzerland"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            />
          </div>
        </div>
        <DialogFooter className="mt-[20px] flex flex-row gap-2">
          <DialogTrigger asChild>
            <Button variant="outline" size="default">
              Cancel
            </Button>
          </DialogTrigger>
          <Button type="submit" size="default">
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
