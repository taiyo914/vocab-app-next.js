"use client";

import { useState } from "react";
import { WordsSettingsType } from "@/types/Types";

export default function GetWordsSettings() {
  const [settings, setSettings] = useState<WordsSettingsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/getWordsSettings", {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API error");
      }

      const data = await response.json();
      setSettings(data.userWordsSettings);
    } catch (err: any) {
      setError(err.message || "Error fetching settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">ユーザー設定</h1>

      <button
        onClick={fetchSettings}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Loading..." : "設定を取得"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {settings && (
        <div className="mt-6">
          <h2 className="font-bold text-lg mb-2">取得した設定:</h2>
          <ul className="list-disc pl-6">
            <li><strong>開始インデックス:</strong> {settings.start_index}</li>
            <li><strong>終了インデックス:</strong> {settings.end_index}</li>
            <li><strong>開始レビュー回数:</strong> {settings.start_review_count}</li>
            <li><strong>終了レビュー回数:</strong> {settings.end_review_count}</li>
            <li><strong>日付フィールド:</strong> {settings.date_field}</li>
            <li><strong>開始日付:</strong> {settings.start_date}</li>
            <li><strong>終了日付:</strong> {settings.end_date}</li>
            <li><strong>ソートフィールド:</strong> {settings.sort_field}</li>
            <li><strong>ソート順:</strong> {settings.sort_order}</li>
            <li><strong>ページオフセット:</strong> {settings.page_offset}</li>
            <li><strong>表示件数:</strong> {settings.display_count}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
