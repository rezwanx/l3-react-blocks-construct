import { Separator } from 'components/ui/separator';
import { ActivityGroup } from '../../services/activity-log.types';
import ActivityLogItem from './activity-log-item';

const ActivityLogGroup = ({
  date,
  items,
  isLastIndex,
}: ActivityGroup & { isLastIndex: boolean }) => (
  <div className="mb-6 relative">
    <div className="text-base font-bold text-gray-700 mb-2 pb-1">
      {new Date(date).toISOString().slice(8, 10) +
        '.' +
        new Date(date).toISOString().slice(5, 7) +
        '.' +
        new Date(date).toISOString().slice(0, 4)}
    </div>
    <div className="relative">
      {items.map((activity, index) => (
        <ActivityLogItem key={index} {...activity} />
      ))}
    </div>
    {!isLastIndex && <Separator />}
  </div>
);

export default ActivityLogGroup;
