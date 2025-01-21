// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from 'components/ui/dropdown-menu';

// import { useGetAccount } from 'features/settings/profile/hooks/useAccount';
// import { useNavigate } from 'react-router-dom';
// import { useAuthStore } from 'state/store/auth';
// import { ChevronDown, Moon, Sun } from 'lucide-react';
// import { useTheme } from 'components/core/theme-provider';
// import { Button } from 'components/ui/button';

// export const UProfileMenu = () => {
//   const { logout } = useAuthStore();
//   const { mutateAsync } = useSignoutMutation();
//   const { data } = useGetAccount();
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { setTheme, theme } = useTheme();

//   const signoutHandler = async () => {
//     try {
//       await mutateAsync();
//       logout();
//       navigate('/signin');
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (_error) {
//       /* empty */
//     }
//   };
//   const { firstName, lastName, email } = data || {
//     firstName: '',
//     lastName: '',
//     email: '',
//   };
//   return (
//     // <div>
//     //   <DropdownMenu>
//     //     <DropdownMenuTrigger asChild>
//     //       <div className="flex justify-between items-center gap-2">
//     //         <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
//     //           <img src={avatarSource} alt="profile pic" className="fill rounded" />
//     //         </div>
//     //         <div>
//     //           <div className="flex flex-row">
//     //             <h2 className="text-high-emphasis">{firstName + ' ' + lastName}</h2>
//     //             <ChevronDown className="h-4 w-4 mt-1 ml-1" />
//     //           </div>
//     //           <p className="text-xs text-low-emphasis">{email}</p>
//     //         </div>
//     //       </div>
//     //     </DropdownMenuTrigger>
//     //     <DropdownMenuContent
//     //       className="w-56 text-medium-emphasis"
//     //       align="end"
//     //       side="top"
//     //       sideOffset={10}
//     //     >
//     //       <DropdownMenuLabel>My Account</DropdownMenuLabel>
//     //       <DropdownMenuSeparator />
//     //       <DropdownMenuItem>My selise</DropdownMenuItem>
//     //       <DropdownMenuItem>About</DropdownMenuItem>
//     //       <DropdownMenuItem>Privacy Policy</DropdownMenuItem>
//     //       <DropdownMenuSeparator />
//     //       <DropdownMenuItem onClick={signoutHandler}>Log out</DropdownMenuItem>
//     //     </DropdownMenuContent>
//     //   </DropdownMenu>
//     // </div>

//     <div className="flex items-center gap-4">
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" size="icon">
//             <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//             <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//             <span className="sr-only">Toggle theme</span>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           {/* <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
//           <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
//           <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem> */}
//           <DropdownMenuItem
//             onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//             className="flex justify-between items-center cursor-pointer"
//           >
//             <span>Theme</span>
//             <div className="relative w-6 h-6">
//               <Sun
//                 className={`h-4 w-4 absolute transition-all ${
//                   theme === 'dark' ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
//                 }`}
//               />
//               <Moon
//                 className={`h-4 w-4 absolute transition-all ${
//                   theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
//                 }`}
//               />
//             </div>
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <div className="flex justify-between items-center gap-2 cursor-pointer">
//             <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
//               <img src={avatarSource} alt="profile pic" className="fill rounded" />
//             </div>
//             <div>
//               <div className="flex flex-row">
//                 <h2 className="text-high-emphasis">{firstName + ' ' + lastName}</h2>
//                 <ChevronDown className="h-4 w-4 mt-1 ml-1" />
//               </div>
//               <p className="text-xs text-low-emphasis">{email}</p>
//             </div>
//           </div>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent
//           className="w-56 text-medium-emphasis"
//           align="end"
//           side="top"
//           sideOffset={10}
//         >
//           <DropdownMenuLabel>My Account</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem>My selise</DropdownMenuItem>
//           <DropdownMenuItem>About</DropdownMenuItem>
//           <DropdownMenuItem>Privacy Policy</DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem onClick={signoutHandler}>Log out</DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// };

import { useEffect, useState } from 'react';
import { ChevronDown, Moon, Sun } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import avatarSource from '../../../assets/images/avatar.png';
import { useGetAccount } from 'features/settings/profile/hooks/useAccount';
import { useSignoutMutation } from 'features/auth/hooks/useAuth';
import { useAuthStore } from 'state/store/auth';
import { useNavigate } from 'react-router-dom';

export const UProfileMenu = () => {
  const [theme, setTheme] = useState('light');
  const { logout } = useAuthStore();
  const { data } = useGetAccount();
  const { mutateAsync } = useSignoutMutation();
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

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-between items-center gap-2 cursor-pointer">
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
          <DropdownMenuItem
            onClick={toggleTheme}
            className="flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
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
    </div>
  );
};
