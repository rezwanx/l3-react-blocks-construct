import type { ActivityItem } from "../../services/activity-log.types"

interface ActivityLogItemProps extends ActivityItem {
  isEven: boolean
  isFirst?: boolean
  isLast?: boolean
}

const formatTime = (time: string) => {
  const date = new Date(time)
  return (
    date.toISOString().slice(8, 10) +
    "." +
    date.toISOString().slice(5, 7) +
    "." +
    date.toISOString().slice(0, 4) +
    ", " +
    date.toISOString().slice(11, 13) +
    ":" +
    date.toISOString().slice(14, 16)
  )
}

const ActivityLogItem = ({ time, category, description, isEven }: ActivityLogItemProps) => (
  <div className="relative flex items-start mb-4 last:mb-0">
    <div className="w-1/2 pr-4 flex justify-end">
      {!isEven && (
        <div className="text-right max-w-[90%]">
          <div className="flex items-center justify-end text-medium-emphasis text-xs mb-1">
            <span>{formatTime(time)}</span>
            <span className="mx-2">•</span>
            <span>{category}</span>
          </div>
          <div className="text-base text-high-emphasis">{description}</div>
        </div>
      )}
    </div>

    <div className="absolute left-1/2 transform -translate-x-1/2 mt-1.5 z-10">
      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
    </div>

    <div className="w-1/2 pl-4">
      {isEven && (
        <div className="max-w-[90%]">
          <div className="flex items-center text-medium-emphasis text-xs mb-1">
            <span>{formatTime(time)}</span>
            <span className="mx-2">•</span>
            <span>{category}</span>
          </div>
          <div className="text-base text-high-emphasis">{description}</div>
        </div>
      )}
    </div>
  </div>
)

export default ActivityLogItem

