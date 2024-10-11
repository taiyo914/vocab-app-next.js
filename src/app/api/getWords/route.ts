import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
export async function POST(request: Request) {
  const supabase = createClient();

  try {
    // リクエストボディからデータを取得
    const { userId, userWordsSettings } = await request.json();

    if (!userId || !userWordsSettings) {
      return NextResponse.json({ error: "userId または userWordsSettings がありません" }, { status: 400 });
    }

    // 1. 単語の総数を取得
    const { count, error: countError } = await supabase
      .from("words")
      .select("*", { count: "exact", head: true }) // head: true でデータを取得せずにカウントだけを実行
      .eq("user_id", userId)
      .is("deleted_at", null) 
      .gte("index", userWordsSettings.start_index || 0)
      .lte("index", userWordsSettings.end_index || 10)
      .gte("review_count", userWordsSettings.start_review_count || 0)
      .lte("review_count", userWordsSettings.end_review_count || 100)
      .gte(userWordsSettings.date_field, userWordsSettings.start_date || "1900-01-01")
      .lte(userWordsSettings.date_field, userWordsSettings.end_date || "2100-12-31");

    if (countError) {
      return NextResponse.json({ error: `Error fetching total words count: ${countError.message}` }, { status: 500 });
    }

     // 2. ページネーション用のデータを取得
    const { data: words, error } = await supabase
      .from("words")
      .select("id, word, meaning, example, example_translation, memo, index, review_count, reviewed_at, created_at, updated_at, deleted_at")
      .eq("user_id", userId)
      .is("deleted_at", null) 
      .gte("index", userWordsSettings.start_index || 0)
      .lte("index", userWordsSettings.end_index || 10)
      .gte("review_count", userWordsSettings.start_review_count || 0)
      .lte("review_count", userWordsSettings.end_review_count || 100)
      .gte(userWordsSettings.date_field, userWordsSettings.start_date || "1900-01-01")
      .lte(userWordsSettings.date_field, userWordsSettings.end_date || "2100-12-31")
      .order(userWordsSettings.sort_field || "increment", {
        ascending: userWordsSettings.sort_order === "ASC",
      })
      // .range((userWordsSettings.page_offset - 1) * userWordsSettings.display_count, userWordsSettings.page_offset * userWordsSettings.display_count - 1);

    if (error) {
      throw new Error(`Error fetching words: ${error.message}`);
    }

    return NextResponse.json({ words, totalWords: count });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
