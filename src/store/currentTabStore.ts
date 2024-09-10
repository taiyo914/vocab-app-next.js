import { create } from 'zustand';

type TabState = {
  currentTab: string;
  setTab: (tab: string) => void;
};

const useTabStore = create<TabState>((set) => ({
  currentTab: 'cards', // 初期値を"cards"に設定
  setTab: (tab: string) => set({ currentTab: tab }),
}));

export default useTabStore;
