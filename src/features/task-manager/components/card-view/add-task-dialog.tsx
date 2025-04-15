import { useState } from 'react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from 'components/ui/dialog';
import { ITaskManagerColumn } from '../../types/task';

interface AddTaskDialogProps {
  activeColumn: string | null;
  columns: ITaskManagerColumn[];
  onAddTask: (content: string) => void;
}

export function AddTaskDialog({ activeColumn, columns, onAddTask }: AddTaskDialogProps) {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask(newTaskTitle);
      setNewTaskTitle('');
    }
  };

  const activeColumnTitle = activeColumn ? columns.find((c) => c.id === activeColumn)?.title : '';

  return (
    <Dialog>
      <DialogTrigger className="hidden" id="add-task-dialog-trigger">
        Add Task
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <span className="font-xs">{activeColumnTitle}</span>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Task Title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="mr-2 text-white">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleAddTask}>Add Task</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
