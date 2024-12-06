import { ReactNode } from "react";
import { AppSidebar } from "@/components/blocks/layout/sidebar";
import { UProfileMenu } from "@/components/blocks/u-profile-menu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider className="flex">
      <AppSidebar />
      <div className="flex-1">
        <div className="border-b py-2 px-8 flex justify-between items-center w-full">
          <div>
            <SidebarTrigger />
          </div>
          <div className="text-gray-500 flex justify-between items-center gap-10">
            <UProfileMenu />
          </div>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </SidebarProvider>
  );
}
