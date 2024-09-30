import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { text, targetLang } = await req.json();

    if (!text) {
      return NextResponse.json({ message: 'テキストが必要です。' }, { status: 400 });
    }

    const apiKey = process.env.DEEPL_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ message: 'APIキーが設定されていません。' }, { status: 500 });
    }

    const url = 'https://api-free.deepl.com/v2/translate';

    const params = new URLSearchParams();
    params.append('auth_key', apiKey);
    params.append('text', text);
    params.append('target_lang', targetLang || 'JA'); // デフォルトは日本語

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ message: '翻訳に失敗しました。', error: errorData }, { status: response.status });
    }

    const data = await response.json();
    const translatedText = data.translations[0].text;

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error('翻訳エラー:', error);
    return NextResponse.json({ message: '内部サーバーエラー' }, { status: 500 });
  }
}
