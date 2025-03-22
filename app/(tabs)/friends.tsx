import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Search, UserPlus, MessageCircle } from 'lucide-react-native';

export default function FriendsScreen() {
  const friends = [
    {
      id: 1,
      name: "Sarah Chen",
      username: "@sarahc",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
      completedGoals: 15,
      sharedGoals: 3,
    },
    {
      id: 2,
      name: "Mike Johnson",
      username: "@mikej",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60",
      completedGoals: 12,
      sharedGoals: 2,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Friends</Text>
          <Text style={styles.subtitle}>Connect and share your journey</Text>
        </View>
        <Pressable style={styles.addButton}>
          <UserPlus color="#fff" size={24} />
        </Pressable>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#64748b" />
        <Text style={styles.searchPlaceholder}>Search friends...</Text>
      </View>

      {friends.map(friend => (
        <View key={friend.id} style={styles.friendCard}>
          <Image 
            source={{ uri: friend.avatar }}
            style={styles.avatar}
          />
          <View style={styles.friendInfo}>
            <Text style={styles.friendName}>{friend.name}</Text>
            <Text style={styles.username}>{friend.username}</Text>
            <View style={styles.statsRow}>
              <Text style={styles.statText}>
                <Text style={styles.statNumber}>{friend.completedGoals}</Text> goals completed
              </Text>
              <Text style={styles.statText}>
                <Text style={styles.statNumber}>{friend.sharedGoals}</Text> shared goals
              </Text>
            </View>
          </View>
          <Pressable style={styles.messageButton}>
            <MessageCircle size={20} color="#2563EB" />
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  addButton: {
    backgroundColor: '#2563EB',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchPlaceholder: {
    marginLeft: 12,
    color: '#94a3b8',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  friendInfo: {
    flex: 1,
    marginLeft: 16,
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    fontFamily: 'Inter-Bold',
  },
  username: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
    fontFamily: 'Inter-Regular',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 16,
  },
  statText: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
  },
  statNumber: {
    color: '#2563EB',
    fontWeight: 'bold',
    fontFamily: 'Inter-Bold',
  },
  messageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});