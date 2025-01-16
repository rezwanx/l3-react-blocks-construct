import React from 'react';
import {
  LayoutDashboard,
  Settings,
  User,
  ChevronRight,
  FileUser,
  // Add other icons as needed
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';

// Create a map of icon names to components
const iconMap = {
  LayoutDashboard,
  Settings,
  User,
  ChevronRight,
  FileUser,
  // Add other icons as needed
} as const;

// Get type of icon names from the iconMap
export type IconName = keyof typeof iconMap;

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName;
}

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const LucideIcon = iconMap[name];
  return <LucideIcon {...props} />;
};
