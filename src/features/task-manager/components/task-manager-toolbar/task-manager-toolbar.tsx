import { AlignJustify, Columns3, ListFilter, Plus, Search } from 'lucide-react';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';

export default function TaskManagerToolbar() {
  return (
    <div className="flex gap-1">
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 bg-background" />
        <Input placeholder={`Search`} className="h-8 w-full rounded-lg bg-background pl-8" />
      </div>
      <Button variant="outline" size="sm" className="h-8 px-3">
        <ListFilter className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="sm" className="h-8 px-3">
        <Columns3 className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm" className="h-8 px-3">
        <AlignJustify className="h-4 w-4" />
      </Button>

      <Button size="sm" className="h-8 text-sm font-bold">
        <Plus />
        Add Item
      </Button>
    </div>
  );
}
