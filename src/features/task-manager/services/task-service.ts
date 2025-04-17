import { ITaskManagerColumn } from '../types/task';

export interface Assignee {
  id: string;
  name: string;
  avatar: string;
}

export interface Tag {
  id: string;
  label: string;
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'image' | 'other';
}

export interface Comment {
  id: string;
  author: string;
  timestamp: string;
  text: string;
}

export interface TaskDetails {
  id: string;
  title: string;
  mark: boolean;
  section: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: Date | null;
  assignees: Assignee[];
  description: string;
  tags: Tag[];
  attachments: Attachment[];
  comments: Comment[];
}

export class TaskService {
  private tasks: TaskDetails[]; // Manage an array of tasks

  constructor() {
    // Initialize with dummy data
    this.tasks = [
      {
        id: '1',
        title: 'Update Calendar UI',
        mark: false,
        section: 'To Do',
        priority: 'Medium',
        dueDate: new Date('2025-03-18'),
        assignees: [
          {
            id: '1',
            name: 'Aaron Green',
            avatar:
              'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avator.JPG-eY44OKHv1M9ZlInG6sSFJSz2UMlimG.jpeg',
          },
          {
            id: '2',
            name: 'Block Smith',
            avatar:
              'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avator.JPG-eY44OKHv1M9ZlInG6sSFJSz2UMlimG.jpeg',
          },
        ],
        description: `1. Create engaging visual for error page.
2. Add search bar or redirection links.
3. Include humor or creativity to reduce bounce rate.
4. Make design consistent with branding.`,
        tags: [
          { id: 'calendar', label: 'Calendar' },
          { id: 'ui-ux', label: 'UI/UX' },
        ],
        attachments: [
          { id: '1', name: 'design-spec.pdf', size: '2 MB', type: 'pdf' },
          { id: '2', name: 'screenshot.png', size: '1.5 MB', type: 'image' },
        ],
        comments: [
          {
            id: '1',
            author: 'Block Smith',
            timestamp: '20.03.2025, 12:00',
            text: 'Please check, review & verify.',
          },
          {
            id: '2',
            author: 'Jane Doe',
            timestamp: '20.03.2025, 13:15',
            text: 'Looks good to me. Ready for deployment.',
          },
        ],
      },
      {
        id: '2',
        title: 'Fix Login Bug',
        mark: true,
        section: 'Done',
        priority: 'High',
        dueDate: new Date('2025-03-20'),
        assignees: [
          {
            id: '3',
            name: 'John Doe',
            avatar:
              'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avator.JPG-eY44OKHv1M9ZlInG6sSFJSz2UMlimG.jpeg',
          },
        ],
        description: `1. Create engaging visual for error page.
2. Add search bar or redirection links.
3. Include humor or creativity to reduce bounce rate.
4. Make design consistent with branding.`,
        tags: [
          { id: 'ui-ux', label: 'UI/UX' },
          { id: 'usability', label: 'Usability' },
        ],
        attachments: [
          { id: '1', name: 'design-spec.pdf', size: '2 MB', type: 'pdf' },
          { id: '2', name: 'screenshot.png', size: '1.5 MB', type: 'image' },
        ],
        comments: [
          {
            id: '1',
            author: 'Block Smith',
            timestamp: '20.03.2025, 12:00',
            text: 'Please check, review & verify.',
          },
          {
            id: '2',
            author: 'Jane Doe',
            timestamp: '20.03.2025, 13:15',
            text: 'Looks good to me. Ready for deployment.',
          },
        ],
      },
      {
        id: '3',
        title: 'Design Dashboard Analytics',
        mark: false,
        section: 'To Do',
        priority: 'High',
        dueDate: new Date('2025-03-25'),
        assignees: [{ id: '4', name: 'Sara Kim', avatar: 'https://i.pravatar.cc/150?img=4' }],
        description: `1. Create engaging visual for error page.
2. Add search bar or redirection links.
3. Include humor or creativity to reduce bounce rate.
4. Make design consistent with branding.`,
        tags: [{ id: 'design', label: 'Design' }],
        attachments: [
          { id: '1', name: 'dashboard-analytics.fig', size: '3.2 MB', type: 'pdf' },
          { id: '2', name: 'wireframe.png', size: '950 KB', type: 'image' },
        ],
        comments: [
          {
            id: '1',
            author: 'Sara Kim',
            timestamp: '21.03.2025, 10:30',
            text: 'Started working on the visual drafts.',
          },
          {
            id: '2',
            author: 'Jane Doe',
            timestamp: '21.03.2025, 11:45',
            text: 'Add some padding around charts.',
          },
        ],
      },
      {
        id: '4',
        title: 'Set Up CI/CD Pipeline',
        mark: false,
        section: 'In Progress',
        priority: 'High',
        dueDate: new Date('2025-03-22'),
        assignees: [{ id: '5', name: 'Alex Wang', avatar: 'https://i.pravatar.cc/150?img=5' }],
        description: `1. Create engaging visual for error page.
2. Add search bar or redirection links.
3. Include humor or creativity to reduce bounce rate.
4. Make design consistent with branding.`,
        tags: [
          { id: 'ui-ux', label: 'UI/UX' },
          { id: 'usability', label: 'Usability' },
        ],
        attachments: [{ id: '1', name: 'ci-cd-pipeline.yml', size: '45 KB', type: 'image' }],
        comments: [
          {
            id: '1',
            author: 'Alex Wang',
            timestamp: '20.03.2025, 14:00',
            text: 'CI pipeline working. CD config in progress.',
          },
        ],
      },
      {
        id: '5',
        title: 'QA: Profile Update Flow',
        mark: false,
        section: 'Done',
        priority: 'Medium',
        dueDate: new Date('2025-03-21'),
        assignees: [{ id: '6', name: 'Emily Clark', avatar: 'https://i.pravatar.cc/150?img=6' }],
        description: `1. Create engaging visual for error page.
2. Add search bar or redirection links.
3. Include humor or creativity to reduce bounce rate.
4. Make design consistent with branding.`,
        tags: [
          { id: 'ui-ux', label: 'UI/UX' },
          { id: 'usability', label: 'Usability' },
        ],
        attachments: [{ id: '1', name: 'test-cases.xlsx', size: '120 KB', type: 'other' }],
        comments: [
          {
            id: '1',
            author: 'Emily Clark',
            timestamp: '19.03.2025, 15:30',
            text: 'Tested 15/20 edge cases. 5 more pending.',
          },
        ],
      },
      {
        id: '6',
        title: 'Integrate Stripe Payments',
        mark: false,
        section: 'In Progress',
        priority: 'High',
        dueDate: new Date('2025-03-27'),
        assignees: [{ id: '7', name: 'Leo Chan', avatar: 'https://i.pravatar.cc/150?img=7' }],
        description: `1. Create engaging visual for error page.
2. Add search bar or redirection links.
3. Include humor or creativity to reduce bounce rate.
4. Make design consistent with branding.`,
        tags: [
          { id: 'ui-ux', label: 'UI/UX' },
          { id: 'usability', label: 'Usability' },
        ],
        attachments: [
          { id: '1', name: 'stripe-docs.pdf', size: '1.1 MB', type: 'pdf' },
          { id: '2', name: 'invoice-template.png', size: '780 KB', type: 'image' },
        ],
        comments: [
          {
            id: '1',
            author: 'Leo Chan',
            timestamp: '22.03.2025, 09:20',
            text: 'Webhook config tested. Awaiting approval.',
          },
        ],
      },
      {
        id: '7',
        title: 'Update Notification System',
        mark: false,
        section: 'To Do',
        priority: 'Medium',
        dueDate: new Date('2025-03-24'),
        assignees: [
          { id: '8', name: 'Natalie Perez', avatar: 'https://i.pravatar.cc/150?img=8' },
          { id: '8', name: 'Natalie Perez', avatar: 'https://i.pravatar.cc/150?img=8' },
          { id: '8', name: 'Natalie Perez', avatar: 'https://i.pravatar.cc/150?img=8' },
          { id: '8', name: 'Natalie Perez', avatar: 'https://i.pravatar.cc/150?img=8' },
          { id: '8', name: 'Natalie Perez', avatar: 'https://i.pravatar.cc/150?img=8' },
        ],
        description: `1. Create engaging visual for error page.
2. Add search bar or redirection links.
3. Include humor or creativity to reduce bounce rate.
4. Make design consistent with branding.`,
        tags: [{ id: 'frontend', label: 'Frontend' }],
        attachments: [{ id: '1', name: 'notification-flowchart.pdf', size: '550 KB', type: 'pdf' }],
        comments: [
          {
            id: '1',
            author: 'Natalie Perez',
            timestamp: '22.03.2025, 10:10',
            text: 'Need design review for mobile toast layout.',
          },
        ],
      },
      {
        id: '8',
        title: 'Optimize Landing Page SEO',
        mark: false,
        section: 'In Progress',
        priority: 'Low',
        dueDate: new Date('2025-03-26'),
        assignees: [{ id: '9', name: 'Ivy Thompson', avatar: 'https://i.pravatar.cc/150?img=9' }],
        description: `1. Create engaging visual for error page.
2. Add search bar or redirection links.
3. Include humor or creativity to reduce bounce rate.
4. Make design consistent with branding.`,
        tags: [
          { id: 'accessibility', label: 'Accessibility' },
          { id: 'frontend', label: 'Frontend' },
        ],
        attachments: [{ id: '1', name: 'seo-checklist.txt', size: '40 KB', type: 'pdf' }],
        comments: [
          {
            id: '1',
            author: 'Ivy Thompson',
            timestamp: '21.03.2025, 11:00',
            text: 'Added structured data markup.',
          },
        ],
      },
      {
        id: '9',
        title: 'Database Migration Plan',
        mark: false,
        section: 'To Do',
        priority: 'High',
        dueDate: new Date('2025-03-29'),
        assignees: [
          { id: '10', name: 'Carlos Mendes', avatar: 'https://i.pravatar.cc/150?img=10' },
        ],
        description: `1. Create engaging visual for error page.
2. Add search bar or redirection links.
3. Include humor or creativity to reduce bounce rate.
4. Make design consistent with branding.`,
        tags: [
          { id: 'ui-ux', label: 'UI/UX' },
          { id: 'usability', label: 'Usability' },
        ],
        attachments: [{ id: '1', name: 'migration-plan.docx', size: '1.2 MB', type: 'image' }],
        comments: [
          {
            id: '1',
            author: 'Carlos Mendes',
            timestamp: '20.03.2025, 17:15',
            text: 'Schema comparison draft ready.',
          },
        ],
      },
      {
        id: '10',
        title: 'Implement Dark Mode',
        mark: false,
        section: 'To Do',
        priority: 'Medium',
        dueDate: new Date('2025-03-30'),
        assignees: [{ id: '11', name: 'Priya Singh', avatar: 'https://i.pravatar.cc/150?img=11' }],
        description: `1. Create engaging visual for error page.
2. Add search bar or redirection links.
3. Include humor or creativity to reduce bounce rate.
4. Make design consistent with branding.`,
        tags: [
          { id: 'ui-ux', label: 'UI/UX' },
          { id: 'accessibility', label: 'Accessibility' },
        ],
        attachments: [{ id: '1', name: 'theme-guide.md', size: '70 KB', type: 'image' }],
        comments: [
          {
            id: '1',
            author: 'Priya Singh',
            timestamp: '22.03.2025, 09:45',
            text: 'Toggle logic implemented. Testing styles now.',
          },
        ],
      },
      {
        id: '11',
        title: 'Review Legal Compliance',
        mark: false,
        section: 'Done',
        priority: 'High',
        dueDate: new Date('2025-04-01'),
        assignees: [{ id: '12', name: 'Omar Raza', avatar: 'https://i.pravatar.cc/150?img=12' }],
        description: `1. Create engaging visual for error page.
2. Add search bar or redirection links.
3. Include humor or creativity to reduce bounce rate.
4. Make design consistent with branding.`,
        tags: [
          { id: 'ui-ux', label: 'UI/UX' },
          { id: 'usability', label: 'Usability' },
        ],
        attachments: [{ id: '1', name: 'compliance-checklist.pdf', size: '300 KB', type: 'pdf' }],
        comments: [
          {
            id: '1',
            author: 'Omar Raza',
            timestamp: '23.03.2025, 14:30',
            text: 'Cookies and consent banner updated.',
          },
        ],
      },
      {
        id: '12',
        title: 'User Feedback Report',
        mark: true,
        section: 'Done',
        priority: 'Low',
        dueDate: new Date('2025-03-15'),
        assignees: [{ id: '13', name: 'Mina Park', avatar: 'https://i.pravatar.cc/150?img=13' }],
        description: `1. Create engaging visual for error page.
2. Add search bar or redirection links.
3. Include humor or creativity to reduce bounce rate.
4. Make design consistent with branding.`,
        tags: [
          { id: 'ui-ux', label: 'UI/UX' },
          { id: 'usability', label: 'Usability' },
        ],
        attachments: [{ id: '1', name: 'feedback-summary.csv', size: '250 KB', type: 'image' }],
        comments: [
          {
            id: '1',
            author: 'Mina Park',
            timestamp: '18.03.2025, 16:00',
            text: 'Finished compiling user suggestions.',
          },
        ],
      },
    ];
  }

