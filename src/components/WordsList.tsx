"use client";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "../utils/supabase/client";
//zustandのStoreからインポート
import useUserIdStore from "@/store/userIdStore";
import useUserWordsSettingsStore from "@/store/userWordsSettingsStore";
//offsetの更新を遅らせるためのデバウンズライブラリ
import { debounce } from "lodash";

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
  initialUserWordsSettings: any; // 型定義はあとで
};

const WordsList = ({ initialWords, userId, initialUserWordsSettings }: Props) => {
  const setUserId = useUserIdStore((state) => state.setUserId);
  const { userWordsSettings, setUserWordsSettings, incrementPageOffset, decrementPageOffset } = useUserWordsSettingsStore();
  const [words, setWords] = useState<WordProps[]>(initialWords);
  const [loading, setLoading] = useState(false);
  const [totalWords, setTotalWords] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);
  const [isSettingsInitialized, setIsSettingsInitialized] = useState(false); // 初期設定が完了したか確認するためのフラグ

  useEffect(() => {
    // ZustandにuserIdとuserWordsSettingsをセット
    setUserId(userId);
    setUserWordsSettings(initialUserWordsSettings);
    setIsSettingsInitialized(true); // 初期設定が完了したらフラグをtrueに
  }, [userId, initialUserWordsSettings]);

  const fetchWords = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/getWords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          userWordsSettings,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setWords(data.words);
        console.log("fetchData", data.words);
        setTotalWords(data.totalWords);
        console.log("データの取得に成功しました:", data.words);
      } else {
        console.error("Error fetching words:", data.error);
      }
    } catch (error) {
      console.error("Error fetching words:", error);
    } finally {
      setLoading(false);
    }
  };

  const updatePageOffsetInSupabase = useCallback(debounce(async (newOffset) => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("user_words_settings")
          .update({ page_offset: newOffset })
          .eq("user_id", userId);
          console.log("updateが実行されました", data);
        if (error) {
          console.error("Error updating page_offset in Supabase:", error.message);
        } else {
          console.log("updateが実行されました", data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }, 5000),//5秒後にデバウンズ
    [userId]
  )

  useEffect(() => {
    if (isSettingsInitialized) {
      fetchWords();
      updatePageOffsetInSupabase(userWordsSettings.page_offset);
      // デバウンズすることで5秒以内なら何回page_offsetが更新されても5秒後の最新の状態で1回だけ更新される
    }
  }, [userWordsSettings.page_offset, isSettingsInitialized]);

  return (
    <div className="border p-4 m-2">
      <h1>Words</h1>
      {message && <p>{message}</p>}
      <ul>
        {words.map((word, index) => (
          <li key={word.id}>
            <p>
              <strong>Word:</strong> {word.word}
            </p>
            <p>
              <strong>Meaning:</strong> {word.meaning}
            </p>
            <p>
              <strong>Example:</strong> {word.example}
            </p>
            <p>
              <strong>Example Translation:</strong> {word.example_translation}
            </p>
            <p>
              <strong>Memo:</strong> {word.memo}
            </p>
            <p>
              <strong>Index:</strong> {word.index}
            </p>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-4 space-x-8">
        <button
          onClick={() => {
            decrementPageOffset();
          }}
          disabled={userWordsSettings.page_offset === 1}
          className={`px-4 py-2 bg-blue-500 text-white rounded w-1/6 ${userWordsSettings.page_offset === 1 ? "opacity-50" : "hover:opacity-75"}`}
        >
          Previous
        </button>
        <span>
          Page {userWordsSettings.page_offset} of {Math.ceil(totalWords / userWordsSettings.display_count)}
        </span>
        <button
          onClick={() => {
            incrementPageOffset();
          }}
          disabled={userWordsSettings.page_offset * userWordsSettings.display_count >= totalWords}
          className={`px-4 py-2 bg-blue-500 text-white rounded w-1/6 ${userWordsSettings.page_offset * userWordsSettings.display_count >= totalWords ? "opacity-50 " : "hover:opacity-75"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WordsList;
