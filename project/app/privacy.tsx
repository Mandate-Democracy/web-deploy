import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { FileText, Check } from 'lucide-react-native';

export default function PrivacyScreen() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
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

  const handleNext = () => {
    if (isChecked) {
      router.push('/verify');
    }
  };

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
              <FileText size={48} color={COLORS.darkText} strokeWidth={1.5} />
            </View>
            <Text style={styles.welcomeLabel}>WELCOME</Text>
            <Text style={styles.titleText}>Protecting Privacy</Text>
            <TouchableOpacity 
              style={styles.checkboxContainer} 
              onPress={() => setIsChecked(!isChecked)}
              activeOpacity={0.8}
            >
              <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                {isChecked && <Check size={16} color={COLORS.white} />}
              </View>
              <Text style={styles.checkboxText}>
                I agree and confirm to have read and accepted the{' '}
                <Text style={styles.link}>Terms and Conditions</Text> and{' '}
                <Text style={styles.link}>Data Policy</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.pageIndicator}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
          </View>
          <TouchableOpacity 
            style={[styles.button, !isChecked && styles.buttonDisabled]}
            disabled={!isChecked}
            onPress={handleNext}
          >
            <Text style={[styles.buttonText, !isChecked && styles.buttonTextDisabled]}>
              NEXT
            </Text>
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
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
  },
  checkboxText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.mediumText,
  },
  link: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
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
  buttonDisabled: {
    backgroundColor: COLORS.gray,
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.white,
  },
  buttonTextDisabled: {
    opacity: 0.8,
  },
});