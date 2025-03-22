import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { ArrowUp, ArrowDown, Calendar, Clock } from 'lucide-react-native';
import { useBucketListStore, type Priority } from '@/store/bucketList';

type Filter = 'All' | Priority;

export default function PrioritizeScreen() {
  const [filter, setFilter] = useState<Filter>('All');
  const { items, moveItem } = useBucketListStore();

  const filteredItems = items.filter(item => 
    filter === 'All' ? true : item.priority === filter
  );

  const getPriorityStyles = (priority: Priority) => {
    switch (priority) {
      case 'High':
        return {
          badge: styles.highPriority,
          text: styles.highPriorityText
        };
      case 'Medium':
        return {
          badge: styles.mediumPriority,
          text: styles.mediumPriorityText
        };
      case 'Low':
        return {
          badge: styles.lowPriority,
          text: styles.lowPriorityText
        };
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Prioritize</Text>
        <Text style={styles.subtitle}>Organize your bucket list items</Text>
      </View>

      <View style={styles.filterContainer}>
        {(['All', 'High', 'Medium', 'Low'] as const).map((filterOption) => (
          <Pressable 
            key={filterOption}
            style={[
              styles.filterButton,
              filter === filterOption && styles.activeFilter
            ]}
            onPress={() => setFilter(filterOption)}
          >
            <Text style={[
              styles.filterText,
              filter === filterOption && styles.activeFilterText
            ]}>
              {filterOption}
            </Text>
          </Pressable>
        ))}
      </View>

      {filteredItems.map((item, index) => (
        <View key={item.id} style={styles.taskCard}>
          <View style={styles.taskHeader}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <View style={[
              styles.priorityBadge,
              getPriorityStyles(item.priority).badge
            ]}>
              <Text style={[
                styles.priorityText,
                getPriorityStyles(item.priority).text
              ]}>{item.priority}</Text>
            </View>
          </View>

          <View style={styles.taskDetails}>
            <View style={styles.detailItem}>
              <Calendar size={16} color="#64748b" />
              <Text style={styles.detailText}>{item.deadline}</Text>
            </View>
            <View style={styles.detailItem}>
              <Clock size={16} color="#64748b" />
              <Text style={styles.detailText}>{item.timeRequired}</Text>
            </View>
          </View>

          <View style={styles.taskActions}>
            <Pressable 
              style={[
                styles.actionButton,
                index === 0 && styles.disabledButton
              ]}
              onPress={() => moveItem(item.id, 'up')}
              disabled={index === 0}
            >
              <ArrowUp size={20} color={index === 0 ? "#94a3b8" : "#2563EB"} />
              <Text style={[
                styles.actionText,
                index === 0 && styles.disabledText
              ]}>Move Up</Text>
            </Pressable>
            <Pressable 
              style={[
                styles.actionButton,
                index === filteredItems.length - 1 && styles.disabledButton
              ]}
              onPress={() => moveItem(item.id, 'down')}
              disabled={index === filteredItems.length - 1}
            >
              <ArrowDown size={20} color={index === filteredItems.length - 1 ? "#94a3b8" : "#2563EB"} />
              <Text style={[
                styles.actionText,
                index === filteredItems.length - 1 && styles.disabledText
              ]}>Move Down</Text>
            </Pressable>
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
  filterContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  activeFilter: {
    backgroundColor: '#2563EB',
  },
  filterText: {
    color: '#64748b',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  activeFilterText: {
    color: '#fff',
    fontFamily: 'Inter-Regular',
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
    fontFamily: 'Inter-Bold',
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  highPriority: {
    backgroundColor: '#fee2e2',
  },
  mediumPriority: {
    backgroundColor: '#fef3c7',
  },
  lowPriority: {
    backgroundColor: '#dcfce7',
  },
  priorityText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  highPriorityText: {
    color: '#dc2626',
  },
  mediumPriorityText: {
    color: '#d97706',
  },
  lowPriorityText: {
    color: '#16a34a',
  },
  taskDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: '#64748b',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  taskActions: {
    flexDirection: 'row',
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  actionText: {
    color: '#2563EB',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  disabledText: {
    color: '#94a3b8',
  },
});