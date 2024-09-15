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
  error: string | null;
  fetchUserId: () => Promise<string | null>;
  fetchUserWordsSettings: () => Promise<string | null>;
  fetchWords: () => Promise<string | null>;
  setWordsSettings: (settings: any) => void;
  setWords: (words: WordType[]) => void; // 新しくsetWordsを追加
  incrementOffset: () => void;
  decrementOffset: () => void;
}


const useUserStore = create<UserState>((set, get) => ({
  userId: null,
  wordsSettings: null,
  words: null,
  totalWords: 0, // 初期値
  fetchingKey: 0, // 初期値
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
      set({ wordsSettings: data || null }); 
      return null;
    } catch (err: any) {
      set({ error: err.message });
      return err.message;
    }
  },

  fetchWords: async () => {
    try {
      const { userId, wordsSettings, words } = get();
      if (!userId || !wordsSettings) return null;

      // APIへリクエストを送信
      const response = await fetch("/api/getWords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          userWordsSettings: wordsSettings,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Error fetching words");
      }

      // Zustandの状態を更新
      if (JSON.stringify(words) !== JSON.stringify(data.words)) {
        set({
          words: data.words,
          totalWords: data.totalWords,
          fetchingKey: get().fetchingKey + 1, // fetchingKeyを更新
        });
      } else {
        set({
          words: data.words,
          totalWords: data.totalWords,
        });
      }
      return null;
    } catch (err: any) {
      set({ error: err.message });
      return err.message;
    }
  },

  setWordsSettings: (settings) => set({ wordsSettings: settings }),

  setWords: (words) => set({ words }), // ここでsetWordsを定義

  incrementOffset: () => {
    const { wordsSettings } = get();
    if (!wordsSettings) {
      set({ error: "ユーザー情報がありません。ページをリロードしてください。" });
      return;
    } 
    set({
      wordsSettings: {
        ...wordsSettings,
        page_offset: wordsSettings.page_offset + 1,},
    });
  },

  decrementOffset: () => {
    const { wordsSettings } = get();
    if (!wordsSettings) {
      set({ error: "ユーザー情報がありません。ページをリロードしてください。" });
      return;
    } 
    set({
      wordsSettings: {
        ...wordsSettings,
        page_offset: wordsSettings.page_offset - 1,},
    });
  },
  
}));

export default useUserStore;