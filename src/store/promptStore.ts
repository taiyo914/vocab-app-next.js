import { create } from 'zustand';
import { createClient } from '@/utils/supabase/client';
const supabase = createClient()

interface PromptState {
  prompts: {
    word: string;
    meaning: string;
    example: string;
    example_sentence: string;
    memo: string;
  };
  setPrompts: (newPrompts: Partial<PromptState['prompts']>) => void;
  fetchPrompts: (user_id: string) => Promise<void>;
  updatePrompts: (user_id: string) => Promise<void>;
}

const usePromptStore = create<PromptState>((set, get) => ({
  prompts: {
    word: '',
    meaning: '',
    example: '',
    example_sentence: '',
    memo: ''
  },
  setPrompts: (newPrompts) => set((state) => ({
    prompts: { ...state.prompts, ...newPrompts }
  })),

  fetchPrompts: async (user_id: string) => {
    const { data, error } = await supabase
      .from('prompts')
      .select('word, meaning, example, example_sentence, memo')
      .eq('user_id', user_id)
      .single();

    if (error) {
      console.error('プロンプトの取得に失敗しました:', error);
    } else if (data ) {
      set({ prompts: data });
    }
  },
  updatePrompts: async (user_id: string) => {
    const { word, meaning, example, example_sentence, memo } = get().prompts

    const { data, error } = await supabase
      .from('prompts')
      .update({ word, meaning, example, example_sentence, memo })
      .eq('user_id', user_id);

    if (error) {
      console.error('プロンプトの更新に失敗しました:', error);
    } else {
      console.log('プロンプトが更新されました:', data);
    }
  }
}));

export default usePromptStore;