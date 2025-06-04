import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Department {
  name: string;
  trend: string;
  actual2024: number;
  proposed2025: number;
  details: string;
}

interface RevenueSource {
  name: string;
  trend: string;
  actual2024: number;
  proposed2025: number;
}

type VoteOption = 'Sharp Cut >10%' | 'Small Cut 0-10%' | 'SAME' | 'Small Rise 0-10%' | 'Sharp Rise >10%';

interface VoteState {
  [key: string]: VoteOption | null;
}

const departments: Department[] = [
  {
    name: 'Public Safety',
    trend: '+12%',
    actual2024: 45.2,
    proposed2025: 48.1,
    details: 'Police operations (28.9), Fire department (12.4), Emergency services (4.2), Code enforcement (1.8), Animal control (0.8).'
  },
  {
    name: 'Infrastructure and Roads',
    trend: '+18%',
    actual2024: 32.8,
    proposed2025: 38.5,
    details: 'Street maintenance & repair (18.2), Traffic signals & signs (3.4), Bridge maintenance (4.8), Sidewalk improvements (2.9), Storm drainage (5.1), Street lighting (2.3), Snow removal (1.8).'
  },
  {
    name: 'Parks and Recreation',
    trend: '-8%',
    actual2024: 12.4,
    proposed2025: 11.4,
    details: 'Park maintenance (5.2), Recreation programs (3.1), Sports facilities (1.8), Playground equipment (0.7), Athletic fields (0.6).'
  },
  {
    name: 'Public Works and Utilities',
    trend: '+15%',
    actual2024: 28.6,
    proposed2025: 32.9,
    details: 'Water treatment & distribution (14.2), Wastewater treatment (8.7), Solid waste collection (5.4), Fleet maintenance (2.1), Building maintenance (2.5).'
  },
  {
    name: 'Economic Development',
    trend: '+25%',
    actual2024: 8.2,
    proposed2025: 10.3,
    details: 'Business attraction & retention (4.1), Downtown revitalization (2.8), Tourism promotion (1.4), Small business support (1.2), Job training partnerships (0.8).'
  },
  {
    name: 'Community Services',
    trend: '+6%',
    actual2024: 15.7,
    proposed2025: 16.6,
    details: 'Senior services (4.2), Youth programs (3.8), Community centers (2.9), Social services coordination (2.1), Volunteer programs (1.8), Special events (1.8).'
  },
  {
    name: 'Libraries and Education',
    trend: '-3%',
    actual2024: 9.8,
    proposed2025: 9.5,
    details: 'Public library operations (6.2), Adult education programs (1.4), Literacy programs (0.9), Computer training (0.6), Educational partnerships (0.4).'
  },
  {
    name: 'Environmental Services',
    trend: '+22%',
    actual2024: 6.3,
    proposed2025: 7.7,
    details: 'Environmental compliance (2.1), Recycling programs (2.4), Air quality monitoring (0.8), Green initiatives (1.2), Tree maintenance (0.7), Sustainability programs (0.5).'
  },
  {
    name: 'Housing and Development',
    trend: '+35%',
    actual2024: 5.4,
    proposed2025: 7.3,
    details: 'Affordable housing programs (3.2), Housing assistance (1.8), Code enforcement (1.1), Development review (0.7), Historic preservation (0.5).'
  },
  {
    name: 'Health and Social Services',
    trend: '+28%',
    actual2024: 4.9,
    proposed2025: 6.3,
    details: 'Public health programs (2.4), Mental health services (1.6), Substance abuse programs (0.9), Health inspections (0.8), Social services coordination (0.6).'
  },
  {
    name: 'Administrative Services',
    trend: '+8%',
    actual2024: 11.2,
    proposed2025: 12.1,
    details: 'City manager\'s office (2.8), Human resources (1.9), Finance department (2.4), Legal services (1.7), Information technology (2.1), City clerk (0.8), Records management (0.4).'
  },
  {
    name: 'Debt Service',
    trend: '+5%',
    actual2024: 18.3,
    proposed2025: 19.2,
    details: 'Bond payments (15.8), Interest on municipal debt (3.4).'
  }
];

