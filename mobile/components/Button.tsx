import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: ViewStyle;
}

const variantStyles: Record<ButtonVariant, { bg: string; text: string; border: string }> = {
  primary: { bg: COLORS.textPrimary, text: COLORS.background, border: COLORS.textPrimary },
  secondary: { bg: 'transparent', text: COLORS.textPrimary, border: COLORS.border },
  danger: { bg: COLORS.red, text: COLORS.textPrimary, border: COLORS.red },
  ghost: { bg: 'transparent', text: COLORS.textSecondary, border: 'transparent' },
};

export function Button({ title, onPress, variant = 'primary', disabled = false, style }: ButtonProps) {
  const v = variantStyles[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.base,
        {
          backgroundColor: disabled ? COLORS.textSecondary : v.bg,
          borderColor: disabled ? COLORS.textSecondary : v.border,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: disabled ? COLORS.background : v.text },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 0,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  text: {
    fontFamily: FONTS.heading,
    fontSize: 18,
    letterSpacing: 2,
    textTransform: 'uppercase',
  } as TextStyle,
});
