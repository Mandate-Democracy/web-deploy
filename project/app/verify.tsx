import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { Lock } from 'lucide-react-native';
import CTAButton from '@/components/CTAButton';

export default function VerifyScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerText}>Verify Identity</Text>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.progressContainer}>
            <View style={[styles.progressDot, styles.activeDot]} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
          </View>

          <View style={styles.iconContainer}>
            <Lock size={80} color={COLORS.darkBlue} strokeWidth={1.5} />
          </View>
          
          <Text style={styles.title}>We need to verify your ID</Text>
          
          <Text style={styles.description}>
            You just need to go through some steps which will help us build a secure system together.
          </Text>
          
          <Text style={styles.subDescription}>
            In order to register you need an ID. We need to scan your ID because...
          </Text>

          <CTAButton 
            title="NEXT"
            style={styles.button}
            onPress={() => router.push('/scan')}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.white,
    marginBottom: 40,
    marginTop: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 40,
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
    maxWidth: '90%',
    opacity: 0.8,
  },
  subDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    maxWidth: '90%',
    opacity: 0.8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  progressDot: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.white,
  },
  button: {
    width: '100%',
    backgroundColor: COLORS.primary,
    marginTop: 'auto',
    marginBottom: 20,
  },
});