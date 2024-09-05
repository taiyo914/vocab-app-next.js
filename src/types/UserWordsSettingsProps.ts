export type UserWordsSettingsProps = {
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