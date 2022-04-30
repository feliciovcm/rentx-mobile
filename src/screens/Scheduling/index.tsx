import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import {
  Container,
  Title,
  Header,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from './styles';
import ArrowSVG from '../../assets/arrow.svg';
import { Alert, StatusBar } from 'react-native';
import { Button } from '../../components/Button';
import { Calendar, MarkedDateProps } from '../../components/Calendar';
import { DateData } from 'react-native-calendars';
import { getDateInterval } from '../../components/Calendar/generateInterval';
import { format } from 'date-fns/esm';
import { getPlatform } from '../../utils/getPlatformDate';
import { Car } from '../../dtos/carDTO';

interface Params {
  params: {
    car: Car;
  }
}

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DateData>({} as DateData);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
  const theme = useTheme();

  const navigation = useNavigation();
  const { params: { car } } = useRoute() as Params;

  function handleSchedulingDetails() {
    if (rentalPeriod.startFormatted === rentalPeriod.endFormatted) {
      return Alert.alert('Ops!', 'Selecione intervalo para alugar')
    }
    const datesFormatted = Object.keys(markedDates).map(date => format(getPlatform(new Date(date)), 'dd/MM/yyyy'));
    navigation.navigate('SchedulingDetails' as never, {
      car,
      dates: Object.keys(markedDates),
      datesFormatted
    } as never);
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleDayChange(day: DateData) {

    let start = !lastSelectedDate.timestamp ? day : lastSelectedDate;
    let end = day;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = getDateInterval(start, end);

    setMarkedDates(interval);

    const intervalKeys = Object.keys(interval);

    const firstDate = intervalKeys[0];
    const endDate = intervalKeys[intervalKeys.length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatform(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatform(new Date(endDate)), 'dd/MM/yyyy')
    })
  }

  return (
    <Container>
      <StatusBar barStyle='light-content' translucent backgroundColor='transparent' />
      <Header>
        <BackButton color={theme.colors.shape} onPress={handleGoBack} />
        <Title>
          Ecolha uma{'\n'}data de inicio e{'\n'}fim do aluguel
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <ArrowSVG />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleDayChange}
        />
      </Content>
      <Footer>
        <Button onPress={handleSchedulingDetails} title='Confirmar' enabled={!!rentalPeriod.startFormatted} />
      </Footer>
    </Container>
  );
}
