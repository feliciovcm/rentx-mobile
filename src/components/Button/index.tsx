import React from 'react';

import { Container, Title } from './styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
}

export function Button(props: ButtonProps) {
  const { title, color, ...rest } = props;
  return (
    <Container color={color} {...rest}>
      <Title>
        {title}
      </Title>
    </Container>
  );
}
