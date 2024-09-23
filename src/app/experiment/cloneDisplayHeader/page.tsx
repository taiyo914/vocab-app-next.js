"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const DisplayHeader = () => {
  return (
    <div className="px-5 xs:px-3 max-w-[2000px] mx-auto mt-10">
      <div className="flex items-center justify-between">
        <Tabs />
        <div className="flex ">
          <SearchInput />
          <SettingsButton />
        </div>
      </div>
    </div>
  );
};

export default DisplayHeader;

import { motion } from "framer-motion";
import useTabStore from "@/store/currentTabStore";

const Tabs = () => {
  const { currentTab, setTab, isLoading, setIsLoading } = useTabStore();

  useEffect(() => {
    const savedTab = localStorage.getItem("currentTab");
    //アニメーションが早くかかりすぎないように最低0.5秒は遅延させる（ちゃんとsetTabはセットされてる)
    const loadTabFromStorage = new Promise<void>((resolve) => {
      if (savedTab) {
        setTab(savedTab);
      }
      resolve();
    });

    const delay = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });

    Promise.all([loadTabFromStorage, delay]).then(() => {
      setIsLoading(false);
    });
  }, [setTab]);

  const handleTabChange = (tab: string) => {
    setTab(tab);
    localStorage.setItem("currentTab", tab);
  };

  return (
    <div className="flex">
      <motion.div
        onClick={() => handleTabChange("cards")}
        className={`
          cursor-pointer 
          py-2 px-5
          border-t border-l border-r
          rounded-tl-lg rounded-tr-lg
          duration-300
          ease-out
          transition-all
          ${
            isLoading
              ? "text-gray-400 font-semibold border-r"
              : currentTab === "cards"
              ? "font-bold bg-gray-100"
              : "hover:bg-gray-50 text-gray-400 font-semibold "
          }`}
      >
        カード
      </motion.div>
      <div
        onClick={() => handleTabChange("table")}
        className={`
          cursor-pointer 
          py-2 px-3 
          border-t border-r 
          rounded-tl-lg rounded-tr-lg
          transition-all
          duration-300
          ${
            isLoading
              ? "text-gray-400 font-semibold"
              : currentTab === "table"
              ? "bg-gray-100 font-bold"
              : "hover:bg-gray-50 text-gray-400 font-semibold "
          }`}
      >
        テーブル
      </div>
    </div>
  );
};

import { useRef } from "react";
import useSearchStore from "@/store/searchStore";
let lastRequestTime = 0;
import {   AnimatePresence } from "framer-motion"

const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const { setResults, searchTriggered, setSearchTriggered, isOpen, setIsOpen } = useSearchStore();
  const [isFirstSearch, setIsFirstSearch] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [tempResults, setTempResults] = useState([]);

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
    }
  };

  const handleClear = () => {
    setInputValue("");
    setResults([]);
    setSearchTriggered(false);
    setIsFirstSearch(true);
    setIsOpen(false);
    setShowResults(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // クリックされた要素がinputの外のとき
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (inputValue.trim() === "") {
          handleClear();
        } else {
          if (searchTriggered) {
            setShowResults(false);
          } else {
            handleClear();
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputValue, searchTriggered]);

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

  return (
    <div ref={containerRef} className="flex items-center relative border ">
      <button
        onClick={clickSearchIcon}
        className="flex items-center hover:bg-gray-100 duration-300 rounded-lg p-1 px-2"
      >
        <MagnifyingGlassIcon className="h-5 text-gray-400 cursor-pointer " />
        {!isOpen && <span className="text-gray-500 transition-all">検索</span>}
      </button>
      
      { isOpen && (
        <div 
          className="relative w-full border"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onFocus={handleFocus}
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
      )}


      {/* 検索結果の表示 */}
      {showResults && inputValue && tempResults.length > 0 && (
        <ul className="absolute top-[100%] z-10 mr-3 bg-white border rounded-lg shadow-lg max-h-[400px] overflow-y-auto">
          {tempResults.map((word: any) => (
            <li key={word.id} className="p-2 hover:bg-gray-100">
              {word.word}
            </li>
          ))}
        </ul>
      )}

      {/* 結果がない場合 */}
      {showResults && !isFirstSearch && inputValue && tempResults.length === 0 && (
        <ul className="absolute top-10 z-10 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
          <li>結果なし</li>
        </ul>
      )}
    </div>
  );
};

import useWordsSettingsModalStore from "@/store/wordsSettingsModalStore";
const SettingsButton = () => {
  const { toggleModal } = useWordsSettingsModalStore();
  const { isOpen } = useSearchStore();

  return (
    <>
      {!isOpen &&(
        <button
          onClick={toggleModal}
          className="cursor-pointer flex items-center text-gray-500 hover:bg-gray-100 duration-300 rounded-lg p-1 px-2"
        >
          <AdjustmentsHorizontalIcon className="h-6 text-gray-400 " />
          設定
        </button>
      ) }
    </>
  );
};
