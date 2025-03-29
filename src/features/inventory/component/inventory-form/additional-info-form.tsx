import { Switch } from 'components/ui/switch';
import { TagsSelector } from './tags-selector';

interface AdditionalInfoFormProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
  tags: string[];
  handleTagToggle: (tag: string) => void;
}

export function AdditionalInfoForm({
  formData,
  handleInputChange,
  tags,
  handleTagToggle,
}: AdditionalInfoFormProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-high-emphasis font-semibold h-6">Settings</h1>
      <div className="flex items-center justify-between">
        <span className="text-high-emphasis">Eligible for warranty</span>
        <Switch
          checked={formData.warranty}
          onCheckedChange={(checked) => handleInputChange('warranty', checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-high-emphasis">Eligible for replacement</span>
        <Switch
          checked={formData.replacement}
          onCheckedChange={(checked) => handleInputChange('replacement', checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-high-emphasis">Discount</span>
        <Switch
          checked={formData.discount}
          onCheckedChange={(checked) => handleInputChange('discount', checked)}
        />
      </div>

      <TagsSelector tags={tags} selectedTags={formData.tags} handleTagToggle={handleTagToggle} />
    </div>
  );
}
