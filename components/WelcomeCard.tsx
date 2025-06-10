import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS } from '@/constants/Colors';
import { Building2 } from 'lucide-react-native';

export default function WelcomeCard() {
  return (
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
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 24,
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
});