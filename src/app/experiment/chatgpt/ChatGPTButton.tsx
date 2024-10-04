"use client"
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SparklesIcon, ClipboardIcon, ArrowTopRightOnSquareIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Image  from "next/image"
import useNotificationStore from "@/store/useNotificationStore";
 

interface ChatGPTButtonProps {
  label:string;
  input: string;
  prompt: string;
  openModal: ()=>void;
}

const copyPromptAndRedirect = (prompt: string) => {
  const url = "https://chat.openai.com/";
  const newTab = window.open(url, "_blank");

  copyToClipboard(prompt);

  if (newTab) {
    newTab.focus();
  }
};

const redirect = () =>{
  const url = "https://chat.openai.com/";
  const newTab = window.open(url, "_blank");

  if (newTab) {
    newTab.focus();
  }
}

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

const generatePrompt = (prompt:string, input:string) => {
  return prompt.replace("{input}", input);
};

const ChatGPTButton: React.FC<ChatGPTButtonProps> = ({label, input, prompt, openModal}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const showNotification = useNotificationStore(state => state.showNotification);
  const handleCopy = () =>{
    copyToClipboard(generatePrompt(prompt, input))
    showNotification(`${label}の質問「${generatePrompt(prompt, input)}」をコピーしました`, "success")
  }

  return (<>
    <div 
      className="relative bg-white "
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
            className="absolute right-0 w-56 bg-white border border-gray-300 rounded-md shadow-lg z-20 p-2"
          >
            <div onClick={()=> copyPromptAndRedirect(generatePrompt(prompt,input))}
              className="hover:bg-gray-100 rounded-lg cursor-pointer py-2 group">
              <div className="block px-2 text-black font-[550] flex items-center gap-2">
                  <Image src="/chatgpt_icon.svg" alt="ChatGPTのアイコン"  width={15} height={15} className="mb-0.5"/>
                  ChatGPTに質問する
              </div>
              <p className="text-[0.7rem] text-gray-400 px-2">{label}の質問をコピーして移動します</p>
            </div>
            <ul className="text-[0.9rem]">
              <li
                className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer
                  flex items-center gap-2
                "
                onClick={handleCopy}
              >
                <ClipboardIcon className="h-4 w-4"/>
                {label}の質問をコピー
              </li>
              <li
                className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer
                  flex items-center gap-2
                "
                onClick={redirect}
              >
                <ArrowTopRightOnSquareIcon  className="h-4 w-4"/>
                ChatGPTに移動
              </li>
              <li
                className="block p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer
                  flex items-center gap-2
                "
                onClick={openModal}
              >
                <PencilSquareIcon className="h-4 w-4"/>
                 質問を編集
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

  </>);
};

export default ChatGPTButton;
