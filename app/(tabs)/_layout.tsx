import { Tabs } from 'expo-router';
import { List, Sparkles, ArrowUpDown, Users as Users2 } from 'lucide-react-native';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E5E5',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarLabelStyle: {
          fontFamily: 'Inter-Regular',
          fontSize: 12,
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'My List',
          tabBarIcon: ({ color, size }) => <List size={size} color={color} strokeWidth={1.5} />,
        }}
      />
      <Tabs.Screen
        name="suggestions"
        options={{
          title: 'Suggestions',
          tabBarIcon: ({ color, size }) => <Sparkles size={size} color={color} strokeWidth={1.5} />,
        }}
      />
      <Tabs.Screen
        name="prioritize"
        options={{
          title: 'Prioritize',
          tabBarIcon: ({ color, size }) => <ArrowUpDown size={size} color={color} strokeWidth={1.5} />,
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color, size }) => <Users2 size={size} color={color} strokeWidth={1.5} />,
        }}
      />
    </Tabs>
  );
}