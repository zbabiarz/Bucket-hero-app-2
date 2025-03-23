import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, TextInput, Linking, Alert } from 'react-native';
import { X, Trash2, PenLine, Users as Users2, Sparkles, ExternalLink, CheckCircle, Clock, Tag, BookOpen, Video, FileText, PenTool as Tool, Users, Link } from 'lucide-react-native';
import { useBucketListStore, type BucketItem, type ResourceType, type Status } from '@/store/bucketList';
import Animated, { FadeInDown, FadeOutUp, FadeIn } from 'react-native-reanimated';

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  task: BucketItem | null;
  onDelete: () => void;
  onStatusChange: (status: Status) => void;
}

const ResourceTypeIcon = ({ type }: { type: ResourceType }) => {
  switch (type) {
    case 'guide':
      return <BookOpen size={16} color="#2563EB" />;
    case 'video':
      return <Video size={16} color="#2563EB" />;
    case 'article':
      return <FileText size={16} color="#2563EB" />;
    case 'tool':
      return <Tool size={16} color="#2563EB" />;
    case 'community':
      return <Users size={16} color="#2563EB" />;
    default:
      return <Link size={16} color="#2563EB" />;
  }
};

const StatusIndicator = ({ status }: { status: Status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
        return {
          container: styles.statusCompleted,
          icon: <CheckCircle size={16} color="#16A34A" />,
          text: 'Completed'
        };
      case 'in_progress':
        return {
          container: styles.statusInProgress,
          icon: <Clock size={16} color="#2563EB" />,
          text: 'In Progress'
        };
      default:
        return {
          container: styles.statusNotStarted,
          icon: <Clock size={16} color="#64748B" />,
          text: 'Not Started'
        };
    }
  };

  const statusStyle = getStatusStyles();

  return (
    <View style={[styles.statusIndicator, statusStyle.container]}>
      {statusStyle.icon}
      <Text style={[
        styles.statusText,
        status === 'completed' && styles.statusCompletedText,
        status === 'in_progress' && styles.statusInProgressText,
        status === 'not_started' && styles.statusNotStartedText,
      ]}>
        {statusStyle.text}
      </Text>
    </View>
  );
};

