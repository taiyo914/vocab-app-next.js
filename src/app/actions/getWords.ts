// app/actions.js
"use server";

import { createClient } from "../../utils/supabase/server"; // ここにSupabaseのクライアントをインポート
const supabase = createClient();
import { UserWordsSettingsProps } from "@/types/UserWordsSettingsProps";

export async function getWords(userId: string, userWordsSettings: UserWordsSettingsProps) {
  const { data: words, error } = await supabase
    .from("words")
    .select("id, word, meaning, example, example_translation, memo, index")
    .eq("user_id", userId)
    .gte("index", userWordsSettings.start_index || 0)
    .lte("index", userWordsSettings.end_index || 10)
    .gte("review_count", userWordsSettings.start_review_count || 0)
    .lte("review_count", userWordsSettings.end_review_count || 100)
    .gte(userWordsSettings.date_field, userWordsSettings.start_date || "1900-01-01")
    .lte(userWordsSettings.date_field, userWordsSettings.end_date || "2100-12-31")
    .order(userWordsSettings.sort_field || "created_at", { ascending: userWordsSettings.sort_order === "ASC" })
    .range((userWordsSettings.page_offset - 1) * userWordsSettings.display_count, userWordsSettings.page_offset * userWordsSettings.display_count - 1);

  if (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }

  return words;
}
