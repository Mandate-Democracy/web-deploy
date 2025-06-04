import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { Building2, Thermometer, Stethoscope, FlaskRound as Flask, Chrome as Home, MoveHorizontal as MoreHorizontal, DollarSign } from 'lucide-react-native';
import VoteCard from '@/components/VoteCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VotesScreen() {
  const router = useRouter();
  const [timeLeft] = useState('2:10:05');
  const [voteProgress, setVoteProgress] = useState<Record<string, number>>({});

  const loadVoteProgress = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem('voteProgress');
      if (savedProgress) {
        setVoteProgress(JSON.parse(savedProgress));
      }
    } catch (error) {
      console.error('Error loading vote progress:', error);
    }
  };

  // Reload progress when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadVoteProgress();
    }, [])
  );

  const calculateProgress = (category: string, totalQuestions: number) => {
    const completedVotes = voteProgress[category] || 0;
    // For budget category, we have:
    // - 2 policy questions
    // - 12 spending departments
    // - 9 revenue sources
    const totalBudgetQuestions = 23; // 2 + 12 + 9 (removed feedback as it's optional)
    return Math.round((completedVotes / totalBudgetQuestions) * 100);
  };

  const categories = [
    {
      title: 'Budget Control Deficit and Debt',
      icon: DollarSign,
      questions: 23, // Updated to show total number of questions (excluding feedback)
      progress: calculateProgress('budget', 23),
      route: 'budget'
    }
  ];

  const clearAllVotes = async () => {
    try {
      await AsyncStorage.removeItem('voteProgress');
      // Remove all voteData and voted keys for all categories
      const keys = await AsyncStorage.getAllKeys();
      const voteKeys = keys.filter(
        (key) => key.startsWith('voteData_') || key.startsWith('voted_')
      );
      if (voteKeys.length > 0) {
        await AsyncStorage.multiRemove(voteKeys);
      }
      // Reset progress state to empty object
      setVoteProgress({});
    } catch (error) {
      console.error('Error clearing votes:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Super Tuesday Votes</Text>
        <Text style={styles.subtitle}>{timeLeft} UNTIL BALLOTS CLOSE</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {categories.map((category, index) => (
          <VoteCard
            key={index}
            title={category.title}
            Icon={category.icon}
            questions={category.questions}
            progress={category.progress}
            onPress={() => router.push(`/vote/${category.route}` as any)}
          />
        ))}

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={() => {
            const incomplete = categories.some(cat => cat.progress < 100);
            if (incomplete) {
              Alert.alert(
                'Unfinished Ballot',
                'You have an unfinished ballot. Any items not voted on will be assumed as abstained. Would you like to proceed?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Proceed', style: 'default', onPress: () => router.push('/thankyou') }
                ]
              );
            } else {
              router.push('/thankyou');
            }
          }}
        >
          <Text style={styles.submitButtonText}>SUBMIT BALLOT</Text>
        </TouchableOpacity>

        {/* Clear All Votes Button */}
        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: COLORS.darkBlue }]}
          onPress={clearAllVotes}
        >
          <Text style={styles.submitButtonText}>CLEAR ALL VOTES</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.darkBlue,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.white,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.white,
    opacity: 0.8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
});