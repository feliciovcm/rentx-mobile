import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import SpeedSvg from '../../assets/speed.svg';
import AccelerationSvg from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';

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

export function CarDetails() {

  return (
    <Container>
      <Header>
        <BackButton onPress={() => console.log('oi')} />
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={['https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png']} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghine</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 900</Price>
          </Rent>
        </Details>
        <Accessories>
          <Accessory name="380km/h" icon={SpeedSvg} />
          <Accessory name="3.2s" icon={AccelerationSvg} />
          <Accessory name="800 HP" icon={ForceSvg} />
          <Accessory name="Gasolina" icon={GasolineSvg} />
          <Accessory name="Auto" icon={ExchangeSvg} />
          <Accessory name="2 pessoas" icon={PeopleSvg} />
        </Accessories>
        <About>
          uhdasuihdiuashduisahudihasusfuashduhasduahsiunbjsancjknaxnasjxhsahuiashuhxwsuaduisahuashuichsauichuisahcuisahcuishacuihsadasuihjdiuashjduiashjdasoidjhioas
        </About>
      </Content>

      <Footer>
        <Button title='Confirmar' onPress={() => { }} />
      </Footer>
    </Container>
  )
}
