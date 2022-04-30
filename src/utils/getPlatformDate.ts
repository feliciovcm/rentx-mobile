import { addDays } from 'date-fns';

export function getPlatform(date: Date) {
  return addDays(date, 1)
}
