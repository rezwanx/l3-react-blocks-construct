import type { ActivityGroup } from '../../services/activity-log.types';
import ActivityLogItem from './activity-log-item';

const getFormattedDateLabel = (date: string) => {
  const activityDate = new Date(date);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const normalizedYesterday = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate()
  );
  const normalizedActivityDate = new Date(
    activityDate.getFullYear(),
    activityDate.getMonth(),
    activityDate.getDate()
  );

  const formattedDate =
    activityDate.getDate().toString().padStart(2, '0') +
    '.' +
    (activityDate.getMonth() + 1).toString().padStart(2, '0') +
    '.' +
    activityDate.getFullYear();

  if (normalizedActivityDate.getTime() === normalizedToday.getTime()) {
    return `TODAY - ${formattedDate}`;
  } else if (normalizedActivityDate.getTime() === normalizedYesterday.getTime()) {
    return `YESTERDAY - ${formattedDate}`;
  } else {
    const weekdays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const weekdayName = weekdays[activityDate.getDay()];
    return `${weekdayName} - ${formattedDate}`;
  }
};

interface ActivityLogGroupProps extends ActivityGroup {
  isLastIndex: boolean;
  isFirstIndex: boolean;
}

const ActivityLogGroup = ({ date, items, isLastIndex }: ActivityLogGroupProps) => (
  <div className="mb-8 relative">
    <div className="flex justify-center mb-4 relative z-10">
      <div className="bg-secondary-50 text-secondary-800 text-xs font-medium py-1 px-2 rounded">
        {getFormattedDateLabel(date)}
      </div>
    </div>

    <div className="relative">
      {items.map((activity, index) => (
        <ActivityLogItem
          key={index}
          {...activity}
          isEven={index % 2 === 0}
          isFirst={index === 0}
          isLast={index === items.length - 1 && isLastIndex}
        />
      ))}
    </div>
  </div>
);

export default ActivityLogGroup;
