"use client";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const SearchInput = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]); // 検索結果
  const [isFirstSearch, setIsFirstSearch] = useState(true); // 最初の検索を制御するフラグ

  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggleSearch = () => {
    if (!inputValue) {
      setIsOpen(!isOpen);
    }
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  };

  const handleClear = () => {
    setInputValue("");
    setResults([]);
    setIsFirstSearch(true)
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        inputValue === "" // 入力があるときは閉じない
      ) {
        setIsOpen(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputValue]);


  // 検索結果を取得する関数
  const fetchResults = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]); // 空白の場合は結果をクリア
      return;
    }
    const res = await fetch(`/api/search?searchQuery=${searchTerm}`);
    const data = await res.json();
    setResults(data); // 取得した結果をセット
    setIsFirstSearch(false); // 最初の検索完了時にフラグをfalseにする
  };

  // 入力が変わるたびにデータを取得
  useEffect(() => {
    if (inputValue) {
      fetchResults(inputValue);
    } else {
      setResults([]); // 入力が空の場合、結果をクリア
      setIsFirstSearch(true); // 入力が空の場合、フラグをリセット
    }
  }, [inputValue]);

  return (
    <div ref={containerRef} className="flex items-center relative">
      <button onClick={toggleSearch} className="flex items-center hover:bg-gray-100 duration-300 rounded-lg p-1 px-2">
        <MagnifyingGlassIcon className="h-5 text-gray-400 cursor-pointer " />
        {!isOpen && <span className="text-gray-500 transition-all">検索</span>}
      </button>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: isOpen ? 150 : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="overflow-hidden relative"
      >
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="py-1 pl-1 focus:outline-none"
            placeholder="入力して検索..."
            style={{ width: "100%" }}
          />
          {inputValue && (
            <button onClick={handleClear} className="absolute right-0 top-0 mt-2 mr-2">
              <XCircleIcon className="h-5 text-gray-500" />
            </button>
          )}
        </div>
      </motion.div>

      {/* 検索結果の表示 */}
      { inputValue && results.length > 0 && (
        <ul className="absolute top-10 z-10 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
          {results.map((word: any) => (
            <li key={word.id} className="p-2 hover:bg-gray-100">
              {word.word}
            </li>
          ))}
        </ul>
      )}

      {/* 結果がない場合 */}
      {!isFirstSearch && inputValue && results.length === 0 && <ul className="absolute top-10 z-10 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto"><li>結果なし</li></ul>}
  
    </div>
  );
};

export default SearchInput;
