import { create } from 'zustand';

export interface GridItem {
    id: string;
    name: string;
    colStart: number;
    colEnd: number;
    rowStart: number;
    rowEnd: number;
    color: string;
}

interface GridState {
    rows: number;
    columns: number;
    gap: number; // in px
    items: GridItem[];
    selectedItemId: string | null;

    // Actions
    setRows: (rows: number) => void;
    setColumns: (columns: number) => void;
    setGap: (gap: number) => void;
    addItem: (item: Omit<GridItem, 'id'>) => void;
    updateItem: (id: string, updates: Partial<GridItem>) => void;
    removeItem: (id: string) => void;
    selectItem: (id: string | null) => void;
    resetGrid: () => void;
}

export const useGridStore = create<GridState>((set) => ({
    rows: 5,
    columns: 5,
    gap: 10,
    items: [
        { id: '1', name: 'Header', colStart: 1, colEnd: 6, rowStart: 1, rowEnd: 2, color: '#ef4444' },
        { id: '2', name: 'Sidebar', colStart: 1, colEnd: 2, rowStart: 2, rowEnd: 5, color: '#3b82f6' },
        { id: '3', name: 'Content', colStart: 2, colEnd: 6, rowStart: 2, rowEnd: 5, color: '#10b981' },
        { id: '4', name: 'Footer', colStart: 1, colEnd: 6, rowStart: 5, rowEnd: 6, color: '#f59e0b' },
    ],
    selectedItemId: null,

    setRows: (rows) => set({ rows }),
    setColumns: (columns) => set({ columns }),
    setGap: (gap) => set({ gap }),
    addItem: (item) => set((state) => ({
        items: [...state.items, { ...item, id: Math.random().toString(36).substr(2, 9) }]
    })),
    updateItem: (id, updates) => set((state) => ({
        items: state.items.map((item) => item.id === id ? { ...item, ...updates } : item)
    })),
    removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
        selectedItemId: state.selectedItemId === id ? null : state.selectedItemId
    })),
    selectItem: (id) => set({ selectedItemId: id }),
    resetGrid: () => set({
        rows: 5,
        columns: 5,
        gap: 10,
        items: [],
        selectedItemId: null
    })
}));
