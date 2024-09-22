import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient();

  try {
    // サーバーサイドでユーザーIDを取得
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // user_words_settingsを取得
    const { data: userWordsSettings, error: settingsError } = await supabase
      .from("user_words_settings")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (settingsError) {
      return NextResponse.json({ error: "Settings not found" }, { status: 500 });
    }

    return NextResponse.json({ userWordsSettings });
  } catch (error:any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
