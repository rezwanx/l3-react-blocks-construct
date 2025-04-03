import { Card } from "components/ui/card"
import ActivityLogGroup from "../activity-log-group/activity-log-group"
import type { ActivityGroup } from "../../services/activity-log.types"
import "./activity-log-timeline.css"
import { useEffect, useRef, useState, useCallback } from "react"
import { debounce } from "lodash"

const ActivityLogTimeline = ({ activities }: { activities: ActivityGroup[] }) => {
  const [visibleCount, setVisibleCount] = useState(5)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleScroll = useCallback(() => {
    const container = containerRef.current
    if (container && container.scrollHeight - container.scrollTop <= container.clientHeight + 200) {
      setVisibleCount((prev) => Math.min(prev + 5, activities.length))
    }
  }, [activities.length])

  useEffect(() => {
    const container = containerRef.current
    const debouncedHandleScroll = debounce(handleScroll, 200)

    if (container) {
      container.addEventListener("scroll", debouncedHandleScroll)
    }

    return () => {
      debouncedHandleScroll.cancel()
      if (container) {
        container.removeEventListener("scroll", debouncedHandleScroll)
      }
    }
  }, [handleScroll])

  const visibleActivities = activities.slice(0, visibleCount)

  return (
    <Card className="w-full border-none rounded-[8px] shadow-sm">
      <div ref={containerRef} className="px-12 py-8 h-[800px] overflow-y-auto scrollbar-hide">
        <div className="relative">
          {visibleActivities.length > 0 && (
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-[1px] bg-gray-200"
              style={{
                top: "60px",
                bottom: "20px",
                zIndex: 0,
              }}
            />
          )}

          {visibleActivities.map((group, index) => (
            <ActivityLogGroup
              key={index}
              isLastIndex={index === visibleActivities.length - 1}
              isFirstIndex={index === 0}
              {...group}
            />
          ))}

          {visibleCount < activities.length && (
            <div className="text-center py-4 text-gray-500 text-sm">Scroll for more activities...</div>
          )}
        </div>
      </div>
    </Card>
  )
}

export default ActivityLogTimeline

