import { create } from 'zustand';

export type Priority = 'High' | 'Medium' | 'Low';
export type ResourceType = 'guide' | 'video' | 'article' | 'tool' | 'community';
export type Status = 'not_started' | 'in_progress' | 'completed';

export interface Note {
  id: number;
  content: string;
  createdAt: string;
}

export interface Resource {
  id: number;
  title: string;
  description: string;
  url: string;
  type: ResourceType;
  category: string;
}

export interface BucketItem {
  id: number;
  title: string;
  priority: Priority;
  deadline: string;
  timeRequired: string;
  status: Status;
  completed: boolean;
  description?: string;
  notes: Note[];
  resources: Resource[];
  completionPhotoUrl?: string;
  lastUpdated: string;
}

interface BucketListState {
  items: BucketItem[];
  addItem: (item: Omit<BucketItem, 'id' | 'notes' | 'resources' | 'status' | 'lastUpdated'>) => void;
  updateItem: (id: number, updates: Partial<BucketItem>) => void;
  deleteItem: (id: number) => void;
  moveItem: (id: number, direction: 'up' | 'down') => void;
  addNote: (itemId: number, content: string) => void;
  deleteNote: (itemId: number, noteId: number) => void;
  updateStatus: (id: number, status: Status) => void;
}

// AI suggestion generator based on item title
const generateSuggestions = (title: string): Resource[] => {
  const suggestions: { [key: string]: Resource[] } = {
    travel: [
      {
        id: 1,
        title: "Travel Planning Guide",
        description: "Essential tips for planning your journey",
        url: "https://www.lonelyplanet.com/articles/planning-your-first-trip",
        type: "guide",
        category: "Planning"
      },
      {
        id: 2,
        title: "Budget Travel Tips",
        description: "How to make your travel dreams affordable",
        url: "https://www.nomadicmatt.com/travel-tips/",
        type: "article",
        category: "Finance"
      }
    ],
    fitness: [
      {
        id: 1,
        title: "Beginner's Workout Plan",
        description: "Start your fitness journey the right way",
        url: "https://www.bodybuilding.com/content/beginner-workout-guide.html",
        type: "guide",
        category: "Training"
      },
      {
        id: 2,
        title: "Nutrition Basics",
        description: "Essential nutrition tips for fitness goals",
        url: "https://www.healthline.com/nutrition/healthy-eating-basics",
        type: "article",
        category: "Nutrition"
      }
    ],
    learn: [
      {
        id: 1,
        title: "Learning Techniques",
        description: "Effective methods for learning new skills",
        url: "https://www.coursera.org/articles/learning-strategies",
        type: "guide",
        category: "Education"
      },
      {
        id: 2,
        title: "Study Resources",
        description: "Top tools and platforms for self-study",
        url: "https://www.edx.org/learn/education",
        type: "tool",
        category: "Resources"
      }
    ],
    adventure: [
      {
        id: 1,
        title: "Adventure Planning",
        description: "How to plan your next adventure safely",
        url: "https://www.rei.com/learn/expert-advice/adventure-travel.html",
        type: "guide",
        category: "Planning"
      },
      {
        id: 2,
        title: "Safety Guidelines",
        description: "Essential safety tips for adventurers",
        url: "https://www.adventuretravel.biz/safety-guidelines",
        type: "article",
        category: "Safety"
      }
    ],
    creative: [
      {
        id: 1,
        title: "Creative Inspiration",
        description: "Find your creative spark",
        url: "https://www.skillshare.com/blog/creative-inspiration",
        type: "article",
        category: "Inspiration"
      },
      {
        id: 2,
        title: "Creative Tools",
        description: "Essential tools for creative projects",
        url: "https://www.creativebloq.com/features/best-tools-for-artists",
        type: "tool",
        category: "Resources"
      }
    ],
    default: [
      {
        id: 1,
        title: "Goal Setting Guide",
        description: "How to set and achieve meaningful goals",
        url: "https://www.mindtools.com/pages/article/smart-goals.htm",
        type: "guide",
        category: "Planning"
      },
      {
        id: 2,
        title: "Time Management",
        description: "Effective time management strategies",
        url: "https://www.coursera.org/articles/time-management-skills",
        type: "article",
        category: "Productivity"
      }
    ]
  };

  const titleLower = title.toLowerCase();
  let matchedResources: Resource[] = [];

  // Check for keywords in the title
  if (titleLower.includes('travel') || titleLower.includes('visit') || titleLower.includes('tour')) {
    matchedResources = suggestions.travel;
  } else if (titleLower.includes('run') || titleLower.includes('fitness') || titleLower.includes('exercise')) {
    matchedResources = suggestions.fitness;
  } else if (titleLower.includes('learn') || titleLower.includes('study') || titleLower.includes('master')) {
    matchedResources = suggestions.learn;
  } else if (titleLower.includes('adventure') || titleLower.includes('explore') || titleLower.includes('climb')) {
    matchedResources = suggestions.adventure;
  } else if (titleLower.includes('create') || titleLower.includes('make') || titleLower.includes('build')) {
    matchedResources = suggestions.creative;
  } else {
    matchedResources = suggestions.default;
  }

  return matchedResources;
};

export const useBucketListStore = create<BucketListState>((set) => ({
  items: [
    {
      id: 1,
      title: "Visit the Northern Lights",
      priority: "Medium",
      deadline: "March 2025",
      timeRequired: "1 week",
      status: "not_started",
      completed: false,
      description: "Experience the aurora borealis in Iceland",
      notes: [],
      resources: [
        {
          id: 1,
          title: "Best Time to See Northern Lights",
          description: "Comprehensive guide on optimal viewing conditions",
          url: "https://www.visiticeland.com/article/the-northern-lights/",
          type: "guide",
          category: "Planning"
        },
        {
          id: 2,
          title: "Aurora Photography Tips",
          description: "Learn how to capture the perfect aurora photos",
          url: "https://www.photopills.com/articles/northern-lights-photography-guide",
          type: "article",
          category: "Photography"
        }
      ],
      lastUpdated: new Date().toISOString()
    }
  ],
  addItem: (item) => set((state) => {
    const newItemId = Math.max(...state.items.map(i => i.id)) + 1;
    const suggestions = generateSuggestions(item.title);
    
    return {
      items: [...state.items, { 
        ...item, 
        id: newItemId,
        notes: [],
        resources: suggestions,
        status: 'not_started',
        lastUpdated: new Date().toISOString()
      }]
    };
  }),
  updateItem: (id, updates) => set((state) => ({
    items: state.items.map(item => 
      item.id === id 
        ? { 
            ...item, 
            ...updates,
            lastUpdated: new Date().toISOString()
          } 
        : item
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
  addNote: (itemId, content) => set((state) => ({
    items: state.items.map(item => 
      item.id === itemId 
        ? {
            ...item,
            notes: [
              ...item.notes,
              {
                id: item.notes.length ? Math.max(...item.notes.map(n => n.id)) + 1 : 1,
                content,
                createdAt: new Date().toISOString()
              }
            ],
            lastUpdated: new Date().toISOString()
          }
        : item
    )
  })),
  deleteNote: (itemId, noteId) => set((state) => ({
    items: state.items.map(item =>
      item.id === itemId
        ? {
            ...item,
            notes: item.notes.filter(note => note.id !== noteId),
            lastUpdated: new Date().toISOString()
          }
        : item
    )
  })),
  updateStatus: (id, status) => set((state) => ({
    items: state.items.map(item =>
      item.id === id
        ? {
            ...item,
            status,
            completed: status === 'completed',
            lastUpdated: new Date().toISOString()
          }
        : item
    )
  })),
}));