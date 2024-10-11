import { create } from "zustand";
import { WordsSettingsType } from "@/types/Types";
import { createClient } from "@/utils/supabase/client";

interface WordsSettingsState {
  wordsSettings: WordsSettingsType | null;
  error: string | null;
  fetchWordsSettings: (userId: string) => Promise<void>;
  setWordsSettings: (settings: WordsSettingsType) => void;
}

const useWordsSettingsStore = create<WordsSettingsState>((set) => ({
  wordsSettings: null,
  error: null,

  fetchWordsSettings: async (userId) => {
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from("user_words_settings")
        .select("*")
        .eq("user_id", userId)
        .single();
      if (error) throw new Error(error.message);
      set({ wordsSettings: data || null });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  setWordsSettings: (settings) => set({ wordsSettings: settings }),
}));

export default useWordsSettingsStore;
