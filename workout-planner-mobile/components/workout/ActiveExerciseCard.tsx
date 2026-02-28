import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Design } from '@/constants/design';
import type { Exercise } from '@/types/workout';

type ActiveExerciseCardProps = {
  exercise: Exercise;
  index: number;
  total: number;
  timeRemainingSec: number;
  isRunning: boolean;
  phase: 'work' | 'rest';
  setIndex: number;
  totalSets: number;
  onPlayPause?: () => void;
  onRestart?: () => void;
  onSkip?: () => void;
};

export function ActiveExerciseCard({
  exercise,
  index,
  total,
  timeRemainingSec,
  isRunning,
  phase,
  setIndex,
  totalSets,
  onPlayPause,
  onRestart,
  onSkip,
}: ActiveExerciseCardProps) {
  const minutes = Math.floor(timeRemainingSec / 60);
  const seconds = timeRemainingSec % 60;
  const timeDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const phaseLabel = phase === 'rest' ? 'Rest' : 'Work';

  return (
    <ThemedView style={styles.card}>
      <ThemedText style={styles.badge}>Exercise {index + 1} of {total}</ThemedText>
      <ThemedText type="defaultSemiBold" style={styles.name}>
        {exercise.exerciseName}
      </ThemedText>
      <ThemedText style={styles.setInfo}>
        Set {setIndex} of {totalSets} · {phaseLabel}
      </ThemedText>
      <View style={styles.timerBlock}>
        <ThemedText style={styles.timerPlaceholder}>{timeDisplay}</ThemedText>
        <ThemedText style={styles.timerLabel}>
          {phase === 'rest' ? 'Rest Time' : 'Exercise Time'}
        </ThemedText>
      </View>
      <View style={styles.controls}>
        <Pressable
          onPress={onPlayPause}
          style={({ pressed }) => [styles.controlMain, pressed && styles.pressed]}
        >
          <IconSymbol
            name={isRunning ? 'pause.fill' : 'play.fill'}
            size={28}
            color={Design.primaryTextOnPrimary}
          />
        </Pressable>
        <Pressable
          onPress={onRestart}
          style={({ pressed }) => [styles.controlSub, pressed && styles.pressed]}
        >
          <IconSymbol name="arrow.counterclockwise" size={24} color={Design.textPrimary} />
        </Pressable>
        <Pressable
          onPress={onSkip}
          style={({ pressed }) => [styles.controlSub, pressed && styles.pressed]}
        >
          <IconSymbol name="forward.fill" size={24} color={Design.textPrimary} />
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: Design.radiusCard,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Design.borderMuted,
  },
  badge: {
    fontSize: 13,
    color: Design.textSecondary,
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    color: Design.textPrimary,
    marginBottom: 16,
  },
  setInfo: {
    fontSize: 14,
    color: Design.textSecondary,
    marginBottom: 10,
  },
  timerBlock: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 12,
    backgroundColor: Design.selectedBg,
    borderRadius: 8,
  },
  timerPlaceholder: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 2,
    color: Design.textPrimary,
  },
  timerLabel: {
    fontSize: 12,
    color: Design.textSecondary,
    marginTop: 4,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  controlMain: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Design.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlSub: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Design.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.85 },
});
