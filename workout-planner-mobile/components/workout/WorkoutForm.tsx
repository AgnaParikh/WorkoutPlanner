import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppHeader } from '@/components/ui/AppHeader';
import { ChoiceButton } from '@/components/ui/ChoiceButton';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ProgressStep } from '@/components/ui/ProgressStep';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { BodyArea, WorkoutStyle } from '@/types/workout';
import {
  BODY_AREAS,
  DURATION_OPTIONS,
  WORKOUT_STYLES,
} from '@/types/workout';
import { Design } from '@/constants/design';

type WorkoutFormProps = {
  step: number;
  workoutType: WorkoutStyle | null;
  target: BodyArea | null;
  duration: number | null;
  onWorkoutTypeChange: (v: WorkoutStyle) => void;
  onTargetChange: (v: BodyArea) => void;
  onDurationChange: (v: number) => void;
  onNext: () => void;
  onBack: () => void;
  onGenerate: () => void;
  loading?: boolean;
  error: string | null;
};

export function WorkoutForm({
  step,
  workoutType,
  target,
  duration,
  onWorkoutTypeChange,
  onTargetChange,
  onDurationChange,
  onNext,
  onBack,
  onGenerate,
  loading,
  error,
}: WorkoutFormProps) {
  const canProceedStep1 = workoutType != null;
  const canProceedStep2 = target != null;
  const canProceedStep3 = duration != null;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <AppHeader />
      <ProgressStep step={step} />

      {step === 1 && (
        <>
          <SectionHeading
            title="Select Workout Style"
            description="Choose the type of workout you want to do today"
          />
          <View style={styles.grid}>
            {WORKOUT_STYLES.map((style) => (
              <ChoiceButton
                key={style}
                label={style}
                selected={workoutType === style}
                onPress={() => onWorkoutTypeChange(style)}
              />
            ))}
          </View>
          {error ? (
            <ThemedView style={styles.errorBox}>
              <ThemedText style={styles.errorText}>{error}</ThemedText>
            </ThemedView>
          ) : null}
          <View style={styles.primaryButton}>
            <PrimaryButton
              title="Next"
              onPress={onNext}
              disabled={!canProceedStep1}
            />
          </View>
        </>
      )}

      {step === 2 && (
        <>
          <SectionHeading
            title="Select Body Area"
            description="Which muscle groups do you want to focus on?"
          />
          <View style={styles.grid}>
            {BODY_AREAS.map((area) => (
              <ChoiceButton
                key={area}
                label={area}
                selected={target === area}
                onPress={() => onTargetChange(area)}
              />
            ))}
          </View>
          {error ? (
            <ThemedView style={styles.errorBox}>
              <ThemedText style={styles.errorText}>{error}</ThemedText>
            </ThemedView>
          ) : null}
          <View style={styles.twoButtons}>
            <View style={styles.halfButton}>
              <SecondaryButton title="Back" onPress={onBack} />
            </View>
            <View style={styles.halfButton}>
              <PrimaryButton
                title="Next"
                onPress={onNext}
                disabled={!canProceedStep2}
              />
            </View>
          </View>
        </>
      )}

      {step === 3 && (
        <>
          <SectionHeading
            title="Select Duration"
            description="How long do you have for your workout?"
          />
          <View style={styles.grid}>
            {DURATION_OPTIONS.map((mins) => (
              <ChoiceButton
                key={mins}
                label={`${mins} min`}
                selected={duration === mins}
                onPress={() => onDurationChange(mins)}
              />
            ))}
          </View>
          {error ? (
            <ThemedView style={styles.errorBox}>
              <ThemedText style={styles.errorText}>{error}</ThemedText>
            </ThemedView>
          ) : null}
          <View style={styles.twoButtons}>
            <View style={styles.halfButton}>
              <SecondaryButton title="Back" onPress={onBack} />
            </View>
            <View style={styles.halfButton}>
              <PrimaryButton
                title="Generate workout"
                onPress={onGenerate}
                disabled={!canProceedStep3 || loading}
                loading={loading}
                showArrow={false}
              />
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { padding: 16, paddingBottom: 40 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Design.gridGap,
    marginBottom: Design.sectionSpacing,
  },
  errorBox: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: 'rgba(220, 53, 69, 0.12)',
  },
  errorText: { color: '#dc3545', fontSize: 14 },
  primaryButton: { marginTop: 8 },
  twoButtons: {
    flexDirection: 'row',
    gap: Design.gridGap,
    marginTop: 8,
  },
  halfButton: { flex: 1 },
});
