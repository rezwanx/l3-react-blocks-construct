import { Button } from 'components/ui/button';
import { cn } from 'lib/utils';
import {
  AlertCircle,
  AlertTriangle,
  FileText,
  Mail,
  Send,
  SquarePen,
  Star,
  Tag,
  Trash2,
} from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  count?: number;
  isActive?: boolean;
}

function NavItem({ icon, label, count, isActive }: NavItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        'flex w-full justify-start gap-2 h-10 text-high-emphasis ',
        isActive && 'bg-surface text-primary-600'
      )}
    >
      {icon}
      <span className="flex-1 text-left text-base">{label}</span>
      {count !== undefined && (
        <span className={`text-sm ${isActive ? 'text-primary-600' : ''}`}>{count}</span>
      )}
    </Button>
  );
}

export function EmailSidebar() {
  return (
    <div className="flex min-w-[280px] flex-col ">
      <div className=" p-4">
        <h2 className="text-2xl font-bold tracking-tight">Mail</h2>
      </div>
      <div className="py-4">
        <div className="px-2">
          <Button variant="default" className="flex items-center w-full">
            <SquarePen size={20} />
            Compose
          </Button>
        </div>
      </div>
      <div className="flex-1  px-2">
        <NavItem icon={<Mail className="h-4 w-4" />} label="Inbox" count={50} isActive />
        <NavItem icon={<Star className="h-4 w-4" />} label="Starred" />
        <NavItem icon={<AlertCircle className="h-4 w-4" />} label="Important" />
        <NavItem icon={<Send className="h-4 w-4" />} label="Sent" />
        <NavItem icon={<FileText className="h-4 w-4" />} label="Draft" count={8} />
        <NavItem icon={<AlertTriangle className="h-4 w-4" />} label="Spam" count={14} />
        <NavItem icon={<Trash2 className="h-4 w-4" />} label="Trash" />

        <div className="">
          <h2 className=" px-4 py-2 text-[10px] font-semibold uppercase text-muted-foreground">
            Labels
          </h2>
          <NavItem icon={<Tag className="h-4 w-4 text-rose-500" />} label="Personal" />
          <NavItem icon={<Tag className="h-4 w-4 text-sky-500" />} label="Work" />
          <NavItem icon={<Tag className="h-4 w-4 text-emerald-500" />} label="Payments" />
          <NavItem icon={<Tag className="h-4 w-4 text-rose-500" />} label="Invoices" />
        </div>
      </div>
    </div>
  );
}

{
  /* <div><h2 className="text-2xl font-bold tracking-tight">Mail</h2></div> */
}
