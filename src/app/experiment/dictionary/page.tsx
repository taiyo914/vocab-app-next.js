"use client"

import React, { useState } from 'react';

const GoogleSearchLink: React.FC = () => {
  const [word, setWord] = useState('');

  return (
    <div className="container mx-auto text-center mt-10">
      <h1 className="text-2xl font-bold mb-5">Google 検索リンク生成</h1>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="検索したい単語を入力"
        className="border p-2 mb-4"
      />
      {word && (
        <a
          // href={`https://www.google.com/search?q=${encodeURIComponent(word)}`}
          // href={`https://www.ei-navi.jp/dictionary/content/${encodeURIComponent(word)}`}
          href="https://chat.openai.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Googleで「{word}」を検索
        </a>
      )}
    </div>
  );
};

export default GoogleSearchLink;
