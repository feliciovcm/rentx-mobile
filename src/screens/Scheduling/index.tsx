import React from 'react';
import { useTheme } from 'styled-components';
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
import { StatusBar } from 'react-native';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

export function Scheduling() {
  const theme = useTheme();
  return (
    <Container>
      <StatusBar barStyle='light-content' translucent backgroundColor='transparent' />
      <Header>
        <BackButton color={theme.colors.shape} onPress={() => console.log('oi')} />
        <Title>
          Ecolha uma{'\n'}data de inicio e{'\n'}fim do aluguel
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={true}>18/04/2022</DateValue>
          </DateInfo>

          <ArrowSVG />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={false}>

            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar />
      </Content>
      <Footer>
        <Button onPress={() => { }} title='Confirmar' />
      </Footer>
    </Container>
  );
}
