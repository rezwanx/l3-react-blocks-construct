import { useTranslation } from 'react-i18next';
import { Payload, ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

const chartConfig = {
  revenue: {
    label: 'REVENUE',
    color: 'hsl(var(--secondary-600))',
  },
  expenses: {
    label: 'EXPENSES',
    color: 'hsl(var(--burgundy-100))',
  },
};

interface TooltipContentProps {
  payload: Payload<ValueType, NameType>[] | undefined;
  label: string;
  hoveredKey: string | null;
}

export const FinanceRevenueExpenseTooltip = ({
  payload,
  label,
  hoveredKey,
}: TooltipContentProps) => {
  const { t } = useTranslation();

  if (!payload || !hoveredKey) return null;

  const data = payload.find((item) => item.dataKey === hoveredKey);
  if (!data) return null;

  const { color, label: seriesLabel } = chartConfig[hoveredKey as keyof typeof chartConfig];

  return (
    <div className="rounded-md bg-neutral-700 p-3 shadow-lg">
      <p className="text-sm text-white mb-2">
        {t(seriesLabel)} ({label}):
      </p>
      <div className="flex items-center">
        <span className="inline-block w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: color }} />
        <span className="text-sm text-white font-semibold">
          CHF {data.value?.toLocaleString() ?? '0'}
        </span>
      </div>
    </div>
  );
};
