import {
  Inbox,
  Settings,
  LayoutDashboardIcon,
  Store,
  Car,
  ChevronRight,
} from "lucide-react";
import blockLogo from "@/assets/blocks_logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroupLabel className="my-2 flex justify-center items-center w-full">
          <Image src={blockLogo} alt="logo" width="100" />
        </SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuButton asChild>
            <Link href="/dashboard">
              <LayoutDashboardIcon />
              <SidebarMenuItem>Dashboard</SidebarMenuItem>
            </Link>
          </SidebarMenuButton>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuButton asChild>
            <Link href="/parking">
              <Inbox />
              <SidebarMenuItem>Parking</SidebarMenuItem>
            </Link>
          </SidebarMenuButton>
        </SidebarMenu>
        <SidebarMenu>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <Settings /> <SidebarMenuItem>Configuration</SidebarMenuItem>
                  <SidebarMenuAction>
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuAction>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubButton asChild>
                    <Link href="/configuration/spaces">
                      <Store />
                      <SidebarMenuSubItem>Spaces</SidebarMenuSubItem>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSub>
                <SidebarMenuSub>
                  <SidebarMenuSubButton asChild>
                    <Link href="/configuration/vehicle-types">
                      <Car />
                      <SidebarMenuSubItem>Vehicle Types</SidebarMenuSubItem>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
