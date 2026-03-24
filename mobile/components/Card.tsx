import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Card({ children, style }: CardProps) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    padding: 16,
  } as ViewStyle,
});
