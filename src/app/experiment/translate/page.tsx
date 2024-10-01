// app/page.tsx
'use client';

import React, { useState } from 'react';

const Translate: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('テキストを入力してください。');
      return;
    }

    setLoading(true);
    setError(null);
    setTranslatedText('');

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || '翻訳に失敗しました。');
        return;
      }

      setTranslatedText(data.translatedText);
    } catch (err) {
      console.error('翻訳エラー:', err);
      setError('翻訳に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">テキスト翻訳</h1>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          rows={4}
          placeholder="英語のテキストを入力してください"
        />
        <button
          onClick={handleTranslate}
          className={`w-full p-2 rounded text-white ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
          disabled={loading}
        >
          {loading ? '翻訳中...' : '翻訳する'}
        </button>

        {error && (
          <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {translatedText && (
          <div className="mt-4 p-4 border rounded bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">翻訳結果</h2>
            <p>{translatedText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Translate;
