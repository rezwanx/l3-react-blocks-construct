import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import { ScrollArea, ScrollBar } from 'components/ui/scroll-area';

export const InventoryAdvanceTable = () => {
  return (
    <div className="flex">
      <Card className="w-full border-none rounded-[8px] shadow-sm">
        <CardHeader className="hidden">
          <CardTitle />
          <CardDescription />
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full">
            <div>
              <h1>Inventory Advance Table</h1>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryAdvanceTable;
