import { Tabs } from 'expo-router';
import { List, Sparkles, ArrowUpDown, Users } from 'lucide-react-native';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#1A1B1E' : '#FFFFFF',
          borderTopColor: isDark ? '#2C2D31' : '#E5E5E5',
        },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: isDark ? '#A1A1AA' : '#71717A',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'My List',
          tabBarIcon: ({ color, size }) => <List size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="suggestions"
        options={{
          title: 'Suggestions',
          tabBarIcon: ({ color, size }) => <Sparkles size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="prioritize"
        options={{
          title: 'Prioritize',
          tabBarIcon: ({ color, size }) => <ArrowUpDown size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}