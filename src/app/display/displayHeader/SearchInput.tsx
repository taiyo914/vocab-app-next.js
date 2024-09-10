//検索入力欄のコンポーネントです
//とりあえずフロントだけで画面に反映させる機能はついてません

"use client";
import { MagnifyingGlassIcon, XCircleIcon,} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const SearchInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
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

  return (
    <div ref={containerRef} className="flex items-center ">
      <button onClick={toggleSearch} className="flex items-center hover:bg-gray-100 duration-300 rounded-lg p-1 px-2">
        <MagnifyingGlassIcon className="h-5 text-gray-400 cursor-pointer " />
        {!isOpen && <span className="text-gray-500 transition-all">検索</span>}   {/* 開いたときは「検索」を非表示 */}
      </button>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: isOpen ? 150 : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="overflow-hidden"
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
          {/* 入力があればバツボタンを表示 */}
          {inputValue && (
            <button onClick={handleClear} className="absolute right-0 top-0 mt-2 mr-2">
              <XCircleIcon className="h-5 text-gray-500" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SearchInput;
