"use client";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import useSearchStore from "@/store/searchStore";
import { WordType } from "@/types/Types";
import EditWordModal from "@/components/EditWordModal";
import useUserStore from "@/store/userStore";
import { createClient } from "@/utils/supabase/client";
let lastRequestTime = 0;

const SearchInput = () => {
  const supabase = createClient()
  const [inputValue, setInputValue] = useState("");
  const { tempResults, setTempResults, setResults, searchTriggered, setSearchTriggered, isOpen, setIsOpen } = useSearchStore();
  const incrementfechingKey = useUserStore((state) => state.incrementFetchingKey);
  const [isFirstSearch, setIsFirstSearch] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<WordType | null>(null);
  const handleWordClick = (word: WordType) => {
    setSelectedWord(word);
    setIsModalOpen(true);
  };
  const userId = useUserStore(state => state.userId)

  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const clickSearchIcon = () => {
    if (!inputValue.trim()) {
      setIsOpen(!isOpen);
      setSearchTriggered(false);
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
    if(!userId) alert("ユーザーidがありません。リロードして下さい。")

    if (!searchTerm.trim()) {
      setTempResults([]);
      return;
    }

    const requestTime = Date.now();
    lastRequestTime = requestTime;

    const { data, error } = await supabase
      .rpc('search_words', { query: searchTerm, user_id: userId });

    if (error) {
      alert(`検索中にエラーが発生しました: ${error.message}`);
      return;
    }

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

  return (
    <div ref={containerRef} className="flex items-center relative">
      <button
        onClick={clickSearchIcon}
        className={`flex items-center hover:bg-gray-100 duration-300 rounded-lg py-1 ${
          isOpen ? "px-1 mr-1" : " px-2"
        }`}
      >
        <MagnifyingGlassIcon className="h-[22px] text-gray-400 cursor-pointer" />
        {!isOpen && <span className="text-gray-500 transition-all">検索</span>}
      </button>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: isOpen ? 140 : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="overflow-hidden relative"
      >
        <div className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onFocus={handleFocus}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-[120px] py-1 focus:outline-none"
            placeholder="入力して検索..."
          />
          {inputValue && (
            <button onClick={handleClear} className="">
              <XCircleIcon className="h-[20px] text-gray-500" />
            </button>
          )}
        </div>
      </motion.div>

      {/* 検索結果の表示 */}
      {showResults && inputValue && tempResults.length > 0 && (
        <ul
          className="
          absolute top-[100%] z-10 p-2
          bg-white border rounded-lg shadow-lg 
          max-h-[400px] w-[185px] 
          overflow-y-auto"
        >
          {tempResults.map((word: WordType) => (
            <li
              key={word.id}
              onClick={() => handleWordClick(word)}
              className="rounded-md p-2 hover:bg-gray-100 transition-all duration-100 break-words cursor-pointer"
            >
              {word.word}
            </li>
          ))}
        </ul>
      )}

      {/* 結果がない場合 */}
      {showResults && !isFirstSearch && inputValue && tempResults.length === 0 && (
        <ul className="p-2 text-gray-400 absolute top-10 z-10 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
          <li>結果なし</li>
        </ul>
      )}

      <EditWordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editWord={selectedWord}
        setEditWord={setSelectedWord}
        showDeleteBtn = {true}
      />
    </div>
  );
};

export default SearchInput;
