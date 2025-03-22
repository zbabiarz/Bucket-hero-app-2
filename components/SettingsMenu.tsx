import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { LogOut, Settings as SettingsIcon, User } from 'lucide-react-native';
import { useAuthStore } from '@/store/auth';
import { router } from 'expo-router';

interface SettingsMenuProps {
  visible: boolean;
  onClose: () => void;
}

export default function SettingsMenu({ visible, onClose }: SettingsMenuProps) {
  const { user, signOut } = useAuthStore();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleLogin = () => {
    router.replace('/login');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.menuContainer}>
          <View style={styles.menu}>
            {user ? (
              <>
                <View style={styles.userInfo}>
                  <View style={styles.avatarPlaceholder}>
                    <User size={24} color="#64748b" />
                  </View>
                  <View>
                    <Text style={styles.username}>{user.username}</Text>
                    <View style={styles.statsContainer}>
                      <Text style={styles.stats}>🪙 {user.bucketBucks}</Text>
                      <Text style={styles.stats}>🔥 {user.streakDays} days</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.divider} />
              </>
            ) : null}
            
            <Pressable style={styles.menuItem}>
              <SettingsIcon size={20} color="#1e293b" />
              <Text style={styles.menuText}>Settings</Text>
            </Pressable>

            {user ? (
              <Pressable style={[styles.menuItem, styles.logoutButton]} onPress={handleLogout}>
                <LogOut size={20} color="#ef4444" />
                <Text style={styles.logoutText}>Log Out</Text>
              </Pressable>
            ) : (
              <Pressable style={[styles.menuItem, styles.loginButton]} onPress={handleLogin}>
                <LogOut size={20} color="#2563EB" />
                <Text style={styles.loginText}>Log In</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  menuContainer: {
    position: 'absolute',
    top: 100,
    right: 20,
    zIndex: 1000,
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 8,
    minWidth: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  stats: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 8,
  },
  menuText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
  },
  loginButton: {
    backgroundColor: '#eff6ff',
  },
  loginText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2563EB',
  },
  logoutButton: {
    backgroundColor: '#fef2f2',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ef4444',
  },
});