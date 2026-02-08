import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { WorkoutForm, WorkoutPlan } from '@/components/workout';
import { useWorkoutGenerate } from '@/hooks/use-workout-generate';
import type { BodyArea, WorkoutStyle } from '@/types/workout';

export default function HomeScreen() {
  const [step, setStep] = useState(1);
  const [workoutType, setWorkoutType] = useState<WorkoutStyle | null>(null);
  const [target, setTarget] = useState<BodyArea | null>(null);
  const [duration, setDuration] = useState<number | null>(30);

  const { plan, loading, error, generate, reset } = useWorkoutGenerate();

  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleGenerate = () => {
    if (!workoutType || !target || !duration) return;
    generate({
      workoutType,
      target,
      duration: String(duration),
    });
  };

  const handleBackToSetup = () => {
    reset();
    setStep(1);
  };

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safe}>
        {plan && workoutType && target && duration ? (
          <WorkoutPlan
            plan={plan}
            workoutType={workoutType}
            target={target}
            duration={duration}
            onBack={handleBackToSetup}
          />
        ) : (
          <WorkoutForm
            step={step}
            workoutType={workoutType}
            target={target}
            duration={duration}
            onWorkoutTypeChange={setWorkoutType}
            onTargetChange={setTarget}
            onDurationChange={setDuration}
            onNext={handleNext}
            onBack={handleBack}
            onGenerate={handleGenerate}
            loading={loading}
            error={error}
          />
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  safe: { flex: 1 },
});
