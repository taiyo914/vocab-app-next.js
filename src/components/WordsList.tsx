"use client"
import { useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase/client';

type WordData = {
  id: string;
  word: string;
  meaning: string;
  example: string;
  example_translation: string;
  memo: string;
  index: number;
};

const WordsList = () => {
  const supabase = createClient()
  const [words, setWords] = useState<WordData[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchWords = async () => {
      // await new Promise(resolve => setTimeout(resolve, 3000)) サスペンスをつけたい...
      // 現在のユーザーのIDを取得
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setMessage('ユーザー情報の取得に失敗しました');
        return;
      }

      // 単語データを取得
      const { data, error } = await supabase
        .from('words')
        .select('id, word, meaning, example, example_translation, memo, index')
        .eq('user_id', user.id);

      if (error) {
        setMessage(`単語データの取得に失敗しました:${error.message}` );
      } else {
        setWords(data);
        setMessage(null)
      }
    };

    fetchWords();
  }, []);


  return (
    <div className="border p-4 m-2">
      <h1>Words</h1>
      {message && <p>{message}</p>}
      <ul>
        {words.map((word, index) => (
          <li key={word.id}>
            <p><strong>Word:</strong> {word.word}</p>
            <p><strong>Meaning:</strong> {word.meaning}</p>
            <p><strong>Example:</strong> {word.example}</p>
            <p><strong>Example Translation:</strong> {word.example_translation}</p>
            <p><strong>Memo:</strong> {word.memo}</p>
            <p><strong>Index:</strong> {word.index}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordsList;
