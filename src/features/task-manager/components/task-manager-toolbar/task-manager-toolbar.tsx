import { useState } from 'react';
import { AlignJustify, Columns3, ListFilter, Plus, Search } from 'lucide-react';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import TaskBoard from 'pages/task-manager/card-view';

export default function TaskManagerToolbar() {
  const [viewMode, setViewMode] = useState('board');

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-1">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-500" />
          <Input placeholder="Search" className="h-8 w-full rounded-lg pl-8" />
        </div>
        <Button variant="outline" size="sm" className="h-8 px-3">
          <ListFilter className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`h-8 px-3 ${viewMode === 'board' ? 'bg-gray-100' : ''}`}
          onClick={() => setViewMode('board')}
        >
          <Columns3 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`h-8 px-3 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
          onClick={() => setViewMode('list')}
        >
          <AlignJustify className="h-4 w-4" />
        </Button>
        <Button size="sm" className="h-8 text-sm font-bold">
          <Plus className="h-4 w-4 mr-1" />
          Add Item
        </Button>
      </div>

      {viewMode === 'board' && (
        <div className="mt-4">
          <TaskBoard />
        </div>
      )}
      {viewMode === 'list' && (
        <div className="mt-4 border rounded-lg">
          <h2 className="text-lg font-semibold p-4 border-b">Task List View</h2>
          <ul className="p-4 space-y-2">
            <li className="p-2 border-b">Task 1</li>
            <li className="p-2 border-b">Task 2</li>
            <li className="p-2 border-b">Task 3</li>
            <li className="p-2 border-b">Task 4</li>
            <li className="p-2 border-b">Task 5</li>
          </ul>
        </div>
      )}
    </div>
  );
}
