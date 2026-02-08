import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Design } from '@/constants/design';

type SectionHeadingProps = {
  title: string;
  description?: string;
};

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      {description ? (
        <ThemedText style={styles.description}>{description}</ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Design.textPrimary,
  },
  description: {
    fontSize: 15,
    color: Design.textSecondary,
    marginTop: 6,
  },
});
