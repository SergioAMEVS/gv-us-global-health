import { useStore } from 'zustand';
import { counterStore } from '@/lib/store/counterStore';

export const useCounterStore = () => useStore(counterStore);
