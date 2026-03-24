import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { useAppStore } from '../store/useAppStore';

const WEEK_LABELS = ['W1', 'W2', 'W3', 'W4', 'NOW'];
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function ProgressScreen() {
  const { postureScore, baselineScore, issues } = useAppStore();

  const baseline = baselineScore ?? 42;
  const current = postureScore ?? 68;
  const delta = current - baseline;

  const weekScores = [baseline, baseline + 5, baseline + 12, baseline + 18, current];

  const completedDays = [true, true, false, true, true, true, false];
  const completedCount = completedDays.filter(Boolean).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>PROGRESS</Text>

      <View style={styles.statRow}>
        <Card style={styles.statCard}>
          <Text style={[styles.statValue, { color: COLORS.textSecondary }]}>{baseline}</Text>
          <Text style={styles.statLabel}>BASELINE</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>{current}</Text>
          <Text style={styles.statLabel}>CURRENT</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={[styles.statValue, { color: COLORS.green }]}>+{delta}</Text>
          <Text style={styles.statLabel}>DELTA</Text>
        </Card>
      </View>

      <View style={styles.chartContainer}>
        {weekScores.map((score, i) => (
          <View key={i} style={styles.barWrapper}>
            <View
              style={[
                styles.bar,
                {
                  height: `${score}%`,
                  backgroundColor: i === weekScores.length - 1 ? COLORS.textPrimary : COLORS.textSecondary,
                },
              ]}
            />
            <Text style={styles.barLabel}>{WEEK_LABELS[i]}</Text>
          </View>
        ))}
      </View>

      <View style={styles.consistencyGrid}>
        {DAYS.map((day, i) => (
          <View key={i} style={styles.dayWrapper}>
            <View
              style={[
                styles.dayBox,
                { backgroundColor: completedDays[i] ? COLORS.green : COLORS.textSecondary },
              ]}
            />
            <Text style={styles.dayLabel}>{day}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.consistencyText}>
        You completed {completedCount} of 7 days this week — {Math.round((completedCount / 7) * 100)}%
      </Text>

      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>ISSUE RESOLUTION</Text>
      {issues.map((issue, i) => {
        const progressVal = issue.severity === 'MILD' ? 0.8 : issue.severity === 'MODERATE' ? 0.55 : 0.3;
        const statusLabel = progressVal > 0.7 ? 'RESOLVING' : progressVal > 0.4 ? 'IMPROVING' : 'ACTIVE';
        const barColor = progressVal > 0.7 ? COLORS.green : progressVal > 0.4 ? COLORS.amber : COLORS.red;
        return (
          <View key={i} style={styles.issueRow}>
            <Text style={styles.issueName}>{issue.name}</Text>
            <ProgressBar progress={progressVal} color={barColor} height={6} />
            <Text style={[styles.statusLabel, { color: barColor }]}>{statusLabel}</Text>
          </View>
        );
      })}
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
    paddingTop: 80,
    paddingBottom: 48,
  },
  title: {
    fontFamily: FONTS.heading,
    fontSize: 28,
    color: COLORS.textPrimary,
    letterSpacing: 4,
    marginBottom: 24,
  },
  statRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  statValue: {
    fontFamily: FONTS.heading,
    fontSize: 32,
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: COLORS.textSecondary,
    letterSpacing: 1,
    marginTop: 4,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 160,
    alignItems: 'flex-end',
    gap: 12,
    marginBottom: 32,
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 0,
    minHeight: 4,
  },
  barLabel: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 8,
    letterSpacing: 1,
  },
  consistencyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dayWrapper: {
    alignItems: 'center',
    gap: 6,
  },
  dayBox: {
    width: 36,
    height: 36,
  },
  dayLabel: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    color: COLORS.textSecondary,
    letterSpacing: 1,
  },
  consistencyText: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
  sectionTitle: {
    fontFamily: FONTS.heading,
    fontSize: 16,
    color: COLORS.textPrimary,
    letterSpacing: 2,
    marginBottom: 16,
  },
  issueRow: {
    marginBottom: 16,
    gap: 6,
  },
  issueName: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },
  statusLabel: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    letterSpacing: 1,
  },
});
