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
  },
  {
    id: 'mail',
    name: 'Mail',
    path: '/mail/inbox',
    icon: 'Inbox',
  },
  {
    id: 'activity-log-v2',
    name: 'Activity log v2.0',
    path: '/activity-log-v2',
    icon: 'FileClock',
  },
  {
    id: 'task-manager',
    name: 'Task Manager',
    path: '/task-manager',
    icon: 'Presentation',
  },
];
