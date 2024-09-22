// app/api/search/route.ts (App Router用)
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req:Request) {
  const supabase = createClient()
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get('searchQuery');

  if (!searchQuery) {
    return NextResponse.json({ error: '検索クエリが必要です' });
  }

  const { data, error } = await supabase
    .from('words')
    .select('*')
    .ilike('word', `%${searchQuery}%`); // 大文字・小文字を無視して検索

  if (error) {
    return NextResponse.json({ error: error.message });
  }

  return NextResponse.json(data);
}
