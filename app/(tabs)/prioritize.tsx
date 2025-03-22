import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { ArrowUp, ArrowDown, Calendar, Clock } from 'lucide-react-native';

export default function PrioritizeScreen() {
  const tasks = [
    {
      id: 1,
      title: "Learn Spanish",
      priority: "High",
      deadline: "March 2025",
      timeRequired: "6 months",
    },
    {
      id: 2,
      title: "Run a Marathon",
      priority: "Medium",
      deadline: "September 2024",
      timeRequired: "4 months",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Prioritize</Text>
        <Text style={styles.subtitle}>Organize your bucket list items</Text>
      </View>

      <View style={styles.filterContainer}>
        <Pressable style={[styles.filterButton, styles.activeFilter]}>
          <Text style={styles.activeFilterText}>All</Text>
        </Pressable>
        <Pressable style={styles.filterButton}>
          <Text style={styles.filterText}>High Priority</Text>
        </Pressable>
        <Pressable style={styles.filterButton}>
          <Text style={styles.filterText}>Medium</Text>
        </Pressable>
      </View>

      {tasks.map(task => (
        <View key={task.id} style={styles.taskCard}>
          <View style={styles.taskHeader}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <View style={[
              styles.priorityBadge,
              task.priority === 'High' ? styles.highPriority : styles.mediumPriority
            ]}>
              <Text style={[
                styles.priorityText,
                task.priority === 'High' ? styles.highPriorityText : styles.mediumPriorityText
              ]}>{task.priority}</Text>
            </View>
          </View>

          <View style={styles.taskDetails}>
            <View style={styles.detailItem}>
              <Calendar size={16} color="#64748b" />
              <Text style={styles.detailText}>{task.deadline}</Text>
            </View>
            <View style={styles.detailItem}>
              <Clock size={16} color="#64748b" />
              <Text style={styles.detailText}>{task.timeRequired}</Text>
            </View>
          </View>

          <View style={styles.taskActions}>
            <Pressable style={styles.actionButton}>
              <ArrowUp size={20} color="#2563EB" />
              <Text style={styles.actionText}>Move Up</Text>
            </Pressable>
            <Pressable style={styles.actionButton}>
              <ArrowDown size={20} color="#2563EB" />
              <Text style={styles.actionText}>Move Down</Text>
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
    fontSize: 14,
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
  },
  actionText: {
    color: '#2563EB',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});