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

export const SidebarMenuItemComponent: React.FC<SidebarMenuItemProps> = ({
  item,
  showText,
  isActive,
}) => {
  const { pathname } = useLocation();
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <Collapsible className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <div className="flex items-center w-full">
                {item.icon && <Icon name={item.icon} size={20} className="shrink-0" />}
                <span className={`ml-2 ${!showText && 'hidden'}`}>{item.name}</span>
                {showText && (
                  <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                )}
                {isActive && (
                  <span
                    className={`absolute bottom-0 top-0 w-1 ${
                      showText ? 'right-0' : 'left-[51px]'
                    } my-2 rounded-l-md bg-primary`}
                  />
                )}
              </div>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.children?.map((child) => (
                <SidebarMenuSubItem key={child.id}>
                  <SidebarMenuSubButton asChild>
                    <Link to={child.path} className="flex items-center gap-2">
                      {child.icon && <Icon name={child.icon} size={20} className="shrink-0" />}
                      <span className={!showText ? 'hidden' : ''}>{child.name}</span>
                      {pathname.includes(child.path) && (
                        <span
                          className={`absolute bottom-0 top-0 w-1 ${
                            showText ? 'right-0' : 'left-[51px]'
                          } my-2 rounded-l-md bg-primary`}
                        />
                      )}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link to={item.path} className="flex items-center gap-2 relative">
          {item.icon && <Icon name={item.icon} size={20} className="shrink-0" />}
          <span className={!showText ? 'hidden' : ''}>{item.name}</span>
          {isActive && (
            // <span className={`absolute inset-0 w-full h-8  rounded-l-md bg-primary text-white`} />
            <span
              className={`absolute bottom-0 top-0 w-1 ${
                showText ? 'right-0' : 'left-[51px]'
              } my-2 rounded-l-md bg-primary`}
            />
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
