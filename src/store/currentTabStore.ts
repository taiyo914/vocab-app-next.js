import { create } from 'zustand';

type TabState = {
  currentTab: string;
  isLoading: boolean;
  setTab: (tab: string) => void;
  setIsLoading: (loading: boolean) => void
};

const useTabStore = create<TabState>((set) => ({
  currentTab: 'cards', // 初期値を"cards"に設定
  isLoading: true,
  setTab: (tab: string) => set({ currentTab: tab }),
  setIsLoading: (loading: boolean) => set({isLoading: loading})
}));

export default useTabStore;
