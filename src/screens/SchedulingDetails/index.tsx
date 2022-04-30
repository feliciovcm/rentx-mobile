import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Rent,
  Price,
  Period,
  Brand,
  Description,
  Name,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateValue,
  DateTitle,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuote,
  RentalPriceTotal,
} from './styles';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../dtos/carDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { api } from '../../services/api';
import { Alert } from 'react-native';

interface Params {
  params: {
    car: Car;
    dates: string[];
    datesFormatted: string[];
  }
}

export function SchedulingDetails() {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const navigation = useNavigation();
  const { params: { car, dates, datesFormatted } } = useRoute() as Params;

  const rentTotal = Number(dates.length * car.rent.price);

  async function handleSchedulingComplete() {
    setLoading(true);
    const { data } = await api.get(`schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...data.unavailable_dates,
      ...dates
    ];

    await api.post('schedules_byuser', {
      user_id: 1,
      car,
      startDate: datesFormatted[0],
      endDate: datesFormatted[datesFormatted.length - 1]
    });

    api.put(`schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    }).then(() => navigation.navigate('SchedulingComplete' as never))
      .catch(() => {
        setLoading(false);
        Alert.alert('Ops!', 'Não foi possível alugar o carro, por favor tente mais tarde!')
      });
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>
        <Accessories>
          {
            car.accessories.map((item => (
              <Accessory
                key={item.name}
                name={item.name}
                icon={getAccessoryIcon(item.type)}
              />
            )))
          }
        </Accessories>
        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{datesFormatted[0]}</DateValue>
          </DateInfo>

          <Feather
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{datesFormatted[datesFormatted.length - 1]}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuote>R$ {car.rent.price} x{dates.length} diárias</RentalPriceQuote>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          color={theme.colors.success}
          title='Alugar agora'
          onPress={handleSchedulingComplete}
          loading={loading}
          enabled={!loading}
        />
      </Footer>
    </Container>
  )
}
