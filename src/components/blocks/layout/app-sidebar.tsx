import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, useSidebar } from '../../ui/sidebar';
import { menuItems } from '../../../constant/sidebar-menu';
import { SidebarMenuItemComponent } from './sidebar-menu-Item';
import logo from 'assets/images/selise_Blocks_logo.svg';
import smallLogo from 'assets/images/selise_logo_small.svg';

/**
 * AppSidebar Component
 *
 * A responsive, collapsible sidebar navigation component that displays application menu items
 * organized into integrated and design-only categories.
 *
 * Features:
 * - Collapsible sidebar with smooth transition animations
 * - Different logos for expanded and collapsed states
 * - Auto-collapses on mobile when route changes
 * - Separates menu items into categorized sections
 * - Highlights active navigation items based on current route
 * - Supports both icon-only and icon-with-text display modes
 *
 * Dependencies:
 * - Requires useSidebar context for controlling sidebar state
 * - Uses React Router's useLocation for active item highlighting
 * - Consumes menuItems data structure for navigation options
 * - Uses custom SidebarMenuItemComponent for rendering individual menu items
 *
 * @returns {JSX.Element} A collapsible sidebar navigation component
 *
 * @example
 * // Basic usage in layout component
 * <AppLayout>
 *   <AppSidebar />
 *   <MainContent />
 * </AppLayout>
 *
 * // With SidebarProvider
 * <SidebarProvider>
 *   <AppLayout>
 *     <AppSidebar />
 *     <MainContent />
 *   </AppLayout>
 * </SidebarProvider>
 */

export function AppSidebar() {
  const { pathname } = useLocation();
  const { setOpenMobile, open } = useSidebar();

  const integratedMenuItems = menuItems.filter((item) => item.isIntegrated === true);
  const designOnlyMenuItems = menuItems.filter((item) => item.isIntegrated !== true);

  useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  // Fix with explicit width values
  const sidebarStyle = {
    width: open ? 'var(--sidebar-width)' : '64px',
    minWidth: open ? 'var(--sidebar-width)' : '64px',
    transition: 'width 0.3s ease, min-width 0.3s ease',
    height: '100%',
    borderRight: '1px solid var(--border-color, #e2e8f0)',
  };

  return (
    <Sidebar className="bg-card h-full" collapsible="icon" style={sidebarStyle}>
      <SidebarHeader className="p-2">
        <div className="relative h-10 w-full">
          <img
            src={logo}
            alt="logo"
            className={`absolute left-4 top-1 h-10 w-auto max-w-full transition-all duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          />

          <img
            src={smallLogo}
            alt="smallLogo"
            className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 transition-all duration-300 ${open ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          />
        </div>
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
