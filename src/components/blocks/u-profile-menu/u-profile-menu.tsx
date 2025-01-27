import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Moon, Sun } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import { useSignoutMutation } from 'features/auth/hooks/use-auth';
import { useAuthStore } from 'state/store/auth';
import { useNavigate } from 'react-router-dom';
import { getAccount } from 'features/profile/services/accounts.service';
import { useToast } from 'hooks/use-toast';
import { User } from 'types/user.type';
import DummyProfile from '../../../assets/images/dummy_profile.jpg';

export const UProfileMenu = () => {
  const [theme, setTheme] = useState('light');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileInfo, setProfileInfo] = useState<User | null>(null);
  const { logout } = useAuthStore();
  const { mutateAsync } = useSignoutMutation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const data = await getAccount();
        setProfileInfo(data);
      } catch (error) {
        console.error('Failed to fetch account data:', error);
        toast({
          color: 'text-destructive',
          title: 'Error',
          description: 'Failed to fetch profile information.',
        });
      }
    };

    fetchAccountData();
  }, [toast]);

  const signoutHandler = async () => {
    try {
      await mutateAsync();
      logout();
      navigate('/signin');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      /* empty */
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const fullName = `${profileInfo?.firstName || ''} ${profileInfo?.lastName || ''}`.trim() || ' ';

  return (
    <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>
      <DropdownMenuTrigger asChild className="hover:bg-muted cursor-pointer p-1 rounded-[2px]">
        <div className="flex justify-between items-center gap-3 cursor-pointer">
          <div className="relative overflow-hidden rounded-full border shadow-sm border-white">
            <img
              src={profileInfo?.profileImageUrl || DummyProfile}
              alt="profile pic"
              className="h-8 w-8"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xs font-semibold text-high-emphasis">{fullName}</h2>
            <p className="text-[10px] text-low-emphasis uppercase">Admin</p>
          </div>
          {isDropdownOpen ? (
            <ChevronUp className="h-5 w-5 text-medium-emphasis" />
          ) : (
            <ChevronDown className="h-5 w-5 text-medium-emphasis" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 text-medium-emphasis"
        align="end"
        side="top"
        sideOffset={10}
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>My selise</DropdownMenuItem>
        <DropdownMenuItem>About</DropdownMenuItem>
        <DropdownMenuItem>Privacy Policy</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={toggleTheme}
          className="flex justify-between items-center cursor-pointer"
        >
          <span>Theme</span>
          <div className="relative w-6 h-6">
            {theme === 'light' && (
              <Sun
                className="absolute transform transition-all duration-200 cursor-pointer"
                size={20}
                onClick={() => {
                  setTheme('dark');
                  localStorage.setItem('theme', 'dark');
                  document.documentElement.classList.add('dark');
                }}
              />
            )}
            {theme === 'dark' && (
              <Moon
                className="absolute transform transition-all duration-200 cursor-pointer"
                size={20}
                onClick={() => {
                  setTheme('light');
                  localStorage.setItem('theme', 'light');
                  document.documentElement.classList.remove('dark');
                }}
              />
            )}
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signoutHandler}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
