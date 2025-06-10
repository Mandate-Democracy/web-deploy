import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/Colors';
import { Video as LucideIcon } from 'lucide-react-native';

interface VoteCardProps {
  title: string;
  Icon: typeof LucideIcon;
  questions: number;
  progress: number;
  onPress: () => void;
}

export default function VoteCard({ title, Icon, questions, progress, onPress }: VoteCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon size={24} color={COLORS.darkBlue} strokeWidth={1.5} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.questions}>{questions} Questions</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressCircle}>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(13, 35, 64, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: COLORS.darkText,
    marginBottom: 4,
  },
  questions: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray,
  },
  progressContainer: {
    marginLeft: 12,
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(13, 35, 64, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: COLORS.darkText,
  },
});