"use client";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import useSearchStore from "@/store/searchStore";
import { WordType } from "@/types/Types";
import EditWordModal from "@/components/EditWordModal";
import useUserStore from "@/store/userStore";
let lastRequestTime = 0;

const MobileSearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const {
    tempResults,
    setTempResults,
    setResults,
    searchTriggered,
    setSearchTriggered,
    isOpen,
    setIsOpen,
  } = useSearchStore();
  const incrementfechingKey = useUserStore((state) => state.incrementFetchingKey);
  const [isFirstSearch, setIsFirstSearch] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBackgroundDimmed, setIsBackgroundDimmed] = useState(false); // 背景暗くするフラグ
  const [selectedWord, setSelectedWord] = useState<WordType | null>(null);
  const handleWordClick = (word: WordType) => {
    setSelectedWord(word);
    setIsModalOpen(true);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  const clickSearchIcon = () => {
    if (!inputValue.trim()) {
      setIsOpen(!isOpen);
      setSearchTriggered(false);
      setIsBackgroundDimmed(!isOpen);
    }

    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        setShowResults(true);
      }, 500);
    }

    if (inputValue.trim()) {
      setResults(tempResults);
      setSearchTriggered(true);
      setShowResults(false);
      incrementfechingKey(); //keyを変更してアニメーションを発火
    }
  };

  const handleClear = () => {
    setInputValue("");
    setResults([]);
    setIsFirstSearch(true);
    setIsOpen(false);
    setShowResults(false);
    if (searchTriggered) incrementfechingKey(); //keyを変更してアニメーションを発火
    setSearchTriggered(false);
    setIsBackgroundDimmed(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isOpen) return; //検索欄が開いているときだけ有効にする

      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (inputValue.trim() === "") {
          handleClear();
        } else {
          setShowResults(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputValue, searchTriggered, isOpen]);

  // 入力欄にフォーカスがあたったら検索結果を再表示する
  const handleFocus = () => {
    if (inputValue) {
      setShowResults(true);
    }
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
      setShowResults(true);
    } else {
      setTempResults([]);
      setIsFirstSearch(true);
      setShowResults(false);
    }
  }, [inputValue]);

  return (<>
  {/* 背景を暗くする */}
    {isBackgroundDimmed && (
      <motion.div
      initial = {{opacity:0,}}
      animate = {{opacity:1}}
      transition={{duration:0.5, ease: "easeInOut"}}
        onClick={() => {
          setIsOpen(false);
          setIsBackgroundDimmed(false); // 背景を元に戻す
        }}
        className="fixed inset-0 bg-black bg-opacity-20 z-10"
      />
    )}
  
     <div ref={containerRef} className="" >
       {/* 画面右下に固定された検索アイコン */}
       <button
         onClick={clickSearchIcon}
         className="fixed bottom-4 right-4 bg-gray-100 p-2 rounded-full shadow-lg z-10"
       >
         <MagnifyingGlassIcon className="h-[24px] text-gray-400 cursor-pointer" />
       </button>

       {/* 検索モーダル部分 */}
       <motion.div
         initial={{ y: "120%" }}
         animate={{ y: isOpen ? "0%" : "120%" }}
         exit={{ y: "120%" }}
         transition={{ duration: 0.3, ease: "easeOut" }}
         className={`fixed top-20 left-0 w-full bottom-0 bg-white z-10 ${ isOpen && "shadow-lg"} `}
       >
          <div className="mt-3 px-2 flex flex-col h-full">
           <div className="flex items-center justify-between gap-2bg-white">
             <button onClick={clickSearchIcon}>
               <MagnifyingGlassIcon className="h-[24px]  text-gray-400 cursor-pointer" />
             </button>
             <input
               ref={inputRef}
               type="text"
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               className="w-full py-2 px-4 focus:outline-none border rounded-md"
               placeholder="検索キーワードを入力..."
             />
             <button onClick={handleClear} className="">
               <XCircleIcon className="h-[24px] text-gray-500" />
             </button>
           </div>
           {/* 検索結果の表示 */}
           <div className="mt-4 overflow-y-auto flex-grow">
             {showResults && inputValue && tempResults.length > 0 && (
               <ul className="max-h-full overflow-y-auto">
                 {tempResults.map((word: WordType) => (
                   <li
                     key={word.id}
                     onClick={() => handleWordClick(word)}
                     className="rounded-md p-2 hover:bg-gray-100 transition-all duration-100 break-words cursor-pointer"
                   >
                     {word.word}
                   </li>
                 ))}
                 <li className="h-6"> </li>
               </ul>
             )}

             {/* 結果がない場合 */}
             {showResults && !isFirstSearch && inputValue && tempResults.length === 0 && (
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

// useEffect(() => {
//   if (isOpen) {
//     document.body.style.overflow = "hidden";
//   } else {
//     document.body.style.overflow = "";
//   }
//   return () => {
//     document.body.style.overflow = "";
//   };
// }, [isOpen]);

