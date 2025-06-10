import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/Colors';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.comingSoonText}>Profile Coming Soon</Text>
        <Text style={styles.descriptionText}>
          This section will allow you to manage your profile and settings.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  comingSoonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: COLORS.darkText,
    marginBottom: 12,
  },
  descriptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    maxWidth: '80%',
  },
});