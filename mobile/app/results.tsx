import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS, SEVERITY_COLORS } from '../constants/theme';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Tag } from '../components/Tag';
import { useAppStore } from '../store/useAppStore';

export default function ResultsScreen() {
  const router = useRouter();
  const { postureScore, issues } = useAppStore();
  const [displayScore, setDisplayScore] = useState(0);
  const [visibleIssues, setVisibleIssues] = useState(0);

  const score = postureScore ?? 42;
  const scoreColor = score < 50 ? COLORS.red : score < 75 ? COLORS.amber : COLORS.green;
  const severityLabel = score < 50 ? 'POOR' : score < 75 ? 'FAIR' : 'GOOD';

  useEffect(() => {
    let frame = 0;
    const totalFrames = 60;
    const interval = setInterval(() => {
      frame++;
      setDisplayScore(Math.round((frame / totalFrames) * score));
      if (frame >= totalFrames) clearInterval(interval);
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [score]);

  useEffect(() => {
    const timers = issues.map((_, i) =>
      setTimeout(() => setVisibleIssues(i + 1), 400 * (i + 1))
    );
    return () => timers.forEach(clearTimeout);
  }, [issues]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.scoreContainer}>
        <Text style={[styles.score, { color: scoreColor }]}>{displayScore}</Text>
        <Text style={styles.scoreMax}>/100</Text>
        <Tag label={severityLabel} color={scoreColor} />
      </View>

      <View style={styles.bodyDiagram}>
        <View style={styles.bodyOutline}>
          <View style={styles.spine} />
          {issues.some((i) => i.name === 'Forward Head Posture') && (
            <View style={[styles.issueMarker, { top: 20, left: 45 }]} />
          )}
          {issues.some((i) => i.name === 'Rounded Shoulders') && (
            <View style={[styles.issueMarker, { top: 55, left: 30 }]} />
          )}
          {issues.some((i) => i.name === 'Tight Hip Flexors') && (
            <View style={[styles.issueMarker, { top: 110, left: 45 }]} />
          )}
        </View>

        <View style={styles.issueList}>
          {issues.slice(0, visibleIssues).map((issue, i) => (
            <View key={i} style={styles.issueItem}>
              <Tag
                label={issue.severity}
                color={SEVERITY_COLORS[issue.severity as keyof typeof SEVERITY_COLORS]}
              />
              <Text style={styles.issueName}>{issue.name}</Text>
              <Tag label={`Fixable in ${issue.fixDays} days`} color={COLORS.green} />
            </View>
          ))}
        </View>
      </View>

      <Card style={styles.protocolCard}>
        <Text style={styles.protocolTitle}>YOUR PROTOCOL</Text>
        <Text style={styles.protocolLine}>Daily commitment: 10 min/day</Text>
        <Text style={styles.protocolLine}>Exercises: 4 targeted movements</Text>
        <Text style={styles.protocolLine}>Estimated fix: 6–8 weeks</Text>
        <Text style={styles.protocolLine}>Projected score: 78/100</Text>
      </Card>

      <View style={styles.bottom}>
        <Button
          title="VIEW MY PROTOCOL"
          onPress={() => router.push('/routine')}
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
    paddingTop: 80,
    paddingBottom: 48,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  score: {
    fontFamily: FONTS.heading,
    fontSize: 140,
  },
  scoreMax: {
    fontFamily: FONTS.mono,
    fontSize: 18,
    color: COLORS.textSecondary,
    marginTop: -16,
  },
  bodyDiagram: {
    flexDirection: 'row',
    marginBottom: 32,
    gap: 20,
  },
  bodyOutline: {
    width: 100,
    height: 200,
    borderColor: COLORS.border,
    borderWidth: 1,
    position: 'relative',
    alignItems: 'center',
  },
  spine: {
    position: 'absolute',
    top: 10,
    bottom: 10,
    width: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    left: 50,
  },
  issueMarker: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.red,
    opacity: 0.8,
  },
  issueList: {
    flex: 1,
    gap: 16,
  },
  issueItem: {
    gap: 6,
  },
  issueName: {
    fontFamily: FONTS.heading,
    fontSize: 16,
    color: COLORS.textPrimary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  protocolCard: {
    marginBottom: 24,
  },
  protocolTitle: {
    fontFamily: FONTS.heading,
    fontSize: 16,
    color: COLORS.textPrimary,
    letterSpacing: 2,
    marginBottom: 12,
  },
  protocolLine: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  bottom: {
    marginTop: 8,
  },
});
