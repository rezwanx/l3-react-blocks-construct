import { Bell, Settings } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from 'components/blocks/layout/app-sidebar';
import { UProfileMenu } from 'components/blocks/u-profile-menu';
import { SidebarProvider, SidebarTrigger } from 'components/ui/sidebar';
import LanguageSelector from 'components/blocks/language-selector/language-selector';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1">
          <div className="border-b py-2 px-8 flex justify-between items-center w-full">
            <div>
              <SidebarTrigger />
            </div>
            <div className="text-gray-500 flex justify-between items-center gap-10">
              <Bell />
              <Settings />
              <LanguageSelector />
              <UProfileMenu />
            </div>
          </div>
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
