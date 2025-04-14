interface PriorityBadgeProps {
  priority?: string;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const colors = {
    High: 'bg-red-100 text-red-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Low: 'bg-blue-100 text-blue-700',
  };

  if (!priority) return null;

  return (
    <span
      className={`px-2 py-1 rounded-lg text-xs font-medium ${colors[priority as keyof typeof colors]}`}
    >
      {priority}
    </span>
  );
}
