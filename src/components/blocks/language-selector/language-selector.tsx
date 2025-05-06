import { useState } from 'react';
import { useLanguageContext } from '../../../i18n/language-context';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

/**
 * LanguageSelector Component
 *
 * A dropdown menu component that allows users to select their preferred language
 * from a list of available languages fetched from the API.
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { currentLanguage, setLanguage, availableLanguages, isLoading } = useLanguageContext();

  const changeLanguage = async (newLanguageCode: string) => {
    await setLanguage(newLanguageCode);
  };

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="flex items-center gap-1 h-[34px] px-2 rounded-[4px] hover:bg-surface">
          <span className="text-sm font-semibold uppercase text-medium-emphasis">
            {currentLanguage}
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
        ) : !availableLanguages || availableLanguages.length === 0 ? (
          <DropdownMenuItem disabled>Please login first to access the languages</DropdownMenuItem>
        ) : availableLanguages && availableLanguages.length > 0 ? (
          availableLanguages.map((lang, i) => (
            <div key={lang.itemId}>
              <DropdownMenuItem
                className={`${lang.languageCode === currentLanguage ? 'font-bold cursor-pointer' : ''}`}
                onClick={() => changeLanguage(lang.languageCode)}
              >
                {lang.languageName} {lang.isDefault && '(Default)'}
              </DropdownMenuItem>
              {i !== availableLanguages.length - 1 && <DropdownMenuSeparator />}
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
