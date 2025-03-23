import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { Plus, Check, Clock } from 'lucide-react-native';
import TaskModal from '@/components/TaskModal';
import CompletionModal from '@/components/CompletionModal';
import Header from '@/components/Header';
import { useBucketListStore, type BucketItem } from '@/store/bucketList';

export default function MyListScreen() {
  const { items, addItem, updateItem, deleteItem } = useBucketListStore();
  const [selectedTask, setSelectedTask] = useState<BucketItem | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim()) {
      addItem({
        title: newItem.trim(),
        priority: "Medium",
        deadline: "Not set",
        timeRequired: "Not set",
        completed: false,
      });
      setNewItem('');
    }
  };

  const handleDeleteItem = () => {
    if (selectedTask) {
      deleteItem(selectedTask.id);
      setSelectedTask(null);
    }
  };

  const handleStatusChange = (status: 'in_progress' | 'completed') => {
    if (selectedTask) {
      if (status === 'completed') {
        setShowCompletionModal(true);
      } else {
        updateItem(selectedTask.id, { status: 'in_progress', completed: false });
        setSelectedTask(null);
      }
    }
  };

  const handleComplete = (photoUrl: string) => {
    if (selectedTask) {
      updateItem(selectedTask.id, {
        status: 'completed',
        completed: true,
        completionPhotoUrl: photoUrl,
      });
      setSelectedTask(null);
      setShowCompletionModal(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new bucket list item..."
          placeholderTextColor="#94a3b8"
          value={newItem}
          onChangeText={setNewItem}
          onSubmitEditing={handleAddItem}
        />
        <Pressable style={styles.addButton} onPress={handleAddItem}>
          <Plus color="#fff" size={24} />
        </Pressable>
      </View>

      <View style={styles.itemList}>
        {items.map(item => (
          <Pressable
            key={item.id}
            style={[
              styles.itemCard,
              item.status === 'completed' && styles.completedCard,
              item.status === 'in_progress' && styles.inProgressCard
            ]}
            onPress={() => setSelectedTask(item)}
          >
            <View style={[
              styles.checkbox,
              item.status === 'completed' && styles.checkedBox,
              item.status === 'in_progress' && styles.inProgressBox
            ]}>
              {item.status === 'completed' && <Check size={16} color="#fff" />}
              {item.status === 'in_progress' && <Clock size={16} color="#fff" />}
            </View>
            <Text style={[
              styles.itemTitle,
              item.status === 'completed' && styles.completedTitle,
              item.status === 'in_progress' && styles.inProgressTitle
            ]}>
              {item.title}
            </Text>
            <View style={[
              styles.difficultyBadge,
              item.priority === 'High' ? styles.highDifficulty :
              item.priority === 'Medium' ? styles.mediumDifficulty :
              styles.lowDifficulty
            ]}>
              <Text style={[
                styles.difficultyText,
                item.priority === 'High' ? styles.highDifficultyText :
                item.priority === 'Medium' ? styles.mediumDifficultyText :
                styles.lowDifficultyText
              ]}>{item.priority}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <Text style={styles.footer}>
        Bucket Hero - Achieve your dreams, one adventure at a time
      </Text>

      <TaskModal
        visible={!!selectedTask && !showCompletionModal}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
        onDelete={handleDeleteItem}
        onStatusChange={handleStatusChange}
      />

      <CompletionModal
        visible={showCompletionModal}
        onClose={() => {
          setShowCompletionModal(false);
          setSelectedTask(null);
        }}
        onComplete={handleComplete}
        itemTitle={selectedTask?.title || ''}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemList: {
    padding: 20,
    gap: 12,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  completedCard: {
    backgroundColor: '#f8fafc',
    borderColor: '#cbd5e1',
  },
  inProgressCard: {
    backgroundColor: '#f0f9ff',
    borderColor: '#7dd3fc',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  inProgressBox: {
    backgroundColor: '#0ea5e9',
    borderColor: '#0ea5e9',
  },
  itemTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
  },
  completedTitle: {
    color: '#64748b',
    textDecorationLine: 'line-through',
  },
  inProgressTitle: {
    color: '#0369a1',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  lowDifficulty: {
    backgroundColor: '#dcfce7',
  },
  mediumDifficulty: {
    backgroundColor: '#fef3c7',
  },
  highDifficulty: {
    backgroundColor: '#fee2e2',
  },
  difficultyText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  lowDifficultyText: {
    color: '#16a34a',
  },
  mediumDifficultyText: {
    color: '#d97706',
  },
  highDifficultyText: {
    color: '#dc2626',
  },
  footer: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
    marginVertical: 24,
  },
});