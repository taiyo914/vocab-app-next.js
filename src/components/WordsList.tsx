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
  const [settings, setSettings] = useState({
    sort_field: "created_at",
    sort_order: "DESC",
    start_index: 0,
    end_index: 10,
    start_review_count: 0,
    end_review_count: 100,
    date_field: "created_at",
    start_date: "",
    end_date: "",
    display_count: 10,
    page_offset: 1
  });
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchWords = async () => {
      // await new Promise(resolve => setTimeout(resolve, 3000)) サスペンスをつけたい...
      // 現在のユーザーのIDを取得（ホントはグローバル管理したい）
      let user_id = "";
      let userSettings = {
        sort_field: "created_at",
        sort_order: "DESC",
        start_index: 0,
        end_index: 10,
        start_review_count: 0,
        end_review_count: 100,
        date_field: "created_at",
        start_date: "",
        end_date: "",
        display_count: 10,
        page_offset: 1
      }
      const {data: {user} , error: userError} = await supabase.auth.getUser();
      console.log(user)
      if (userError || !user) {
        alert(`ユーザー情報の取得に失敗しました: ${userError}` );
        return
      } else{
        setUserId(user.id)
        user_id = user.id
        const { data , error } = await supabase
          .from("user_words_settings")
          .select('sort_field, sort_order, start_index, end_index, start_review_count, end_review_count, date_field, start_date, end_date, display_count, page_offset')
          .eq("user_id", user.id)
          .single(); 
        if(error){
          alert(`設定情報の取得に失敗しました: ${error.message}`)
          return
        } else{
          
          setSettings(data)
          userSettings = data
        }
      }

      console.log("設定情報の取得に成功しました:", userSettings, user_id)

      // 単語データを取得
      const { data, error } = await supabase
        .from('words')
        .select('id, word, meaning, example, example_translation, memo, index')
        .eq('user_id', user_id)
        .gte('index', userSettings.start_index || 0)
        .lte('index', userSettings.end_index || 10)
        .gte('review_count', userSettings.start_review_count || 0)
        .lte('review_count', userSettings.end_review_count || 100)
        .gte(userSettings.date_field, userSettings.start_date || '1900-01-01')
        .lte(userSettings.date_field, userSettings.end_date || '2100-12-31')
        .order(userSettings.sort_field || 'created_at', { ascending: userSettings.sort_order === 'ASC' })
        .range((userSettings.page_offset -1 ) * userSettings.display_count, userSettings.page_offset * userSettings.display_count - 1);

      if (error) {
        setMessage(`単語データの取得に失敗しました:${error.message}` );
      } else {
        console.log("ソート/フィルターされた単語の取得に成功しました;",data)
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
