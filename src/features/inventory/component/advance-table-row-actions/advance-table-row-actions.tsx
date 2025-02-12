import { Row } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';
import { Button } from 'components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import { IamData } from 'features/iam/services/user-service';

interface DataTableRowActionsProps {
  row: Row<IamData>;
}

export function AdvanceTableRowActions({ row }: DataTableRowActionsProps) {
  const user = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="text-medium-emphasis"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuItem>View details</DropdownMenuItem>

        {user.active ? (
          <>
            <DropdownMenuItem>Reset password</DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => e.stopPropagation()}
              disabled
              className="text-error cursor-not-allowed opacity-50"
            >
              Deactivate user
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem>Resend activation link</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
