import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Animated, Platform, StatusBar, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Trophy, Coins, FileEdit as Edit3, Users, ListTodo, CheckSquare, Calendar, Settings, Activity, Bell, MessageSquare, HelpCircle, FileQuestion, MessageCircle, X } from 'lucide-react-native';

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
  user: {
    name: string;
    avatar?: string;
    completedItems: number;
    bucketBucks: number;
  };
}

export default function SideMenu({ visible, onClose, user }: SideMenuProps) {
  const router = useRouter();
  const [menuAnimation] = useState(new Animated.Value(-Dimensions.get('window').width));
  const [overlayAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(menuAnimation, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.timing(overlayAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(menuAnimation, {
          toValue: -Dimensions.get('window').width,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.timing(overlayAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, menuAnimation, overlayAnimation]);

  const navigateTo = (route: string) => {
    onClose();
    router.push(route);
  };

  const MenuSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const MenuItem = ({ icon, label, onPress }: { icon: React.ReactNode; label: string; onPress: () => void }) => (
    <Pressable 
      style={({ pressed }) => [
        styles.menuItem,
        pressed && styles.menuItemPressed
      ]} 
      onPress={onPress}
    >
      {icon}
      <Text style={styles.menuItemText}>{label}</Text>
    </Pressable>
  );

  if (!visible) return null;

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <Animated.View 
        style={[
          StyleSheet.absoluteFill,
          styles.overlay,
          { opacity: overlayAnimation }
        ]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>
      
      <Animated.View
        style={[
          styles.menuWrapper,
          {
            transform: [{ translateX: menuAnimation }],
          },
        ]}>
        <View style={styles.header}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#64748B" />
          </Pressable>
        </View>
        
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.achievements}>
            <View style={styles.achievementItem}>
              <Trophy size={24} color="#F59E0B" />
              <Text style={styles.achievementValue}>{user.completedItems}</Text>
            </View>
            <View style={styles.achievementItem}>
              <Coins size={24} color="#F59E0B" />
              <Text style={styles.achievementValue}>{user.bucketBucks}</Text>
            </View>
          </View>

          <Pressable 
            style={({ pressed }) => [
              styles.profile,
              pressed && styles.profilePressed
            ]} 
            onPress={() => navigateTo('/profile')}
          >
            <Image
              source={{
                uri: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60',
              }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Edit3 size={16} color="#64748B" />
            </View>
          </Pressable>

          <MenuSection title="Core Navigation">
            <MenuItem
              icon={<Users size={20} color="#64748B" />}
              label="Friends List"
              onPress={() => navigateTo('/friends')}
            />
            <MenuItem
              icon={<ListTodo size={20} color="#64748B" />}
              label="My Bucket List"
              onPress={() => navigateTo('/')}
            />
            <MenuItem
              icon={<CheckSquare size={20} color="#64748B" />}
              label="Completed Activities"
              onPress={() => navigateTo('/completed')}
            />
            <MenuItem
              icon={<Calendar size={20} color="#64748B" />}
              label="Upcoming Events"
              onPress={() => navigateTo('/events')}
            />
            <MenuItem
              icon={<Settings size={20} color="#64748B" />}
              label="Settings"
              onPress={() => navigateTo('/settings')}
            />
          </MenuSection>

          <MenuSection title="Social">
            <MenuItem
              icon={<Activity size={20} color="#64748B" />}
              label="Activity Feed"
              onPress={() => navigateTo('/feed')}
            />
            <MenuItem
              icon={<Bell size={20} color="#64748B" />}
              label="Notifications"
              onPress={() => navigateTo('/notifications')}
            />
            <MenuItem
              icon={<MessageSquare size={20} color="#64748B" />}
              label="Messages"
              onPress={() => navigateTo('/messages')}
            />
          </MenuSection>

          <MenuSection title="Support">
            <MenuItem
              icon={<HelpCircle size={20} color="#64748B" />}
              label="Help Center"
              onPress={() => navigateTo('/help')}
            />
            <MenuItem
              icon={<FileQuestion size={20} color="#64748B" />}
              label="FAQ"
              onPress={() => navigateTo('/faq')}
            />
            <MenuItem
              icon={<MessageCircle size={20} color="#64748B" />}
              label="Contact Support"
              onPress={() => navigateTo('/support')}
            />
          </MenuSection>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    elevation: 9999,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  menuWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    zIndex: 10000,
    elevation: 10000,
    ...Platform.select({
      web: {
        boxShadow: '4px 0 25px rgba(0, 0, 0, 0.15)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 4,
          height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 25,
        elevation: 25,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    paddingTop: Platform.OS === 'web' ? 16 : StatusBar.currentHeight,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  achievements: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#F8FAFC',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  achievementValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
  },
  profile: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  profilePressed: {
    backgroundColor: '#F8FAFC',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 12,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  section: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#64748B',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  menuItemPressed: {
    backgroundColor: '#F1F5F9',
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
  },
});