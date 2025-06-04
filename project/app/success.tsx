import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { Check } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  useSharedValue 
} from 'react-native-reanimated';

export default function SuccessScreen() {
  const router = useRouter();
  const scale = useSharedValue(0);
  
  useEffect(() => {
    scale.value = withSpring(1, {
      damping: 12,
      stiffness: 100,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Animated.View style={[styles.iconContainer, animatedStyle]}>
          <Check size={40} color={COLORS.darkBlue} strokeWidth={3} />
        </Animated.View>
        
        <Text style={styles.title}>
          Congratulations, you've been verified!
        </Text>
        
        <Text style={styles.subtitle}>
          Welcome
        </Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.replace('/(tabs)/votes?voting=true')}
        >
          <Text style={styles.buttonText}>START VOTING</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(13, 35, 64, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.darkBlue,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray,
    marginBottom: 32,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
}); 