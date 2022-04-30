import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

interface LoadProps {
  color?: string;
  size?: 'small' | 'large';
}

export function Load({ color, size = 'large' }: LoadProps) {
  const theme = useTheme();
  return (
    <ActivityIndicator
      color={color ? color : theme.colors.main}
      size={size}
      style={{ flex: 1 }}
    />
  );
}
