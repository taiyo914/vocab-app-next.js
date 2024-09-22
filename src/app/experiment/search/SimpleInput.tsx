"use client";
import { useState, useEffect } from "react";

const SimpleSearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]); // 検索結果
  const [isFirstSearch, setIsFirstSearch] = useState(true); // 最初の検索を制御するフラグ

  // 検索結果を取得する関数
  const fetchResults = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]); // 空白の場合は結果をクリア
      return;
    }
    const res = await fetch(`/api/search?searchQuery=${searchTerm}`);
    const data = await res.json();
    setResults(data); // 取得した結果をセット
    setIsFirstSearch(false); // 最初の検索完了時にフラグをfalseにする
  };

  // 入力が変わるたびにデータを取得
  useEffect(() => {
    if (inputValue.trim()) {
      fetchResults(inputValue);
    } else {
      setResults([]); // 入力が空の場合、結果をクリア
      setIsFirstSearch(true); // 入力が空の場合、フラグをリセット
    }
  }, [inputValue]);

  return (
    <div className="relative">
      {/* 検索入力欄 */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="単語を入力"
        className="border p-2 w-full"
      />

      {/* 検索結果の表示 */}
      {results.length > 0 && (
        <ul className="absolute top-10 z-10 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
          {results.map((word: any) => (
            <li key={word.id} className="p-2 hover:bg-gray-100">
              {word.word}
            </li>
          ))}
        </ul>
      )}

      {/* 結果がない場合 */}
      {!isFirstSearch && inputValue && results.length === 0 && <ul className="absolute top-10 z-10 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto"><li>結果なし</li></ul>}
    </div>
  );
};

export default SimpleSearchInput;
