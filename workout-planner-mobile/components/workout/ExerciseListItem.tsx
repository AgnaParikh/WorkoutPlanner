import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Design } from '@/constants/design';
import type { Exercise } from '@/types/workout';

type ExerciseListItemProps = {
  exercise: Exercise;
  /** Optional alternative names (placeholder when API doesn't provide) */
  alternatives?: string[];
  onOptionsPress?: () => void;
};

export function ExerciseListItem({
  exercise,
  alternatives = [],
  onOptionsPress,
}: ExerciseListItemProps) {
  const timeStr = exercise.time != null ? `${exercise.time}s` : '—';
  const restStr = exercise.restSec != null ? `${exercise.restSec}s` : '—';

  return (
    <ThemedView style={styles.card}>
      <View style={styles.topRow}>
        <ThemedText type="defaultSemiBold" style={styles.title} numberOfLines={1}>
          {exercise.exerciseName}
        </ThemedText>
        {onOptionsPress ? (
          <Pressable onPress={onOptionsPress} hitSlop={12} style={styles.optionsBtn}>
            <IconSymbol name="link" size={20} color={Design.textSecondary} />
          </Pressable>
        ) : null}
      </View>
      <ThemedText style={styles.details}>
        Sets: {exercise.sets ?? '—'} · Time: {timeStr} · Rest: {restStr}
      </ThemedText>
      {alternatives.length > 0 && (
        <View style={styles.alternatives}>
          {alternatives.map((label) => (
            <View key={label} style={styles.pill}>
              <IconSymbol name="arrow.counterclockwise" size={12} color={Design.textSecondary} />
              <ThemedText style={styles.pillText}>{label}</ThemedText>
            </View>
          ))}
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: Design.radiusCard,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Design.borderMuted,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  title: { fontSize: 16, color: Design.textPrimary, flex: 1 },
  optionsBtn: { padding: 4 },
  details: {
    fontSize: 14,
    color: Design.textSecondary,
  },
  alternatives: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 14,
    backgroundColor: Design.selectedBg,
  },
  pillText: { fontSize: 12, color: Design.textSecondary },
});
