import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

import { useSignoutMutation } from 'features/auth/hooks/useAuth';
import { useGetAccount } from 'features/settings/profile/hooks/useAccount';
import { useNavigate } from 'react-router-dom';
// import avatarSource from '@/assets/bg-auth.png';
import { useAuthStore } from 'state/store/auth';

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
    firstName: '',
    lastName: '',
    email: '',
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
            {/* <img src={avatarSource} alt="profile pic" /> */}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 " align="end" side="top" sideOffset={10}>
          <DropdownMenuLabel>Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <div className="flex justify-between items-center gap-2">
                <div className="relative w-8 h-8 rounded">
                  {/* <img
                    src={avatarSource}
                    alt="profile pic"
                    fill={true}
                    className="fill rounded"
                  /> */}
                </div>
                <div>
                  <h2>{firstName + ' ' + lastName}</h2>
                  <p className="text-xs text-gray-500">{email}</p>
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
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
