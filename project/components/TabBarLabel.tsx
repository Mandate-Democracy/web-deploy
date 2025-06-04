import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/Colors';

interface TabBarLabelProps {
  focused: boolean;
  title: string;
}

export default function TabBarLabel({ focused, title }: TabBarLabelProps) {
  return (
    <Text style={[styles.label, focused ? styles.focusedLabel : styles.unfocusedLabel]}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginTop: 2,
  },
  focusedLabel: {
    color: COLORS.primary,
  },
  unfocusedLabel: {
    color: COLORS.gray,
  },
});