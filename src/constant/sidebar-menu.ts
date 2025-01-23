import { MenuItem } from '../models/sidebar';

export const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'LayoutDashboard',
  },
  {
    id: 'iam',
    name: 'IAM',
    path: '/identity-management',
    icon: 'Users',
  },
  {
    id: 'services',
    name: 'Services',
    path: '/services',
    icon: 'Server',
    children: [
      {
        id: 'profile',
        name: 'Profile',
        path: '/profile',
        icon: 'User',
      },
    ],
  },
  {
    id: 'help',
    name: 'Help',
    path: '/help',
    icon: 'CircleHelp',
  },
];
