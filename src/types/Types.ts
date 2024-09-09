export type WordType = {
  id: string;
  word: string;
  meaning: string;
  example: string;
  example_translation: string;
  memo: string;
  index: number;
  favorite: boolean;
  review_count:number;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type UserWordsSettingsType = {
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

export type InitialInfoProps = {
  userId: string;
  initialUserWordsSettings: UserWordsSettingsType;
  initialWords: WordType[];
};