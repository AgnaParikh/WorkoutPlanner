import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Design } from '@/constants/design';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  showArrow?: boolean;
};

export function PrimaryButton({
  title,
  onPress,
  disabled,
  loading,
  showArrow = true,
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        (disabled || loading) && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={Design.primaryTextOnPrimary} />
      ) : (
        <View style={styles.content}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          {showArrow && (
            <IconSymbol
              name="chevron.right"
              size={20}
              color={Design.primaryTextOnPrimary}
              style={styles.arrow}
            />
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Design.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: Design.radiusButton,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.9 },
  content: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  title: {
    color: Design.primaryTextOnPrimary,
    fontSize: 17,
    fontWeight: '600',
  },
  arrow: { marginLeft: 2 },
});
