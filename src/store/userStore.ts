//Zustand Store
import { createClient } from '@/utils/supabase/client';
import { create } from 'zustand';
import { WordsSettingsType, WordType } from '@/types/Types';
// Supabaseクライアントを一度だけ生成
const supabase = createClient();

// userId, userWordsSettings, wordsを一つのストアで管理することで、データを取得するときにそれぞれの値を参照できるようになる（userWordsSettingsはuserIdに、wordsはuserIdとuserWordsSettingsがないと取得できない）
// さらに、wordsもグローバル管理することで復習画面への初回リロードをなくすことができる
// zustandのget()メソッドを使うことで不要なレンダリングを最小限に抑えられる
interface UserState {
  userId: string | null;
  wordsSettings: WordsSettingsType | null;
  words: WordType[] | null;
  totalWords: number; // totalWordsを追加
  fetchingKey: number; // fetchingKeyを追加
  page_offset: number;
  error: string | null;
  fetchUserId: () => Promise<string | null>;
  fetchUserWordsSettings: () => Promise<string | null>;
  fetchWords: () => Promise<string | null>;
  fetchTotalWords: () => Promise<void | null>; // 追加
  setWordsSettings: (settings: any) => void;
  setWords: (words: WordType[]) => void; // 新しくsetWordsを追加
  incrementFetchingKey: () => void;
  setPageOffset:(newOffset:number) => void;
  incrementOffset: () => void;
  decrementOffset: () => void;
}


const useUserStore = create<UserState>((set, get) => ({
  userId: null,
  wordsSettings: null,
  words: null,
  totalWords: 0, // 初期値
  fetchingKey: 0, // 初期値
  page_offset: 1,
  error: null, 

  fetchUserId: async () => {
    try {
      if (get().userId) return; 
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw new Error(error.message); 
      set({ userId: user?.id || null });
      return null;
    } catch (err:any) {
      set({ error: err.message }); 
      return err.message 
    }
  },

  fetchUserWordsSettings: async () => {
    try {
      if (!get().userId || get().wordsSettings) return null;
      const { data, error } = await supabase
        .from("user_words_settings")
        .select("sort_field, sort_order, start_index, end_index, start_review_count, end_review_count, date_field, start_date, end_date, display_count, page_offset")
        .eq("user_id", get().userId)
        .single();
      if (error) throw new Error(error.message);
      set({ 
        wordsSettings: { ...data }, 
        page_offset: data.page_offset || 1 // page_offsetを独立してセット
      });
      return null;
    } catch (err: any) {
      set({ error: err.message });
      return err.message;
    }
  },

  fetchWords: async () => {
    try {
      const { userId, wordsSettings, page_offset, words } = get();
      if (!userId || !wordsSettings) return null;

      const { data, error } = await supabase
      .from("words")
      .select("id, word, meaning, example, example_translation, memo, index, review_count, reviewed_at, created_at, updated_at, deleted_at")
      .eq("user_id", userId)
      .is("deleted_at", null) 
      .gte("index", wordsSettings.start_index || 0)
      .lte("index", wordsSettings.end_index || 10)
      .gte("review_count", wordsSettings.start_review_count || 0)
      .lte("review_count", wordsSettings.end_review_count || 100)
      .gte(wordsSettings.date_field, wordsSettings.start_date || "1900-01-01")
      .lte(wordsSettings.date_field, wordsSettings.end_date || "2100-12-31")
      .order(wordsSettings.sort_field || "increment", {
        ascending: wordsSettings.sort_order === "ASC",
      })
      .range((page_offset - 1) * wordsSettings.display_count, page_offset * wordsSettings.display_count - 1);
      

      if (error) {
        throw new Error(`Error fetching words: ${error.message}`);
      }

      // Zustandの状態を更新
      if (JSON.stringify(words) !== JSON.stringify(data)) {
        set({
          words: data,
          fetchingKey: get().fetchingKey + 1, // fetchingKeyを更新
        });
      } else {
        set({
          words: data,
        });
      }
      return null;
    } catch (err: any) {
      set({ error: err.message });
      return err.message;
    }
  },

  fetchTotalWords: async () => {
    try {
      const { userId, wordsSettings} = get();
      if (!userId || !wordsSettings) return null;

      const { count, error } = await supabase
      .from("words")
      .select("*", { count: "exact", head: true }) // head: true でデータを取得せずにカウントだけを実行
      .eq("user_id", userId)
      .is("deleted_at", null) 
      .gte("index", wordsSettings.start_index || 0)
      .lte("index", wordsSettings.end_index || 10)
      .gte("review_count", wordsSettings.start_review_count || 0)
      .lte("review_count", wordsSettings.end_review_count || 100)
      .gte(wordsSettings.date_field, wordsSettings.start_date || "1900-01-01")
      .lte(wordsSettings.date_field, wordsSettings.end_date || "2100-12-31");

    if (error) {
      throw new Error(`Error fetching words: ${error.message}`);
    }

      set({ totalWords: count || 0 });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  setWordsSettings: (settings) => set({ wordsSettings: settings }),

  setWords: (words) => set({ words }), // ここでsetWordsを定義

  incrementFetchingKey: () => set((state) => ({ fetchingKey: state.fetchingKey + 1 })),

  setPageOffset: (newOffset) => set((state) => ({ page_offset: newOffset })),

  incrementOffset: () => set((state) => ({ page_offset: state.page_offset + 1 })),

  decrementOffset: () => set((state) => ({
    page_offset: state.page_offset > 1 ? state.page_offset - 1 : 1,
  })),
  
}));

export default useUserStore;