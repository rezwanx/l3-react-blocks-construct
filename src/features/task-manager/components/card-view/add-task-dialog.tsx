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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';
import { ITaskManagerColumn, statusDisplay } from '../../types/task';
import React from 'react';

interface AddTaskDialogProps {
  activeColumn: string | null;
  columns: ITaskManagerColumn[];
  onAddTask: (columnId: string, content: string) => void;
}

export function AddTaskDialog({ activeColumn, onAddTask }: AddTaskDialogProps) {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [selectedColumnId, setSelectedColumnId] = useState<string>(activeColumn || 'todo');

  React.useEffect(() => {
    if (activeColumn) {
      setSelectedColumnId(activeColumn);
    }
  }, [activeColumn]);

  const handleAddTask = () => {
    if (newTaskTitle.trim() && selectedColumnId) {
      onAddTask(selectedColumnId, newTaskTitle);
      setNewTaskTitle('');
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="hidden" id="add-task-dialog-trigger">
        Add Task
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex gap-4">
            <div className="flex-grow">
              <Input
                placeholder="Task Title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-36 flex-shrink-0">
              <Select
                value={selectedColumnId}
                onValueChange={(value) => setSelectedColumnId(value)}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="todo">{statusDisplay.todo}</SelectItem>
                    <SelectItem value="inprogress">{statusDisplay.inprogress}</SelectItem>
                    <SelectItem value="done">{statusDisplay.done}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="mr-2">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleAddTask} disabled={!newTaskTitle.trim()}>
              Add Task
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
