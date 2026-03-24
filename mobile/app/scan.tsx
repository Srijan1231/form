import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS } from '../constants/theme';
import { Button } from '../components/Button';
import { useAppStore } from '../store/useAppStore';

const SCAN_MESSAGES = [
  'Detecting skeletal landmarks...',
  'Calculating spinal curvature...',
  'Scoring postural deviation...',
  'Generating protocol...',
];

const INSTRUCTIONS = [
  '01. Stand sideways to camera',
  '02. Align head with the vertical line',
  '03. Arms relaxed at sides',
  '04. Breathe naturally',
];

export default function ScanScreen() {
  const router = useRouter();
  const { sittingHours, painAreas, setAssessmentResult } = useAppStore();
  const [phase, setPhase] = useState<'instructions' | 'scanning' | 'complete'>('instructions');
  const [scanProgress, setScanProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setPhase('scanning'), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase !== 'scanning') return;

    const progressInterval = setInterval(() => {
      setScanProgress((p) => {
        if (p >= 1) {
          clearInterval(progressInterval);
          return 1;
        }
        return p + 1 / 30;
      });
    }, 100);

    const messageInterval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % SCAN_MESSAGES.length);
    }, 750);

    const completeTimer = setTimeout(() => {
      setPhase('complete');

      const issues: { name: string; severity: string; fixDays: string }[] = [];
      const hasNeck = painAreas.includes('NECK');
      const hasUpperBack = painAreas.includes('UPPER BACK');
      const hasShoulders = painAreas.includes('SHOULDERS');

      if (hasNeck || sittingHours > 7) {
        issues.push({
          name: 'Forward Head Posture',
          severity: sittingHours > 9 ? 'SEVERE' : 'MODERATE',
          fixDays: '7-14',
        });
      }
      if (hasUpperBack || hasShoulders) {
        issues.push({ name: 'Rounded Shoulders', severity: 'MODERATE', fixDays: '14-21' });
      }
      if (sittingHours > 8) {
        issues.push({ name: 'Tight Hip Flexors', severity: 'MILD', fixDays: '14-28' });
      }

      let score = 100;
      issues.forEach((issue) => {
        if (issue.severity === 'SEVERE') score -= 20;
        else if (issue.severity === 'MODERATE') score -= 12;
        else if (issue.severity === 'MILD') score -= 6;
      });

      setAssessmentResult(Math.max(0, score), issues);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearTimeout(completeTimer);
    };
  }, [phase, painAreas, sittingHours, setAssessmentResult]);

  return (
    <View style={styles.container}>
      {/* Corner brackets */}
      <View style={[styles.bracket, styles.topLeft]} />
      <View style={[styles.bracket, styles.topRight]} />
      <View style={[styles.bracket, styles.bottomLeft]} />
      <View style={[styles.bracket, styles.bottomRight]} />

      {phase === 'instructions' && (
        <View style={styles.instructionContainer}>
          {INSTRUCTIONS.map((inst, i) => (
            <Text key={i} style={styles.instruction}>{inst}</Text>
          ))}
        </View>
      )}

      {phase === 'scanning' && (
        <View style={styles.scanContainer}>
          <View style={[styles.scanLine, { top: `${scanProgress * 100}%` }]} />
          <Text style={styles.scanMessage}>{SCAN_MESSAGES[messageIndex]}</Text>
        </View>
      )}

      {phase === 'complete' && (
        <View style={styles.completeContainer}>
          <View style={styles.tickCircle}>
            <Text style={styles.tickMark}>✓</Text>
          </View>
          <Text style={styles.capturedText}>CAPTURED</Text>
          <Text style={styles.checkText}>FRONT ✓  SIDE ✓</Text>
          <Text style={styles.issuesText}>3 ISSUES DETECTED</Text>
        </View>
      )}

      <View style={styles.bottom}>
        <Button
          title={phase === 'complete' ? 'VIEW DIAGNOSIS' : 'SCANNING...'}
          onPress={() => router.push('/results')}
          disabled={phase !== 'complete'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bracket: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: COLORS.red,
  },
  topLeft: {
    top: 60,
    left: 20,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  topRight: {
    top: 60,
    right: 20,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  bottomLeft: {
    bottom: 120,
    left: 20,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  bottomRight: {
    bottom: 120,
    right: 20,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  instructionContainer: {
    gap: 16,
    paddingHorizontal: 40,
  },
  instruction: {
    fontFamily: FONTS.mono,
    fontSize: 16,
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },
  scanContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanLine: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: COLORS.red,
    shadowColor: COLORS.red,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  scanMessage: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    color: COLORS.textSecondary,
    letterSpacing: 1,
    marginTop: 200,
  },
  completeContainer: {
    alignItems: 'center',
    gap: 12,
  },
  tickCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tickMark: {
    fontSize: 28,
    color: COLORS.background,
    fontWeight: 'bold',
  },
  capturedText: {
    fontFamily: FONTS.heading,
    fontSize: 28,
    color: COLORS.textPrimary,
    letterSpacing: 4,
  },
  checkText: {
    fontFamily: FONTS.mono,
    fontSize: 14,
    color: COLORS.green,
    letterSpacing: 2,
  },
  issuesText: {
    fontFamily: FONTS.mono,
    fontSize: 14,
    color: COLORS.red,
    letterSpacing: 2,
    marginTop: 8,
  },
  bottom: {
    position: 'absolute',
    bottom: 48,
    left: 24,
    right: 24,
  },
});
