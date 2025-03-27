import React from 'react';
import { Checkbox } from 'components/ui/checkbox';
import { Label } from 'components/ui/label';
import { Input } from 'components/ui/input';
import { Search } from 'lucide-react';

interface TagsSelectorProps {
  tags: string[];
  selectedTags: string[];
  handleTagToggle: (tag: string) => void;
}

export function TagsSelector({ tags, selectedTags, handleTagToggle }: TagsSelectorProps) {
  const [searchTags, setSearchTags] = React.useState('');
  const filteredTags = tags.filter((tag) => tag.toLowerCase().includes(searchTags.toLowerCase()));

  return (
    <div className="flex flex-col w-full mt-4">
      <Label className="mb-2 text-high-emphasis font-semibold h-6">Tags</Label>
      <div className="relative w-full mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
        <Input
          className="w-full pl-10"
          placeholder="Enter tag name"
          value={searchTags}
          onChange={(e) => setSearchTags(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 border rounded-md p-4 max-h-48 overflow-y-auto">
        {filteredTags.length > 0 ? (
          filteredTags.map((tag) => (
            <div key={tag} className="flex items-center gap-2">
              <Checkbox
                checked={selectedTags.includes(tag)}
                onCheckedChange={() => handleTagToggle(tag)}
                id={`tag-${tag}`}
              />
              <Label htmlFor={`tag-${tag}`} className="cursor-pointer">
                {tag}
              </Label>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No tags found</p>
        )}
      </div>
    </div>
  );
}
