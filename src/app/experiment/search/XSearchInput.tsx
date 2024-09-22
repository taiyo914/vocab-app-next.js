"use client";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import debounce from "lodash/debounce";

const SearchInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]); // 検索結果
  const [isDataFetched, setIsDataFetched] = useState(false); // データ取得完了フラグ
  const [isContainerVisible, setIsContainerVisible] = useState(false); // コンテナの可視性フラグ
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
    setIsDataFetched(false);
    setIsContainerVisible(false); // コンテナが非表示になる
    setIsOpen(false);
  };

  // デバウンスされた検索関数
  const fetchResults = useCallback(
    debounce(async (searchTerm) => {
      if (!searchTerm.trim()) {
        setResults([]);
        setIsDataFetched(false); // データが空の場合にフラグをリセット
        return;
      }
      setIsDataFetched(false); // データ取得前にリセット
      const res = await fetch(`/api/search?searchQuery=${searchTerm}`);
      const data = await res.json();
      setResults(data);
      setIsDataFetched(true); // データ取得完了フラグ
    }, 300), 
    []
  );

  useEffect(() => {
    if (!inputValue.trim()) {
      setResults([]);
      setIsContainerVisible(false); // 入力が空白になったらコンテナを非表示に
      return;
    }

    if (!isContainerVisible) {
      setIsContainerVisible(true); // 最初の入力時にコンテナを表示
    }

    fetchResults(inputValue); // 入力が変わるたびにデバウンスされた検索を呼び出す
  }, [inputValue, fetchResults, isContainerVisible]);

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

      {/* コンテナのアニメーションは最初の表示時のみ */}
      <AnimatePresence>
        {isContainerVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} // ✗ボタンで閉じるときに滑らかに消える
            transition={{ duration: 0.3 }}
            className="absolute top-7 z-10 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto"
          >
            {/* 結果表示のアニメーション */}
            {isDataFetched && results.length > 0 ? (
              <motion.ul
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="max-h-60"
              >
                {results.map((word: any) => (
                  <li key={word.id} className="p-2 hover:bg-gray-100">
                    {word.word}
                  </li>
                ))}
              </motion.ul>
            ) : (
              inputValue.trim() && isDataFetched && <p className="p-2">結果なし</p> // 結果がない場合の表示
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchInput;
