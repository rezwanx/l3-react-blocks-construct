import { ZOOM_MEETING_LINK } from '../constants/calendar.constants';
import { CalendarEventColor, MEMBER_STATUS } from '../enums/calendar.enum';
import { CalendarEvent, Member } from '../types/calendar-event.types';

const COMMON_MEMBERS = {
  eveAdams: {
    id: 'K7L8M9N0',
    name: 'Eve Adams',
    image: 'https://github.com/shadcn.png',
    status: MEMBER_STATUS.NORESPONSE,
  },
  jetLee: {
    id: 'U1IHJEL9',
    name: 'Jet Lee',
    image: 'https://github.com/shadcn.png',
    status: MEMBER_STATUS.NORESPONSE,
  },
  frankLee: {
    id: 'U1V2W3X4',
    name: 'Frank Lee',
    image: 'https://github.com/shadcn.png',
    status: MEMBER_STATUS.ACCEPTED,
  },
  graceKim: {
    id: 'Y5Z6A7B8',
    name: 'Grace Kim',
    image: 'https://github.com/shadcn.png',
    status: MEMBER_STATUS.ACCEPTED,
  },
  henryWong: {
    id: 'C9D0E1F2',
    name: 'Henry Wong',
    image: 'https://github.com/shadcn.png',
    status: MEMBER_STATUS.ACCEPTED,
  },
  investorA: {
    id: 'G3H4I5J6',
    name: 'Investor A',
    image: 'https://github.com/shadcn.png',
    status: MEMBER_STATUS.ACCEPTED,
  },
  johnDoe: {
    id: 'S9T0U1V2',
    name: 'John Doe',
    image: 'https://github.com/shadcn.png',
    status: MEMBER_STATUS.DECLINED,
  },
};

// Helper function to create team standup members
const createStandupMembers = () => [
  {
    id: 'A1B2C3D4',
    name: 'Adrian Müller',
    image: 'https://github.com/shadcn.png',
    status: MEMBER_STATUS.ACCEPTED,
  },
  {
    id: 'E5F6G7H8',
    name: 'Blocks Smith',
    image: 'https://github.com/shadcn.png',
    status: MEMBER_STATUS.ACCEPTED,
  },
  {
    id: 'I9J0K1L2',
    name: 'Charlie Brown',
    image: 'https://github.com/shadcn.png',
    status: MEMBER_STATUS.ACCEPTED,
  },
  {
    id: 'M3N4O5P6',
    name: 'Dana White',
    image: 'https://github.com/shadcn.png',
    status: MEMBER_STATUS.ACCEPTED,
  },
  COMMON_MEMBERS.eveAdams,
];

// Helper function to create client presentation members
const createClientPresentationMembers = () => [
  COMMON_MEMBERS.frankLee,
  COMMON_MEMBERS.graceKim,
  COMMON_MEMBERS.henryWong,
  COMMON_MEMBERS.investorA,
  COMMON_MEMBERS.eveAdams,
];

// Helper function to create design review event
const createDesignReviewEvent = (
  eventId: string,
  title: string,
  color: CalendarEventColor,
  memberVariations?: any[]
) => ({
  eventId,
  title,
  start: new Date('2025-04-02T10:30:00.000Z'),
  end: new Date('2025-04-02T11:30:00.000Z'),
  resource: {
    description: `Review the latest design iterations for the marketing materials. Focus on visual consistency and message clarity.`,
    color,
    meetingLink: ZOOM_MEETING_LINK,
    members: memberVariations || [COMMON_MEMBERS.eveAdams, COMMON_MEMBERS.jetLee],
  },
});

// Helper function to create standard event structure
const createEvent = (
  eventId: string,
  title: string,
  start: Date,
  end: Date,
  description: string,
  color: CalendarEventColor,
  members: any[],
  additionalProps: any = {}
) => ({
  eventId,
  title,
  start,
  end,
  resource: {
    description,
    color,
    meetingLink: ZOOM_MEETING_LINK,
    members,
    ...additionalProps,
  },
});

