import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const { wordId } = await request.json();

  if (!wordId) {
    return NextResponse.json({ error: "wordId が指定されていません" }, { status: 400 });
  }

  const { error } = await supabase
    .from("words")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", wordId);

  if (error) {
    return NextResponse.json({ error: `Error deleting word: ${error.message}` }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
