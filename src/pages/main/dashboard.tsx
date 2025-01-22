import { Download, RefreshCcw, TrendingUp, UserCog, UserPlus, Users } from 'lucide-react';
import { Button } from 'components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';

export function Dashboard() {
  return (
    <div className="flex w-full flex-col">
      <div className="mb-[18px] flex items-center justify-between md:mb-[32px]">
        <h3 className="text-2xl font-bold tracking-tight text-high-emphasis">Dashboard</h3>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="text-high-emphasis hover:text-high-emphasis  font-bold"
          >
            <RefreshCcw className="w-2.5 h-2.5" />
            Sync
          </Button>
          <Button className="font-bold">
            <Download className="w-2.5 h-2.5" />
            Export
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <Card className="w-full border-none rounded-[8px] shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-high-emphasis">Overview</CardTitle>
              <Select>
                <SelectTrigger className="w-[120px] h-[28px] px-2 py-1">
                  <SelectValue placeholder="This month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="january">January</SelectItem>
                    <SelectItem value="february">February</SelectItem>
                    <SelectItem value="march">March</SelectItem>
                    <SelectItem value="april">April</SelectItem>
                    <SelectItem value="may">May</SelectItem>
                    <SelectItem value="june">June</SelectItem>
                    <SelectItem value="july">July</SelectItem>
                    <SelectItem value="august">August</SelectItem>
                    <SelectItem value="september">September</SelectItem>
                    <SelectItem value="october">October</SelectItem>
                    <SelectItem value="november">November</SelectItem>
                    <SelectItem value="december">December</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <CardDescription />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pt-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-sm font-normal text-high-emphasis">Total users</h3>
                  <h1 className="text-[32px] font-semibold text-high-emphasis">10,000</h1>
                  <div className="flex gap-1 items-center">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm text-success font-semibold">+2.5%</span>
                    <span className="text-sm text-medium-emphasis">from last month</span>
                  </div>
                </div>
                <div className="flex h-14 w-14 bg-surface rounded-[4px] items-center justify-center">
                  <Users className="h-7 w-7 text-deepPurple" />
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <h3 className="text-sm font-normal text-high-emphasis">Total active users</h3>
                  <h1 className="text-[32px] font-semibold text-high-emphasis">7,000</h1>
                  <div className="flex gap-1 items-center">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm text-success font-semibold">+5%</span>
                    <span className="text-sm text-medium-emphasis">from last month</span>
                  </div>
                </div>
                <div className="flex h-14 w-14 bg-surface rounded-[4px] items-center justify-center">
                  <UserCog className="h-7 w-7 text-blue" />
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <h3 className="text-sm font-normal text-high-emphasis">New sign-ups</h3>
                  <h1 className="text-[32px] font-semibold text-high-emphasis">1,200</h1>
                  <div className="flex gap-1 items-center">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm text-success font-semibold">+8%</span>
                    <span className="text-sm text-medium-emphasis">from last month</span>
                  </div>
                </div>
                <div className="flex h-14 w-14 bg-surface rounded-[4px] items-center justify-center">
                  <UserPlus className="h-7 w-7 text-emeraldGreen-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
