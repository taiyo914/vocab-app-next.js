"use client"
import { color } from "framer-motion";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/16/solid";

const TopButtons = () => {
  return (
    <div> {/* Homeコンポーネントのflex-colの影響で、 これがないと画面幅に広がらないので消さないでください*/}
      <div className="px-5 xs:px-3 xs:py-4 py-5 lg:py-[1.4rem] mx-auto max-w-[2000px]">
        <div className="flex jusity-center xs:flex-col gap-x-3 md:gap-x-4 lg:gap-x-5 xs:gap-y-3 my-0 ">
          <Link
            href="new"
            className="
              text-center font-semibold text-black
              xs:font-bold xs:text-lg md:text-lg xl:text-xl
              w-full xs:py-2 py-2.5 md:py-[0.7rem] xl:py-3 
              border rounded-md shadow-md 
              hover:bg-gray-200  transition-all duration-300 
              flex items-center justify-center gap-1 xs:gap-0"
          >
            <PlusCircleIcon className="h-6"/>
            <div>単語を追加する</div>
            <div className="invisible "></div>
          </Link>
          <Link
            href="review"
            className="
              text-center font-semibold
              xs:font-bold xs:text-lg md:text-lg xl:text-xl
              w-full py-2.5 xs:py-2 md:py-[0.7rem] xl:py-3 
              bg-blue-500 text-white
              rounded-md shadow-md 
              hover:bg-blue-600 transition-all duration-300
              flex items-center justify-center gap-1 xs:gap-0.5"
          > 
            <PlayCircleIcon className="h-6"/>
            <div>ページを復習</div>
            <div className="invisible w-2"></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopButtons;
