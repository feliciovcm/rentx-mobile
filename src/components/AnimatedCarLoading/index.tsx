import React from 'react';
import LottieView from 'lottie-react-native';
import LoadingCar from '../../assets/car_loading.json';
import { Container } from './styles';

export function AnimatedCarLoading() {

  return (
    <Container>
      <LottieView
        source={LoadingCar}
        autoPlay
        loop
        style={{
          height: 200
        }}
        resizeMode='contain'
      />
    </Container>
  )
}
