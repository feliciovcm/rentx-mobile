import { eachDayOfInterval, format } from 'date-fns';
import { DateData } from 'react-native-calendars';
import theme from '../../styles/theme';

import { MarkedDateProps } from '.';
import { getPlatform } from '../../utils/getPlatformDate';

export function getDateInterval(start: DateData, end: DateData) {
  let interval: MarkedDateProps = {};

  eachDayOfInterval({ start: new Date(start.timestamp), end: new Date(end.timestamp) })
    .forEach((item) => {
      const date = format(getPlatform(item), 'yyyy-MM-dd');

      interval = {
        ...interval,
        [date]: {
          color: start.dateString === date || end.dateString === date ? theme.colors.main : theme.colors.main_light,
          textColor: start.dateString === date || end.dateString === date ? theme.colors.main_light : theme.colors.main,
          // startingDay: start.dateString === date,
          // endingDay: end.dateString === date
        }
      }
    })

  return interval;
}