  // Get all tasks
  getTasks(): TaskDetails[] {
    return this.tasks;
  }

  // Get a single task by ID
  getTaskById(taskId: string): TaskDetails | undefined {
    return this.tasks.find((task) => task.id === taskId);
  }

  // Add a new task
  addTask(newTask: TaskDetails): void {
    this.tasks.push(newTask);
  }

  // Update an existing task by ID
  updateTask(taskId: string, updatedTask: Partial<TaskDetails>): void {
    this.tasks = this.tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
  }

  // Delete a task by ID
  deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  // Add a comment to a task
  addComment(taskId: string, comment: Comment): void {
    const task = this.getTaskById(taskId);
    if (task) {
      task.comments.push(comment);
    }
  }

  // Remove a comment from a task
  removeComment(taskId: string, commentId: string): void {
    const task = this.getTaskById(taskId);
    if (task) {
      task.comments = task.comments.filter((comment) => comment.id !== commentId);
    }
  }

  // Add an attachment to a task
  addAttachment(taskId: string, attachment: Attachment): void {
    const task = this.getTaskById(taskId);
    if (task) {
      task.attachments.push(attachment);
    }
  }

  // Remove an attachment from a task
  removeAttachment(taskId: string, attachmentId: string): void {
    const task = this.getTaskById(taskId);
    if (task) {
      task.attachments = task.attachments.filter((attachment) => attachment.id !== attachmentId);
    }
  }

