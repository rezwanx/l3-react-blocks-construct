// import useLanguage from 'hooks/use-language-switcher';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from 'components/ui/dropdown-menu';
// import { Button } from 'components/ui/button';

// const languages = [
//   { key: 'en', title: 'English' },
//   { key: 'de', title: 'German' },
//   { key: 'fr', title: 'French' },
// ];

// function LanguageSelector() {
//   const { changeLanguage, language } = useLanguage();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="secondary" size="icon" className="rounded-full">
//           <span className="font-semibold uppercase">{language}</span>
//           <span className="sr-only">Toggle user menu</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         {languages.map((lang, i) => (
//           <div key={lang.key}>
//             <DropdownMenuItem
//               className={`${lang.key === language ? 'font-bold' : 'cursor-pointer'}`}
//               onClick={() => {
//                 changeLanguage(lang.key);
//               }}
//             >
//               {lang.title}
//             </DropdownMenuItem>
//             {i !== languages.length - 1 && <DropdownMenuSeparator />}
//           </div>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// export default LanguageSelector;

import { SetStateAction, useState } from 'react';

import { Button } from 'components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

const languages = [
  { key: 'en', title: 'English' },
  { key: 'de', title: 'German' },
  { key: 'fr', title: 'French' },
];

function LanguageSelector() {
  const [language, setLanguage] = useState('en');

  const changeLanguage = (newLanguage: SetStateAction<string>) => {
    setLanguage(newLanguage);
    // Here you can add any additional logic needed when language changes
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <span className="font-semibold uppercase">{language}</span>
          <span className="sr-only">Toggle language menu</span>
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
