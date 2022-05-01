import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, { useAnimatedScrollHandler, useSharedValue, runOnJS, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Header,
  CarImages,
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
import { StatusBar, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';

interface Params {
  params: {
    car: Car;
  }
}

export function CarDetails() {
  const navigation = useNavigation();
  const { params: { car } } = useRoute() as Params;
  const theme = useTheme();



  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(()=> {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      ),
    }
  })

  function handleConfirmRental() {
    navigation.navigate('Scheduling' as never, { car } as never)
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <StatusBar barStyle='dark-content' translucent backgroundColor='transparent'/>
      <Animated.View style={[headerAnimatedStyle, styles.header, { backgroundColor: theme.colors.background_secundary }]}>
        <Header>
          <BackButton onPress={handleGoBack} />
        </Header>
        <Animated.View style={[sliderCarsStyleAnimation]}>
          <CarImages>
            <ImageSlider imagesUrl={car.photos} />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        contentContainerStyle={{
          paddingHorizontal: 24,
          alignItems: 'center', paddingTop:
          getStatusBarHeight() + 200
        }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
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
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button title='Escolher período do aluguel' onPress={handleConfirmRental} />
      </Footer>
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  }
});
