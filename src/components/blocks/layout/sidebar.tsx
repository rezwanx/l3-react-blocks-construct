// import { Settings, LayoutDashboardIcon, ChevronRight, FileUser } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubItem,
//   SidebarMenuSubButton,
// } from '../../../components/ui/sidebar';
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from '../../../components/ui/collapsible';
// import { menuItems } from 'constant/sidebar-menu';
// import { SidebarMenuItemComponent } from './SidebarMenuItemComponent';

// export function AppSidebar() {
//   return (
//     <Sidebar>
//       <SidebarHeader>
//         <SidebarGroupLabel className="my-2 flex justify-center items-center w-full">
//           {/* Logo can go here */}
//         </SidebarGroupLabel>
//       </SidebarHeader>
//       {/* <SidebarContent>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild>
//               <Link to="/dashboard" className="flex items-center gap-2">
//                 <LayoutDashboardIcon />
//                 <span>Dashboard</span>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//         <SidebarMenu>
//           <Collapsible className="group/collapsible">
//             <SidebarMenuItem>
//               <CollapsibleTrigger asChild>
//                 <SidebarMenuButton className="w-full">
//                   <div className="flex items-center w-full">
//                     <Settings />
//                     <span className="ml-2">Settings</span>
//                     <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
//                   </div>
//                 </SidebarMenuButton>
//               </CollapsibleTrigger>
//               <CollapsibleContent>
//                 <SidebarMenuSub>
//                   <SidebarMenuSubItem>
//                     <SidebarMenuSubButton asChild>
//                       <Link to="/profile" className="flex items-center gap-2">
//                         <FileUser />
//                         <span>Profile</span>
//                       </Link>
//                     </SidebarMenuSubButton>
//                   </SidebarMenuSubItem>
//                 </SidebarMenuSub>
//               </CollapsibleContent>
//             </SidebarMenuItem>
//           </Collapsible>
//         </SidebarMenu>
//       </SidebarContent> */}

// <SidebarContent>
//         {menuItems.map((item) => (
//           <SidebarMenu key={item.id}>
//             <SidebarMenuItemComponent
//               item={item}
//               showText={showText}
//               isActive={pathname.includes(item.path)}
//             />
//           </SidebarMenu>
//         ))}
//       </SidebarContent>
//     </Sidebar>
//   );
// }

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from '../../../components/ui/sidebar';
import { menuItems } from 'constant/sidebar-menu';
import { SidebarMenuItemComponent } from './SidebarMenuItemComponent';
import logo from '../../../assets/images/logo.png';

export function AppSidebar() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showText, setShowText] = useState(true);
  const { pathname } = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroupLabel className="my-2 flex flex-start items-center w-full">
          <div className="w-20 h-10">
            <img src={logo} alt="logo" />
          </div>
        </SidebarGroupLabel>
      </SidebarHeader>
      <div className="ml-4 my-2 text-[10px] font-medium capitalize text-medium-emphasis">
        OVERVIEW
      </div>
      <SidebarContent className="text-base mx-2 my-3 text-high-emphasis font-normal">
        {menuItems.map((item) => (
          <SidebarMenu key={item.id}>
            <SidebarMenuItemComponent
              item={item}
              showText={showText}
              isActive={pathname.includes(item.path)}
            />
          </SidebarMenu>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
