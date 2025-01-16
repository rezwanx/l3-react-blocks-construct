export interface MenuItem {
  id: string;
  name: string;
  path: string;
  icon: 'LayoutDashboard' | 'Settings' | 'FileUser' | 'ChevronRight' | 'User';
  children?: MenuItem[];
}

export interface SidebarMenuItemProps {
  item: MenuItem;
  showText: boolean;
  isActive: boolean;
}
