"use client"
import React, { useState } from 'react';

const WordSpeaker: React.FC = () => {
  // テキストと国の選択を管理するためのstate
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('en-US'); // 初期設定はアメリカ英語

  // テキストを読み上げる関数
  const speak = () => {
    if (!text) return; // テキストが入力されていなければ読み上げない
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language; // 選択された国の言語で読み上げ
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Text to Speech App</h1>

      {/* テキスト入力 */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to read aloud"
        className="border rounded p-2 w-full max-w-md mb-4"
      />

      {/* 国の選択 */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="border rounded p-2 w-full max-w-md mb-4"
      >
        <option value="en-US">English (United States)</option>
        <option value="en-GB">English (United Kingdom)</option>
        <option value="en-AU">English (Australia)</option>
      </select>

      {/* 読み上げボタン */}
      <button
        onClick={speak}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Read Aloud
      </button>
    </div>
  );
};

export default WordSpeaker;
