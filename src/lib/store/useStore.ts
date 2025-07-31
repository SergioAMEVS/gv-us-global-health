import { create } from 'zustand';

type YearStore = {
  years: string[];
  year: string;
  setYears: (years: string[]) => void;
  setYear: (year: string) => void;
};

export const useOpenMenuStore = create<{ open: boolean; toggleOpen: () => void }>()((set) => ({
  open: false,
  toggleOpen: () => set((state) => ({ open: !state.open })),
}));

export const useYearStore = create<YearStore>((set) => ({
  years: [],
  year: '',
  setYears: (years) => set({ years, year: years[0] }),
  setYear: (year) => set({ year }),
}));
