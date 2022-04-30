import React from 'react';
import {
  Container,
  Details,
  Brand,
  About,
  Name,
  Period,
  Price,
  Rent,
  Type,
  CarImage
} from './styles';
import { RectButtonProps } from 'react-native-gesture-handler';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Car as CarDTO } from '../../dtos/carDTO';

interface CarProps extends RectButtonProps {
  data: CarDTO;
}

export function Car(props: CarProps) {
  const { data, ...rest } = props;

  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: data.thumbnail }} resizeMode="contain"></CarImage>
    </Container>
  )
}
