import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { Building2 } from 'lucide-react-native';

export default function HomeScreen() {
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
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Building2 size={48} color={COLORS.darkText} strokeWidth={1.5} />
            </View>
            <Text style={styles.welcomeLabel}>WELCOME</Text>
            <Text style={styles.titleText}>Welcome to Mandate Democracy</Text>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>
                Each held accountable by No-Confidence Referenda on performance in office Mandate Democracy® delivers what a super-majority now demands.
              </Text>
              <View style={styles.learnMoreCircle}>
                <Text style={styles.learnMoreText}>i</Text>
              </View>
            </View>
          </View>
          <View style={styles.pageIndicator}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
          </View>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push('/privacy')}
          >
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
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
    justifyContent: 'center',
    padding: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    marginBottom: 16,
  },
  welcomeLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.gray,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  titleText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: COLORS.darkText,
    textAlign: 'center',
    marginBottom: 16,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  descriptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.mediumText,
    lineHeight: 24,
    flex: 1,
    paddingRight: 8,
  },
  learnMoreCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  learnMoreText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.white,
  },
  pageIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gray,
    opacity: 0.5,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.white,
    opacity: 1,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 4,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.white,
  },
});