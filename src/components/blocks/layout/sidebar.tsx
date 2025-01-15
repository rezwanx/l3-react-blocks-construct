// import {
//   Settings,
//   LayoutDashboardIcon,
//   ChevronRight,
//   FileUser,
// } from "lucide-react";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "../../../components/ui/sidebar";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "../../../components/ui/collapsible";

// export function AppSidebar() {
//   return (
//     <Sidebar>
//       <SidebarHeader>
//         <SidebarGroupLabel className="my-2 flex justify-center items-center w-full">
//           {/* <Image src={blockLogo} alt="logo" width="100" /> */}
//         </SidebarGroupLabel>
//       </SidebarHeader>
//       <SidebarContent>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild>
//               {/* <Link href="/"> */}
//                 <LayoutDashboardIcon />
//                 <span>Dashboard</span>
//               {/* </Link> */}
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//         <SidebarMenu>
//           <Collapsible className="group/collapsible">
//             <SidebarMenuItem>
//               <CollapsibleTrigger asChild>
//                 <SidebarMenuButton>
//                   <Settings /> <span>Settings</span>
//                   <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
//                 </SidebarMenuButton>
//               </CollapsibleTrigger>
//               <CollapsibleContent>
//                 <SidebarMenuSub>
//                   <SidebarMenuSubItem>
//                     <SidebarMenuSubButton asChild>
//                       {/* <Link href="/settings/profile"> */}
//                         <FileUser />
//                         <span>Profile</span>
//                       {/* </Link> */}
//                     </SidebarMenuSubButton>
//                   </SidebarMenuSubItem>
//                 </SidebarMenuSub>
//               </CollapsibleContent>
//             </SidebarMenuItem>
//           </Collapsible>
//         </SidebarMenu>
//       </SidebarContent>
//     </Sidebar>
//   );
// }

import { Settings, LayoutDashboardIcon, ChevronRight, FileUser } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '../../../components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../components/ui/collapsible';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroupLabel className="my-2 flex justify-center items-center w-full">
          {/* Logo can go here */}
        </SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/dashboard" className="flex items-center gap-2">
                <LayoutDashboardIcon />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <Collapsible className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full">
                  <div className="flex items-center w-full">
                    <Settings />
                    <span className="ml-2">Settings</span>
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </div>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link to="/profile" className="flex items-center gap-2">
                        <FileUser />
                        <span>Profile</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
