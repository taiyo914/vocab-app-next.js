import { create } from 'zustand';

type UserWordsSettings = {
  sort_field: string;
  sort_order: string;
  start_index: number;
  end_index: number;
  start_review_count: number;
  end_review_count: number;
  date_field: string;
  start_date: string | null;
  end_date: string | null;
  display_count: number;
  page_offset: number;
};

type UserWordsSettingsState = {
  userWordsSettings: UserWordsSettings;
  setUserWordsSettings: (settings: Partial<UserWordsSettings>) => void;
  incrementPageOffset: () => void;
  decrementPageOffset: () => void;
};

const useUserWordsSettingsStore = create<UserWordsSettingsState>((set) => ({
  userWordsSettings: {
    sort_field: "created_at",
    sort_order: "DESC",
    start_index: 0,
    end_index: 10,
    start_review_count: 0,
    end_review_count: 100,
    date_field: "created_at",
    start_date: "",
    end_date: "",
    display_count: 10,
    page_offset: 1,
  },
  
  // userWordsSettingsを更新するアクション (page_offset以外)
  setUserWordsSettings: (settings: Partial<UserWordsSettings>) =>
    set((state) => ({
      userWordsSettings: { ...state.userWordsSettings, ...settings },
    })),

  // page_offsetを+1するアクション
  incrementPageOffset: () =>
    set((state) => ({
      userWordsSettings: {
        ...state.userWordsSettings,
        page_offset: state.userWordsSettings.page_offset + 1,
      },
    })),

  // page_offsetを-1するアクション
  decrementPageOffset: () =>
    set((state) => ({
      userWordsSettings: {
        ...state.userWordsSettings,
        page_offset: state.userWordsSettings.page_offset - 1,
      },
    })),
}));

export default useUserWordsSettingsStore;
