import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { Plus, Check } from 'lucide-react-native';
import TaskModal from '@/components/TaskModal';
import CompletionModal from '@/components/CompletionModal';
import Header from '@/components/Header';

export default function MyListScreen() {
  const [selectedTask, setSelectedTask] = useState<{
    id: number;
    title: string;
    difficulty: string;
    completed: boolean;
  } | null>(null);
  
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Visit the Northern Lights",
      difficulty: "Medium",
      completed: false,
      photoUrl: null,
    },
    {
      id: 2,
      title: "Learn to play the piano",
      difficulty: "Low",
      completed: false,
      photoUrl: null,
    },
    {
      id: 3,
      title: "Run a marathon",
      difficulty: "High",
      completed: false,
      photoUrl: null,
    }
  ]);

  const handleAddItem = () => {
    if (newItem.trim()) {
      const newItemObj = {
        id: items.length + 1,
        title: newItem.trim(),
        difficulty: "Medium",
        completed: false,
        photoUrl: null,
      };
      setItems([...items, newItemObj]);
      setNewItem('');
    }
  };

  const handleDeleteItem = () => {
    if (selectedTask) {
      setItems(items.filter(item => item.id !== selectedTask.id));
      setSelectedTask(null);
    }
  };

  const handleStatusChange = (status: 'in_progress' | 'completed') => {
    if (selectedTask) {
      if (status === 'completed') {
        setShowCompletionModal(true);
      } else {
        updateItemStatus(selectedTask.id, false);
      }
    }
  };

  const updateItemStatus = (itemId: number, completed: boolean, photoUrl?: string) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, completed, photoUrl: photoUrl || item.photoUrl }
        : item
    ));
    setSelectedTask(null);
    setShowCompletionModal(false);
  };

  const handleComplete = (photoUrl: string) => {
    if (selectedTask) {
      updateItemStatus(selectedTask.id, true, photoUrl);
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
            style={[styles.itemCard, item.completed && styles.completedCard]}
            onPress={() => setSelectedTask(item)}
          >
            <View style={[styles.checkbox, item.completed && styles.checkedBox]}>
              {item.completed && <Check size={16} color="#fff" />}
            </View>
            <Text style={[styles.itemTitle, item.completed && styles.completedTitle]}>
              {item.title}
            </Text>
            <View style={[
              styles.difficultyBadge,
              item.difficulty === 'High' ? styles.highDifficulty :
              item.difficulty === 'Medium' ? styles.mediumDifficulty :
              styles.lowDifficulty
            ]}>
              <Text style={[
                styles.difficultyText,
                item.difficulty === 'High' ? styles.highDifficultyText :
                item.difficulty === 'Medium' ? styles.mediumDifficultyText :
                styles.lowDifficultyText
              ]}>{item.difficulty}</Text>
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