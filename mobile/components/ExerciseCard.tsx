import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

interface ExerciseCardProps {
  index: number;
  name: string;
  instruction: string;
  reps: string;
  duration: string;
  scorePoints: number;
  completed: boolean;
  onPress: () => void;
}

export function ExerciseCard({
  index,
  name,
  instruction,
  reps,
  duration,
  scorePoints,
  completed,
  onPress,
}: ExerciseCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.container, completed && styles.completedContainer]}
    >
      <View style={styles.numberCol}>
        {completed ? (
          <Text style={styles.tick}>✓</Text>
        ) : (
          <Text style={styles.number}>{index}</Text>
        )}
      </View>
      <View style={styles.content}>
        <Text style={[styles.name, completed && styles.completedText]}>{name}</Text>
        <Text style={styles.instruction}>{instruction}</Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>{reps}</Text>
          <Text style={styles.metaText}>{duration}</Text>
        </View>
      </View>
      <View style={styles.pointsCol}>
        <Text style={[styles.points, completed && styles.completedPoints]}>
          +{scorePoints}
        </Text>
        <Text style={styles.ptsLabel}>PTS</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    padding: 16,
    marginBottom: 8,
    alignItems: 'center',
  },
  completedContainer: {
    opacity: 0.5,
  },
  numberCol: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontFamily: FONTS.heading,
    fontSize: 28,
    color: COLORS.textPrimary,
  },
  tick: {
    fontSize: 24,
    color: COLORS.green,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginHorizontal: 12,
  },
  name: {
    fontFamily: FONTS.heading,
    fontSize: 16,
    color: COLORS.textPrimary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  instruction: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  meta: {
    flexDirection: 'row',
    gap: 12,
  },
  metaText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: COLORS.textSecondary,
    letterSpacing: 1,
  },
  pointsCol: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  points: {
    fontFamily: FONTS.heading,
    fontSize: 20,
    color: COLORS.textPrimary,
  },
  completedPoints: {
    color: COLORS.green,
  },
  ptsLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: COLORS.textSecondary,
    letterSpacing: 1,
  },
});
