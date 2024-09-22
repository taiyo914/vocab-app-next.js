"use client";

import { useState } from "react";
import { WordType } from "@/types/Types";

export default function GetWords() {
  const [words, setWords] = useState<WordType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWords = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/getWords", {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API error");
      }

      const data = await response.json();
      setWords(data.words);
    } catch (err: any) {
      setError(err.message || "Error fetching words");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">単語一覧</h1>

      <button
        onClick={fetchWords}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Loading..." : "単語を取得"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <ul className="mt-6">
        {words.map((word) => (
          <li key={word.id} className="mb-4 border-b pb-2">
            <p className="font-bold">{word.word}</p>
            <p>{word.meaning}</p>
            <p>{word.example}</p>
            <p>{word.example_translation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
