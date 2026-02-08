import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { AppHeader } from '@/components/ui/AppHeader';
import { Design } from '@/constants/design';
import type { BodyArea, WorkoutPlan as WorkoutPlanType, WorkoutStyle } from '@/types/workout';
import { ActiveExerciseCard } from './ActiveExerciseCard';
import { ExerciseListItem } from './ExerciseListItem';

type WorkoutPlanProps = {
  plan: WorkoutPlanType;
  workoutType: WorkoutStyle;
  target: BodyArea;
  duration: number;
  onBack: () => void;
};

export function WorkoutPlan({ plan, workoutType, target, duration, onBack }: WorkoutPlanProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const exercises = plan.exercises ?? [];
  const activeExercise = exercises[activeIndex];
  const total = exercises.length;

  const handleSkip = () => {
    if (activeIndex < total - 1) setActiveIndex((i) => i + 1);
  };

  const handleRestart = () => {
    // Placeholder: could reset timer for current exercise
  };

  const handlePlayPause = () => {
    // Placeholder: start/pause timer
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <AppHeader />

      <Pressable onPress={onBack} style={styles.backLink}>
        <ThemedText style={styles.backText}>← Back to Setup</ThemedText>
      </Pressable>

      <ThemedText style={styles.planTitle}>Your Workout Plan</ThemedText>
      <ThemedText style={styles.summary}>
        {workoutType} · {target} · {duration} minutes
      </ThemedText>

      {activeExercise && (
        <ActiveExerciseCard
          exercise={activeExercise}
          index={activeIndex}
          total={total}
          onPlayPause={handlePlayPause}
          onRestart={handleRestart}
          onSkip={handleSkip}
        />
      )}

      <ThemedText style={styles.sectionTitle}>All Exercises</ThemedText>
      {exercises.map((exercise, index) => (
        <ExerciseListItem
          key={`${exercise.exerciseName}-${index}`}
          exercise={exercise}
          alternatives={[]}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { padding: 16, paddingBottom: 40 },
  backLink: { marginBottom: 16 },
  backText: {
    fontSize: 16,
    color: Design.textSecondary,
    fontWeight: '500',
  },
  planTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Design.textPrimary,
    marginBottom: 4,
  },
  summary: {
    fontSize: 15,
    color: Design.textSecondary,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Design.textPrimary,
    marginBottom: 12,
  },
});
