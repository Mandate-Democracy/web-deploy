import { useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/Colors';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const navigateAfterSplash = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      router.replace('/home');
    });
  }, [fadeAnim, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigateAfterSplash();
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigateAfterSplash]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.logoContainer}>
          <Text style={styles.mandateText}>
            <Text style={styles.m}>M</Text>ANDATE
          </Text>
          <Text style={styles.democracyText}>DEMOCRACY.</Text>
          <Text style={styles.tagline}>Votes that Matter</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mandateText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 32,
    letterSpacing: 1,
    color: COLORS.darkText,
  },
  m: {
    color: COLORS.primary,
  },
  democracyText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 32,
    letterSpacing: 1,
    color: COLORS.darkText,
    marginTop: -8,
  },
  tagline: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.primary,
    marginTop: 8,
  },
});