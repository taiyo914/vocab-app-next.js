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
      className="relative bg-white text-black"
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
            className="absolute right-0 w-[14.5rem] bg-white border border-gray-300 rounded-md shadow-lg z-20 p-2"
          >
            <div onClick={()=> copyPromptAndRedirect(generatePrompt(prompt,input))}
              className="hover:bg-gray-100 rounded-lg cursor-pointer py-2 group">
              <div className="block px-2 text-black xs:font-normal flex items-center gap-2">
                  {/* <Image src="/chatgpt_icon.svg" alt="ChatGPTのアイコン"  width={15} height={15} className="mb-0.5 ml-[1px]"/> */}
                  <svg
                    width="2500"
                    height="2500"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke-width="1.5"
                    className="h-[16px] w-[16px] text-black"
                    viewBox="-0.17090198558635983 0.482230148717937 41.14235318283891 40.0339509076386"
                  >
                    <path
                      d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18z"
                      fill="currentColor"
                    />
                  </svg>
                  ChatGPTに質問する
              </div>
            </div>
            <ul className="">
              <li
                className="block p-2  hover:bg-gray-100 rounded-lg cursor-pointer
                  flex items-center gap-2
                "
                onClick={handleCopy}
              >
                <ClipboardIcon className="h-4 w-4"/>
                {label}の質問をコピー
              </li>
              <li
                className="block p-2  hover:bg-gray-100 rounded-lg cursor-pointer
                  flex items-center gap-2
                "
                onClick={redirect}
              >
                <ArrowTopRightOnSquareIcon  className="h-4 w-4"/>
                ChatGPTに移動
              </li>
              <li
                className="block p-2 hover:bg-gray-100 rounded-lg cursor-pointer
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
