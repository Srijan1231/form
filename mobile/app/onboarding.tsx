import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS } from '../constants/theme';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useAppStore } from '../store/useAppStore';

const PAIN_OPTIONS = ['NECK', 'UPPER BACK', 'LOWER BACK', 'SHOULDERS', 'HIPS', 'NONE'];

export default function OnboardingScreen() {
  const router = useRouter();
  const { sittingHours, painAreas, setSittingHours, togglePainArea } = useAppStore();

  const teaserIssues = useMemo(() => {
    const issues: { name: string; timeline: string }[] = [];
    if (painAreas.includes('NECK') || sittingHours > 7) {
      issues.push({ name: 'Forward Head Posture', timeline: 'fixable in 7–14 days' });
    }
    if (painAreas.includes('UPPER BACK') || painAreas.includes('SHOULDERS')) {
      issues.push({ name: 'Rounded Shoulders', timeline: 'fixable in 14–21 days' });
    }
    if (sittingHours > 8) {
      issues.push({ name: 'Tight Hip Flexors', timeline: 'fixable in 14–28 days' });
    }
    return issues;
  }, [sittingHours, painAreas]);

  const showTeaser = teaserIssues.length > 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionLabel}>DAILY SITTING HOURS</Text>
      <Text style={[styles.bigNumber, sittingHours >= 8 && styles.highRisk]}>
        {sittingHours}
      </Text>
      {sittingHours >= 8 && <Text style={styles.riskLabel}>HIGH RISK</Text>}

      <View style={styles.sliderTrack}>
        <View style={[styles.sliderFill, { width: `${((sittingHours - 1) / 15) * 100}%` }]} />
      </View>
      <View style={styles.sliderLabels}>
        {[1, 4, 8, 12, 16].map((v) => (
          <TouchableOpacity key={v} onPress={() => setSittingHours(v)}>
            <Text style={styles.sliderLabel}>{v}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.sectionLabel, { marginTop: 40 }]}>WHERE DO YOU FEEL PAIN?</Text>
      <View style={styles.painGrid}>
        {PAIN_OPTIONS.map((area) => {
          const isSelected = painAreas.includes(area);
          return (
            <TouchableOpacity
              key={area}
              onPress={() => togglePainArea(area)}
              style={[styles.painButton, isSelected && styles.painButtonActive]}
            >
              <Text style={[styles.painText, isSelected && styles.painTextActive]}>
                {area}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {showTeaser && (
        <Card style={styles.teaserCard}>
          <Text style={styles.teaserTitle}>Based on your answers, you likely have:</Text>
          {teaserIssues.map((issue, i) => (
            <Text key={i} style={styles.teaserIssue}>
              • {issue.name} — {issue.timeline}
            </Text>
          ))}
        </Card>
      )}

      <View style={styles.bottom}>
        <Button
          title="BEGIN ASSESSMENT"
          onPress={() => router.push('/scan')}
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
  sectionLabel: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    color: COLORS.textSecondary,
    letterSpacing: 2,
    marginBottom: 12,
  },
  bigNumber: {
    fontFamily: FONTS.heading,
    fontSize: 120,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  highRisk: {
    color: COLORS.red,
  },
  riskLabel: {
    fontFamily: FONTS.mono,
    fontSize: 14,
    color: COLORS.red,
    textAlign: 'center',
    letterSpacing: 3,
    marginBottom: 8,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: COLORS.border,
    marginTop: 16,
    marginBottom: 8,
  },
  sliderFill: {
    height: 4,
    backgroundColor: COLORS.textPrimary,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    color: COLORS.textSecondary,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  painGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  painButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  painButtonActive: {
    borderColor: COLORS.red,
    backgroundColor: 'rgba(200, 48, 42, 0.15)',
  },
  painText: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    color: COLORS.textSecondary,
    letterSpacing: 1,
  },
  painTextActive: {
    color: COLORS.red,
  },
  teaserCard: {
    marginTop: 32,
  },
  teaserTitle: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  teaserIssue: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    color: COLORS.textPrimary,
    marginBottom: 6,
    lineHeight: 20,
  },
  bottom: {
    marginTop: 40,
  },
});
