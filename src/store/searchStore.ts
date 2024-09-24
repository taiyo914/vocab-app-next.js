// userStore.ts (Zustandのストア)
import { create } from "zustand";
import { WordType } from "@/types/Types";

interface SearchState {
  results: WordType[];
  tempResults: WordType[];
  searchTriggered: boolean;
  setResults: (newResults: WordType[]) => void;
  setTempResults: (tempResults: WordType[]) => void;
  setSearchTriggered: (triggered: boolean) => void;
  clearResults: () => void;
  isOpen: boolean;
  setIsOpen: (prev: boolean) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  results: [],
  tempResults: [],
  searchTriggered: false,
  setResults: (newResults) => set({ results: newResults }),
  setTempResults: (tempResults) => set({ tempResults }),
  clearResults: () => set({ results: [], searchTriggered: false }),
  setSearchTriggered: (triggered: boolean) => set({ searchTriggered: triggered }),
  isOpen: false,
  setIsOpen: (status) => set({ isOpen: status }),
}));

export default useSearchStore;
