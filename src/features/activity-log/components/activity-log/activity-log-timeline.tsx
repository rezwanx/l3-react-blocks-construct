import { Card } from 'components/ui/card';
import ActivityLogGroup from './activity-log-group';
import { ActivityGroup } from '../../services/activity-log.types';
import './activity-log-timeline.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

const ActivityLogTimeline = ({ activities }: { activities: ActivityGroup[] }) => {
  const [visibleCount, setVisibleCount] = useState(5);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(
    debounce(() => {
      const container = containerRef.current;
      if (container) {
        if (container.scrollHeight - container.scrollTop <= container.clientHeight + 200) {
          if (visibleCount < activities.length) {
            setVisibleCount((prev) => prev + 5);
          }
        }
      }
    }, 200),
    [visibleCount, activities.length]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      handleScroll.cancel();
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);
  return (
    <Card className="w-full border-none rounded-[8px] shadow-sm">
      <div ref={containerRef} className="px-12 py-8 h-[500px] overflow-y-auto scrollbar-hide">
        <div className="relative">
          <div className="absolute left-1.5 -ml-6 top-0 bottom-0 w-0.5 bg-gray-200">
            <div className="absolute top-0 h-12 w-0.5 bg-white"></div>
            <div className="absolute bottom-0 h-8 w-0.5 bg-white"></div>
          </div>

          {activities.slice(0, visibleCount).map((group, index) => (
            <ActivityLogGroup
              key={index}
              isLastIndex={index === activities.length - 1}
              {...group}
            />
          ))}

          {visibleCount < activities.length && (
            <div className="text-center py-4 text-gray-500 text-sm">
              Scroll for more activities...
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ActivityLogTimeline;
