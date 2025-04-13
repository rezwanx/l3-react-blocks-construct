import { useState } from 'react';
import { AlignJustify, Columns3, ListFilter, Plus, Search } from 'lucide-react';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import TaskBoard from 'pages/task-manager/card-view';
import TaskListView from './task-list-view';
// import TaskListViewV1 from 'features/task-manager/components/list-view/task-list-view-v1';

export default function TaskManager() {
  const [viewMode, setViewMode] = useState('board');

  return (
    <div className="flex w-full flex-col">
      <div className="mb-[18px] flex items-center justify-between md:mb-[32px]">
        <h3 className="text-2xl font-bold tracking-tight text-high-emphasis">Task Manager</h3>
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
      </div>

      {viewMode === 'board' && <TaskBoard />}
      {viewMode === 'list' && <TaskListView />}
    </div>
  );
}
