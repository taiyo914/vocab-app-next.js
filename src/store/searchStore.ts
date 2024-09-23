// userStore.ts (Zustandのストア)
import { create } from "zustand";
import { WordType } from "@/types/Types";

interface SearchState {
  results: WordType[]; 
  searchTriggered: boolean; // 検索が実行されたかどうか
  setResults: (newResults: WordType[]) => void; 
  setSearchTriggered: (triggered: boolean) => void; // 検索が実行されたことをセット
  clearResults: () => void; 
}

const useSearchStore = create<SearchState>((set) => ({
  results: [], 
  searchTriggered: false,
  setResults: (newResults) => set({ results: newResults }),
  clearResults: () => set({ results: [], searchTriggered: false }), // 検索結果をクリアしフラグもリセット
  setSearchTriggered: (triggered: boolean) => set({ searchTriggered: triggered }),
}));

export default useSearchStore;
