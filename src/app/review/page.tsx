"use client";

import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Mousewheel } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import useUserStore from "@/store/userStore";
import LoadingDots from "@/components/LoadingDots";
import CustomSlider from "@/components/CustomSlider";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { WordType } from "@/types/Types";
import EditModal from "@/app/review/EditModal";
import useReviewSettingsStore from "@/store/reviewSettingsStore";
import ReviewSettingsModal from "./ReviewSettingsModal";
import ReviewTopButtons from "./ReviewTopButtons";
import SpeechButton from "@/components/SpeechButton";
import "./swiper-style.css"

const Review = () => {
  const supabase = createClient();
  const swiperRef = useRef<any>(null); // Swiperインスタンスを保持するuseRef
  const { userId, words, wordsSettings, setWords,
    fetchWords, fetchUserId, fetchUserWordsSettings,} = useUserStore();
  const { fields, showEmptyCards, accent, fetchReviewSettings } = useReviewSettingsStore();
  const [editWord, setEditWord] = useState<WordType | null>(null); // 編集するwordの状態
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // モーダルの開閉状態
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    
  // userId の取得（存在しないときのみ実行）
  useEffect(() => {
    if (!userId) {
      fetchUserId(); 
      console.log("ユーザーIDの取得", userId);
    }
  }, [userId, fetchUserId]);

  // fields と showEmptyCards の取得（存在しないときのみ実行）
  useEffect(() => {
    if (userId && !fields && showEmptyCards === null && !accent) {
      fetchReviewSettings(userId); 
      console.log("設定の取得", fields, showEmptyCards);
    }
  }, [userId, fields, showEmptyCards, accent, fetchReviewSettings]);

  // words の取得 （存在しないときのみ実行）
  useEffect(() => {
    const fetchWordsIfNeeded = async () => {
      if (!words && userId) {
        const wordsSettingsError = await fetchUserWordsSettings();
        if (wordsSettingsError) {
          console.error("設定の取得中にエラーが発生しました:", wordsSettingsError);
          return;
        }
        await fetchWords(); 
        console.log("単語の取得", words);
      }
    };
    fetchWordsIfNeeded();
  }, [words, userId, wordsSettings, fetchUserWordsSettings, fetchWords]);

  if (!userId || !fields || showEmptyCards === null || !accent || !words) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingDots />
      </div>
    );
  }

  const openEditModal = (word: WordType) => {
    //wordを受け取り、editWordに初期値として情報をセットしてからモーダルを開く
    setEditWord(word);
    setIsEditModalOpen(true); 
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false); 
    setEditWord(null); 
  };

  const goToFirstSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0); // 最初のスライドに戻る
    }
  };

  const handleSliderChange = (newIndexValue: number, wordId: string) => {
    //1. words状態を更新
    const updatedWords = words!.map((word) =>
      word.id === wordId ? { ...word, index: newIndexValue } : word
    );
    setWords(updatedWords);
    // 2. Supabaseに変更を反映
    const updateWordIndex = async () => {
      try {
        const { error } = await supabase
          .from("words")
          .update({ index: newIndexValue })
          .eq("id", wordId);
        if (error) {
          console.error("Supabase更新エラー:", error.message);
        } else {
          console.log("indexの変更がsupabaseに保存されました!!");
        }
      } catch (err) {
        console.error("データベース更新中にエラーが発生しました:", err);
      }
    };

    updateWordIndex();
  };

  const commonDisplay = (
    word: WordType,
    label: string,
    content: string,
    additionalSettings: string,
    accent: string
  ) => {
    return (
      <div className="h-full w-full relative">
        <div className="flex flex-col h-full justify-between items-center w-full">
          {/* カードのヘッダー */}
          <div
            className="
            flex justify-between items-start w-full h-[81px]"
            // px-4 xs:px-2 pt-4 short:pt-2 short:px-3 
          >
            {/*---長さを合わせるだけのダミー要素。スマホサイズで存在ごと消えます。---*/}
            <div className="invisible xs:hidden pt-[20px] pr-[17px]">
              <div className="flex items-center border rounded-3xl px-3 py-1 mt-1 ">
                <PencilSquareIcon className="h-5" />
                <div>カードを編集</div>
              </div>
            </div>

            <div className="text-gray-400 text-2xl pt-[21px] xs:pl-[20px]">{label}</div>
            <div className="pt-[20px] pr-[17px]">
              <button
                onClick={() => openEditModal(word)}
                className="flex items-center border rounded-3xl px-3 py-1  text-gray-500
                        hover:bg-gray-100 transition-all duration-300 ease-out"
              >
                <PencilSquareIcon className="h-5" />
                <div>カードを編集</div>
              </button>
            </div>

          </div>

          {/* コンテンツ */}
          <div className={`f-full flex flex-col items-center justify-center xs:px-[25px] px-[65px] lg:px-[80px] `}>
            
            <div className={`xs:mt-[55px]  ${additionalSettings}`}>
              {content}
            </div>
            {content && (<div className="h-[25px] w-[25px] mt-[15px] text-gray-400 notxs:hidden">
              <SpeechButton word={content} accent={accent} />
            </div>)}
          </div>

          {/* カスタムスライダー */}
          <div className="w-full px-[42px] xs:w-full xs:px-[22px] mb-[30px] max-w-2xl z-10">
            <CustomSlider
              sliderValue={word.index}
              onChange={(value) => handleSliderChange(value, word.id)}
            />
          </div>
        </div>
        <div 
          className="
            xs:hidden
            h-[32px] w-[32px]
            text-gray-500
            absolute top-[50%] -mt-[70px] right-[19px]    
            hover:text-gray-600
            transition duration-200"
          >
            <SpeechButton word={content} accent={accent} />
          </div>
      </div>
    );
  };

  const renderField = (word: WordType, field: string) => {
    switch (field) {
      case "word":
        return commonDisplay(word, "単語", word.word, "xs:text-[2.5rem] text-5xl  lg:text-6xl font-bold leading-snug xs:leading-[1.2]", accent);
      case "meaning":
        return commonDisplay(word, "意味", word.meaning, "xs:text-[2.3rem] text-5xl  lg:text-6xl  font-bold leading-snug xs:leading-[1.3] short:leading-[1.25]", "ja-JP");
      case "example":
        return commonDisplay(word, "例文", word.example, "xs:text-[2rem] text-4xl lg:text-5xl font-semibold leading-snug xs:leading-[1.3] short:leading-[1.26]", accent);
      case "example_translation":
        return commonDisplay(word, "例文訳", word.example_translation, "xs:text-[1.93rem] text-4xl  lg:text-5xl  font-[580] leading-[1.45] xs:leading-[1.39] short:leading-[1.39] ", "ja-JP");
      case "memo":
        return commonDisplay(word, "メモ", word.memo, "xs:text-[1.93rem] text-4xl lg:text-5xl text-gray-700 leading-[1.45] xs:leading-[1.39] short:leading-[1.39]", "ja-JP");
      default:
        return null;
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex flex-col items-center ">
        <ReviewTopButtons goToFirstSlide={goToFirstSlide} toggleSettingsModal={() => setIsSettingsModalOpen(true)}/>
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper; // Swiperのインスタンスを取得
          }}
          navigation
          pagination={{ type: "progressbar" }}
          keyboard={{ enabled: true }}
          mousewheel={{ forceToAxis: true }}
          modules={[Navigation, Pagination, Keyboard, Mousewheel]}
          className="w-full h-full p-2"
        >
          <div>
            {words!.map((word) => (
              <div key={word.id}>
                {fields
                  .filter((field) => !field.startsWith("-")) // 非表示項目はスキップ
                  .map(
                    (field) =>
                      (showEmptyCards || word[field]) && (
                        <SwiperSlide key={`${word.id}-${field}`}>
                          {renderField(word, field)}
                        </SwiperSlide>
                      )
                  )}
              </div>
            ))}
          </div>
          <SwiperSlide>
            <div className="h-full flex flex-col items-center justify-center bg-gradient-to-t from-yellow-300 to-orange-400 text-gray-100 p-8 rounded-lg">
              <div className="flex space-x-2 text-3xl">
                <div className="w-7 h-1"></div>
                <h1 className="font-bold mb-3">Great job !</h1>
                <div className="animate-bounce"> 🎉</div>
              </div>
              <p className="text-xl xs:text-lg mb-6">すべてのカードを復習しました！</p>
              <button className="mb-2 py-2 w-32 bg-blue-500 rounded-full font-semibold hover:bg-blue-600 transition-all duration-200">完 了</button>
              <p className="text-sm">
                復習回数が +1 されます
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* モーダル */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        editWord={editWord}
        setEditWord={setEditWord}
      />
      <ReviewSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        goToFirstSlide={goToFirstSlide}
      />
    </>
  );
};

export default Review;
