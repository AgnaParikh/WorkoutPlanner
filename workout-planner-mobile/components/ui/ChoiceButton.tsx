import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Design } from '@/constants/design';

type ChoiceButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function ChoiceButton({ label, selected, onPress }: ChoiceButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        selected && styles.selected,
        pressed && styles.pressed,
      ]}
    >
      <ThemedText
        style={[styles.label, selected && styles.labelSelected]}
        numberOfLines={2}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: Design.radiusChip,
    borderWidth: 1,
    borderColor: Design.border,
    backgroundColor: '#fff',
  },
  selected: {
    backgroundColor: Design.selectedBg,
    borderColor: Design.primary,
    borderWidth: 2,
  },
  pressed: { opacity: 0.85 },
  label: {
    fontSize: 15,
    color: Design.textPrimary,
    textAlign: 'center',
  },
  labelSelected: {
    fontWeight: '600',
    color: Design.textPrimary,
  },
});
