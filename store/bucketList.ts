import { create } from 'zustand';

export type Priority = 'High' | 'Medium' | 'Low';

export interface BucketItem {
  id: number;
  title: string;
  priority: Priority;
  deadline: string;
  timeRequired: string;
  completed: boolean;
  description?: string;
}

interface BucketListState {
  items: BucketItem[];
  addItem: (item: Omit<BucketItem, 'id'>) => void;
  updateItem: (id: number, updates: Partial<BucketItem>) => void;
  deleteItem: (id: number) => void;
  moveItem: (id: number, direction: 'up' | 'down') => void;
}

export const useBucketListStore = create<BucketListState>((set) => ({
  items: [
    {
      id: 1,
      title: "Visit the Northern Lights",
      priority: "Medium",
      deadline: "March 2025",
      timeRequired: "1 week",
      completed: false,
      description: "Experience the aurora borealis in Iceland",
    },
    {
      id: 2,
      title: "Learn to play the piano",
      priority: "Low",
      deadline: "December 2024",
      timeRequired: "12 months",
      completed: false,
      description: "Master basic piano skills and learn favorite songs",
    },
    {
      id: 3,
      title: "Run a marathon",
      priority: "High",
      deadline: "October 2024",
      timeRequired: "6 months",
      completed: false,
      description: "Complete first full marathon",
    }
  ],
  addItem: (item) => set((state) => ({
    items: [...state.items, { ...item, id: Math.max(...state.items.map(i => i.id)) + 1 }]
  })),
  updateItem: (id, updates) => set((state) => ({
    items: state.items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    )
  })),
  deleteItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  moveItem: (id, direction) => set((state) => {
    const index = state.items.findIndex(item => item.id === id);
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === state.items.length - 1)
    ) {
      return state;
    }

    const newItems = [...state.items];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]];
    
    return { items: newItems };
  }),
}));