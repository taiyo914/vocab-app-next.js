import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const supabase = createClient()
  try {
    const { user_id, word, meaning, example, example_sentence, memo } = await request.json();

    const { data, error } = await supabase
      .from('prompts')
      .insert([{ user_id, word, meaning, example, example_sentence, memo }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
