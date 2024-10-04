"use client";
// pages/index.tsx

import React, { useState } from 'react';
import AddNewWord from './form';

const ChatGPTPrompt: React.FC = () => {
  const [word, setWord] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyAndRedirect = () => {
    const prompt = `${word}の意味を教えて`;

    const newTab = window.open("https://chat.openai.com/", "_blank");

    copyToClipboard(prompt);

    if (newTab) {
      newTab.focus(); 
    }
  };

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        console.log("クリップボードにコピーしました");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // 2秒後にメッセージをリセット
      }).catch(err => {
        console.error("コピーに失敗しました", err);
      });
    } else {
      copyToClipboardFallback(text);
    }
  };

  const copyToClipboardFallback = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      console.log("Fallback: コピーに成功しました");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Fallback: コピーに失敗しました", err);
    }

    document.body.removeChild(textArea);
  };

  return (<>
    <div className="container mx-auto text-center mt-10">
      {/* <h1 className="text-2xl font-bold mb-5">ChatGPT用のプロンプト生成</h1>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="単語を入力"
        className="border p-2 mb-4"
      />
      <button
        onClick={handleCopyAndRedirect}
        className="bg-green-500 text-white p-2 rounded mb-4"
        disabled={!word}  // 単語が入力されていないとボタンは無効化
      >
        「{word}の意味を教えて」をコピーしてChatGPTを開く
      </button>
      {copied && <p className="text-green-500 mt-2">プロンプトをコピーしました！</p>} */}
    </div>
    <AddNewWord/>
  </>);
};

export default ChatGPTPrompt;
