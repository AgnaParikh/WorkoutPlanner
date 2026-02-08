import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Design } from '@/constants/design';

type SecondaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export function SecondaryButton({ title, onPress, disabled }: SecondaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <ThemedText style={styles.title}>{title}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: Design.radiusButton,
    borderWidth: 1,
    borderColor: Design.border,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.9 },
  title: {
    color: Design.textPrimary,
    fontSize: 17,
    fontWeight: '600',
  },
});
