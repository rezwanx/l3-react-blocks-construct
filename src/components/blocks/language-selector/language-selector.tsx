import { SetStateAction, useState } from 'react';

import { Button } from 'components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

const languages = [
  { key: 'en', title: 'English' },
  { key: 'de', title: 'German' },
  { key: 'fr', title: 'French' },
];

function LanguageSelector() {
  const [language, setLanguage] = useState('en');

  const changeLanguage = (newLanguage: SetStateAction<string>) => {
    setLanguage(newLanguage);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center gap-1 hover:bg-transparent"
        >
          <span className="font-semibold uppercase">{language}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang, i) => (
          <div key={lang.key}>
            <DropdownMenuItem
              className={`${lang.key === language ? 'font-bold' : 'cursor-pointer'}`}
              onClick={() => changeLanguage(lang.key)}
            >
              {lang.title}
            </DropdownMenuItem>
            {i !== languages.length - 1 && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelector;
