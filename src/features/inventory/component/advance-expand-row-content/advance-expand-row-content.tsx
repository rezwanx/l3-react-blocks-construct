import { useState } from 'react';
import { TableCell, TableRow } from 'components/ui/table';
import { Input } from 'components/ui/input';
import { Checkbox } from 'components/ui/checkbox';
import { Button } from 'components/ui/button';
import { Switch } from 'components/ui/switch';
import { Separator } from 'components/ui/separator';
import DesktopImage1 from 'assets/images/desktop_1.png';
import DesktopImage2 from 'assets/images/desktop_2.webp';
import DesktopImage3 from 'assets/images/desktop_3.webp';

interface AdvanceExpandRowContentProps {
  rowId?: string;
  columnLength?: number;
}

const images = [DesktopImage1, DesktopImage2, DesktopImage3];

const tags = ['Accessories', 'Electronic', 'Gaming', 'Monitor'];

export const AdvanceExpandRowContent = ({ rowId, columnLength }: AdvanceExpandRowContentProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [warranty, setWarranty] = useState(true);
  const [replacement, setReplacement] = useState(true);
  const [discount, setDiscount] = useState(false);
  const [stock, setStock] = useState(30);
  const [selectedTags, setSelectedTags] = useState(['Electronic', 'Gaming', 'Monitor']);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };
  return (
    <TableRow key={`expanded-${rowId}`} className="hover:bg-transparent">
      <TableCell colSpan={columnLength} className="p-4">
        <div className="flex gap-6 justify-between">
          <div className="flex gap-2 flex-col">
            <img
              src={selectedImage}
              alt="Product"
              className="w-44 h-44 object-cover rounded-lg border"
            />
            <div className="flex w-full items-center justify-between">
              {images.map((img) => (
                <img
                  key={img}
                  src={img}
                  alt="Thumbnail"
                  className={`w-12 h-12 object-cover rounded-md cursor-pointer border ${
                    selectedImage === img ? 'border-[1.5px] border-primary' : ''
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 w-[40%]">
            <div className="flex items-center gap-2 justify-between">
              <span>Eligible for warranty</span>
              <Switch checked={warranty} onCheckedChange={setWarranty} />
            </div>
            <div className="flex items-center gap-2 justify-between">
              <span>Eligible for replacement</span>
              <Switch checked={replacement} onCheckedChange={setReplacement} />
            </div>
            <div className="flex items-center gap-2 justify-between">
              <span>Discount</span>
              <Switch checked={discount} onCheckedChange={setDiscount} />
            </div>
            <div className="flex flex-col gap-1">
              <span>Stock</span>
              <Input value={stock} onChange={(e) => setStock(Number(e.target.value))} />
            </div>
          </div>
          <div className="flex flex-col w-[30%]">
            <span className="mb-2">Tags</span>
            <div className="w-full border rounded-lg">
              <Input
                className="border-none shadow-none outline-none focus-visible:ring-0"
                placeholder="Enter tag name"
              />
              <div className="flex p-2 gap-2 flex-col border-t">
                {tags.map((tag) => (
                  <div key={tag} className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => handleTagToggle(tag)}
                    />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex justify-end gap-4">
          <Button variant="outline">View Details</Button>
          <Button disabled>Update</Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
