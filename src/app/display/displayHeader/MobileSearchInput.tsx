"use client";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useSearchStore from "@/store/searchStore";
import { WordType } from "@/types/Types";
import EditWordModal from "@/components/EditWordModal";
let lastRequestTime = 0;

const MobileSearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const {tempResults, setTempResults, isOpen, setIsOpen,} = useSearchStore();
  const [isFirstSearch, setIsFirstSearch] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<WordType | null>(null);
  const handleWordClick = (word: WordType) => {
    setSelectedWord(word);
    setIsModalOpen(true);
  };

  //後ろの画面をスクロールできなくする設定
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClear = () => {
    setInputValue("");
    setIsFirstSearch(true);
    setIsOpen(false);
  };

  const fetchResults = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setTempResults([]);
      return;
    }

    const requestTime = Date.now();
    lastRequestTime = requestTime;

    const res = await fetch(`/api/search?searchQuery=${searchTerm}`);
    const data = await res.json();

    if (requestTime === lastRequestTime) {
      setTempResults(data);
      setIsFirstSearch(false);
    }
  };

  // 入力が変わるたびにデータを取得
  useEffect(() => {
    if (inputValue) {
      fetchResults(inputValue);
    } else {
      setTempResults([]);
      setIsFirstSearch(true);
    }
  }, [inputValue]);

  return (<>
  {/* 背景を暗くする */}
    {isOpen && (
      <motion.div
      initial = {{opacity:0,}}
      animate = {{opacity:1}}
      transition={{duration:0.5, ease: "easeInOut"}}
        onClick={() => {
          setIsOpen(false);
        }}
        className="fixed inset-0 bg-black bg-opacity-20 z-10"
      />
    )}
  
     <div className="" >
       {/* 画面右下に固定された検索アイコン */}
       <div
        onClick = {() => setIsOpen(true)}
        className={`flex items-center hover:bg-gray-100 duration-300 rounded-lg py-1`}
      >
        <MagnifyingGlassIcon className="h-[22px] text-gray-400 cursor-pointer" />
        <span className="text-gray-500 transition-all">検索</span>
      </div>

       {/* 検索モーダル部分 */}
       <motion.div
         initial={{ y: "120%" }}
         animate={{ y: isOpen ? "0%" : "120%" }}
         exit={{ y: "120%" }}
         transition={{ duration: 0.3, ease: "easeOut" }}
         className={`fixed top-20 left-0 w-full bottom-0 bg-white z-10 ${ isOpen && "shadow-lg"} `}
       >
          <div className="mt-3 flex flex-col h-full">
            <div className="">
              <div className="flex items-center justify-between gap-2 px-2 bg-white">
                <MagnifyingGlassIcon className="h-[24px]   text-gray-400" />
                <input
                  id = "input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full py-2 px-3 focus:outline-none border rounded-md"
                  placeholder="検索キーワードを入力..."
                  autoFocus={true}
                  tabIndex={0}
                />
                <button onClick={handleClear} className="">
                  <XCircleIcon className="h-[24px] text-gray-500 " />
                </button>
              </div>
           </div>
           {/* 検索結果の表示 */}
           <div className="mt-3 overflow-y-auto flex-grow">
             {inputValue && tempResults.length > 0 && (
               <ul className="max-h-full overflow-y-auto">
                 {tempResults.map((word: WordType) => (
                   <li
                     key={word.id}
                     onClick={() => handleWordClick(word)}
                     className="rounded-md py-2 px-4 rounded hover:bg-gray-100 transition-all duration-100 break-words cursor-pointer"
                   >
                     {word.word}
                   </li>
                 ))}
                 <li className="h-6"> </li>
               </ul>
             )}

             {/* 結果がない場合 */}
             {!isFirstSearch && inputValue && tempResults.length === 0 && (
               <ul className="p-2 text-gray-400 mt-4">
                 <li>結果なし</li>
               </ul>
             )}
           </div>
         </div>

       </motion.div>

       {/* 編集モーダル */}
       <EditWordModal
         isOpen={isModalOpen}
         onClose={() => setIsModalOpen(false)}
         editWord={selectedWord}
         setEditWord={setSelectedWord}
         showDeleteBtn={true}
       />
     </div>
   </>);
};

export default MobileSearchInput;


