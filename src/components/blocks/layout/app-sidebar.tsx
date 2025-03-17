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
import logo from '../../../assets/images/selise_Blocks_logo.svg';
import smallLogo from '../../../assets/images/selise_logo_small.svg';

export function AppSidebar() {
  const { pathname } = useLocation();
  const { setOpenMobile, open } = useSidebar();

  const integratedMenuItems = menuItems.filter((item) => item.isIntegrated === true);
  const designOnlyMenuItems = menuItems.filter((item) => item.isIntegrated !== true);

  useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  const sidebarStyle = {
    width: open ? '' : '64px',
    minWidth: open ? '' : '64px',
    transition: 'width 0.3s ease, min-width 0.3s ease',
  };

  return (
    <Sidebar className="bg-white" collapsible="icon" style={sidebarStyle}>
      <SidebarHeader>
        <SidebarGroupLabel className="mt-2 mb-4 flex flex-start items-center w-full">
          {open && (
            <div className="w-20 h-10 ">
              <img src={logo} alt="logo" className="w-full h-full" />
            </div>
          )}
          {!open && (
            <div>
              <img src={smallLogo} alt="smallLogo" className="object-contain" />
            </div>
          )}
        </SidebarGroupLabel>
      </SidebarHeader>

      <SidebarContent className="text-base ml-4 mr-2 my-3 text-high-emphasis font-normal">
        {open && (
          <div className="my-1 w-full ml-2">
            <p className="text-[10px] font-medium uppercase text-medium-emphasis">
              Cloud Integrated
            </p>
          </div>
        )}

        {!open && (
          <div className="my-3 w-full">
            <hr className="border-t border-sidebar-border" />
          </div>
        )}
        {integratedMenuItems.map((item) => (
          <SidebarMenu key={item.id} className="w-full font-medium">
            <SidebarMenuItemComponent
              item={item}
              showText={open}
              isActive={pathname.includes(item.path)}
            />
          </SidebarMenu>
        ))}

        {open && (
          <div className="my-1 w-full ml-2">
            <p className="text-[10px] font-medium uppercase text-medium-emphasis">Design only</p>
          </div>
        )}

        {!open && (
          <div className="my-3 w-full">
            <hr className="border-t border-sidebar-border" />
          </div>
        )}
        {designOnlyMenuItems.map((item) => (
          <SidebarMenu key={item.id} className="w-full font-medium">
            <SidebarMenuItemComponent
              item={item}
              showText={open}
              isActive={pathname.includes(item.path)}
            />
          </SidebarMenu>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
