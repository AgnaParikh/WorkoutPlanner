import React, { useEffect, useState } from 'react';
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
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<'work' | 'rest'>('work');
  const [setIndex, setSetIndex] = useState(1);
  const exercises = plan.exercises ?? [];
  const activeExercise = exercises[activeIndex];
  const total = exercises.length;
  const workSeconds = activeExercise?.time ?? 0;
  const restSeconds = activeExercise?.restSec ?? 0;
  const totalSets = activeExercise?.sets ?? 1;
  const [timeRemaining, setTimeRemaining] = useState(workSeconds);

  useEffect(() => {
    setPhase('work');
    setSetIndex(1);
    setTimeRemaining(activeExercise?.time ?? 0);
    setIsRunning(false);
  }, [activeIndex, activeExercise?.time]);

  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) return;
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, timeRemaining]);

  useEffect(() => {
    if (!isRunning || timeRemaining > 0) return;

    if (phase === 'work') {
      if (restSeconds > 0) {
        setPhase('rest');
        setTimeRemaining(restSeconds);
        return;
      }
    }

    if (phase === 'rest') {
      if (setIndex < totalSets) {
        setPhase('work');
        setSetIndex((prev) => prev + 1);
        setTimeRemaining(workSeconds);
        return;
      }
    }

    if (phase === 'work' && restSeconds === 0 && setIndex < totalSets) {
      setSetIndex((prev) => prev + 1);
      setTimeRemaining(workSeconds);
      return;
    }

    if (activeIndex < total - 1) {
      setActiveIndex((i) => i + 1);
    } else {
      setIsRunning(false);
    }
  }, [
    timeRemaining,
    isRunning,
    phase,
    restSeconds,
    setIndex,
    totalSets,
    workSeconds,
    activeIndex,
    total,
  ]);

  const handleSkip = () => {
    if (activeIndex < total - 1) setActiveIndex((i) => i + 1);
  };

  const handleRestart = () => {
    const resetSeconds = phase === 'rest' ? restSeconds : workSeconds;
    setTimeRemaining(resetSeconds);
  };

  const handlePlayPause = () => {
    if (!activeExercise) return;
    if (timeRemaining <= 0) {
      const resetSeconds = phase === 'rest' ? restSeconds : workSeconds;
      setTimeRemaining(resetSeconds);
    }
    setIsRunning((prev) => !prev);
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
          timeRemainingSec={timeRemaining}
          isRunning={isRunning}
          phase={phase}
          setIndex={setIndex}
          totalSets={totalSets}
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
