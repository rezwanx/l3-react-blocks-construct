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

export const statusDisplay = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done',
};

export interface ITaskManagerColumn {
  id: string;
  title: string;
  tasks: ITask[];
}
