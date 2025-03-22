import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Menu, Settings } from 'lucide-react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Pressable style={styles.iconButton}>
            <Menu size={20} color="#1e293b" />
          </Pressable>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Bucket</Text>
            <Text style={styles.heroText}>Hero</Text>
          </View>
          <Pressable style={styles.iconButton}>
            <Settings size={20} color="#1e293b" />
          </Pressable>
        </View>
        <Text style={styles.subtitle}>
          Explore, conquer, and celebrate life's greatest adventures
        </Text>
      </View>
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