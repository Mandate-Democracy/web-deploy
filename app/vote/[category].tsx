import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { ArrowLeft, Info, X } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const departmentDetails = {
  public_safety: {
    title: 'PUBLIC SAFETY',
    trend: '+12%',
    actual: 45.2,
    proposed: 48.1,
    details: 'Police operations (28.9), Fire department (12.4), Emergency services (4.2), Code enforcement (1.8), Animal control (0.8).'
  },
  infrastructure: {
    title: 'INFRASTRUCTURE AND ROADS',
    trend: '+18%',
    actual: 32.8,
    proposed: 38.5,
    details: 'Street maintenance & repair (18.2), Traffic signals & signs (3.4), Bridge maintenance (4.8), Sidewalk improvements (2.9), Storm drainage (5.1), Street lighting (2.3), Snow removal (1.8).'
  },
  public_works: {
    title: 'PUBLIC WORKS AND UTILITIES',
    trend: '+15%',
    actual: 28.6,
    proposed: 32.9,
    details: 'Water treatment & distribution (14.2), Wastewater treatment (8.7), Solid waste collection (5.4), Fleet maintenance (2.1), Building maintenance (2.5).'
  },
  debt: {
    title: 'DEBT SERVICE',
    trend: '+5%',
    actual: 18.3,
    proposed: 19.2,
    details: 'Bond payments (15.8), Interest on municipal debt (3.4).'
  },
  community: {
    title: 'COMMUNITY SERVICES',
    trend: '+6%',
    actual: 15.7,
    proposed: 16.6,
    details: 'Senior services (4.2), Youth programs (3.8), Community centers (2.9), Social services coordination (2.1), Volunteer programs (1.8), Special events (1.8).'
  },
  admin: {
    title: 'ADMINISTRATIVE SERVICES',
    trend: '+8%',
    actual: 11.2,
    proposed: 12.1,
    details: "City manager's office (2.8), Human resources (1.9), Finance department (2.4), Legal services (1.7), Information technology (2.1), City clerk (0.8), Records management (0.4)."
  },
  parks: {
    title: 'PARKS AND RECREATION',
    trend: '-8%',
    actual: 12.4,
    proposed: 11.4,
    details: 'Park maintenance (5.2), Recreation programs (3.1), Sports facilities (1.8), Playground equipment (0.7), Athletic fields (0.6).'
  },
  economic_dev: {
    title: 'ECONOMIC DEVELOPMENT',
    trend: '+25%',
    actual: 8.2,
    proposed: 10.3,
    details: 'Business attraction & retention (4.1), Downtown revitalization (2.8), Tourism promotion (1.4), Small business support (1.2), Job training partnerships (0.8).'
  },
  libraries: {
    title: 'LIBRARIES AND EDUCATION',
    trend: '-3%',
    actual: 9.8,
    proposed: 9.5,
    details: 'Public library operations (6.2), Adult education programs (1.4), Literacy programs (0.9), Computer training (0.6), Educational partnerships (0.4).'
  },
  environmental: {
    title: 'ENVIRONMENTAL SERVICES',
    trend: '+22%',
    actual: 6.3,
    proposed: 7.7,
    details: 'Environmental compliance (2.1), Recycling programs (2.4), Air quality monitoring (0.8), Green initiatives (1.2), Tree maintenance (0.7), Sustainability programs (0.5).'
  },
  housing: {
    title: 'HOUSING AND DEVELOPMENT',
    trend: '+35%',
    actual: 5.4,
    proposed: 7.3,
    details: 'Affordable housing programs (3.2), Housing assistance (1.8), Code enforcement (1.1), Development review (0.7), Historic preservation (0.5).'
  },
  health: {
    title: 'HEALTH AND SOCIAL SERVICES',
    trend: '+28%',
    actual: 4.9,
    proposed: 6.3,
    details: 'Public health programs (2.4), Mental health services (1.6), Substance abuse programs (0.9), Health inspections (0.8), Social services coordination (0.6).'
  },
  property_tax: {
    title: 'PROPERTY TAXES',
    trend: '+14%',
    actual: 89.4,
    proposed: 101.9,
    details: 'Residential property tax, Commercial property tax, Industrial property tax'
  },
  sales_tax: {
    title: 'SALES TAX',
    trend: '+8%',
    actual: 34.7,
    proposed: 37.5,
    details: 'Local sales tax, State shared revenue'
  },
  business_license: {
    title: 'BUSINESS LICENSE FEES',
    trend: '+12%',
    actual: 12.8,
    proposed: 14.3,
    details: 'Business permits, Professional licenses, Special event permits'
  },
  utility_fees: {
    title: 'UTILITY FEES',
    trend: '+18%',
    actual: 22.1,
    proposed: 26.1,
    details: 'Water service, Sewer service, Solid waste collection'
  },
  impact_fees: {
    title: 'DEVELOPMENT IMPACT FEES',
    trend: '+45%',
    actual: 8.6,
    proposed: 12.5,
    details: 'New development fees, Infrastructure impact fees'
  },
  parking_fines: {
    title: 'PARKING AND TRAFFIC FINES',
    trend: '-5%',
    actual: 6.2,
    proposed: 5.9,
    details: 'Parking violations, Traffic citations'
  },
  recreation_fees: {
    title: 'RECREATION PROGRAM FEES',
    trend: '+3%',
    actual: 4.8,
    proposed: 4.9,
    details: 'Program registration, Facility rentals, Sports leagues'
  },
  grants: {
    title: 'FEDERAL/STATE GRANTS',
    trend: '+22%',
    actual: 15.3,
    proposed: 18.7,
    details: 'Federal grants, State grants, Special project funding'
  },
  assessments: {
    title: 'SPECIAL ASSESSMENTS',
    trend: '+28%',
    actual: 7.1,
    proposed: 9.1,
    details: 'Neighborhood improvements, Special district assessments'
  }
};

