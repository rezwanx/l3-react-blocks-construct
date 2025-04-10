import { Tag } from 'lucide-react';

export const getLabelItems = (location: any, navigate: any) => {
  return [
    {
      icon: <Tag className="h-4 w-4 text-purple-500" />,
      label: 'Personal',
      href: '/mail/labels/personal',
    },
    {
      icon: <Tag className="h-4 w-4 text-secondary-400" />,
      label: 'Work',
      href: '/mail/labels/work',
    },
    {
      icon: <Tag className="h-4 w-4 text-emerald-500" />,
      label: 'Payments',
      href: '/mail/labels/payments',
    },
    {
      icon: <Tag className="h-4 w-4 text-rose-500" />,
      label: 'Invoices',
      href: '/mail/labels/invoices',
    },
  ].map((item) => ({
    ...item,
    isActive: location.pathname === item.href,
    onClick: () => navigate(item.href),
  }));
};
