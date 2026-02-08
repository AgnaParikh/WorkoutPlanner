import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Design } from '@/constants/design';

const LOGO_SIZE = 40;

export function AppHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <IconSymbol name="dumbbell.fill" size={24} color={Design.primaryTextOnPrimary} />
      </View>
      <View style={styles.textBlock}>
        <ThemedText style={styles.title}>Workout Planner</ThemedText>
        <ThemedText style={styles.subtitle}>Create your personalized workout routine</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoBox: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: 8,
    backgroundColor: Design.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textBlock: { flex: 1 },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Design.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: Design.textSecondary,
    marginTop: 2,
  },
});
