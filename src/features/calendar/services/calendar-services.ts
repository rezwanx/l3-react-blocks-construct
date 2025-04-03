import { CalendarEventColor } from '../enums/calendar.enum';
import { CalendarEvent } from '../types/calendar-event.types';

export const myEventsList: CalendarEvent[] = [
  {
    title: 'Team Standup Meeting',
    start: '2025-04-01T09:00:00.000Z' as unknown as Date,
    end: '2025-04-01T09:30:00.000Z' as unknown as Date,
    color: CalendarEventColor.PRIMARY,
  },
  {
    title: 'Client Presentation',
    start: '2025-04-02T14:00:00.000Z' as unknown as Date,
    end: '2025-04-02T15:30:00.000Z' as unknown as Date,
    invitedParticipants: {
      total: 5,
      accepted: 4,
      declined: 0,
      noResponse: 1,
    },
    description:
      'Present the Q2 marketing strategy to the client. The presentation will include an overview of the target audience, key performance indicators (KPIs), and projected outcomes. Additionally, we will discuss potential risks and mitigation strategies to ensure alignment with the client’s expectations.',
    color: CalendarEventColor.SECONDARY100,
  },
  {
    title: 'Project Deadline',
    start: '2025-04-05T23:59:00.000Z' as unknown as Date,
    end: '2025-04-06T00:00:00.000Z' as unknown as Date,
    color: CalendarEventColor.SECONDARY,
  },
  {
    title: 'Lunch with Client',
    start: '2025-04-10T12:30:00.000Z' as unknown as Date,
    end: '2025-04-10T14:00:00.000Z' as unknown as Date,
    invitedParticipants: {
      total: 3,
      accepted: 3,
      declined: 0,
      noResponse: 0,
    },
    description:
      'Discuss potential partnership opportunities over lunch. This informal meeting will allow us to explore synergies between our organizations and identify areas for collaboration. We will also address any concerns the client may have and outline next steps for moving forward.',
    color: CalendarEventColor.DEEPPURPLE,
  },
  {
    title: 'Marketing Strategy Meeting',
    start: '2025-04-12T11:00:00.000Z' as unknown as Date,
    end: '2025-04-12T12:30:00.000Z' as unknown as Date,
    color: CalendarEventColor.BURGUNDY,
  },
  {
    title: 'Conference Call with Investors',
    start: '2025-04-14T16:00:00.000Z' as unknown as Date,
    end: '2025-04-14T17:00:00.000Z' as unknown as Date,
    invitedParticipants: {
      total: 10,
      accepted: 8,
      declined: 1,
      noResponse: 1,
    },
    description:
      'Provide an update on the company’s financial performance and growth strategy. The call will cover key metrics such as revenue growth, market share, and operational efficiency. We will also discuss upcoming initiatives and how they align with our long-term vision. Investors will have the opportunity to ask questions and provide feedback.',
    color: CalendarEventColor.WARNING,
  },
  {
    title: 'Quarterly Business Review',
    start: '2025-04-15T10:00:00.000Z' as unknown as Date,
    end: '2025-04-15T12:00:00.000Z' as unknown as Date,
    color: CalendarEventColor.BURGUNDY100,
  },
  {
    title: 'Team Outing',
    start: '2025-04-20T15:00:00.000Z' as unknown as Date,
    end: '2025-04-20T18:00:00.000Z' as unknown as Date,
    invitedParticipants: {
      total: 15,
      accepted: 12,
      declined: 2,
      noResponse: 1,
    },
    description:
      'Annual team outing to celebrate recent achievements and foster team bonding. This event will include a variety of activities such as team-building exercises, games, and a group dinner. It is an excellent opportunity for employees to relax, connect with colleagues, and recharge before the next quarter.',
    color: CalendarEventColor.PRIMARY100,
  },
  {
    title: 'Webinar on Tech Trends',
    start: '2025-04-22T18:00:00.000Z' as unknown as Date,
    end: '2025-04-22T19:30:00.000Z' as unknown as Date,
    color: CalendarEventColor.SECONDARY100,
  },
  {
    title: 'HR Training Session',
    start: '2025-04-24T09:30:00.000Z' as unknown as Date,
    end: '2025-04-24T11:00:00.000Z' as unknown as Date,
    color: CalendarEventColor.DEEPPURPLE100,
  },
  {
    title: 'Company Townhall Meeting',
    start: '2025-04-25T13:00:00.000Z' as unknown as Date,
    end: '2025-04-25T14:30:00.000Z' as unknown as Date,
    invitedParticipants: {
      total: 50,
      accepted: 45,
      declined: 3,
      noResponse: 2,
    },
    description:
      'Quarterly townhall meeting to discuss company updates, achievements, and future plans. The agenda includes a review of the company’s performance over the past quarter, recognition of outstanding contributions, and an overview of upcoming projects. Employees are encouraged to participate actively by asking questions and sharing their thoughts.',
    color: CalendarEventColor.BURGUNDY100,
  },
  {
    title: 'Board Meeting',
    start: '2025-04-28T15:00:00.000Z' as unknown as Date,
    end: '2025-04-28T17:00:00.000Z' as unknown as Date,
    color: CalendarEventColor.DEEPPURPLE,
  },
  {
    title: 'Product Launch Event',
    start: '2025-05-01T10:00:00.000Z' as unknown as Date,
    end: '2025-05-01T12:00:00.000Z' as unknown as Date,
    invitedParticipants: {
      total: 20,
      accepted: 18,
      declined: 1,
      noResponse: 1,
    },
    description:
      'Official launch of the new product line. This event will feature presentations from the product development team, live demonstrations, and a Q&A session with key stakeholders. Media representatives and industry influencers have been invited to amplify the reach of the launch. Attendees will also have the opportunity to network and provide feedback.',
    color: CalendarEventColor.PRIMARY100,
  },
  {
    title: 'Team Brainstorming Session',
    start: '2025-05-03T14:30:00.000Z' as unknown as Date,
    end: '2025-05-03T16:00:00.000Z' as unknown as Date,
    color: CalendarEventColor.WARNING,
  },
  {
    title: 'Coding Hackathon',
    start: '2025-05-07T08:00:00.000Z' as unknown as Date,
    end: '2025-05-07T20:00:00.000Z' as unknown as Date,
    invitedParticipants: {
      total: 30,
      accepted: 25,
      declined: 2,
      noResponse: 3,
    },
    description:
      '24-hour coding hackathon to innovate and develop new features for upcoming projects. Participants will work in teams to brainstorm ideas, design prototypes, and present their solutions. Mentors and judges will be available to provide guidance and evaluate submissions. Prizes will be awarded to the top-performing teams.',
    color: CalendarEventColor.PRIMARY,
  },
  {
    title: 'Financial Planning Meeting',
    start: '2025-05-10T11:00:00.000Z' as unknown as Date,
    end: '2025-05-10T12:30:00.000Z' as unknown as Date,
    color: CalendarEventColor.PRIMARY100,
  },
  {
    title: 'Customer Feedback Session',
    start: '2025-05-12T15:00:00.000Z' as unknown as Date,
    end: '2025-05-12T16:30:00.000Z' as unknown as Date,
    color: CalendarEventColor.SECONDARY100,
  },
  {
    title: 'Sales Review Meeting',
    start: '2025-05-15T10:00:00.000Z' as unknown as Date,
    end: '2025-05-15T11:30:00.000Z' as unknown as Date,
    color: CalendarEventColor.BURGUNDY100,
  },
  {
    title: 'Design Team Review',
    start: '2025-05-18T14:00:00.000Z' as unknown as Date,
    end: '2025-05-18T15:30:00.000Z' as unknown as Date,
    color: CalendarEventColor.BURGUNDY,
  },
  {
    title: 'Company Anniversary Celebration',
    start: '2025-05-20T18:00:00.000Z' as unknown as Date,
    end: '2025-05-20T22:00:00.000Z' as unknown as Date,
    invitedParticipants: {
      total: 100,
      accepted: 90,
      declined: 5,
      noResponse: 5,
    },
    description:
      'Celebrate the company’s 10th anniversary with employees, partners, and clients. The evening will include speeches from the CEO and founding members, a video montage of the company’s journey, and awards for outstanding contributions. A gala dinner and entertainment program will follow, providing a memorable experience for all attendees.',
    color: CalendarEventColor.WARNING,
  },
];
