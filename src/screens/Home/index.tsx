import React, { useEffect, useState } from 'react';
import { Container, TotalCars, Header, HeaderContent, CarList, MyCarsButton } from './styles'
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
import { api } from '../../services/api';
import { Car as CarDTO } from '../../dtos/carDTO';
import { Load } from '../../components/Load';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const theme = useTheme();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails' as never, { car } as never);
  }

  function handleMyCars() {
    navigation.navigate('MyCars' as never);
  }

  useEffect(() => {
    async function getCars() {
      setLoading(true)
      const response = await api.get('/cars');
      setCars(response.data);
    }
    getCars().finally(() => {
      setLoading(false);
    })
  }, []);

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
            Total de {cars.length} carros
          </TotalCars>
        </HeaderContent>
      </Header>
      {
        loading ? <Load /> : (
          <CarList
            data={cars}
            renderItem={({ item }) => (<Car data={item} onPress={() => handleCarDetails(item)} />)}
            keyExtractor={(item: any) => String(item.id)}
          />
        )
      }

      <MyCarsButton onPress={handleMyCars}>
        <Ionicons name="car-sport" size={32} color={theme.colors.shape} />
      </MyCarsButton>
    </Container>
  )
}
