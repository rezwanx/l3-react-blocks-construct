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
    id: 'inventory',
    name: 'Inventory',
    path: '/inventory',
    icon: 'Store',
  },
  {
    id: 'mail',
    name: 'Mail',
    path: '/mail',
    icon: 'Inbox',
  },
  // {
  //   id: 'services',
  //   name: 'Services',
  //   path: '/services',
  //   icon: 'Server',
  //   children: [
  //     {
  //       id: 'mail',
  //       name: 'Mail',
  //       path: '/services/mail',
  //     },
  //     {
  //       id: 'storage',
  //       name: 'Storage',
  //       path: '/services/storage',
  //     },
  //   ],
  // },
  // {
  //   id: 'help',
  //   name: 'Help',
  //   path: '/help',
  //   icon: 'CircleHelp',
  // },
];
