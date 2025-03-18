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
    isIntegrated: true,
  },
  {
    id: 'inventory',
    name: 'Inventory',
    path: '/inventory',
    icon: 'Store',
    isIntegrated: true,
  },
  {
    id: 'mail',
    name: 'Mail',
    path: '/mail',
    icon: 'Inbox',
  },{
    id: 'activity-log',
    name: 'Activity log',
    path: '/activity-log',
    icon: 'FileClock',
  }
];
