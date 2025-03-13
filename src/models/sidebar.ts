export interface MenuItem {
  id: string;
  name: string;
  path: string;
  isIntegrated?: boolean;
  icon?:
    | 'LayoutDashboard'
    | 'Users'
    | 'FileUser'
    | 'ChevronRight'
    | 'User'
    | 'Server'
    | 'Store'
    | 'CircleHelp';
  children?: MenuItem[];
}

export interface SidebarMenuItemProps {
  item: MenuItem;
  showText: boolean;
  isActive: boolean;
}
