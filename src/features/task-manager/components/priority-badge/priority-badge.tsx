interface PriorityBadgeProps {
  priority: 'high' | 'medium' | 'low' | string;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const priorityStyles = {
    high: 'bg-error-background text-error',
    medium: 'bg-warning-background text-warning',
    low: 'bg-secondary-50 text-secondary',
  };

  const style =
    priorityStyles[priority.toLowerCase() as 'high' | 'medium' | 'low'] ||
    'bg-gray-100 text-gray-700';

  return (
    <span
      className={`inline-flex h-[22px] items-center px-2 border text-xs font-normal rounded-lg ${style}`}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
}
