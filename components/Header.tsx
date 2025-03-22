import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Menu, Settings } from 'lucide-react-native';
import SettingsMenu from './SettingsMenu';
import SideMenu from './SideMenu';

export default function Header() {
  const [showSettings, setShowSettings] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);

  // Mock user data - in a real app, this would come from your auth context or state management
  const mockUser = {
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60',
    completedItems: 12,
    bucketBucks: 450,
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Pressable 
            style={styles.iconButton}
            onPress={() => setShowSideMenu(true)}
          >
            <Menu size={20} color="#1e293b" />
          </Pressable>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Bucket</Text>
            <Text style={styles.heroText}>Hero</Text>
          </View>
          <Pressable 
            style={styles.iconButton}
            onPress={() => setShowSettings(true)}
          >
            <Settings size={20} color="#1e293b" />
          </Pressable>
        </View>
        <Text style={styles.subtitle}>
          Explore, conquer, and celebrate life's greatest adventures
        </Text>
      </View>

      <SettingsMenu 
        visible={showSettings}
        onClose={() => setShowSettings(false)}
      />

      <SideMenu
        visible={showSideMenu}
        onClose={() => setShowSideMenu(false)}
        user={mockUser}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 48,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  content: {
    paddingHorizontal: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#2563EB',
    letterSpacing: -1,
  },
  heroText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#7C3AED',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
  },
});