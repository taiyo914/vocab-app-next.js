"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import useUserStore from "@/store/userStore";

const Pagination = () => {
  const { wordsSettings, totalWords, incrementOffset, decrementOffset, page_offset } = useUserStore();
  const displayCount = wordsSettings?.display_count || 10;
  return (
    <>
      <div className="flex items-center">
        <button
          onClick={decrementOffset}
          disabled={page_offset === 1}
          className={`p-2 rounded-full transition duration-200 ${
            page_offset === 1 ? "opacity-30" : "hover:bg-gray-100"
          }`}
        >
          <ChevronLeftIcon className="h-5 text-gray-600" />
        </button>
        <span className="bg-gray-100 py- px-3 mx-1 rounded-md text-lg font-medium text-gray-700">
          {page_offset}
        </span>
        <span className="text-sm text-gray-500 mr-1">
          {" "}
          / {totalWords !== 0 ? Math.ceil(totalWords / displayCount) : "..."}
        </span>
        <button
          onClick={incrementOffset}
          disabled={page_offset * displayCount >= totalWords}
          className={`p-2 rounded-full transition duration-200 ${
            totalWords !== 0 && page_offset * displayCount >= totalWords
              ? "opacity-30"
              : "hover:bg-gray-100"
            // "totalWords !== 0 &&"は初回レンダリングで2つ目の四季が計算できないときにfalseを返し、ボタンが一瞬透明になるのを防ぐため
          }`}
        >
          <ChevronRightIcon className="h-5 text-gray-600" />
        </button>
      </div>
    </>
  );
};

export default Pagination;

