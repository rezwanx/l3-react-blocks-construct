import { ITask } from '../types/task';

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
  isCompleted: boolean;
  id: string;
  title: string;
  mark: boolean;
  section: string;
  priority: string;
  dueDate: Date | null;
  assignees: Assignee[];
  description: string;
  tags: Tag[];
  attachments: Attachment[];
  comments: Comment[];
}

// Constants to eliminate duplication
const STANDARD_AVATAR_URL =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avator.JPG-eY44OKHv1M9ZlInG6sSFJSz2UMlimG.jpeg';

const STANDARD_DESCRIPTION = `1. Create engaging visual for error page.
2. Add search bar or redirection links.
3. Include humor or creativity to reduce bounce rate.
4. Make design consistent with branding.`;

const COMMON_ATTACHMENTS = {
  DESIGN_SPEC_PDF: { id: '1', name: 'design-spec.pdf', size: '2 MB', type: 'pdf' as const },
  SCREENSHOT_PNG: { id: '2', name: 'screenshot.png', size: '1.5 MB', type: 'image' as const },
};

const COMMON_COMMENTS = {
  BLOCK_SMITH_REVIEW: {
    id: '1',
    author: 'Block Smith',
    timestamp: '20.03.2025, 12:00',
    text: 'Please check, review & verify.',
  },
  JANE_DOE_APPROVAL: {
    id: '2',
    author: 'Jane Doe',
    timestamp: '20.03.2025, 13:15',
    text: 'Looks good to me. Ready for deployment.',
  },
};

const createAssignee = (id: string, name: string): Assignee => ({
  id,
  name,
  avatar: STANDARD_AVATAR_URL,
});

const createAttachment = (
  id: string,
  name: string,
  size: string,
  type: 'pdf' | 'image' | 'other'
): Attachment => ({
  id,
  name,
  size,
  type,
});

const createComment = (id: string, author: string, timestamp: string, text: string): Comment => ({
  id,
  author,
  timestamp,
  text,
});

const createTask = (
  id: string,
  title: string,
  section: string,
  priority: string,
  dueDate: Date | null,
  assigneeIds: string[],
  tagIds: string[],
  attachments: Attachment[] = [],
  comments: Comment[] = [],
  mark = false,
  isCompleted = false
): TaskDetails => ({
  id,
  title,
  mark,
  section,
  priority,
  dueDate,
  assignees: getAssigneesByIds(assigneeIds),
  description: STANDARD_DESCRIPTION,
  tags: getTagsByIds(tagIds),
  attachments,
  comments,
  isCompleted,
});

export const assignees: Assignee[] = [
  createAssignee('1', 'Aaron Green'),
  createAssignee('2', 'Adrian Müller'),
  createAssignee('3', 'Blocks Smith'),
  createAssignee('4', 'Sarah Pavan'),
  createAssignee('5', 'Sara Kim'),
  createAssignee('6', 'Lio Chan'),
];

export const tags: Tag[] = [
  { id: 'calendar', label: 'Calendar' },
  { id: 'ui-ux', label: 'UI/UX' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'design', label: 'Design' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'responsive', label: 'Responsive' },
  { id: 'performance', label: 'Performance' },
  { id: 'usability', label: 'Usability' },
];

const getAssigneesByIds = (ids: string[]): Assignee[] => {
  return assignees.filter((assignee) => ids.includes(assignee.id));
};

const getTagsByIds = (ids: string[]): Tag[] => {
  return tags.filter((tag) => ids.includes(tag.id));
};

const TAG_COMBINATIONS = {
  CALENDAR_UI: ['calendar', 'ui-ux'],
  UI_USABILITY: ['ui-ux', 'usability'],
  DESIGN_ONLY: ['design'],
  FRONTEND_ONLY: ['frontend'],
  ACCESSIBILITY_FRONTEND: ['accessibility', 'frontend'],
  UI_ACCESSIBILITY: ['ui-ux', 'accessibility'],
};

