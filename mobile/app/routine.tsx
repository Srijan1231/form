import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS } from '../constants/theme';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { ExerciseCard } from '../components/ExerciseCard';
import { Card } from '../components/Card';
import { useAppStore } from '../store/useAppStore';

const SAMPLE_EXERCISES = [
  { name: 'Chin Tuck Retraction', instruction: 'Pull chin straight back creating a double chin. Hold 5s.', reps: '3×15', duration: '2 MIN', scorePoints: 4 },
  { name: 'Wall Angels', instruction: 'Stand with back flat against wall, slide arms up and down.', reps: '3×12', duration: '2.5 MIN', scorePoints: 6 },
  { name: 'Doorway Chest Stretch', instruction: 'Place forearms on door frame edges, lean forward gently.', reps: '3×30s', duration: '1.5 MIN', scorePoints: 4 },
  { name: 'Glute Bridge', instruction: 'Lie on back with knees bent, lift hips squeezing glutes.', reps: '3×15', duration: '2 MIN', scorePoints: 5 },
];

export default function RoutineScreen() {
  const router = useRouter();
  const { exercisesDone, toggleExerciseDone, currentStreak } = useAppStore();
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalExercises = SAMPLE_EXERCISES.length;
  const completion = exercisesDone.length / totalExercises;
  const scoreGain = exercisesDone.reduce(
    (sum, idx) => sum + (SAMPLE_EXERCISES[idx]?.scorePoints ?? 0),
    0
  );
  const allDone = exercisesDone.length === totalExercises;

  const now = new Date();
  const dayStr = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][now.getDay()];
  const dateStr = `${dayStr} ${now.getDate()} ${['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][now.getMonth()]}`;

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.date}>{dateStr}</Text>
        <Text
          style={styles.timer}
          onPress={() => setIsRunning((r) => !r)}
        >
          {formatTime(timer)}
        </Text>
      </View>

      <View style={styles.stats}>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>{Math.round(completion * 100)}%</Text>
          <Text style={styles.statLabel}>COMPLETION</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>+{scoreGain}</Text>
          <Text style={styles.statLabel}>SCORE GAIN</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>{currentStreak}🔥</Text>
          <Text style={styles.statLabel}>STREAK</Text>
        </Card>
      </View>

      <ProgressBar progress={completion} />

      <View style={styles.exerciseList}>
        {SAMPLE_EXERCISES.map((ex, i) => (
          <ExerciseCard
            key={i}
            index={i + 1}
            name={ex.name}
            instruction={ex.instruction}
            reps={ex.reps}
            duration={ex.duration}
            scorePoints={ex.scorePoints}
            completed={exercisesDone.includes(i)}
            onPress={() => toggleExerciseDone(i)}
          />
        ))}
      </View>

      <View style={styles.bottom}>
        <Button
          title={allDone ? 'LOG SESSION + VIEW PROGRESS' : 'COMPLETE ALL EXERCISES'}
          onPress={() => {
            if (allDone) router.push('/progress');
          }}
          disabled={!allDone}
          variant={allDone ? 'primary' : 'secondary'}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 48,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  date: {
    fontFamily: FONTS.mono,
    fontSize: 14,
    color: COLORS.textSecondary,
    letterSpacing: 2,
  },
  timer: {
    fontFamily: FONTS.heading,
    fontSize: 24,
    color: COLORS.textPrimary,
    letterSpacing: 2,
  },
  stats: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  statValue: {
    fontFamily: FONTS.heading,
    fontSize: 22,
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: COLORS.textSecondary,
    letterSpacing: 1,
    marginTop: 4,
  },
  exerciseList: {
    marginTop: 24,
  },
  bottom: {
    marginTop: 24,
  },
});
