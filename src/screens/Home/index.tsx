import React, { useEffect, useState } from 'react';
import { Container, TotalCars, Header, HeaderContent, CarList } from './styles'
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
import { api } from '../../services/api';
import { Car as CarDTO } from '../../dtos/carDTO';
import { AnimatedCarLoading } from '../../components/AnimatedCarLoading';
import Animated, { useAnimatedStyle, useSharedValue, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

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

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ],
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.lastPositionX = positionX.value
      ctx.lastPositionY = positionY.value
    },
    onActive(event, ctx: any){
      positionX.value = ctx.lastPositionX + event.translationX;
      positionY.value = ctx.lastPositionY + event.translationY;
    },
    onEnd(){
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });

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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
     return true;
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
          {!loading && (
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          )}
        </HeaderContent>
      </Header>
      {
        loading ? <AnimatedCarLoading /> : (
          <CarList
            data={cars}
            renderItem={({ item }) => (<Car data={item} onPress={() => handleCarDetails(item)} />)}
            keyExtractor={(item: any) => String(item.id)}
          />
        )
      }
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[myCarsButtonStyle, { position: 'absolute', bottom: 13, right: 22 }]}>
          <ButtonAnimated onPress={handleMyCars} style={[styles.button, { backgroundColor: theme.colors.main }]}>
            <Ionicons name="car-sport" size={32} color={theme.colors.shape} />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

// Para entender quando o usuario esta clickando e arrastando alguma coisa em tela
// Precisamos do PanGestureRender
