import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#7F77DD',
        tabBarInactiveTintColor: '#4a4468',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#0e0c1a',
          borderTopColor: '#1f1c35',
          borderTopWidth: 0.5,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tarot"
        options={{
          title: 'Tarot',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="sparkles" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}