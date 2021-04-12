import { format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

interface parseDateProps {
  date: string;
  dateFormat: string;
}

export function parseDate({ date, dateFormat }: parseDateProps): string | null {
  try {
    const parsed = zonedTimeToUtc(
      date,
      new Date().getTimezoneOffset().toString(),
    );
    const formated = format(parsed, `${dateFormat}`);
    return formated;
  } catch {
    return null;
  }
}
