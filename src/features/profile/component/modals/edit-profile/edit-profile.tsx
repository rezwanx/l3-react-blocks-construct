import { Trash, Upload } from 'lucide-react';
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

export const EditProfile = () => {
  return (
    <DialogContent className="rounded-md sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle className="text-left">Edit profile details</DialogTitle>
        <DialogDescription>Keep your details accurate and up to date.</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-5">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/128"
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
                Upload Image
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-destructive hover:text-destructive text-[10px] font-bold"
              >
                <Trash className="w-2.5 h-2.5" />
                Remove
              </Button>
            </div>
          </div>
        </div>
        <Separator />
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1 sm:col-span-2">
            <Label htmlFor="full-name" className="text-sm font-normal text-high-emphasis">
              Full Name*
            </Label>
            <Input
              id="full-name"
              type="text"
              placeholder="Block Smith"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <Label htmlFor="designation" className="text-sm font-normal text-high-emphasis">
              Designation
            </Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="department" className="text-sm font-normal text-high-emphasis">
              Department
            </Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="administration">Administration</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="hr">Hr</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-normal text-high-emphasis">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="demo@blocks.construct"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <Label htmlFor="mobile" className="text-sm font-normal text-high-emphasis">
              Mobile No.
            </Label>
            <div className="flex mt-1">
              <select className="border border-gray-300 rounded-l-md p-2 focus:ring-blue-500 focus:border-blue-500">
                <option>🇨🇭 +41</option>
                <option>🇺🇸 +1</option>
                <option>🇮🇳 +91</option>
              </select>
              <Input
                id="mobile"
                type="tel"
                placeholder="XX XXX XXXX"
                className="block w-full border border-l-0 border-gray-300 rounded-r-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="col-span-1 sm:col-span-2">
            <Label htmlFor="address" className="text-sm font-normal text-high-emphasis">
              Address
            </Label>
            <Input
              id="address"
              placeholder="Via della Posta 15, 6600 Locarno, Switzerland"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            ></Input>
          </div>
        </form>
      </div>
      <DialogFooter className="mt-[20px] flex flex-row gap-2">
        <DialogTrigger asChild>
          <Button variant="outline" size="default">
            Cancel
          </Button>
        </DialogTrigger>
        <Button size="default">Save</Button>
      </DialogFooter>
    </DialogContent>
  );
};
