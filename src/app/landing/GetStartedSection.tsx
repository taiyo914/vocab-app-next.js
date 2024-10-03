import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function GetStartedSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-t from-blue-500 to-blue-600 flex justify-center">
      <div className="xs:px-5 px-8 md:px-10 lg:px-16 max-w-[1450px] w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-x-8">

          <div className="text-center lg:text-start lg:text-left w-full mb-10 lg:mb-0">
            <h2 className="text-4xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white mb-6">
              今すぐ始めよう
            </h2>
            <div className="text-xl text-blue-100 ">
              <p>すべての機能は無料です。</p>
              VocabAppで日々の英単語学習を
              <div className="sm:hidden"></div>
              加速させましょう。
            </div>
          </div>

          <div className="flex flex-row lg:flex-col justify-center gap-4 w-full">
            <Link href="/signup"
              className="
                w-full text-center 
                px-4 py-3.5 rounded-md font-medium
                bg-white text-blue-600 hover:bg-gray-100 transition-colors duration-300
                flex items-center justify-center gap-1 group"
            >
              新規登録
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-all" />
            </Link>
            <Link href="/signin" className=" 
              w-full text-center 
              px-4 py-3 rounded-md font-medium
              border 
              bg-transparent text-white border-white hover:bg-blue-500 transition-colors duration-300">
              ログイン
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}