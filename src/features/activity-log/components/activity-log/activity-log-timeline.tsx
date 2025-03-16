import { Card } from 'components/ui/card';
import ActivityLogGroup from './activity-log-group';
import { ActivityGroup } from './activity-log.types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

const ActivityLogTimeline = ({ activities }: { activities: ActivityGroup[] }) => {
  const [visibleCount, setVisibleCount] = useState(5); 
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Memoize the handleScroll function with useCallback to include it in dependencies
  const handleScroll = useCallback(
    debounce(() => {
      const container = containerRef.current;
      if (container) {
        if (container.scrollHeight - container.scrollTop <= container.clientHeight + 200) {
          // Load more activities if not at the end
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

    // Cleanup event listener on unmount
    return () => {
      handleScroll.cancel(); // Cancel any pending debounced calls
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]); // Only re-run when handleScroll changes
  return (
    <Card className="w-full border-none rounded-[8px] shadow-sm">
      <div ref={containerRef} className="px-12 py-8 h-[500px] overflow-y-auto scrollbar-hide">
        {/* Add a style block to hide WebKit scrollbars */}
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {/* Continuous timeline line for all groups */}

        <div className="relative">
          {/* Main continuous timeline */}
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
