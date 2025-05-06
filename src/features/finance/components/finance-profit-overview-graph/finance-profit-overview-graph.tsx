import {
  AreaChart,
  CartesianGrid,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';

/**
 * ProfitOverview component displays an area chart visualizing profit trends.
 * It allows users to filter the chart data by year or specific time periods.
 *
 * @component
 * @example
 * return (
 *   <ProfitOverview />
 * )
 *
 * @returns {JSX.Element} - The rendered JSX component showing profit trends over time with a selectable time period.
 */

// Sample data for the chart - exactly matching the image curve
const chartData = [
  { month: 'Jan', profit: 42000 },
  { month: 'Feb', profit: 48000 },
  { month: 'Mar', profit: 55000 },
  { month: 'Apr', profit: 60000 },
  { month: 'May', profit: 52000 },
  { month: 'Jun', profit: 65000 },
  { month: 'Jul', profit: 80000 },
  { month: 'Aug', profit: 72000 },
  { month: 'Sep', profit: 78000 },
  { month: 'Oct', profit: 75000 },
  { month: 'Nov', profit: 85000 },
  { month: 'Dec', profit: 65000 },
];

// Time period options
const timePeriods = [
  { value: 'this-year', label: 'This year' },
  { value: 'last-year', label: 'Last year' },
  { value: 'last-6-months', label: 'Last 6 months' },
  { value: 'last-3-months', label: 'Last 3 months' },
];

// Custom tooltip that matches the design
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-neutral-200 rounded shadow-sm">
        <p className="text-medium-emphasis text-sm">{`CHF ${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

export default function FinanceProfitOverviewGraph() {
  return (
    <Card className="w-full border-none rounded-lg shadow-sm bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-high-emphasis">
              Profit overview
            </CardTitle>
            <CardDescription className="text-medium-emphasis mt-1">
              Monitor your profit trends for better financial insight.
            </CardDescription>
          </div>
          <Select defaultValue="this-year">
            <SelectTrigger className="w-[105px] h-[28px] px-2 py-1">
              <SelectValue placeholder="This year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {timePeriods.map((period) => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <defs>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(165, 73%, 80%)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(165, 73%, 80%)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="hsl(var(--neutral-100))"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                stroke="hsl(var(--medium-emphasis))"
              />
              <YAxis
                tickFormatter={(value) => `${value / 1000}k`}
                tickLine={false}
                axisLine={false}
                stroke="hsl(var(--medium-emphasis))"
                label={{
                  value: 'Amount (CHF)',
                  angle: -90,
                  position: 'insideLeft',
                  style: {
                    textAnchor: 'middle',
                    fill: 'hsl(var(--medium-emphasis))',
                    fontSize: 12,
                  },
                }}
                domain={[0, 100000]}
                ticks={[0, 20000, 40000, 60000, 80000, 100000]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="hsl(165, 73%, 60%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorProfit)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
