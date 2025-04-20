/**
 * Formats a date string or Date object into a customizable format
 *
 * @param dateInput - Date string or Date object to format
 * @param showTime - Whether to include time in the output (default: false)
 * @param timeFormat - Format to use for time (12 or 24) (default: 12)
 * @param dateDelimiter - Character to use between date parts (default: '/')
 * @returns Formatted date string or empty string if input is invalid
 */
export function CustomtDateFormat(
  dateInput: string | Date | null | undefined,
  options: {
    showTime?: boolean;
    timeFormat?: 12 | 24;
    dateDelimiter?: string;
  } = {}
): string {
  const { showTime = false, timeFormat = 12, dateDelimiter = '/' } = options;

  if (!dateInput) return '';

  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  if (isNaN(date.getTime())) return '-';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const dateStr = `${day}${dateDelimiter}${month}${dateDelimiter}${year}`;

  if (!showTime) return dateStr;

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');

  if (timeFormat === 12) {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursStr = String(hours).padStart(2, '0');

    return `${dateStr}, ${hoursStr}:${minutes} ${ampm}`;
  } else {
    const hoursStr = String(hours).padStart(2, '0');
    return `${dateStr}, ${hoursStr}:${minutes}`;
  }
}
