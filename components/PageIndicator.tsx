import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/Colors';

interface PageIndicatorProps {
  currentPage: number;
  totalPages: number;
}

export default function PageIndicator({ currentPage, totalPages }: PageIndicatorProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentPage ? styles.activeDot : styles.inactiveDot
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.white,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  inactiveDot: {
    backgroundColor: COLORS.gray,
    opacity: 0.5,
  },
});