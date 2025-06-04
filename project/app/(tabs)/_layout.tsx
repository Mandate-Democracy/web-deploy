import React from 'react';
import { Tabs } from 'expo-router';
import { Chrome as Home, User, Vote as VoteIcon } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import TabBarLabel from '@/components/TabBarLabel';
import { useLocalSearchParams } from 'expo-router';

export default function TabLayout() {
  const { voting } = useLocalSearchParams();
  const isVoting = voting === 'true';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: COLORS.lightGray,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: ({ focused }) => (
            <TabBarLabel focused={focused} title="Home" />
          ),
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} />
          ),
          href: isVoting ? null : undefined,
        }}
      />
      <Tabs.Screen
        name="votes"
        options={{
          title: 'Votes',
          tabBarLabel: ({ focused }) => (
            <TabBarLabel focused={focused} title="Votes" />
          ),
          tabBarIcon: ({ color, size }) => (
            <VoteIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: ({ focused }) => (
            <TabBarLabel focused={focused} title="Profile" />
          ),
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
          href: isVoting ? null : undefined,
        }}
      />
    </Tabs>
  );
}