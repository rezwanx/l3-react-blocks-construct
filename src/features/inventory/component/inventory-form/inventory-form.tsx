import { useAddItemForm } from '../../hooks/use-add-item-form-context';

export default function InventoryForm() {
  const { setIsAddItemFormOpen } = useAddItemForm();
  return (
    <div className="mb-[18px] md:mb-[32px]">
      <h3
        className="text-2xl font-bold tracking-tight text-high-emphasis"
        onClick={() => setIsAddItemFormOpen(false)}
      >
        Add item
      </h3>
    </div>
  );
}
