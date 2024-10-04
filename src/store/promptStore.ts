import { create } from 'zustand';
import { createClient } from '@/utils/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';  // Supabaseのエラー型をインポート

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
  fetchPrompts: (user_id: string) => Promise<PostgrestError | undefined>;
  updatePrompts: (
    user_id: string,
    newPrompts: {
      word: string;
      meaning: string;
      example: string;
      example_sentence: string;
      memo: string;
    }
  ) => Promise<PostgrestError | undefined>;
}

const usePromptStore = create<PromptState>((set) => ({
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

  fetchPrompts: async (user_id: string): Promise<PostgrestError | undefined> => {
    const { data, error } = await supabase
      .from('prompts')
      .select('word, meaning, example, example_sentence, memo')
      .eq('user_id', user_id)
      .single();
    if (error) {
      return error; 
    } else if (data ) {
      set({ prompts: data });
      return undefined; 
    }
  },
  updatePrompts: async (user_id: string, newPrompts:{
      word: string;
      meaning: string;
      example: string;
      example_sentence: string;
      memo: string;
  }): Promise<PostgrestError | undefined>  => {
    const { word, meaning, example, example_sentence, memo } = newPrompts

    const { data, error } = await supabase
      .from('prompts')
      .update({ word, meaning, example, example_sentence, memo })
      .eq('user_id', user_id);

    if (error) {
      return error;
    } else {
      set({ prompts: newPrompts });
      return undefined;
    }
  }
}));

export default usePromptStore;