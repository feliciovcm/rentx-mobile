import React, { ReactNode } from 'react';
import { useTheme } from 'styled-components';
import { Load } from '../Load';

import { Container, Title } from './styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  enabled?: boolean;
  loading?: boolean;
  children?: ReactNode;
}

export function Button(props: ButtonProps) {
  const { title, color, enabled = true, loading = false, children, ...rest } = props;
  const theme = useTheme();
  return (
    <Container
      color={color}
      enabled={enabled}
      style={{ opacity: (enabled === false || loading === true) ? .5 : 1 }}
      {...rest}
    >
      <Title>
        {loading ? <Load color={theme.colors.shape} size='small' /> : title}
      </Title>
    </Container>
  );
}
