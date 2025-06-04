import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ThankYouScreen() {
  const router = useRouter();

  const handleDonate = () => {
    // Replace with your donation link or navigation
    // For now, just log or navigate
    // Example: Linking.openURL('https://your-donation-link.com');
  };

  const handleReset = async () => {
    try {
      await AsyncStorage.clear();
      router.replace('/');
    } catch (error) {
      console.error('Error clearing app data:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Star size={64} color={COLORS.darkBlue} strokeWidth={2.5} style={styles.star} />
          <Text style={styles.thankYou}>Thank you for voting!</Text>
          <Text style={styles.links}>Please visit our links</Text>
          <TouchableOpacity style={styles.donateButton} onPress={handleDonate}>
            <Text style={styles.donateText}>DONATE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetText}>RESET APP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.darkBlue,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    minWidth: 300,
  },
  star: {
    marginBottom: 24,
  },
  thankYou: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: COLORS.darkText,
    marginBottom: 12,
  },
  links: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.darkText,
    marginBottom: 28,
  },
  donateButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 48,
    alignItems: 'center',
    marginTop: 8,
  },
  donateText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    letterSpacing: 1,
  },
  resetButton: {
    backgroundColor: COLORS.darkBlue,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 48,
    alignItems: 'center',
    marginTop: 16,
  },
  resetText: {
    color: COLORS.white,
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    letterSpacing: 1,
  },
}); 