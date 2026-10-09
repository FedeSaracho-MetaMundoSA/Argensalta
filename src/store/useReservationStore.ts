import { create } from 'zustand';

interface ReservationState {
  selectedLot: any | null;
  checkoutStep: 'details' | 'form' | 'processing' | 'success';
  buyerData: { name: string; email: string; doc: string };
  setSelectedLot: (lot: any | null) => void;
  setCheckoutStep: (step: 'details' | 'form' | 'processing' | 'success') => void;
  setBuyerData: (data: { name: string; email: string; doc: string }) => void;
  resetReservation: () => void;
}

export const useReservationStore = create<ReservationState>((set) => ({
  selectedLot: null,
  checkoutStep: 'details',
  buyerData: { name: '', email: '', doc: '' },
  setSelectedLot: (selectedLot) => set({ selectedLot }),
  setCheckoutStep: (checkoutStep) => set({ checkoutStep }),
  setBuyerData: (buyerData) => set({ buyerData }),
  resetReservation: () => set({ 
    selectedLot: null, 
    checkoutStep: 'details', 
    buyerData: { name: '', email: '', doc: '' } 
  }),
}));
