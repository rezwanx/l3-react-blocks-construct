/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/exhaustive-deps */
import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { DataTableViewOptions } from 'components/blocks/data-table/data-table-view-options';
import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';

interface IamTableToolbarProps<TData> {
  table: Table<TData>;
  onSearch?: (filters: { email: string; name: string }) => void;
}

export function IamTableToolbar<TData>({ table, onSearch }: IamTableToolbarProps<TData>) {
  const [filters, setFilters] = useState({
    email: '',
    name: '',
  });

  const debouncedSearch = useCallback(
    debounce((newFilters) => {
      onSearch?.(newFilters);
    }, 500),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(filters);
    return () => {
      debouncedSearch.cancel();
    };
  }, [filters, debouncedSearch]);

  const handleFilterChange = (field: 'email' | 'name', value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);

    // Update table filters for client-side filtering
    if (field === 'email') {
      table.getColumn('email')?.setFilterValue(value);
    } else if (field === 'name') {
      table.getColumn('fullName')?.setFilterValue(value);
    }
  };

  const handleResetFilters = () => {
    setFilters({ email: '', name: '' });
    table.resetColumnFilters();
    onSearch?.({ email: '', name: '' });
  };

  const isFiltered = filters.email || filters.name;

  return (
    <div className="flex w-full items-center justify-between gap-2 flex-col sm:flex-row">
      <div className="flex items-center w-full gap-2 flex-col sm:flex-row">
        <Input
          placeholder="Search by name..."
          value={filters.name}
          onChange={(event) => handleFilterChange('name', event.target.value)}
          className="h-9 w-full sm:w-[300px] rounded-md bg-background"
        />
        <Input
          placeholder="Search by email..."
          value={filters.email}
          onChange={(event) => handleFilterChange('email', event.target.value)}
          className="h-9 w-full sm:w-[300px] rounded-md bg-background"
        />
        {isFiltered && (
          <Button variant="ghost" onClick={handleResetFilters} className="h-8 px-2 lg:px-3">
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

// import { Table } from '@tanstack/react-table';
// import { X, Search } from 'lucide-react';
// import { Button } from 'components/ui/button';
// import { Input } from 'components/ui/input';
// import { DataTableViewOptions } from 'components/blocks/data-table/data-table-view-options';
// import { useEffect, useState, useCallback } from 'react';
// import { debounce } from 'lodash';

// interface IamTableToolbarProps<TData> {
//   table: Table<TData>;
//   onSearch?: (filters: { email: string; name: string }) => void;
// }

// export function IamTableToolbar<TData>({ table, onSearch }: IamTableToolbarProps<TData>) {
//   const [searchTerm, setSearchTerm] = useState('');

//   const debouncedSearch = useCallback(
//     debounce(() => {
//       onSearch?.({
//         email: searchTerm,
//         name: searchTerm,
//       });
//     }, 500),
//     [onSearch, searchTerm]
//   );

//   useEffect(() => {
//     debouncedSearch();
//     return () => {
//       debouncedSearch.cancel();
//     };
//   }, [searchTerm, debouncedSearch]);

//   const handleResetSearch = () => {
//     setSearchTerm('');
//     onSearch?.({ email: '', name: '' });
//   };

//   return (
//     <div className="flex w-full items-center justify-between gap-2 flex-col sm:flex-row">
//       <div className="flex items-center w-full gap-2 relative">
//         <div className="relative w-full sm:w-[400px]">
//           <Input
//             placeholder="Search by name or email..."
//             value={searchTerm}
//             onChange={(event) => setSearchTerm(event.target.value)}
//             className="h-9 w-full rounded-md bg-background pl-8"
//           />
//           <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//           {searchTerm && (
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={handleResetSearch}
//               className="absolute right-0 top-0 h-9 w-9"
//             >
//               <X className="h-4 w-4" />
//             </Button>
//           )}
//         </div>
//       </div>
//       <DataTableViewOptions table={table} />
//     </div>
//   );
// }