const revenueSources: RevenueSource[] = [
  {
    name: 'Property Taxes',
    trend: '+14%',
    actual2024: 89.4,
    proposed2025: 101.9
  },
  {
    name: 'Sales Tax',
    trend: '+8%',
    actual2024: 34.7,
    proposed2025: 37.5
  },
  {
    name: 'Business License Fees',
    trend: '+12%',
    actual2024: 12.8,
    proposed2025: 14.3
  },
  {
    name: 'Utility Fees',
    trend: '+18%',
    actual2024: 22.1,
    proposed2025: 26.1
  },
  {
    name: 'Development Impact Fees',
    trend: '+45%',
    actual2024: 8.6,
    proposed2025: 12.5
  },
  {
    name: 'Parking and Traffic Fines',
    trend: '-5%',
    actual2024: 6.2,
    proposed2025: 5.9
  },
  {
    name: 'Recreation Program Fees',
    trend: '+3%',
    actual2024: 4.8,
    proposed2025: 4.9
  },
  {
    name: 'Federal/State Grants',
    trend: '+22%',
    actual2024: 15.3,
    proposed2025: 18.7
  },
  {
    name: 'Special Assessments',
    trend: '+28%',
    actual2024: 7.1,
    proposed2025: 9.1
  }
];

const BudgetBallot = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [comments, setComments] = useState('');
  const [departmentVotes, setDepartmentVotes] = useState<VoteState>({});
  const [revenueVotes, setRevenueVotes] = useState<VoteState>({});
  const [policyVotes, setPolicyVotes] = useState<{ [key: string]: boolean | null }>({});

  const handleDepartmentVote = (departmentName: string, vote: VoteOption) => {
    setDepartmentVotes(prev => ({
      ...prev,
      [departmentName]: vote
    }));
  };

  const handleRevenueVote = (revenueName: string, vote: VoteOption) => {
    setRevenueVotes(prev => ({
      ...prev,
      [revenueName]: vote
    }));
  };

  const handlePolicyVote = (question: string, vote: boolean) => {
    setPolicyVotes(prev => ({
      ...prev,
      [question]: vote
    }));
  };

  const handleSubmit = () => {
    const ballotData = {
      policyVotes,
      departmentVotes,
      revenueVotes,
      comments
    };
    
    // Here you would typically send this data to your backend
    console.log('Ballot submitted:', ballotData);
    
    // Reset form
    setPolicyVotes({});
    setDepartmentVotes({});
    setRevenueVotes({});
    setComments('');
  };

  const renderBudgetSummary = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>CITY BUDGET BALLOT</Text>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Proposed Budget</Text>
          <Text style={styles.summaryValue}>$219.9M</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Revenue</Text>
          <Text style={styles.summaryValue}>$230.9M</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Budget Balance</Text>
          <Text style={styles.summaryValue}>$11.0M</Text>
        </View>
      </View>
    </View>
  );

  const renderPolicyQuestions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Budget Policy Questions</Text>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>Should we balance the budget by raising taxes?</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity 
            style={[
              styles.radioOption,
              policyVotes['taxes'] === true && styles.selectedOption
            ]}
            onPress={() => handlePolicyVote('taxes', true)}
          >
            <Text>YES</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.radioOption,
              policyVotes['taxes'] === false && styles.selectedOption
            ]}
            onPress={() => handlePolicyVote('taxes', false)}
          >
            <Text>NO</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>Should residents vote directly on major budget items?</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity 
            style={[
              styles.radioOption,
              policyVotes['direct_vote'] === true && styles.selectedOption
            ]}
            onPress={() => handlePolicyVote('direct_vote', true)}
          >
            <Text>YES</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.radioOption,
              policyVotes['direct_vote'] === false && styles.selectedOption
            ]}
            onPress={() => handlePolicyVote('direct_vote', false)}
          >
            <Text>NO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderLearnMoreModal = () => (
    <Modal
      visible={showLearnMore}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowLearnMore(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowLearnMore(false)}
          >
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          {selectedDepartment && (
            <>
              <Text style={styles.modalTitle}>{selectedDepartment.name}</Text>
              <Text style={styles.modalDetails}>{selectedDepartment.details}</Text>
            </>
          )}
        </View>
      </View>
    </Modal>
  );

  const renderSpendingBallot = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Your Spending Ballot: Where to Spend, Where to Cut</Text>
      {departments.map((dept, index) => (
        <View key={index} style={styles.departmentRow}>
          <View style={styles.departmentInfo}>
            <TouchableOpacity
              onPress={() => {
                setSelectedDepartment(dept);
                setShowLearnMore(true);
              }}
            >
              <Text style={styles.learnMore}>Learn More</Text>
            </TouchableOpacity>
            <Text style={styles.departmentName}>{dept.name}</Text>
            <Text style={styles.trend}>{dept.trend}</Text>
            <Text style={styles.amounts}>
              {dept.actual2024}M → {dept.proposed2025}M
            </Text>
          </View>
          <View style={styles.voteOptions}>
            {['Sharp Cut >10%', 'Small Cut 0-10%', 'SAME', 'Small Rise 0-10%', 'Sharp Rise >10%'].map((option, i) => (
              <TouchableOpacity 
                key={i} 
                style={[
                  styles.voteOption,
                  departmentVotes[dept.name] === option && styles.selectedOption
                ]}
                onPress={() => handleDepartmentVote(dept.name, option as VoteOption)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );

  const renderRevenueBallot = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Your Revenue Ballot: Who Pays and How Much</Text>
      {revenueSources.map((source, index) => (
        <View key={index} style={styles.revenueRow}>
          <View style={styles.revenueInfo}>
            <Text style={styles.revenueName}>{source.name}</Text>
            <Text style={styles.trend}>{source.trend}</Text>
            <Text style={styles.amounts}>
              {source.actual2024}M → {source.proposed2025}M
            </Text>
          </View>
          <View style={styles.voteOptions}>
            {['Sharp Cut >10%', 'Small Cut 0-10%', 'SAME', 'Small Rise 0-10%', 'Sharp Rise >10%'].map((option, i) => (
              <TouchableOpacity 
                key={i} 
                style={[
                  styles.voteOption,
                  revenueVotes[source.name] === option && styles.selectedOption
                ]}
                onPress={() => handleRevenueVote(source.name, option as VoteOption)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );

  const renderComments = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Comments and Feedback</Text>
      <Text style={styles.commentPrompt}>Share your thoughts on the budget priorities…</Text>
      <TextInput
        style={styles.commentInput}
        multiline
        numberOfLines={4}
        value={comments}
        onChangeText={setComments}
        placeholder="Enter your comments here..."
      />
      <TouchableOpacity 
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {renderBudgetSummary()}
      {renderPolicyQuestions()}
      {renderSpendingBallot()}
      {renderRevenueBallot()}
      {renderComments()}
      {renderLearnMoreModal()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
  },
  summaryItem: {
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  questionContainer: {
    marginBottom: 16,
  },
  question: {
    fontSize: 16,
    marginBottom: 8,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 16,
  },
  radioOption: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  departmentRow: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  departmentInfo: {
    marginBottom: 8,
  },
  learnMore: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginBottom: 4,
  },
  departmentName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trend: {
    color: '#666',
  },
  amounts: {
    color: '#666',
  },
  voteOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  voteOption: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    minWidth: '18%',
  },
  optionText: {
    fontSize: 12,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalDetails: {
    fontSize: 14,
    lineHeight: 20,
  },
  commentPrompt: {
    fontSize: 16,
    marginBottom: 8,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  revenueRow: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  revenueInfo: {
    marginBottom: 8,
  },
  revenueName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
});

export default BudgetBallot; 