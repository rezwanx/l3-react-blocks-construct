/* eslint-disable @typescript-eslint/no-empty-function */
import { Table } from '@tanstack/react-table';
import { DataTableFacetedFilter } from 'components/blocks/data-table/data-table-faceted-filter';
import { DateRangeFilter } from 'components/blocks/data-table/data-table-date-filter';
import { mfaEnabled, statuses } from './iam-table-filter-data';
import { DateRange } from 'react-day-picker';

interface FilterControlsProps<TData> {
  table: Table<TData>;
  isMobile?: boolean;
  dateRangeCreate?: DateRange;
  dateRangeLastLogin?: DateRange;
  onDateRangeCreateChange?: (date: DateRange | undefined) => void;
  onDateRangeLastLoginChange?: (date: DateRange | undefined) => void;
}

export function FilterControls<TData>({
  table,
  isMobile = false,
  dateRangeCreate,
  dateRangeLastLogin,
  onDateRangeCreateChange = () => {},
  onDateRangeLastLoginChange = () => {},
}: Readonly<FilterControlsProps<TData>>) {
  const getFilterColumn = (columnId: string) => {
    return table.getAllFlatColumns().find((col) => col.id === columnId);
  };

  const containerClass = isMobile
    ? 'flex flex-col gap-4'
    : 'flex flex-row flex-wrap items-center gap-1';

  const activeColumn = getFilterColumn('active');
  const mfaEnabledColumn = getFilterColumn('mfaEnabled');
  const createdDateColumn = getFilterColumn('createdDate');
  const lastLoggedInTimeColumn = getFilterColumn('lastLoggedInTime');

  return (
    <div className={containerClass}>
      {activeColumn && (
        <div className={isMobile ? 'w-full' : undefined}>
          <DataTableFacetedFilter column={activeColumn} title="Status" options={statuses} />
        </div>
      )}

      {mfaEnabledColumn && (
        <div className={isMobile ? 'w-full' : undefined}>
          <DataTableFacetedFilter column={mfaEnabledColumn} title="MFA" options={mfaEnabled} />
        </div>
      )}

      {createdDateColumn && (
        <div className={isMobile ? 'w-full' : undefined}>
          <DateRangeFilter
            column={createdDateColumn}
            title="Joined On"
            date={dateRangeCreate}
            onDateChange={onDateRangeCreateChange}
          />
        </div>
      )}

      {lastLoggedInTimeColumn && (
        <div className={isMobile ? 'w-full' : undefined}>
          <DateRangeFilter
            column={lastLoggedInTimeColumn}
            title="Last Login"
            date={dateRangeLastLogin}
            onDateChange={onDateRangeLastLoginChange}
          />
        </div>
      )}
    </div>
  );
}

export default FilterControls;
