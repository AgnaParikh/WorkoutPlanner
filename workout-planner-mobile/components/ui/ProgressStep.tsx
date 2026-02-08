import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Design } from '@/constants/design';

const TOTAL_STEPS = 3;

type ProgressStepProps = {
  step: number;
};

export function ProgressStep({ step }: ProgressStepProps) {
  const progress = Math.min(step, TOTAL_STEPS) / TOTAL_STEPS;

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>Step {step} of {TOTAL_STEPS}</ThemedText>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  label: {
    fontSize: 14,
    color: Design.textSecondary,
    marginBottom: 8,
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Design.progressTrack,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: Design.progressFill,
  },
});
