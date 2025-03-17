import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { PlusCircle, Search } from 'lucide-react';

export function ActivityLogToolbar() {
  return (
    <div className="flex gap-1">
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 bg-background" />
        <Input placeholder={`Search`} className="h-8 w-full rounded-lg bg-background pl-8" />
      </div>

      <Button variant="outline" size="sm" className="h-8 border-dashed">
        <PlusCircle />
        Date
      </Button>
      <Button variant="outline" size="sm" className="h-8 border-dashed">
        <PlusCircle />
        Module
      </Button>
    </div>
  );
}

export default ActivityLogToolbar;
