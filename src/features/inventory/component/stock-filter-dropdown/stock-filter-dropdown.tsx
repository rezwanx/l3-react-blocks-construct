import { useState } from 'react';
import { Input } from 'components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio-group';
import { Button } from 'components/ui/button';
import { Label } from 'components/ui/label';

interface StockFilterDropdownProps {
  stockFilter: string;
  setStockFilter: (value: string) => void;
  stockAmount: string;
  setStockAmount: (value: string) => void;
  setFilterValue: (value: string | undefined) => void;
}

export function StockFilterDropdown({
  stockFilter,
  setStockFilter,
  stockAmount,
  setStockAmount,
  setFilterValue,
}: StockFilterDropdownProps) {
  const [openStockDropdown, setOpenStockDropdown] = useState(false);

  return (
    <DropdownMenu open={openStockDropdown} onOpenChange={setOpenStockDropdown}>
      <div className="relative">
        <Input
          placeholder="Stock"
          value={stockAmount}
          onChange={(e) => setStockAmount(e.target.value)}
          className="rounded-[6px] h-10"
          onFocus={() => setOpenStockDropdown(true)}
        />
        <DropdownMenuTrigger asChild>
          <button className="absolute inset-0" aria-label="Open dropdown" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="p-4 space-y-3 z-50 bg-white border rounded-lg shadow-lg"
        >
          <RadioGroup value={stockFilter} onValueChange={setStockFilter}>
            {[
              { value: 'less_than', label: 'Less than' },
              { value: 'more_than', label: 'More than' },
              { value: 'amount', label: 'Amount' },
              { value: 'no_entry', label: 'No entry' },
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <label htmlFor={option.value} className="text-sm">
                  {option.label}
                </label>
              </div>
            ))}
          </RadioGroup>
          <div>
            <Label className="text-sm font-normal">Amount</Label>
            <Input value={stockAmount} onChange={(e) => setStockAmount(e.target.value)} />
          </div>
          <Button
            variant="ghost"
            className="w-full"
            size="sm"
            onClick={() => {
              setStockFilter('less_than');
              setStockAmount('');
              setFilterValue('');
            }}
          >
            Clear filter
          </Button>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
}
