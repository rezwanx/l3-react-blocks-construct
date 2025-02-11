import InventoryAdvanceTable from 'features/inventory/component/inventory-advance-table/inventory-advance-table';

export function Inventory() {
  return (
    <div className="flex w-full flex-col">
      <div className="mb-[18px] flex items-center text-base text-high-emphasis md:mb-[24px]">
        <h3 className="text-2xl font-bold tracking-tight">Inventory</h3>
      </div>
      <InventoryAdvanceTable />
    </div>
  );
}
