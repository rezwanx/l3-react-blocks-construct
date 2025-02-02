import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Moon, Sun } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import { useSignoutMutation } from 'features/auth/hooks/use-auth';
import { useAuthStore } from 'state/store/auth';
import { useNavigate } from 'react-router-dom';
import DummyProfile from '../../../assets/images/dummy_profile.png';
import { Skeleton } from 'components/ui/skeleton';
import { useGetAccount } from 'features/profile/hooks/use-account';

export const UProfileMenu = () => {
  const [theme, setTheme] = useState('light');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { logout } = useAuthStore();
  const { mutateAsync } = useSignoutMutation();
  const navigate = useNavigate();

  const { data, isLoading, isFetching } = useGetAccount();

  const signoutHandler = async () => {
    try {
      const res = await mutateAsync();
      if (res.isSuccess) {
        logout();
        navigate('/login');
      }
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

  const fullName = `${data?.firstName || ''} ${data?.lastName || ''}`.trim() || ' ';

  const loading = isLoading || isFetching;

  return (
    <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>
      <DropdownMenuTrigger asChild className="hover:bg-muted cursor-pointer p-1 rounded-[2px]">
        <div className="flex justify-between items-center gap-3 cursor-pointer">
          <div className="relative overflow-hidden rounded-full border shadow-sm border-white h-8 w-8">
            {loading ? (
              <Skeleton className="h-8 w-8 rounded-full" />
            ) : (
              <img
                src={data?.profileImageUrl || DummyProfile}
                alt="profile pic"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col">
            {loading ? (
              <Skeleton className="w-24 h-4 mb-1" />
            ) : (
              <h2 className="text-xs font-semibold text-high-emphasis">{fullName}</h2>
            )}
            <p className="text-[10px] text-low-emphasis capitalize">Admin</p>
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
        <DropdownMenuItem onClick={() => navigate('profile')}>My Profile</DropdownMenuItem>
        <DropdownMenuItem disabled>About</DropdownMenuItem>
        <DropdownMenuItem disabled>Privacy Policy</DropdownMenuItem>
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
