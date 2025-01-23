import { useState, useEffect } from 'react';
import { Camera, LoaderCircle, Lock, Pencil, ShieldCheck } from 'lucide-react';
import { useToast } from 'hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import { Dialog } from 'components/ui/dialog';
import { EditProfile } from '../modals/edit-profile/edit-profile';
import DummyProfile from '../../../../assets/images/dummy_profile.jpg';
import { User } from 'types/user.type';
import { getAccount } from '../../services/accounts.service';

export const GeneralInfo = () => {
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<string>(DummyProfile);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const data = await getAccount();
        setUserInfo(data);
      } catch (error) {
        console.error('Failed to fetch account data:', error);
        toast({
          color: 'text-destructive',
          title: 'Error',
          description: 'Failed to fetch account information.',
        });
      }
    };

    fetchAccountData();
  }, [toast]);

  const handleImageChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = async (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center">
        <LoaderCircle className="animate-spin text-primary h-8 w-8" />
      </div>
    );
  }

  const joinedDate = new Date(userInfo.createdDate);
  const openEditModal = () => setIsModalOpen(true);
  const closeEditModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full border-none rounded-[8px] shadow-sm">
        <CardHeader className="p-0">
          <CardTitle />
          <CardDescription />
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="relative w-16 h-16">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-1 border-white shadow-sm"
                />
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shadow-lg">
                  <label htmlFor="profileImageUpload" className="cursor-pointer">
                    <Camera className="text-primary h-3 w-3" />
                  </label>
                  <input
                    id="profileImageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e.target.files)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 ml-9">
                <h1 className="text-xl text-high-emphasis font-semibold">
                  {userInfo.firstName} {userInfo.lastName}
                </h1>
                <p className="text-sm text-medium-emphasis">ID123456</p>
              </div>
            </div>
            <Button size="sm" variant="ghost" onClick={openEditModal}>
              <Pencil className="w-3 h-3 text-primary" />
              <span className="text-primary text-sm font-bold sr-only sm:not-sr-only sm:whitespace-nowrap">
                Edit
              </span>
            </Button>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <EditProfile userInfo={userInfo} onClose={closeEditModal} />
            </Dialog>
          </div>
          <Separator orientation="horizontal" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-medium-emphasis text-[10px] font-normal uppercase">Date Joined</p>
              <p className="text-high-emphasis text-sm">
                {joinedDate.toLocaleDateString('en-US')}, {joinedDate.toLocaleTimeString('en-US')}
              </p>
            </div>
            <div>
              <p className="text-medium-emphasis text-[10px] font-normal uppercase">Mobile No.</p>
              <p className="text-high-emphasis text-sm">{userInfo.phoneNumber}</p>
            </div>
            <div>
              <p className="text-medium-emphasis text-[10px] font-normal uppercase">Email</p>
              <p className="text-high-emphasis text-sm">{userInfo.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full border-none rounded-[8px] shadow-sm">
        <CardHeader className="space-y-0 p-0">
          <CardTitle />
          <CardDescription />
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <h1 className="text-xl text-high-emphasis font-semibold">Account security</h1>
          <Separator orientation="horizontal" />
          <div className="flex flex-col py-2 gap-10">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h1 className="text-sm text-high-emphasis font-bold">Two-factor authentication</h1>
                <p className="text-sm text-medium-emphasis">
                  Enhance your security with app or email-based authenticator.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="text-low-emphasis text-[10px] font-bold"
              >
                <ShieldCheck className="w-2.5 h-2.5" />
                Enable
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h1 className="text-sm text-high-emphasis font-bold">Change password</h1>
                <p className="text-sm text-medium-emphasis">
                  Update your password to keep your account safe.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="text-primary hover:text-primary text-[10px] font-bold"
              >
                <Lock className="w-2.5 h-2.5" />
                Update Password
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
