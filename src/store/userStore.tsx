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
  error: string | null;
  fetchUserId: () => Promise<string | null>;
  fetchUserWordsSettings: () => Promise<string | null>;
  fetchWords: () => Promise<string | null>;
  setUserWordsSettings: (settings: any) => void;
}


const useUserStore = create<UserState>((set, get) => ({
  userId: null,
  wordsSettings: null,
  words: null,
  error: null, 

  setUserWordsSettings: (settings) => set({ wordsSettings: settings }),

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
      set({ wordsSettings: data || null }); 
      return null;
    } catch (err: any) {
      set({ error: err.message });
      return err.message;
    }
  },

  fetchWords: async () => {
    try {
      const { userId, wordsSettings } = get();
      if (!userId || !wordsSettings) return null;
      const { data, error } = await supabase
        .from("words")
        .select("id, word, meaning, example, example_translation, memo, index, favorite, review_count, reviewed_at, created_at, updated_at, deleted_at")
        .eq("user_id", userId)
        .gte("index", wordsSettings.start_index || 0)
        .lte("index", wordsSettings.end_index || 10)
        .gte("review_count", wordsSettings.start_review_count || 0)
        .lte("review_count", wordsSettings.end_review_count || 100)
        .gte(wordsSettings.date_field, wordsSettings.start_date || "1900-01-01")
        .lte(wordsSettings.date_field, wordsSettings.end_date || "2100-12-31")
        .order(wordsSettings.sort_field || "increment", { ascending: wordsSettings.sort_order === "ASC" })
        .range((wordsSettings.page_offset - 1) * wordsSettings.display_count, wordsSettings.page_offset * wordsSettings.display_count - 1);
      if (error) throw new Error(error.message);
      set({ words: data || null });
      return null;
    } catch (err: any) {
      set({ error: err.message });
      return err.message;
    }
  },

  
}));

export default useUserStore;