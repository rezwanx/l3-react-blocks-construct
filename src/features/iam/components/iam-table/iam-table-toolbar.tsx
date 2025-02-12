/* eslint-disable react-hooks/exhaustive-deps */
import { Table } from '@tanstack/react-table';
import { X, Mail, User } from 'lucide-react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { DataTableViewOptions } from 'components/blocks/data-table/data-table-view-options';
import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { DataTableFacetedFilter } from 'components/blocks/data-table/data-table-faceted-filter';
import { mfaEnabled, statuses } from './iam-table-filter-data';

interface IamTableToolbarProps<TData> {
  table: Table<TData>;
  onSearch?: (filters: { email: string; name: string }) => void;
}

export function IamTableToolbar<TData>({ table, onSearch }: IamTableToolbarProps<TData>) {
  const [filters, setFilters] = useState({
    email: '',
    name: '',
  });
  const [searchMode, setSearchMode] = useState<'email' | 'name'>('name');

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

  const handleFilterChange = (value: string) => {
    const newFilters = { ...filters, [searchMode]: value };
    setFilters(newFilters);

    if (searchMode === 'email') {
      table.getColumn('email')?.setFilterValue(value);
    } else {
      table.getColumn('fullName')?.setFilterValue(value);
    }
  };

  const toggleSearchMode = () => {
    const newMode = searchMode === 'email' ? 'name' : 'email';
    setSearchMode(newMode);

    const currentValue = filters[searchMode];
    const newFilters = {
      ...filters,
      [searchMode]: '',
      [newMode]: currentValue,
    };
    setFilters(newFilters);

    if (newMode === 'email') {
      table.getColumn('email')?.setFilterValue(currentValue);
      table.getColumn('fullName')?.setFilterValue('');
    } else {
      table.getColumn('email')?.setFilterValue('');
      table.getColumn('fullName')?.setFilterValue(currentValue);
    }

    onSearch?.(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({ email: '', name: '' });
    table.resetColumnFilters();
    onSearch?.({ email: '', name: '' });
  };

  const isFiltered = filters.email || filters.name;

  return (
    <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
      <div className="flex flex-col w-full gap-4 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-[300px] min-w-[200px]">
          <Input
            placeholder={`Search by ${searchMode}...`}
            value={filters[searchMode]}
            onChange={(event) => handleFilterChange(event.target.value)}
            className="h-9 w-full rounded-md bg-background pr-20"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSearchMode}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7"
          >
            {searchMode === 'email' ? <Mail className="h-4 w-4" /> : <User className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex flex-row gap-2 flex-wrap">
          {table.getColumn('active') && (
            <div className="min-w-[100px]">
              <DataTableFacetedFilter
                column={table.getColumn('active')}
                title="Status"
                options={statuses}
              />
            </div>
          )}

          {table.getColumn('mfaEnabled') && (
            <div className="min-w-[100px]">
              <DataTableFacetedFilter
                column={table.getColumn('mfaEnabled')}
                title="MFA"
                options={mfaEnabled}
              />
            </div>
          )}

          {isFiltered && (
            <Button variant="ghost" onClick={handleResetFilters} className="h-8 px-2 lg:px-3">
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex justify-end w-full sm:w-auto">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
