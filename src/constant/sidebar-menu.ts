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
        id: 'authentication',
        name: 'Authentication',
        path: '/authentication',
      },
      {
        id: 'mail',
        name: 'Mail',
        path: '/mail',
      },
      {
        id: 'storage',
        name: 'Storage',
        path: '/storage',
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