export default function VoteCategoryScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
  const [feelingLevels, setFeelingLevels] = useState<Record<string, number>>({});
  const [hasVoted, setHasVoted] = useState<Record<string, boolean>>({});
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const questions = {
    budget: {
      title: 'CITY BUDGET BALLOT',
      description: "Review and vote on the city's budget priorities, including spending allocations and revenue sources. Your input helps shape how the city allocates its resources and manages its finances.",
      budgetSummary: {
        proposedBudget: 219.9,
        totalRevenue: 230.9,
        budgetBalance: 11.0
      },
      questions: [
        {
          id: 'policy1',
          question: "Should we balance the budget by raising taxes?",
          type: 'single',
          options: [
            { id: 'yes', label: 'YES' },
            { id: 'no', label: 'NO' },
          ],
        },
        {
          id: 'policy2',
          question: "Should residents vote directly on major budget items?",
          type: 'single',
          options: [
            { id: 'yes', label: 'YES' },
            { id: 'no', label: 'NO' },
          ],
        },
        {
          id: 'spending',
          question: "Your Spending Ballot: Where to Spend, Where to Cut",
          type: 'department',
          options: [
            { id: 'public_safety', label: 'Public Safety ($48.1M)' },
            { id: 'infrastructure', label: 'Infrastructure and Roads ($38.5M)' },
            { id: 'public_works', label: 'Public Works and Utilities ($32.9M)' },
            { id: 'economic_dev', label: 'Economic Development ($10.3M)' },
            { id: 'community', label: 'Community Services ($16.6M)' },
            { id: 'libraries', label: 'Libraries and Education ($9.5M)' },
            { id: 'parks', label: 'Parks and Recreation ($11.4M)' },
            { id: 'environmental', label: 'Environmental Services ($7.7M)' },
            { id: 'housing', label: 'Housing and Development ($7.3M)' },
            { id: 'health', label: 'Health and Social Services ($6.3M)' },
            { id: 'admin', label: 'Administrative Services ($12.1M)' },
            { id: 'debt', label: 'Debt Service ($19.2M)' },
          ],
          voteOptions: [
            { id: 'sharp_cut', label: 'Sharp Cut >10%' },
            { id: 'small_cut', label: 'Small Cut 0-10%' },
            { id: 'same', label: 'SAME' },
            { id: 'small_rise', label: 'Small Rise 0-10%' },
            { id: 'sharp_rise', label: 'Sharp Rise >10%' },
          ]
        },
        {
          id: 'revenue',
          question: "Your Revenue Ballot: Who Pays and How Much",
          type: 'department',
          options: [
            { id: 'property_tax', label: 'Property Taxes ($101.9M)' },
            { id: 'sales_tax', label: 'Sales Tax ($37.5M)' },
            { id: 'business_license', label: 'Business License Fees ($14.3M)' },
            { id: 'utility_fees', label: 'Utility Fees ($26.1M)' },
            { id: 'impact_fees', label: 'Development Impact Fees ($12.5M)' },
            { id: 'parking_fines', label: 'Parking and Traffic Fines ($5.9M)' },
            { id: 'recreation_fees', label: 'Recreation Program Fees ($4.9M)' },
            { id: 'grants', label: 'Federal/State Grants ($18.7M)' },
            { id: 'assessments', label: 'Special Assessments ($9.1M)' },
          ],
          voteOptions: [
            { id: 'sharp_cut', label: 'Sharp Cut >10%' },
            { id: 'small_cut', label: 'Small Cut 0-10%' },
            { id: 'same', label: 'SAME' },
            { id: 'small_rise', label: 'Small Rise 0-10%' },
            { id: 'sharp_rise', label: 'Sharp Rise >10%' },
          ]
        }
      ]
    },
  };

  const currentQuestions = questions[category as keyof typeof questions]?.questions || [];

  useEffect(() => {
    const loadSavedVotes = async () => {
      try {
        // Load vote data
        const voteDataKey = `voteData_${category}`;
        const savedVoteData = await AsyncStorage.getItem(voteDataKey);
        if (savedVoteData) {
          const parsedData = JSON.parse(savedVoteData) as {
            options: Record<string, string[]>;
            feelings: Record<string, number>;
          };
          setSelectedOptions(parsedData.options || {});
          setFeelingLevels(parsedData.feelings || {});
        }

        // Load voted status
        const votedKey = `voted_${category}`;
        const voted = await AsyncStorage.getItem(votedKey);
        if (voted) {
          const voteData = JSON.parse(voted) as Record<string, boolean>;
          setHasVoted(voteData);
        }

        // Load saved feedback
        const feedbackKey = `feedback_${category}`;
        const savedFeedback = await AsyncStorage.getItem(feedbackKey);
        if (savedFeedback) {
          setFeedback(savedFeedback);
          setFeedbackSubmitted(true);
        }
      } catch (error) {
        console.error('Error loading saved votes:', error);
      }
    };

    loadSavedVotes();
  }, [category]);

  const handlePolicyVote = async (questionId: string, optionId: string) => {
    try {
      // Update local state
      const newSelectedOptions = {
        ...selectedOptions,
        [questionId]: [optionId]
      };
      setSelectedOptions(newSelectedOptions);

      // Save to AsyncStorage
      const voteDataKey = `voteData_${category}`;
      const savedVoteData = await AsyncStorage.getItem(voteDataKey);
      const existingData = savedVoteData ? JSON.parse(savedVoteData) : { options: {}, feelings: {} };
      
      const updatedData = {
        ...existingData,
        options: {
          ...existingData.options,
          [questionId]: [optionId]
        }
      };

      await AsyncStorage.setItem(voteDataKey, JSON.stringify(updatedData));

      // Update progress
      const savedProgress = await AsyncStorage.getItem('voteProgress');
      const progress = savedProgress ? JSON.parse(savedProgress) : {};
      const categoryKey = category as string;
      const currentProgress = progress[categoryKey] || 0;
      
      // Only increment progress if this is the first vote for this question
      if (!existingData.options[questionId]) {
        progress[categoryKey] = currentProgress + 1;
        await AsyncStorage.setItem('voteProgress', JSON.stringify(progress));
      }
    } catch (error) {
      console.error('Error saving vote:', error);
    }
  };

  const handleDepartmentVote = async (departmentId: string, voteOptionId: string) => {
    try {
      // Update local state
      const newSelectedOptions = {
        ...selectedOptions,
        [departmentId]: [voteOptionId]
      };
      setSelectedOptions(newSelectedOptions);

      // Save to AsyncStorage
      const voteDataKey = `voteData_${category}`;
      const savedVoteData = await AsyncStorage.getItem(voteDataKey);
      const existingData = savedVoteData ? JSON.parse(savedVoteData) : { options: {}, feelings: {} };
      
      const updatedData = {
        ...existingData,
        options: {
          ...existingData.options,
          [departmentId]: [voteOptionId]
        }
      };

      await AsyncStorage.setItem(voteDataKey, JSON.stringify(updatedData));

      // Update progress
      const savedProgress = await AsyncStorage.getItem('voteProgress');
      const progress = savedProgress ? JSON.parse(savedProgress) : {};
      const categoryKey = category as string;
      const currentProgress = progress[categoryKey] || 0;
      
      // Only increment progress if this is the first vote for this department
      if (!existingData.options[departmentId]) {
        progress[categoryKey] = currentProgress + 1;
        await AsyncStorage.setItem('voteProgress', JSON.stringify(progress));
      }
    } catch (error) {
      console.error('Error saving vote:', error);
    }
  };

  const isQuestionComplete = (questionId: string) => {
    const question = currentQuestions.find(q => q.id === questionId);
    if (!question) return false;
    return selectedOptions[question.id]?.length > 0;
  };

  const FeelingButton = ({ level, questionId, disabled = false }: { level: number; questionId: string; disabled?: boolean }) => {
    const isSelected = feelingLevels[questionId] === level;
    const isSubmitted = hasVoted[questionId];

    return (
      <TouchableOpacity
        style={[
          styles.feelingButton,
          isSelected && styles.selectedFeelingButton,
          isSubmitted && isSelected && styles.submittedFeelingButton,
          disabled && !isSelected && { opacity: 0.5 }
        ]}
        onPress={() => !disabled && feelingLevels[questionId] !== level && setFeelingLevels({ ...feelingLevels, [questionId]: level })}
        disabled={disabled}
      >
        <Text style={[
          styles.feelingText,
          isSelected && styles.selectedFeelingText,
        ]}>
          {level}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleLearnMore = (departmentId: string) => {
    setSelectedDepartment(departmentId);
    setShowLearnMore(true);
  };

  const renderDepartmentVote = (question: any) => {
    return (
      <View style={styles.departmentVoteContainer}>
        {question.options.map((option: any) => (
          <View key={option.id} style={styles.departmentVoteItem}>
            <View style={styles.departmentHeader}>
              <Text style={styles.departmentTitle}>{option.label}</Text>
              <TouchableOpacity 
                onPress={() => handleLearnMore(option.id)}
                style={styles.learnMoreButton}
              >
                <Text style={styles.learnMoreText}>Learn More</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.voteOptionsContainer}>
              {question.voteOptions.map((voteOption: any) => (
                <TouchableOpacity
                  key={voteOption.id}
                  style={[
                    styles.voteOption,
                    selectedOptions[option.id]?.includes(voteOption.id) && styles.selectedVoteOption
                  ]}
                  onPress={() => handleDepartmentVote(option.id, voteOption.id)}
                >
                  <Text style={[
                    styles.voteOptionText,
                    selectedOptions[option.id]?.includes(voteOption.id) && styles.selectedVoteOptionText
                  ]}>
                    {voteOption.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  };

  const handleFeedbackSubmit = async () => {
    try {
      const feedbackKey = `feedback_${category}`;
      await AsyncStorage.setItem(feedbackKey, feedback);
      setFeedbackSubmitted(true);

      // Update progress for feedback submission
      const savedProgress = await AsyncStorage.getItem('voteProgress');
      const progress = savedProgress ? JSON.parse(savedProgress) : {};
      const categoryKey = category as string;
      const currentProgress = progress[categoryKey] || 0;
      
      // Only increment progress if feedback hasn't been submitted before
      if (!feedbackSubmitted) {
        progress[categoryKey] = currentProgress + 1;
        await AsyncStorage.setItem('voteProgress', JSON.stringify(progress));
      }
    } catch (error) {
      console.error('Error saving feedback:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={COLORS.white} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{questions[category as keyof typeof questions]?.title}</Text>
        <TouchableOpacity style={styles.infoButton}>
          <Info color={COLORS.white} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {category === 'budget' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Budget Summary</Text>
            <View style={styles.budgetSummary}>
              <View style={styles.budgetItem}>
                <Text style={styles.budgetLabel}>Total Proposed Budget</Text>
                <Text style={styles.budgetValue}>${questions.budget.budgetSummary.proposedBudget}M</Text>
              </View>
              <View style={styles.budgetItem}>
                <Text style={styles.budgetLabel}>Total Revenue</Text>
                <Text style={styles.budgetValue}>${questions.budget.budgetSummary.totalRevenue}M</Text>
              </View>
              <View style={styles.budgetItem}>
                <Text style={styles.budgetLabel}>Budget Balance</Text>
                <Text style={styles.budgetValue}>${questions.budget.budgetSummary.budgetBalance}M</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{questions[category as keyof typeof questions]?.description}</Text>
        </View>

        {currentQuestions.map((question, index) => (
          <View key={question.id} style={styles.section}>
            <Text style={styles.question}>{question.question}</Text>
            {question.type === 'department' ? (
              renderDepartmentVote(question)
            ) : (
              <View style={styles.options}>
                {question.options.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.option,
                      selectedOptions[question.id]?.includes(option.id) && styles.selectedOption,
                      hasVoted[question.id] && selectedOptions[question.id]?.includes(option.id) && styles.submittedOption,
                      hasVoted[question.id] && !selectedOptions[question.id]?.includes(option.id) && { opacity: 0.5 }
                    ]}
                    onPress={() => handlePolicyVote(question.id, option.id)}
                  >
                    <View style={[
                      styles.radio,
                      selectedOptions[question.id]?.includes(option.id) && styles.selectedRadio,
                    ]} />
                    <Text style={[
                      styles.optionText,
                      selectedOptions[question.id]?.includes(option.id) && styles.selectedOptionText,
                    ]}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}

        <View style={styles.section}>
          <Text style={styles.question}>Comments and Feedback</Text>
          <Text style={styles.feedbackDescription}>
            Share your thoughts about the budget proposals and any additional feedback you'd like to provide.
          </Text>
          
          {feedbackSubmitted ? (
            <View style={styles.feedbackSubmitted}>
              <Text style={styles.feedbackSubmittedText}>Thank you for your feedback!</Text>
            </View>
          ) : (
            <>
              <TextInput
                style={styles.feedbackInput}
                multiline
                numberOfLines={4}
                placeholder="Type your comments here..."
                value={feedback}
                onChangeText={setFeedback}
                textAlignVertical="top"
              />
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  !feedback.trim() && styles.submitButtonDisabled
                ]}
                onPress={handleFeedbackSubmit}
                disabled={!feedback.trim()}
              >
                <Text style={styles.submitButtonText}>SUBMIT FEEDBACK</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={showLearnMore}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLearnMore(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedDepartment && departmentDetails[selectedDepartment as keyof typeof departmentDetails]?.title}
              </Text>
              <TouchableOpacity onPress={() => setShowLearnMore(false)}>
                <X color={COLORS.darkText} size={24} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalStats}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>5-year Trend</Text>
                <Text style={[
                  styles.statValue,
                  { color: selectedDepartment && departmentDetails[selectedDepartment as keyof typeof departmentDetails]?.trend.startsWith('+') 
                    ? COLORS.success 
                    : COLORS.error }
                ]}>
                  {selectedDepartment && departmentDetails[selectedDepartment as keyof typeof departmentDetails]?.trend}
                </Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>2024 Actual</Text>
                <Text style={styles.statValue}>
                  ${selectedDepartment && departmentDetails[selectedDepartment as keyof typeof departmentDetails]?.actual}M
                </Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>2025 Proposed</Text>
                <Text style={styles.statValue}>
                  ${selectedDepartment && departmentDetails[selectedDepartment as keyof typeof departmentDetails]?.proposed}M
                </Text>
              </View>
            </View>

            <Text style={styles.modalText}>
              {selectedDepartment && departmentDetails[selectedDepartment as keyof typeof departmentDetails]?.details}
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.darkBlue,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.white,
  },
  infoButton: {
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: COLORS.darkText,
    lineHeight: 24,
  },
  question: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.darkText,
    marginBottom: 20,
  },
  options: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  selectedOption: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(255, 109, 0, 0.05)',
  },
  submittedOption: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(255, 109, 0, 0.1)',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.gray,
    marginRight: 12,
  },
  selectedRadio: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: COLORS.darkText,
  },
  selectedOptionText: {
    fontFamily: 'Inter-Medium',
    color: COLORS.primary,
  },
  feelingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 8,
  },
  feelingButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  selectedFeelingButton: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  submittedFeelingButton: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  feelingText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: COLORS.darkText,
  },
  selectedFeelingText: {
    color: COLORS.white,
  },
  feelingsLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.lightGray,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  budgetSummary: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  budgetItem: {
    marginBottom: 12,
  },
  budgetLabel: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 4,
  },
  budgetValue: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.darkText,
  },
  departmentVoteContainer: {
    gap: 20,
  },
  departmentVoteItem: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  departmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  departmentTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: COLORS.darkText,
    flex: 1,
  },
  learnMoreButton: {
    marginLeft: 12,
  },
  learnMoreText: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  voteOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  voteOption: {
    flex: 1,
    minWidth: '30%',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    alignItems: 'center',
  },
  selectedVoteOption: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  voteOptionText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: COLORS.darkText,
    textAlign: 'center',
  },
  selectedVoteOptionText: {
    color: COLORS.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.darkText,
    flex: 1,
    marginRight: 16,
  },
  modalText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.darkText,
    lineHeight: 20,
  },
  feedbackDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray,
    marginBottom: 16,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: COLORS.darkText,
    minHeight: 120,
    marginBottom: 16,
  },
  feedbackSubmitted: {
    backgroundColor: 'rgba(255, 109, 0, 0.1)',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  feedbackSubmittedText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: COLORS.primary,
  },
  modalStats: {
    backgroundColor: COLORS.lightGray,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: COLORS.darkText,
  },
  statValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.darkText,
  },
});