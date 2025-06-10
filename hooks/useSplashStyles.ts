import { StyleSheet } from 'react-native';
import { COLORS } from '@/constants/Colors';

export function useSplashStyles() {
  return StyleSheet.create({
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
}