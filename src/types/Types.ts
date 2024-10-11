export type WordType = {
  id: string;
  word: string;
  meaning: string;
  example: string;
  example_translation: string;
  memo: string;
  index: number;
  review_count:number;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  [key: string]: string | number | boolean | null;
};

export type WordsSettingsType = {
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
};

export type InitialInfoProps = {
  userId: string;
  initialUserWordsSettings: WordsSettingsType;
  initialWords: WordType[];
};