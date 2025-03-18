import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from '../../ui/sidebar';
import { menuItems } from '../../../constant/sidebar-menu';
import { SidebarMenuItemComponent } from './sidebar-menu-Item';
import logo from 'assets/images/selise_Blocks_logo.svg';

export function AppSidebar() {
  const { pathname } = useLocation();
  const { setOpenMobile } = useSidebar();

  const integratedMenuItems = menuItems.filter((item) => item.isIntegrated === true);
  const designOnlyMenuItems = menuItems.filter((item) => item.isIntegrated !== true);

  useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  return (
    <Sidebar className="bg-white">
      <SidebarHeader>
        <SidebarGroupLabel className="mt-2 mb-4 flex flex-start items-center w-full">
          <div className="w-20 h-10 ">
            <img src={logo} alt="logo" className="w-full h-full" />
          </div>
        </SidebarGroupLabel>
      </SidebarHeader>

      <SidebarContent className="text-base ml-4 mr-2 my-3 text-high-emphasis font-normal">
        <div className="my-1">
          <p className="text-[10px] font-medium uppercase text-medium-emphasis">Cloud Integrated</p>
        </div>
        {integratedMenuItems.map((item) => (
          <SidebarMenu key={item.id} className="font-semibold">
            <SidebarMenuItemComponent
              item={item}
              showText={true}
              isActive={pathname.includes(item.path)}
            />
          </SidebarMenu>
        ))}
        <div className="my-1">
          <p className="text-[10px] font-medium uppercase text-medium-emphasis">Design only</p>
        </div>
        {designOnlyMenuItems.map((item) => (
          <SidebarMenu key={item.id} className="font-semibold">
            <SidebarMenuItemComponent
              item={item}
              showText={true}
              isActive={pathname.includes(item.path)}
            />
          </SidebarMenu>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
