import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import { useAvailableLanguages } from './hooks/use-language';

/**
 * LanguageSelector Component
 *
 * A dropdown menu component that allows users to select their preferred language
 * from a list of available languages fetched from the API.
 *
 * Features:
 * - Fetches available languages dynamically from the API
 * - Dropdown interface for language selection
 * - Visual indicator of currently selected language
 * - Displays language code in the trigger button
 * - Shows loading state when fetching languages
 * - Handles error states gracefully
 * - Indicates the default language with a label
 * - Visual separation between language options
 *
 * State:
 * - Tracks currently selected language code
 * - Controls dropdown open/close state
 * - Manages API data loading and error states
 *
 * Implementation Details:
 * - Uses the useAvailableLanguages hook to fetch language data
 * - Implements TanStack Query for data fetching and state management
 * - Uses Shadcn UI DropdownMenu components for the UI
 * - Styled with Tailwind CSS
 *
 * @returns {JSX.Element} A language selection dropdown menu component
 *
 * @example
 * // Basic usage in a navigation bar
 * <nav className="flex items-center justify-between">
 *   <Logo />
 *   <div className="flex items-center gap-4">
 *     <LanguageSelector />
 *     <UserMenu />
 *   </div>
 * </nav>
 */

function LanguageSelector() {
  const [selectedLanguageCode, setSelectedLanguageCode] = useState('en-US');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: languages, isLoading, error } = useAvailableLanguages();

  const changeLanguage = (newLanguageCode: string) => {
    setSelectedLanguageCode(newLanguageCode);
  };

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="flex items-center gap-1 h-[34px] px-2 rounded-[4px] hover:bg-surface">
          <span className="text-sm font-semibold uppercase text-medium-emphasis">
            {selectedLanguageCode}
          </span>
          {isDropdownOpen ? (
            <ChevronUp className="h-4 w-4 text-medium-emphasis" />
          ) : (
            <ChevronDown className="h-4 w-4 text-medium-emphasis" />
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {isLoading ? (
          <DropdownMenuItem disabled>Loading languages...</DropdownMenuItem>
        ) : error ? (
          <DropdownMenuItem disabled>Error loading languages</DropdownMenuItem>
        ) : languages && languages.length > 0 ? (
          languages.map((lang, i) => (
            <div key={lang.itemId}>
              <DropdownMenuItem
                className={`${lang.languageCode === selectedLanguageCode ? 'font-bold cursor-pointer' : ''}`}
                onClick={() => changeLanguage(lang.languageCode)}
              >
                {lang.languageName} {lang.isDefault && '(Default)'}
              </DropdownMenuItem>
              {i !== languages.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))
        ) : (
          <DropdownMenuItem disabled>No languages available</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelector;
