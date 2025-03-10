import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';
import { CircularProgress } from '../circular-progress/circular-progress';
import { daysOfWeek } from '../../services/dashboard-service';

export const DashboardSystemOverview = () => {
  return (
    <Card className="w-full border-none rounded-[8px] shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-high-emphasis">System usage overview</CardTitle>
          <Select>
            <SelectTrigger className="w-[120px] h-[28px] px-2 py-1">
              <SelectValue placeholder="Today" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {daysOfWeek.map((day) => (
                  <SelectItem key={day.value} value={day.value}>
                    {day.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <CardDescription />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center gap-6 sm:gap-4">
            <CircularProgress percentage={58.9} strokeColor="hsl(var(--warning))" />
            <div>
              <h3 className="text-sm font-normal text-high-emphasis">API calls</h3>
              <span>
                <span className="text-[24px] font-semibold text-high-emphasis">12,345</span>
                <span className="text-sm text-medium-emphasis"> /25000</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6 sm:gap-4">
            <CircularProgress percentage={100} strokeColor="hsl(var(--pink-500))" />
            <div>
              <h3 className="text-sm font-normal text-high-emphasis">Bandwidth</h3>
              <span>
                <span className="text-[24px] font-semibold text-high-emphasis">200 MB</span>
                <span className="text-sm text-medium-emphasis"> /Unlimited</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6 sm:gap-4">
            <CircularProgress percentage={30.9} strokeColor="hsl(var(--green-500))" />
            <div>
              <h3 className="text-sm font-normal text-high-emphasis">Concurrent Users</h3>
              <span>
                <span className="text-[24px] font-semibold text-high-emphasis">324</span>
                <span className="text-sm text-medium-emphasis"> /1000</span>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
