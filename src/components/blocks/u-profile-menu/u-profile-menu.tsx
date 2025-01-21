import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

import { useSignoutMutation } from 'features/auth/hooks/useAuth';
import { useGetAccount } from 'features/settings/profile/hooks/useAccount';
import { useNavigate } from 'react-router-dom';
import avatarSource from '../../../assets/images/avatar.png';
import { useAuthStore } from 'state/store/auth';
import { ChevronDown } from 'lucide-react';

export const UProfileMenu = () => {
  const { logout } = useAuthStore();
  const { mutateAsync } = useSignoutMutation();
  const { data } = useGetAccount();
  const navigate = useNavigate();

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
  const { firstName, lastName, email } = data || {
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email@yopmail.com',
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* <div className="flex items-center gap-1">
            <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <img src={avatarSource} alt="profile pic" />
            </div>
            <div>
              <div>{firstName + ' ' + lastName}</div>
            </div>
          </div> */}
          <div className="flex justify-between items-center gap-2">
            <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <img src={avatarSource} alt="profile pic" className="fill rounded" />
            </div>
            <div>
              <div className="flex flex-row">
                <h2 className="text-high-emphasis">{firstName + ' ' + lastName}</h2>
                <ChevronDown className="h-4 w-4 mt-1 ml-1" />
              </div>
              <p className="text-xs text-low-emphasis">{email}</p>
            </div>
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
          <DropdownMenuItem onClick={signoutHandler}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
