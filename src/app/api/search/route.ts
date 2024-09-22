// app/api/search/route.ts (App Router用)
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req:Request) {
  const supabase = createClient()
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get('searchQuery');

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'ログインユーザーが見つかりません' });
  }

  if (!searchQuery) {
    return NextResponse.json({ error: '検索クエリが必要です' });
  }

  const { data, error } = await supabase
    .rpc('search_words', { query: searchQuery, user_id: user.id, });

  if (error) {
    return NextResponse.json({ error: error.message });
  }

  return NextResponse.json(data);
}
