import { Bell, Library } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '../../components/blocks/layout/app-sidebar';
import { UProfileMenu } from '../../components/blocks/u-profile-menu';
import { SidebarTrigger, useSidebar } from '../../components/ui/sidebar';
import LanguageSelector from '../../components/blocks/language-selector/language-selector';
import { Button } from '../../components/ui/button';

export default function MainLayout() {
  const { open, isMobile } = useSidebar();

  return (
    <div className="flex w-full min-h-screen relative">
      <div className="absolute left-0 top-0 h-full">
        <AppSidebar />
      </div>

      <div
        className={`flex flex-col w-full h-full ${
          isMobile ? 'ml-0' : open ? 'ml-[var(--sidebar-width)]' : 'ml-16'
        } transition-[margin-left] duration-300 ease-in-out`}
      >
        <div className="sticky bg-card z-20 top-0 border-b py-2 px-4 sm:px-6 md:px-8 flex justify-between items-center w-full">
          <div className="flex items-center">
            <SidebarTrigger className="pl-0" />
          </div>
          <div className="flex justify-between items-center gap-1 sm:gap-3 md:gap-8">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted">
              <Library className="!w-5 !h-5 text-medium-emphasis" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted">
              <Bell className="!w-5 !h-5 text-medium-emphasis" />
            </Button>
            <LanguageSelector />
            <div className="border-l border-gray-300 h-4"></div>
            <UProfileMenu />
          </div>
        </div>
        <div className="flex-1 bg-surface p-4 sm:p-6 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