export default function TaskModal({ visible, onClose, task, onDelete, onStatusChange }: TaskModalProps) {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addNote, deleteNote } = useBucketListStore();

  const handleAddNote = useCallback(() => {
    if (task && noteContent.trim()) {
      addNote(task.id, noteContent.trim());
      setNoteContent('');
      setShowNoteInput(false);
    }
  }, [task, noteContent, addNote]);

  const handleDeleteNote = useCallback((noteId: number) => {
    if (!task) return;

    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          onPress: () => deleteNote(task.id, noteId),
          style: "destructive"
        }
      ]
    );
  }, [task, deleteNote]);

  const handleDelete = useCallback(() => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          onPress: onDelete,
          style: "destructive"
        }
      ]
    );
  }, [onDelete]);

  if (!task) return null;

  const categories = Array.from(new Set(task.resources.map(r => r.category)));
  const filteredResources = selectedCategory
    ? task.resources.filter(r => r.category === selectedCategory)
    : task.resources;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View 
          entering={FadeIn}
          style={styles.modalContent}
        >
          <View style={styles.modalHeader}>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>{task.title}</Text>
              <StatusIndicator status={task.status} />
            </View>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#64748b" />
            </Pressable>
          </View>

          <View style={styles.statusButtons}>
            <Pressable 
              style={[
                styles.statusButton,
                task.status === 'in_progress' && styles.activeStatusButton
              ]} 
              onPress={() => onStatusChange('in_progress')}
            >
              <Clock size={20} color={task.status === 'in_progress' ? "#fff" : "#2563EB"} />
              <Text style={[
                styles.statusButtonText,
                task.status === 'in_progress' && styles.activeStatusButtonText
              ]}>Mark In Progress</Text>
            </Pressable>
            
            <Pressable 
              style={[
                styles.statusButton,
                task.status === 'completed' && styles.activeStatusButton
              ]}
              onPress={() => onStatusChange('completed')}
            >
              <CheckCircle size={20} color={task.status === 'completed' ? "#fff" : "#2563EB"} />
              <Text style={[
                styles.statusButtonText,
                task.status === 'completed' && styles.activeStatusButtonText
              ]}>Mark Complete</Text>
            </Pressable>
          </View>

          <View style={styles.notesSection}>
            <View style={styles.sectionHeader}>
              <PenLine size={20} color="#2563EB" />
              <Text style={styles.sectionTitle}>Notes</Text>
            </View>
            
            {task.notes.map((note) => (
              <Animated.View 
                key={note.id}
                entering={FadeInDown}
                exiting={FadeOutUp}
                style={styles.noteItem}
              >
                <Text style={styles.noteContent}>{note.content}</Text>
                <Text style={styles.noteDate}>
                  {new Date(note.createdAt).toLocaleDateString()}
                </Text>
                <Pressable
                  style={styles.deleteNoteButton}
                  onPress={() => handleDeleteNote(note.id)}
                >
                  <Trash2 size={16} color="#ef4444" />
                </Pressable>
              </Animated.View>
            ))}

            {showNoteInput ? (
              <Animated.View 
                entering={FadeInDown}
                style={styles.noteInputContainer}
              >
                <TextInput
                  style={styles.noteInput}
                  placeholder="Enter your note..."
                  multiline
                  value={noteContent}
                  onChangeText={setNoteContent}
                  autoFocus
                />
                <View style={styles.noteInputButtons}>
                  <Pressable 
                    style={[styles.noteButton, styles.cancelButton]}
                    onPress={() => {
                      setShowNoteInput(false);
                      setNoteContent('');
                    }}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </Pressable>
                  <Pressable 
                    style={[styles.noteButton, styles.saveButton]}
                    onPress={handleAddNote}
                  >
                    <Text style={styles.saveButtonText}>Save Note</Text>
                  </Pressable>
                </View>
              </Animated.View>
            ) : (
              <Pressable 
                style={styles.addNoteButton}
                onPress={() => setShowNoteInput(true)}
              >
                <PenLine size={20} color="#2563EB" />
                <Text style={styles.addNoteText}>Add Note</Text>
              </Pressable>
            )}
          </View>

          <View style={styles.suggestionSection}>
            <View style={styles.sectionHeader}>
              <Sparkles size={20} color="#2563EB" />
              <Text style={styles.sectionTitle}>AI Suggestions</Text>
              <Text style={styles.sectionSubtitle}>
                Personalized recommendations to help you achieve your goal
              </Text>
            </View>

            <View style={styles.categoryFilter}>
              <Pressable
                style={[
                  styles.categoryChip,
                  !selectedCategory && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(null)}
              >
                <Text style={[
                  styles.categoryChipText,
                  !selectedCategory && styles.selectedCategoryText
                ]}>All</Text>
              </Pressable>
              {categories.map((category) => (
                <Pressable
                  key={category}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category && styles.selectedCategory
                  ]}
                  onPress={() => setSelectedCategory(
                    selectedCategory === category ? null : category
                  )}
                >
                  <Tag size={14} color={selectedCategory === category ? "#fff" : "#64748b"} />
                  <Text style={[
                    styles.categoryChipText,
                    selectedCategory === category && styles.selectedCategoryText
                  ]}>{category}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.resourcesGrid}>
              {filteredResources.map((resource) => (
                <Pressable
                  key={resource.id}
                  style={styles.resourceCard}
                  onPress={() => Linking.openURL(resource.url)}
                >
                  <View style={styles.resourceHeader}>
                    <ResourceTypeIcon type={resource.type} />
                    <Text style={styles.resourceCategory}>{resource.category}</Text>
                  </View>
                  <Text style={styles.resourceTitle}>{resource.title}</Text>
                  <Text style={styles.resourceDescription} numberOfLines={2}>
                    {resource.description}
                  </Text>
                  <View style={styles.resourceFooter}>
                    <Text style={styles.resourceLink}>Learn More</Text>
                    <ExternalLink size={16} color="#2563EB" />
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.actionButtons}>
            <Pressable 
              style={[styles.actionButton, styles.teamUpButton]}
              onPress={() => {}}
            >
              <Users2 size={24} color="#fff" />
              <Text style={styles.teamUpButtonText}>Team Up with Friend</Text>
            </Pressable>

            <Pressable 
              style={[styles.actionButton, styles.deleteButton]} 
              onPress={handleDelete}
            >
              <Trash2 size={20} color="#ef4444" />
              <Text style={styles.deleteText}>Delete Item</Text>
            </Pressable>
          </View>
        </Animated.View>
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
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  modalTitleContainer: {
    flex: 1,
    marginRight: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  closeButton: {
    padding: 8,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  statusCompleted: {
    backgroundColor: '#dcfce7',
  },
  statusInProgress: {
    backgroundColor: '#dbeafe',
  },
  statusNotStarted: {
    backgroundColor: '#f1f5f9',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  statusCompletedText: {
    color: '#16a34a',
  },
  statusInProgressText: {
    color: '#2563eb',
  },
  statusNotStartedText: {
    color: '#64748b',
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
  activeStatusButton: {
    backgroundColor: '#2563EB',
  },
  statusButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2563EB',
  },
  activeStatusButtonText: {
    color: '#fff',
  },
  notesSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginTop: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginTop: 4,
  },
  noteItem: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  noteContent: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  deleteNoteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
  },
  noteInputContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  noteInput: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  noteInputButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 12,
  },
  noteButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#f1f5f9',
  },
  saveButton: {
    backgroundColor: '#2563EB',
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#64748b',
  },
  saveButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
  addNoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    justifyContent: 'center',
  },
  addNoteText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2563EB',
  },
  suggestionSection: {
    marginBottom: 24,
  },
  categoryFilter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
  },
  selectedCategory: {
    backgroundColor: '#2563EB',
  },
  categoryChipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  resourceCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
  },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  resourceCategory: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#64748b',
  },
  resourceTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 8,
  },
  resourceDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginBottom: 12,
  },
  resourceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resourceLink: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2563EB',
  },
  actionButtons: {
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
  },
  teamUpButton: {
    backgroundColor: '#2563EB',
    transform: [{ scale: 1.02 }],
    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  teamUpButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
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