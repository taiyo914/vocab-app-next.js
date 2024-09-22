import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient();

  try {
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const { data, error: rpcError } = await supabase.rpc("get_total_words", { input_user_id: userId });

    if (rpcError) {
      return NextResponse.json({ error: `Error executing RPC: ${rpcError.message}` }, { status: 500 });
    }

    return NextResponse.json({ totalWords: data });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
