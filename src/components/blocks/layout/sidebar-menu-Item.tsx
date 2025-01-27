import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from 'components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from 'components/ui/collapsible';
import { Icon } from '../menu-icon/menu-icon';
import { SidebarMenuItemProps } from 'models/sidebar';

export const SidebarMenuItemComponent: React.FC<SidebarMenuItemProps> = ({ item, showText }) => {
  const { pathname } = useLocation();
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  // Check if the parent or any child path matches the current path
  const isParentActive = hasChildren && item.children?.some((child) => pathname === child.path);
  const isActive = pathname === item.path || isParentActive;

  if (hasChildren) {
    return (
      <Collapsible className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <div className="flex items-center w-full">
                {item.icon && (
                  <Icon
                    name={item.icon}
                    size={20}
                    className={`${isActive ? 'text-primary' : 'text-high-emphasis'}`}
                  />
                )}
                <span
                  className={`ml-2 ${!showText && 'hidden'} ${isActive ? 'text-primary' : 'text-high-emphasis'}`}
                >
                  {item.name}
                </span>
                {showText && (
                  <ChevronRight
                    className={`${isActive ? 'text-primary' : 'text-high-emphasis'} ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90`}
                  />
                )}
              </div>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.children?.map((child) => {
                const isChildActive = pathname === child.path;
                return (
                  <SidebarMenuSubItem key={child.id}>
                    <SidebarMenuSubButton asChild className={isChildActive ? 'bg-surface' : ''}>
                      <Link to={child.path} className="flex items-center gap-2">
                        {child.icon && (
                          <Icon
                            name={child.icon}
                            size={20}
                            className={isChildActive ? 'text-primary' : 'text-high-emphasis'}
                          />
                        )}
                        <span
                          className={`${!showText ? 'hidden' : ''} ${isChildActive ? 'text-primary' : 'text-high-emphasis'}`}
                        >
                          {child.name}
                        </span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className={isActive ? 'bg-surface' : ''}>
        <Link to={item.path} className="flex items-center gap-2 relative">
          {item.icon && (
            <Icon
              name={item.icon}
              size={20}
              className={`${isActive ? 'text-primary' : 'text-high-emphasis'}`}
            />
          )}
          <span
            className={`${!showText ? 'hidden' : ''} ${isActive ? 'text-primary' : 'text-high-emphasis'}`}
          >
            {item.name}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
