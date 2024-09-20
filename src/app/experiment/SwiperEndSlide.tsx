"use client";
import React, { useState } from "react";
import Spinner from "@/components/Spiner";

export default function SwiperEndSlide() {
  const [loading, setLoading] = useState(false);
  return (
    <>
     <div className="flex items-center justify-center h-full w-full text-white bg-gradient-to-t from-yellow-200 to-orange-400 fixed inset-0">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold flex gap-3">
            <div>Great Job!</div>
            <div className="animate-bounce"> 🎉</div>
        </h1>
        <p className="text-lg mb-5">
          
        </p>
        <button 
          onClick={()=>setLoading(prev => !prev)}  
          className="
            bg-white text-gray-700 
            px-6 py-2 mb-3 font-semibold 
            rounded-full 
            hover:bg-gray-200 transition duration-300 
            flex items-center gap-1">
          復習を記録する
        </button>
        {loading 
          ? (<Spinner size="h-4 w-4 mb-3" borderColor="border-gray-100 border-t-yellow-500"/>)
          : (<p className="mb-3 text-sm text-blue-500">保存に成功しました！</p>)
        }
        <p className="text-sm text-gray-100 text-center">
          今回復習した単語の<br/>
          復習回数と復習日時が更新されます
        </p>
      </div>
    </div>
     
    </>
  );
}
