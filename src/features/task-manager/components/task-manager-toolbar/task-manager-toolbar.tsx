import { useState } from 'react';
import { AlignJustify, Columns3, ListFilter, Plus, Search } from 'lucide-react';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import TaskBoard from 'pages/task-manager/card-view';
import TaskListView from '/pages/task-manager/task-list-view';

interface TaskManagerToolbarProps {
  onOpen: () => void;
}

export default function TaskManagerToolbar({onOpen}: TaskManagerToolbarProps) {
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
        <Button onClick={onOpen} size="sm" className="h-8 text-sm font-bold">
          <Plus className="h-4 w-4 mr-1" />
          Add Item
        </Button>
      </div>

      {viewMode === 'board' && (
        <div className="mt-4">
          <TaskBoard />
        </div>
      )}
      {viewMode === 'list' && <TaskListView />}
    </div>
  );
}
