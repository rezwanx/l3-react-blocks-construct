import { dateFnsLocalizer } from 'react-big-calendar';
import enUS from 'date-fns/locale/en-US';
import { format, getDay, parse, startOfWeek } from 'date-fns';

const locales = {
  'en-US': enUS,
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
