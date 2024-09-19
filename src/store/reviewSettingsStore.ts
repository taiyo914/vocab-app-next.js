import { create } from 'zustand';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();
interface ReivewSettings {
  fields: string[]| null;  // ["meaning", "word", "example", "-example_translation", "-memo"]など
  showEmptyCards: boolean | null;
  accent: string | null;
  error: string | null;
  fetchReviewSettings: (userId: string) => Promise<void>;
  saveReviewSettings: (userId: string, fields: string[], showEmptyCards:boolean, accent: string) => Promise<void>;
  setFields: (fields: string[]) => void;
  setShowEmptyCards: (show: boolean) => void; 
  setAccent: (language: string)=> void;
}

const useReivewSettingsStore = create<ReivewSettings>((set) => ({
  fields: null,
  showEmptyCards: null,
  accent: null,
  error: null,

  fetchReviewSettings: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_review_settings')
        .select('fields, show_empty_cards, accent')
        .eq('user_id', userId)
        .single();

      if (error) throw new Error(error.message);

      set({ 
          fields: data.fields || ["word", "meaning", "example", "example_translation", "memo"],
          showEmptyCards: data.show_empty_cards !== undefined ? data.show_empty_cards : false,
          accent: data.accent || "en-US",
       });
    } catch (err:any) {
      set({ error: err.message });
    }
  },

  saveReviewSettings: async (userId, fields, showEmptyCards, accent) => {
    try {
      const { error } = await supabase
        .from('user_review_settings')
        .upsert({ user_id: userId, fields, show_empty_cards:showEmptyCards, accent });

      if (error) throw new Error(error.message);

      set({
        fields, 
        showEmptyCards,
        accent,
        error: null, // エラーをクリア
      });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  setFields: (fields) => set({ fields }),
  setShowEmptyCards: (show) => set({ showEmptyCards: show }),
  setAccent: (accent) => set({accent: accent})
}));

export default useReivewSettingsStore;