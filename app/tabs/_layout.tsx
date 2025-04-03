import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { HapticTab } from '../../components/HapticTab';
import TabBarBackground from '../../components/ui/TabBarBackground';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { BookmarkProvider } from '../context/BookmarkContext'; 

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <BookmarkProvider>

    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          height: 60, // ✅ Increased height for better spacing
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 10, // ✅ Smaller font
          marginTop: -2, // ✅ Adjust text position
        },
        tabBarLabelPosition: "below-icon", // ✅ Ensures label is below the icon
        // animationTypeForReplace: 'push',
      }}
      >
      <Tabs.Screen
        name="job"
        options={{
          title: 'Job',
          tabBarLabel: 'Job',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
            name="briefcase"
            size={22} // ✅ Reduced size
            color={focused ? '#007AFF' : '#8E8E93'}
            />
          ),
        }}
        />
      <Tabs.Screen
        name="Bookmarks"
        options={{
          title: 'Bookmarks',
          tabBarLabel: 'Bookmarks',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
            name="bookmark"
            size={22} // ✅ Reduced size
            color={focused ? '#007AFF' : '#8E8E93'}
            />
          ),
        }}
        />
    </Tabs>
  </BookmarkProvider>
  );
}