  // Convert tasks to ITaskManagerColumn[]
  getTaskColumns(): ITaskManagerColumn[] {
    // Group tasks by their section
    const groupedTasks: Record<string, TaskDetails[]> = this.tasks.reduce(
      (acc, task) => {
        if (!acc[task.section]) {
          acc[task.section] = [];
        }
        acc[task.section].push(task);
        return acc;
      },
      {} as Record<string, TaskDetails[]>
    );

    // Convert grouped tasks into ITaskManagerColumn[]
    return Object.entries(groupedTasks).map(([section, tasks]) => ({
      id: section.toLowerCase().replace(/\s+/g, '-'), // Generate a unique ID for the column
      title: section, // Use the section name as the column title
      tasks: tasks.map((task) => ({
        id: task.id,
        content: task.title,
        priority: task.priority,
        tags: task.tags.map((tag) => tag.label),
        dueDate: task.dueDate ? this.formatDate(task.dueDate) : undefined,
        comments: task.comments.length,
        attachments: task.attachments.length,
        assignees: task.assignees.map((assignee) => assignee.name),
        status: this.mapSectionToStatus(task.section),
      })),
    }));
  }

  // Helper function to map section to status
  private mapSectionToStatus(section: string): 'todo' | 'inprogress' | 'done' {
    switch (section.toLowerCase()) {
      case 'To Do':
        return 'todo';
      case 'In Progress':
        return 'inprogress';
      case 'Done':
        return 'done';
      default:
        return 'todo';
    }
  }

  // Helper function to format dates
  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
}
