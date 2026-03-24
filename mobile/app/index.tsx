import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS } from '../constants/theme';
import { Button } from '../components/Button';

export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>FORM</Text>
        <Text style={styles.subtitle}>BODY ALIGNMENT SYSTEM</Text>
        <Text style={styles.tagline}>
          Scan your posture. Fix what's broken.{'\n'}Track your progress.
        </Text>
      </View>
      <View style={styles.bottom}>
        <Button
          title="GET STARTED"
          onPress={() => router.push('/onboarding')}
        />
        <Text style={styles.loginLink}>Already have an account? Log in</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 120,
    paddingBottom: 48,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.heading,
    fontSize: 72,
    color: COLORS.textPrimary,
    letterSpacing: 8,
  },
  subtitle: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    color: COLORS.textSecondary,
    letterSpacing: 4,
    marginTop: 4,
  },
  tagline: {
    fontFamily: FONTS.mono,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 32,
    lineHeight: 22,
  },
  bottom: {
    gap: 16,
    alignItems: 'center',
  },
  loginLink: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
});
