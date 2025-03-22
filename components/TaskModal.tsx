import { View, Text, StyleSheet, Pressable, Modal, Linking } from 'react-native';
import { X, Trash2, PenLine, Users, Sparkles, ExternalLink, CheckCircle, Clock } from 'lucide-react-native';

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  task: {
    id: number;
    title: string;
    difficulty: string;
    completed: boolean;
  } | null;
  onDelete: () => void;
  onStatusChange: (status: 'in_progress' | 'completed') => void;
}

const getSuggestions = (title: string) => {
  const suggestions = {
    "Visit the Northern Lights": {
      tips: [
        "Best viewing months are September to March",
        "Iceland, Norway, and Finland are top destinations",
        "Clear, dark skies are essential for viewing"
      ],
      links: [
        {
          title: "Guide to Aurora Viewing",
          url: "https://www.visiticeland.com/article/the-northern-lights/"
        },
        {
          title: "Book Northern Lights Tours",
          url: "https://guidetoiceland.is/book-holiday-trips/northern-lights-tours"
        }
      ]
    },
    "Learn to play the piano": {
      tips: [
        "Start with basic music theory",
        "Practice regularly, even if just for 15 minutes",
        "Focus on proper finger positioning"
      ],
      links: [
        {
          title: "Free Piano Lessons",
          url: "https://www.flowkey.com/en"
        },
        {
          title: "Piano Basics Course",
          url: "https://www.musictheory.net/lessons"
        }
      ]
    },
    "Run a marathon": {
      tips: [
        "Follow a structured training plan",
        "Build up distance gradually",
        "Focus on proper nutrition and hydration"
      ],
      links: [
        {
          title: "Marathon Training Guide",
          url: "https://www.runnersworld.com/training/a20781612/marathon-training-plans/"
        },
        {
          title: "Find Local Marathons",
          url: "https://www.runningintheusa.com/marathon"
        }
      ]
    }
  };
  
  return suggestions[title as keyof typeof suggestions] || {
    tips: [
      "Break down your goal into smaller steps",
      "Set realistic timelines",
      "Track your progress regularly"
    ],
    links: []
  };
};

export default function TaskModal({ visible, onClose, task, onDelete, onStatusChange }: TaskModalProps) {
  if (!task) return null;

  const suggestions = getSuggestions(task.title);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{task.title}</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#64748b" />
            </Pressable>
          </View>

          <View style={styles.statusButtons}>
            <Pressable 
              style={styles.statusButton} 
              onPress={() => onStatusChange('in_progress')}
            >
              <Clock size={20} color="#2563EB" />
              <Text style={styles.statusText}>Mark In Progress</Text>
            </Pressable>
            
            <Pressable 
              style={styles.statusButton}
              onPress={() => onStatusChange('completed')}
            >
              <CheckCircle size={20} color="#2563EB" />
              <Text style={styles.statusText}>Mark Complete</Text>
            </Pressable>
          </View>

          <View style={styles.suggestionSection}>
            <View style={styles.sectionHeader}>
              <Sparkles size={20} color="#2563EB" />
              <Text style={styles.sectionTitle}>AI Suggestions</Text>
            </View>
            <View style={styles.suggestionCard}>
              <Text style={styles.suggestionText}>
                Here's how you can achieve your goal:
              </Text>
              <View style={styles.suggestionList}>
                {suggestions.tips.map((tip, index) => (
                  <Text key={index} style={styles.suggestionItem}>• {tip}</Text>
                ))}
              </View>
              
              {suggestions.links.length > 0 && (
                <View style={styles.linksContainer}>
                  <Text style={styles.linksTitle}>Helpful Resources:</Text>
                  {suggestions.links.map((link, index) => (
                    <Pressable
                      key={index}
                      style={styles.linkButton}
                      onPress={() => Linking.openURL(link.url)}
                    >
                      <Text style={styles.linkText}>{link.title}</Text>
                      <ExternalLink size={16} color="#2563EB" />
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          </View>

          <View style={styles.actionButtons}>
            <Pressable style={styles.actionButton} onPress={() => {}}>
              <PenLine size={20} color="#2563EB" />
              <Text style={styles.actionText}>Add Notes</Text>
            </Pressable>
            
            <Pressable style={styles.actionButton} onPress={() => {}}>
              <Users size={20} color="#2563EB" />
              <Text style={styles.actionText}>Invite Friend</Text>
            </Pressable>

            <Pressable style={[styles.actionButton, styles.deleteButton]} onPress={onDelete}>
              <Trash2 size={20} color="#ef4444" />
              <Text style={styles.deleteText}>Delete Item</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
  },
  closeButton: {
    padding: 8,
  },
  statusButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statusButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2563EB',
  },
  suggestionSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  suggestionCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
  },
  suggestionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
    marginBottom: 12,
  },
  suggestionList: {
    gap: 8,
    marginBottom: 16,
  },
  suggestionItem: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  linksContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 16,
  },
  linksTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 8,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  linkText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#2563EB',
  },
  actionButtons: {
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },
  actionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2563EB',
  },
  deleteButton: {
    backgroundColor: '#fef2f2',
  },
  deleteText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ef4444',
  },
});