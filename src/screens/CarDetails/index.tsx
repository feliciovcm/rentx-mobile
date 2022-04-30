import React from 'react';
import { Accessory } from '../../components/Accessory';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

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
  About,
  Accessories,
  Footer
} from './styles';
import { Button } from '../../components/Button';
import { Car } from '../../dtos/carDTO';

interface Params {
  params: {
    car: Car;
  }
}

export function CarDetails() {
  const navigation = useNavigation();
  const { params: { car } } = useRoute() as Params;

  function handleConfirmRental() {
    navigation.navigate('Scheduling' as never, { car } as never)
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
        <About>
          {car.about}
        </About>
      </Content>

      <Footer>
        <Button title='Escolher período do aluguel' onPress={handleConfirmRental} />
      </Footer>
    </Container>
  )
}
