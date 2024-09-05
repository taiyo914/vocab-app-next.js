"use client"
import { useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase/client';
//zustandのStoreからインポート
import useUserIdStore from '@/store/userIdStore';
import useUserWordsSettingsStore from '@/store/userWordsSettingsStore';

type WordProps = {
  id: string;
  word: string;
  meaning: string;
  example: string;
  example_translation: string;
  memo: string;
  index: number;
};

type Props = {
  initialWords: WordProps[];
  userId: string;
  userWordsSettings: any; // 型定義はあとで
};

const WordsList = ({ initialWords, userId, userWordsSettings }: Props) => {
  const setUserId = useUserIdStore((state) => state.setUserId);
  const setUserWordsSettings = useUserWordsSettingsStore((state) => state.setUserWordsSettings);
  const [words, setWords] = useState<WordProps[]>(initialWords);
  const [message, setMessage] = useState<string | null>(null);
  const supabase = createClient()

  useEffect(() => {
    // ZustandにuserIdとuserWordsSettingsをセット
    setUserId(userId);
    setUserWordsSettings(userWordsSettings);
  }, [userId, userWordsSettings, setUserId, setUserWordsSettings]);

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
