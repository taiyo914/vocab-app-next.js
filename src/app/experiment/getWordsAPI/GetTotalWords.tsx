"use client";

import { useState } from "react";
import { WordType } from "@/types/Types";

export default function GetTotalWords() {
  const [totalWords, setTotalWords] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTotalWords = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/getTotalWords", {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API error");
      }

      const data = await response.json();
      setTotalWords(data.totalWords);

    console.log("取得できてる？", data)
    } catch (err: any) {
      setError(err.message || "Error fetching words");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">総単語数</h1>

      <button
        onClick={fetchTotalWords}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Loading..." : "単語を取得"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mb-4 border-b pb-2" >{totalWords}</div>

    </div>
  );
}
