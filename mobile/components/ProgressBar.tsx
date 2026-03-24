import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: number;
}

export function ProgressBar({ progress, color = COLORS.green, height = 4 }: ProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(1, progress));

  return (
    <View style={[styles.track, { height }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${clampedProgress * 100}%`,
            backgroundColor: color,
            height,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: COLORS.border,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
