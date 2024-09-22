"use client";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const SearchInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]); 
  const [isFirstSearch, setIsFirstSearch] = useState(true); 
  const [showResults, setShowResults] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggleSearch = () => {
    if (!inputValue) {
      setIsOpen(!isOpen);
    }
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        setShowResults(true);
      }, 200);
    }
  };

  const handleClear = () => {
    setInputValue("");
    setResults([]);
    setIsFirstSearch(true);
    setIsOpen(false);
    setShowResults(false); 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        inputValue === "" 
      ) {
        setIsOpen(false);
      }
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false); //検索結果のみを隠す
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputValue]);

  // 入力欄にフォーカスがあたったら検索結果を再表示する
  const handleFocus = () => {
    if (inputValue) {
      setShowResults(true);
    }
  };

  const fetchResults = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]); 
      return;
    }
    const res = await fetch(`/api/search?searchQuery=${searchTerm}`);
    const data = await res.json();
    setResults(data);
    setIsFirstSearch(false); // 最初の検索完了時にフラグをfalseにする
  };

  // 入力が変わるたびにデータを取得
  useEffect(() => {
    if (inputValue) {
      fetchResults(inputValue);
      setShowResults(true); 
    } else {
      setResults([]); 
      setIsFirstSearch(true);  // 空文字になったらリセット
      setShowResults(false); // 入力がないときは検索結果を隠す
    }
  }, [inputValue]);

  return (
    <div ref={containerRef} className="flex items-center relative">
      <button
        onClick={toggleSearch}
        className="flex items-center hover:bg-gray-100 duration-300 rounded-lg p-1 px-2"
      >
        <MagnifyingGlassIcon className="h-5 text-gray-400 cursor-pointer " />
        {!isOpen && <span className="text-gray-500 transition-all">検索</span>}
      </button>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: isOpen ? 150 : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="overflow-hidden relative"
      >
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onFocus={handleFocus} // フォーカス時に検索結果を表示
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
      { showResults && inputValue && results.length > 0 && (
        <ul className="absolute top-10 z-10 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
          {results.map((word: any) => (
            <li key={word.id} className="p-2 hover:bg-gray-100">
              {word.word}
            </li>
          ))}
        </ul>
      )}

      {/* 結果がない場合 */}
      { showResults  && !isFirstSearch && inputValue && results.length === 0 && (
        <ul className="absolute top-10 z-10 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
          <li>結果なし</li>
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
