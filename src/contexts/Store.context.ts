import { createContext } from 'react';
import type { StoreData } from '@/types/store.type';

type StoreContextValue = {
  store: StoreData[];
  setStore: (store: StoreData[]) => void;
};

export const StoreContext = createContext<StoreContextValue | null>(null);
