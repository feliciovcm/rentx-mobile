import React from 'react';
import { Button, StyleSheet, Dimensions } from 'react-native';

import { Container } from './styles';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated'

const WIDTH = Dimensions.get('window').width;

export function Splash() {

  const animation = useSharedValue(0);;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(animation.value, {
            duration: 500,
            easing: Easing.bezier(.04, 1.04, .06, .99)
          })
        }
      ]
    }
  });

  function handlePositionAnimation() {
    animation.value = Math.random() * (WIDTH - 100);
  }

  return (
    <Container>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Button title="Mover" onPress={handlePositionAnimation} />
    </Container>
  )
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
})
