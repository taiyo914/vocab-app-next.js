"use client"
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SparklesIcon, ClipboardIcon, ArrowTopRightOnSquareIcon, PencilSquareIcon } from "@heroicons/react/24/outline";


interface ChatGPTButtonProps {
  label: string;
  input: string;
}

const copyPromptAndRedirect = (prompt: string) => {
  const url = "https://chat.openai.com/";
  const newTab = window.open(url, "_blank");

  copyToClipboard(prompt);

  if (newTab) {
    newTab.focus();
  }
};

const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log("プロンプトがクリップボードにコピーされました", text);
      })
      .catch(err => {
        console.error("コピーに失敗しました", err);
      });
  } else {
    copyToClipboardFallback(text);
  }
};

// httpsの本番環境ならすべてのブラウザでnavigator.clipboard.writeText()は動くが、念の為フォールバック
const copyToClipboardFallback = (text: string) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  //一度ページの下にinput要素を追加し、それをコピーして最後input要素を消すという裏技
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
    console.log("Fallback: プロンプトがクリップボードにコピーされました", text);
  } catch (err) {
    console.error("Fallback: コピーに失敗しました", err);
  }
  document.body.removeChild(textArea);
};

const generatePrompt = (label: string, input: string) => {
  switch (label) {
    case "word":
      return `${input}の意味を教えて`;
    case "meaning":
      return `${input}を英語で言うと？`;
    case "example":
      return `${input}を日本語に翻訳すると？`;
    case "example_translation":
      return `${input}を英語で言うと？`;
    case "memo":
      return `メモ: ${input}`;
    default:
      return "";
  }
};

const ChatGPTButton: React.FC<ChatGPTButtonProps> = ({label, input}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <SparklesIcon
        className="h-6 w-12 text-gray-500 cursor-pointer px-2"
      />
      <AnimatePresence>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10"
          >
            <div className="block px-4 pt-3 pb-1 text-black font-semibold">
                ChatGPTに聞く
            </div>
            <ul className="text-[0.9rem]">
              <li
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer
                  flex items-center gap-1
                "
                onClick={() => copyToClipboard(generatePrompt(label, input))}
              >
                <ClipboardIcon className="h-4 w-4"/>
                質問をコピー
              </li>
              <li
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer
                  flex items-center gap-1
                "
                onClick={()=> copyPromptAndRedirect(generatePrompt(label,input))}
              >
                <ArrowTopRightOnSquareIcon  className="h-4 w-4"/>
                ChatGPTへ移動
              </li>
              <li
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer
                  flex items-center gap-1
                "
                onClick={() => console.log("編集できるようにしよう")}
              >
                <PencilSquareIcon className="h-4 w-4"/>
                質問を編集
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatGPTButton;
