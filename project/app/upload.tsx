import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { ArrowLeft } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  useSharedValue,
  interpolate
} from 'react-native-reanimated';

export default function UploadScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const progressValue = useSharedValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            router.replace('/success');
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    progressValue.value = withTiming(progress / 100, { duration: 150 });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      progressValue.value,
      [0, 1],
      [0, 360]
    );
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={COLORS.white} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Uploading</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={[styles.progressDot, styles.activeDot]} />
        <View style={styles.progressDot} />
      </View>

      <View style={styles.content}>
        <View style={styles.circleContainer}>
          <View style={styles.circleBackground} />
          <Animated.View style={[styles.circleProgress, animatedStyle]} />
          <Text style={styles.progressText}>{progress}%</Text>
        </View>

        <Text style={styles.pleaseWaitText}>Please wait</Text>
        <Text style={styles.uploadingText}>Uploading your scan</Text>

        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.white,
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
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  circleContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  circleBackground: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  circleProgress: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: COLORS.white,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  },
  progressText: {
    color: COLORS.white,
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
  },
  pleaseWaitText: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.white,
    marginBottom: 12,
  },
  uploadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: COLORS.white,
    opacity: 0.8,
  },
  cancelButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    position: 'absolute',
    bottom: 40,
    width: '100%',
  },
  cancelButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
}); 