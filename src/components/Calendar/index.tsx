import React from 'react';
import { Calendar as CustomCalendar, DateData, LocaleConfig, } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { ptBR } from './LocaleConfig';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';

LocaleConfig.locales['pt-br'] = ptBR;

LocaleConfig.defaultLocale = 'pt-br';

export interface MarkedDateProps {
  [date: string]: MarkingProps;
}

interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress?: (date: DateData) => void;
}

export function Calendar(props: CalendarProps) {

  const { markedDates, onDayPress } = props;

  const theme = useTheme();
  return (
    <CustomCalendar
      renderArrow={(direction) => (
        <Feather
          size={24}
          color={theme.colors.text}
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secundary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        monthTextColor: theme.colors.title,
        textMonthFontSize: 20,
        textMonthFontFamily: theme.fonts.secondary_600,
        textDayHeaderFontSize: 10,
        arrowStyle: {
          marginHorizontal: -15
        }
      }}
      firstDay={1}
      minDate={new Date().toDateString()}
      markingType='period'
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}