export const initialTasks: TaskDetails[] = [
  createTask(
    '1',
    'Update Calendar UI',
    'To Do',
    'Medium',
    new Date('2025-04-01'),
    ['1', '2'],
    TAG_COMBINATIONS.CALENDAR_UI,
    [COMMON_ATTACHMENTS.DESIGN_SPEC_PDF, COMMON_ATTACHMENTS.SCREENSHOT_PNG],
    [COMMON_COMMENTS.BLOCK_SMITH_REVIEW, COMMON_COMMENTS.JANE_DOE_APPROVAL]
  ),

  createTask(
    '2',
    'Fix Login Bug',
    'In Progress',
    'High',
    new Date('2025-04-02'),
    ['3'],
    TAG_COMBINATIONS.UI_USABILITY,
    [COMMON_ATTACHMENTS.DESIGN_SPEC_PDF, COMMON_ATTACHMENTS.SCREENSHOT_PNG],
    [COMMON_COMMENTS.BLOCK_SMITH_REVIEW, COMMON_COMMENTS.JANE_DOE_APPROVAL],
    true,
    true
  ),

  createTask(
    '3',
    'Design Dashboard Analytics',
    'To Do',
    'High',
    new Date('2025-04-03'),
    ['4'],
    TAG_COMBINATIONS.DESIGN_ONLY,
    [
      createAttachment('1', 'dashboard-analytics.fig', '3.2 MB', 'pdf'),
      createAttachment('2', 'wireframe.png', '950 KB', 'image'),
    ],
    [
      createComment('1', 'Sara Kim', '21.03.2025, 10:30', 'Started working on the visual draft.'),
      createComment('2', 'Jane Doe', '21.03.2025, 11:45', 'Add some padding around charts.'),
    ]
  ),

  createTask(
    '4',
    'Set Up CI/CD Pipeline',
    'In Progress',
    'High',
    new Date('2025-04-04'),
    ['5'],
    TAG_COMBINATIONS.UI_USABILITY,
    [createAttachment('1', 'ci-cd-pipeline.yml', '45 KB', 'image')],
    [
      createComment(
        '1',
        'Alex Wang',
        '20.03.2025, 14:00',
        'CI pipeline working. CD config in progress.'
      ),
    ]
  ),

  createTask(
    '5',
    'QA: Profile Update Flow',
    'Done',
    'Medium',
    new Date('2025-04-06'),
    ['6'],
    TAG_COMBINATIONS.UI_USABILITY,
    [createAttachment('1', 'test-cases.xlsx', '120 KB', 'other')],
    [
      createComment(
        '1',
        'Emily Clark',
        '19.03.2025, 15:30',
        'Tested 15/20 edge cases. 5 more pending.'
      ),
    ]
  ),

  createTask(
    '6',
    'Integrate Stripe Payments',
    'Done',
    'High',
    new Date('2025-04-09'),
    ['6'],
    TAG_COMBINATIONS.UI_USABILITY,
    [
      createAttachment('1', 'stripe-docs.pdf', '1.1 MB', 'pdf'),
      createAttachment('2', 'invoice-template.png', '780 KB', 'image'),
    ],
    [
      createComment(
        '1',
        'Leo Chan',
        '22.03.2025, 09:20',
        'Webhook config tested. Awaiting approval.'
      ),
    ]
  ),

  createTask(
    '7',
    'Update Notification System',
    'To Do',
    'Medium',
    new Date('2025-04-10'),
    ['3', '4', '5', '6'],
    TAG_COMBINATIONS.FRONTEND_ONLY,
    [createAttachment('1', 'notification-flowchart.pdf', '550 KB', 'pdf')],
    [
      createComment(
        '1',
        'Natalie Perez',
        '22.03.2025, 10:10',
        'Need design review for mobile toast layout.'
      ),
    ]
  ),

  createTask(
    '8',
    'Optimize Landing Page SEO',
    'In Progress',
    'Low',
    new Date('2025-03-01'),
    ['6'],
    TAG_COMBINATIONS.ACCESSIBILITY_FRONTEND,
    [createAttachment('1', 'seo-checklist.txt', '40 KB', 'pdf')],
    [createComment('1', 'Ivy Thompson', '21.03.2025, 11:00', 'Added structured data markup.')]
  ),

  createTask(
    '9',
    'Database Migration Plan',
    'Done',
    'High',
    new Date('2025-04-01'),
    ['3'],
    TAG_COMBINATIONS.UI_USABILITY,
    [createAttachment('1', 'migration-plan.docx', '1.2 MB', 'image')],
    [createComment('1', 'Carlos Mendes', '20.03.2025, 17:15', 'Schema comparison draft ready.')]
  ),

  createTask(
    '10',
    'Implement Dark Mode',
    'To Do',
    'Medium',
    new Date('2025-04-01'),
    ['5'],
    TAG_COMBINATIONS.UI_ACCESSIBILITY,
    [createAttachment('1', 'theme-guide.md', '70 KB', 'image')],
    [
      createComment(
        '1',
        'Priya Singh',
        '22.03.2025, 09:45',
        'Toggle logic implemented. Testing styles now.'
      ),
    ]
  ),

  createTask(
    '11',
    'Review Legal Compliance',
    'In Progress',
    'High',
    new Date('2025-04-01'),
    ['4'],
    TAG_COMBINATIONS.UI_USABILITY,
    [createAttachment('1', 'compliance-checklist.pdf', '300 KB', 'pdf')],
    [createComment('1', 'Omar Raza', '20/03/2025, 14:30', 'Cookies and consent banner updated.')]
  ),

  createTask(
    '12',
    'User Feedback Report',
    'Done',
    'Low',
    new Date('2025-04-01'),
    ['6'],
    TAG_COMBINATIONS.UI_USABILITY,
    [createAttachment('1', 'feedback-summary.csv', '250 KB', 'image')],
    [createComment('1', 'Mina Park', '18/03/2025, 16:00', 'Finished compiling user suggestions.')],
    true,
    true
  ),
];

export class TaskService {
  private tasks: TaskDetails[];

  constructor() {
    this.tasks = [...initialTasks];
  }

  getTasks(): TaskDetails[] {
    return this.tasks;
  }

  addTask(newTask: TaskDetails): void {
    this.tasks.push(newTask);
  }

  deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  convertTasksToITaskFormat = (tasks: TaskDetails[]): ITask[] => {
    const statusMap: Record<string, 'todo' | 'inprogress' | 'done'> = {
      'To Do': 'todo',
      'In Progress': 'inprogress',
      Done: 'done',
    };

    return tasks.map((task) => {
      const status = statusMap[task.section] || 'todo';

      return {
        id: task.id,
        content: task.title,
        priority: task.priority,
        tags: task.tags.map((tag) => tag.label),
        dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : undefined,
        comments: task.comments.length,
        attachments: task.attachments.length,
        assignees: task.assignees.map((assignee) => assignee.name),
        status,
        isCompleted: task.isCompleted,
      };
    });
  };
}
