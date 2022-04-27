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
import GasolineSvg from '../../assets/gasoline.svg';

interface CarProps {
  data: {
    brand: string;
    name: string;
    rent: {
      period: string;
      price: number;
    }
    thumbnail: string;
  }
}

export function Car(props: CarProps) {
  const { data } = props;
  return (
    <Container>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: data.thumbnail }} resizeMode="contain"></CarImage>
    </Container>
  )
}
