import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';

export function Profile() {
  const [tabId, setTabId] = useState('generalInfo');

  return (
    <div className="flex w-full flex-col">
      <div className="mb-[18px] flex items-center text-base text-high-emphasis md:mb-[24px]">
        <h3 className="text-2xl font-bold tracking-tight">My Profile</h3>
      </div>

      <Tabs value={tabId}>
        <div className="mb-5 mt-6 flex items-center rounded text-base">
          <TabsList>
            <TabsTrigger onClick={() => setTabId('generalInfo')} value="generalInfo">
              General info
            </TabsTrigger>
            <TabsTrigger onClick={() => setTabId('devices')} value="devices">
              Devices
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="generalInfo">
          <div className="flex">
            <h1>General Info</h1>
          </div>
        </TabsContent>

        <TabsContent value="devices">
          <div className="flex">
            <h1>Devices</h1>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
