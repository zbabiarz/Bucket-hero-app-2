import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Heart, Share2 } from 'lucide-react-native';

export default function SuggestionsScreen() {
  const suggestions = [
    {
      id: 1,
      title: "Northern Lights in Iceland",
      description: "Witness the magical aurora borealis in the pristine skies of Iceland",
      imageUrl: "https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800&auto=format&fit=crop&q=60",
      likes: 2.4,
      category: "Travel",
    },
    {
      id: 2,
      title: "Learn Surfing in Bali",
      description: "Catch your first wave in the warm waters of Indonesia",
      imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&auto=format&fit=crop&q=60",
      likes: 1.8,
      category: "Adventure",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Suggestions</Text>
        <Text style={styles.subtitle}>Discover new bucket list ideas</Text>
      </View>

      {suggestions.map(item => (
        <View key={item.id} style={styles.card}>
          <Image 
            source={{ uri: item.imageUrl }}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            
            <View style={styles.cardFooter}>
              <Pressable style={styles.actionButton}>
                <Heart size={20} color="#64748b" />
                <Text style={styles.actionText}>{item.likes}k</Text>
              </Pressable>
              <Pressable style={styles.actionButton}>
                <Share2 size={20} color="#64748b" />
                <Text style={styles.actionText}>Share</Text>
              </Pressable>
            </View>
          </View>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  categoryBadge: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: {
    color: '#0284c7',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  cardDescription: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 16,
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    color: '#64748b',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});