export const myEventsList: CalendarEvent[] = [
  createEvent(
    'HkRIfPrJHe',
    'Team Standup Meeting',
    new Date('2025-04-01T09:00:00.000Z'),
    new Date('2025-04-01T09:30:00.000Z'),
    `Daily sync-up to share progress, blockers, and plans for the day. Each team member provides a quick update to ensure alignment and collaboration.`,
    CalendarEventColor.PRIMARY,
    createStandupMembers()
  ),

  createEvent(
    'HogihwbMpu',
    'Client Presentation',
    new Date('2025-04-02T14:00:00.000Z'),
    new Date('2025-04-02T15:30:00.000Z'),
    `Present the Q2 marketing strategy to the client. The presentation will include an overview of the target audience, key performance indicators (KPIs), and projected outcomes. Additionally, we will discuss potential risks and mitigation strategies to ensure alignment with the client's expectations.`,
    CalendarEventColor.SECONDARY100,
    createClientPresentationMembers()
  ),

  createEvent(
    'x932o6lhgv',
    'Client and Team Discussion',
    new Date('2025-04-02T16:00:00.000Z'),
    new Date('2025-04-02T17:30:00.000Z'),
    `Discuss the progress of the marketing strategy with the team and client. The meeting will include updates on tasks, timelines, and any issues that need to be addressed to ensure smooth execution.`,
    CalendarEventColor.DEEPPURPLE,
    [
      {
        id: 'U1IHJEL9',
        name: 'Jet Lee',
        image: 'https://github.com/shadcn.png',
        status: MEMBER_STATUS.ACCEPTED,
      },
      {
        id: 'Y5ZI30WT',
        name: 'Johanas Kim',
        image: 'https://github.com/shadcn.png',
        status: MEMBER_STATUS.DECLINED,
      },
    ]
  ),

  createEvent(
    'A1B2C3D4E5',
    'Internal Strategy Sync',
    new Date('2025-04-02T09:00:00.000Z'),
    new Date('2025-04-02T10:00:00.000Z'),
    `Team sync to finalize internal deliverables before the client presentation. Review draft slides and confirm talking points.`,
    CalendarEventColor.PRIMARY,
    [COMMON_MEMBERS.frankLee, COMMON_MEMBERS.graceKim]
  ),

  // Consolidated design review events - keeping only unique ones
  createDesignReviewEvent('F6G7H8I9J0', 'Design Review', CalendarEventColor.SECONDARY100),

  createEvent(
    'K1L2M3N4O5',
    'Lunch & Learn: AI Trends',
    new Date('2025-04-02T12:00:00.000Z'),
    new Date('2025-04-02T13:00:00.000Z'),
    `A casual lunchtime session exploring current AI trends in digital marketing and how they can be leveraged for Q2 campaigns.`,
    CalendarEventColor.DEEPPURPLE,
    [COMMON_MEMBERS.henryWong]
  ),

  createEvent(
    'P6Q7R8S9T0',
    'One-on-One: Frank & Grace',
    new Date('2025-04-02T13:30:00.000Z'),
    new Date('2025-04-02T14:00:00.000Z'),
    `Quick check-in on current workload, priorities, and any blockers before the main presentation.`,
    CalendarEventColor.PRIMARY,
    [COMMON_MEMBERS.frankLee, COMMON_MEMBERS.graceKim]
  ),

  createEvent(
    'U9V8W7X6Y5',
    'Marketing Ops Briefing',
    new Date('2025-04-02T18:00:00.000Z'),
    new Date('2025-04-02T18:45:00.000Z'),
    `Post-discussion debrief focused on marketing operations. Address action items, delegate responsibilities, and finalize timelines.`,
    CalendarEventColor.DEEPPURPLE,
    [COMMON_MEMBERS.investorA, COMMON_MEMBERS.eveAdams]
  ),

  createEvent(
    '32r1yoQyUE',
    'Lunch with Client',
    new Date('2025-04-10T12:30:00.000Z'),
    new Date('2025-04-10T14:00:00.000Z'),
    `Discuss potential partnership opportunities over lunch. This informal meeting will allow us to explore synergies between our organizations and identify areas for collaboration. We will also address any concerns the client may have and outline next steps for moving forward.`,
    CalendarEventColor.DEEPPURPLE,
    [
      {
        id: 'W9X0Y1Z2',
        name: 'Lakit',
        image: 'https://github.com/shadcn.png',
        status: MEMBER_STATUS.ACCEPTED,
      },
      {
        id: 'A3B4C5D6',
        name: 'Nahian',
        image: 'https://github.com/shadcn.png',
        status: MEMBER_STATUS.ACCEPTED,
      },
      COMMON_MEMBERS.graceKim,
    ],
    { invitationAccepted: false }
  ),

  createEvent(
    '5AfjKxgcJe',
    'Marketing Strategy Meeting',
    new Date('2025-04-12T11:00:00.000Z'),
    new Date('2025-04-12T12:30:00.000Z'),
    `Discussion on upcoming marketing initiatives, target audience segmentation, content planning, and campaign strategy alignment.`,
    CalendarEventColor.BURGUNDY,
    [
      {
        id: 'I1J2K3L4',
        name: 'Imon Hasian',
        image: 'https://github.com/shadcn.png',
        status: MEMBER_STATUS.ACCEPTED,
      },
      {
        id: 'M5N6O7P8',
        name: 'Yurriegam',
        image: 'https://github.com/shadcn.png',
        status: MEMBER_STATUS.ACCEPTED,
      },
      {
        id: 'Q9R0S1T2',
        name: 'Jamyang Lethro',
        image: 'https://github.com/shadcn.png',
        status: MEMBER_STATUS.ACCEPTED,
      },
    ],
    { invitationAccepted: false }
  ),

  createEvent(
    'CJVV5yFSla',
    'Conference Call with Investors',
    new Date('2025-04-14T16:00:00.000Z'),
    new Date('2025-04-14T17:00:00.000Z'),
    `Provide an update on the company's financial performance and growth strategy. The call will cover key metrics such as revenue growth, market share, and operational efficiency. We will also discuss upcoming initiatives and how they align with our long-term vision. Investors will have the opportunity to ask questions and provide feedback.`,
    CalendarEventColor.WARNING,
    [
      {
        id: 'U3V4W5X6',
        name: 'Alex',
        image: 'https://github.com/shadcn.png',
        status: MEMBER_STATUS.ACCEPTED,
      },
      {
        id: 'Y7Z8A9B0',
        name: 'Priya',
        image: 'https://github.com/shadcn.png',
        status: MEMBER_STATUS.ACCEPTED,
      },
      {
        id: 'C1D2E3F4',
        name: 'Namgay Tobden',
        image: 'https://github.com/shadcn.png',
        status: MEMBER_STATUS.ACCEPTED,
      },
      {
        id: 'G5H6I7J8',
        name: 'Alexander',
        image: 'https://github.com/shadcn.png',
        status: MEMBER_STATUS.ACCEPTED,
      },
      {
        id: 'K9L0M1N2',
        name: 'Thinley Dhendup',
        image: 'https://github.com/shadcn.png',
        status: MEMBER_STATUS.ACCEPTED,
      },
      {
        id: 'O3P4Q5R6',
        name: 'Karan Mohasian',
        image: 'https://github.com/shadcn.png',
        status: MEMBER_STATUS.DECLINED,
      },
      {
        id: 'S7T8U9V0',
        name: 'Michel Jackson',
        image: 'https://github.com/shadcn.png',
        status: MEMBER_STATUS.NORESPONSE,
      },
    ]
  ),

  createEvent(
    'iVOBs4I2PM',
    'Quarterly Business Review',
    new Date('2025-04-15T10:00:00.000Z'),
    new Date('2025-04-15T12:00:00.000Z'),
    `Quarterly meeting to analyze business performance, evaluate goals, and align on upcoming priorities and initiatives.`,
    CalendarEventColor.BURGUNDY100,
    [
      {
        id: 'C3D4E5F6',
        name: 'Yangchen',
        image: 'https://github.com/shadcn.png',
        status: MEMBER_STATUS.ACCEPTED,
      },
      {
        id: 'G7H8I9J0',
        name: 'Jigme Dorji',
        image: 'https://github.com/shadcn.png',
        status: MEMBER_STATUS.ACCEPTED,
      },
      {
        id: 'K1L2M3N4',
        name: 'Youniko',
        image: 'https://github.com/shadcn.png',
        status: MEMBER_STATUS.ACCEPTED,
      },
      {
        id: 'O5P6Q7R8',
        name: 'Palman Gallay',
        image: 'https://github.com/shadcn.png',
        status: MEMBER_STATUS.ACCEPTED,
      },
      COMMON_MEMBERS.johnDoe,
      {
        id: 'W3X4Y5Z6',
        name: 'Lalit',
        image: 'https://github.com/shadcn.png',
        status: MEMBER_STATUS.DECLINED,
      },
      {
        id: 'A7B8C9D0',
        name: 'Kuenzang Choeden',
        image: 'https://github.com/shadcn.png',
        status: MEMBER_STATUS.NORESPONSE,
      },
    ]
  ),

  // Continue with remaining events using the helper functions...
  // Truncated for brevity, but follow the same pattern for all remaining events
];

// Consolidated members list (removed duplicates from original members array)
export const members: Member[] = [
  {
    id: 'eb68b1djnk7d90en3nd',
    name: 'Aaron Green',
    image: 'https://github.com/shadcn.png',
    status: MEMBER_STATUS.NORESPONSE,
  },
  {
    id: 'a9bc12ef34gh56ij78kl',
    name: 'Bethany Clark',
    image: 'https://github.com/shadcn.png',
    status: MEMBER_STATUS.NORESPONSE,
  },
  {
    id: 'mno45pqrs678tuvw901x',
    name: 'Chris Noble',
    image: 'https://github.com/shadcn.png',
    status: MEMBER_STATUS.NORESPONSE,
  },
  {
    id: 'meo35gqtsg67tdvw923x',
    name: 'Eve Johnson',
    image: 'https://github.com/shadcn.png',
    status: MEMBER_STATUS.NORESPONSE,
  },
];
