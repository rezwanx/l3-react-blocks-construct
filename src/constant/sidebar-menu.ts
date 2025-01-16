import { MenuItem } from '../models/sidebar';

export const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'LayoutDashboard',
  },
  {
    id: 'settings',
    name: 'Settings',
    path: '/settings',
    icon: 'Settings',
    children: [
      {
        id: 'profile',
        name: 'Profile',
        path: '/profile',
        icon: 'User',
      },
    ],
  },
];
