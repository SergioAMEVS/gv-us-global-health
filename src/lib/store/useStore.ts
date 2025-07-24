import { create } from 'zustand';

const useOpenMenuStore = create<{ open: boolean; toggleOpen: () => void }>()((set) => ({
  open: false,
  toggleOpen: () => set((state) => ({ open: !state.open })),
}));

export default useOpenMenuStore;
