import { create } from 'zustand';

interface AppState {
  lots: any[];
  payments: any[];
  totalUsers: number;
  isLoading: boolean;
  activeTab: string;
  setLots: (lots: any[]) => void;
  setPayments: (payments: any[]) => void;
  setTotalUsers: (totalUsers: number) => void;
  setIsLoading: (isLoading: boolean) => void;
  setActiveTab: (activeTab: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  lots: [],
  payments: [],
  totalUsers: 0,
  isLoading: true,
  activeTab: 'overview',
  setLots: (lots) => set({ lots }),
  setPayments: (payments) => set({ payments }),
  setTotalUsers: (totalUsers) => set({ totalUsers }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setActiveTab: (activeTab) => set({ activeTab }),
}));
