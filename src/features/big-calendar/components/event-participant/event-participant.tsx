import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent } from 'components/ui/menubar';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Checkbox } from 'components/ui/checkbox';
import { Avatar, AvatarImage, AvatarFallback } from 'components/ui/avatar';
import { Label } from 'components/ui/label';
import { members } from '../../services/calendar-services';
import { Member } from '../../types/calendar-event.types';

interface EventParticipantProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  editMembers?: Member[];
}

export const EventParticipant = ({
  selected,
  onChange,
  editMembers,
}: Readonly<EventParticipantProps>) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = [...(editMembers ?? []), ...members]?.filter((member) =>
    member?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelection = (id: string) => {
    onChange(selected.includes(id) ? selected.filter((m) => m !== id) : [...selected, id]);
  };

  return (
    <div className="flex items-center gap-2">
      {selected.length > 0 &&
        selected.map((id) => {
          const member = [...(editMembers ?? []), ...members]?.find((m) => m.id === id);
          if (!member) return null;
          return (
            <Avatar key={id} className="ring-2 ring-neutral-50 shadow-md">
              <AvatarImage alt={member.name} src={member.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          );
        })}
      <Menubar className="border-none">
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Button variant="outline" size="icon" className="border-dashed">
              <Plus className="w-5 h-5 text-high-emphasis" />
            </Button>
          </MenubarTrigger>
          <MenubarContent className="flex flex-col gap-6 py-2 px-3">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-base text-high-emphasis">Members</p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search members"
                  className="h-10 w-full rounded-lg bg-surface border-none pl-8"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {filteredMembers?.map((member) => (
                <div key={member.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`member-${member.id}`}
                    checked={selected.includes(member.id)}
                    onCheckedChange={() => toggleSelection(member.id)}
                    className="border-medium-emphasis data-[state=checked]:border-none border-2 rounded-[2px]"
                  />
                  <Avatar className="ring-2 ring-neutral-50 w-6 h-6 shadow-md">
                    <AvatarImage alt={member.name} src={member.image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Label
                    htmlFor={`member-${member.id}`}
                    className="text-sm font-normal text-high-emphasis"
                  >
                    {member.name}
                  </Label>
                </div>
              ))}
            </div>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};
