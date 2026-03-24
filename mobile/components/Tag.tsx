import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

interface TagProps {
  label: string;
  color?: string;
}

export function Tag({ label, color = COLORS.green }: TagProps) {
  return (
    <View style={[styles.container, { borderColor: color }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
