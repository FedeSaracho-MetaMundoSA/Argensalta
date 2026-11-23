import { create } from 'zustand';

interface AdminStockState {
  filter: string;
  searchTerm: string;
  viewMode: 'list' | 'map';
  currentPage: number;
  itemsPerPage: number;
  setFilter: (filter: string) => void;
  setSearchTerm: (term: string) => void;
  setViewMode: (mode: 'list' | 'map') => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
}

export const useAdminStockStore = create<AdminStockState>((set) => ({
  filter: 'all',
  searchTerm: '',
  viewMode: 'list',
  currentPage: 1,
  itemsPerPage: 10,
  setFilter: (filter) => set({ filter, currentPage: 1 }), // Reset page on filter
  setSearchTerm: (searchTerm) => set({ searchTerm, currentPage: 1 }), // Reset page on search
  setViewMode: (viewMode) => set({ viewMode }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  setItemsPerPage: (itemsPerPage) => set({ itemsPerPage, currentPage: 1 }),
}));
