import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient();

  try {
    // ユーザーIDをサーバーサイドで取得
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // Supabase RPCでget_words関数を呼び出し
    const { data, error: rpcError } = await supabase.rpc("get_words", { input_user_id: userId });

    if (rpcError) {
      return NextResponse.json({ error: `Error executing RPC: ${rpcError.message}` }, { status: 500 });
    }

    return NextResponse.json({ words: data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
