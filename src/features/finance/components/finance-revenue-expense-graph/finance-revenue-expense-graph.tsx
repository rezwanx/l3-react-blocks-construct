import { BarChart, CartesianGrid, Bar, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from 'components/ui/chart';

/**
 * RevenueExpenseTrend component displays a bar chart visualizing revenue and expense trends.
 * It allows users to filter the chart data by year or specific time periods.
 *
 * @component
 * @example
 * return (
 *   <RevenueExpenseTrend />
 * )
 *
 * @returns {JSX.Element} - The rendered JSX component showing revenue and expense trends over time with a selectable time period.
 */

// Sample data for the chart
const chartData = [
  { month: 'Jan', revenue: 25000, expenses: 9000 },
  { month: 'Feb', revenue: 82000, expenses: 23000 },
  { month: 'Mar', revenue: 41000, expenses: 15000 },
  { month: 'Apr', revenue: 74000, expenses: 20000 },
  { month: 'May', revenue: 90000, expenses: 26000 },
  { month: 'Jun', revenue: 76000, expenses: 21000 },
  { month: 'Jul', revenue: 28000, expenses: 10000 },
  { month: 'Aug', revenue: 12000, expenses: 5000 },
  { month: 'Sep', revenue: 82000, expenses: 24000 },
  { month: 'Oct', revenue: 41000, expenses: 15000 },
  { month: 'Nov', revenue: 74000, expenses: 20000 },
  { month: 'Dec', revenue: 90000, expenses: 26000 },
];

// Chart configuration
const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--secondary-600))',
  },
  expenses: {
    label: 'Expenses',
    color: 'hsl(var(--burgundy-100))',
  },
};

// Time period options
const timePeriods = [
  { value: 'this-year', label: 'This year' },
  { value: 'last-year', label: 'Last year' },
  { value: 'last-6-months', label: 'Last 6 months' },
  { value: 'last-3-months', label: 'Last 3 months' },
];

export default function FinanceRevenueExpenseGraph() {
  return (
    <Card className="w-full border-none rounded-lg shadow-sm bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-high-emphasis">
              Revenue & expense trend
            </CardTitle>
            <CardDescription className="text-medium-emphasis mt-1">
              Compare total revenue and expenses across your selected time period.
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
        <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
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
                style: { textAnchor: 'middle', fill: 'hsl(var(--medium-emphasis))', fontSize: 12 },
              }}
              domain={[0, 100000]}
              ticks={[0, 20000, 40000, 60000, 80000, 100000]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent formatter={(value) => `CHF ${value.toLocaleString()}`} />
              }
            />
            <Bar
              dataKey="revenue"
              fill="hsl(var(--secondary-600))"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="expenses"
              fill="hsl(var(--burgundy-100))"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
