import React from 'react';
import { Container, TotalCars, Header, HeaderContent, CarList } from './styles'
import { StatusBar } from 'react-native';
import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';

export function Home() {

  const car1 = {
    brand: 'audi',
    name: 'RS 5 Coupe',
    rent: {
      period: 'Ao dia',
      price: 400,
    },
    thumbnail: 'https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png'
  }

  return (
    <Container>
      <StatusBar barStyle='light-content' translucent backgroundColor='transparent' />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>
      <CarList
        data={[1, 2, 3, 4, 5, 6, 7]}
        renderItem={() => (<Car data={car1} />)}
        keyExtractor={item => String(item)}
      />
    </Container>
  )
}
