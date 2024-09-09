"use client"
import { color } from "framer-motion";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/16/solid";

const TopButtons = () => {
  return (
    <div> {/* Homeコンポーネントのflex-colの影響で、 これがないと画面幅に広がらないので消さないでください*/}
      <div className="p-3 xs:p-5 mx-auto max-w-[2000px]">
        <div className="flex jusity-center flex-col xs:flex-row xs:space-x-4 xs:my-0 my-2">
          <Link
            href="new"
            className="
              text-center font-semibold
              w-full xs:w-1/2 py-2   
              xs:mb-0 mb-1
              border rounded-md shadow-md 
              hover:bg-gray-200  transition-all duration-300 
              flex items-center justify-center space-x-1"
          >
            <PlusCircleIcon className="h-7"/>
            <div>単語を追加する</div>
            <div className="invisible "></div>
          </Link>
          <Link
            href="review"
            className="
              text-center font-semibold 
              w-full xs:w-1/2 py-2 
              mt-2 xs:mt-0
              bg-blue-500 text-white
              rounded-md shadow-md 
              hover:bg-blue-600 transition-all duration-300
              flex items-center justify-center space-x-1"
          > 
            <PlayCircleIcon className="h-7"/>
            <div>ページを復習</div>
            <div className="invisible w-2"></div>
          </Link>
        </div>
      </div>
      {/* <div className="flex justify-end mr-5 ">
        <Link href={"/experiment"} className="p-2 border rounded-full">experiment</Link>
      </div> */}
    </div>
  );
};

export default TopButtons;
