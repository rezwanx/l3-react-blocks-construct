export interface ITask {
  id: string;
  content: string;
  priority?: 'High' | 'Medium' | 'Low';
  tags?: string[];
  dueDate?: string;
  comments?: number;
  attachments?: number;
  assignees?: string[];
  status?: 'todo' | 'inprogress' | 'done';
}

export interface ITaskManagerColumn {
  id: string;
  title: string;
  tasks: ITask[];
}

export interface ITaskColumnProps {
  column: ITaskManagerColumn;
  tasks: ITask[];
  setActiveColumn: (id: string) => void;
}

export const statusDisplay = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done',
};
