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
import LoadingDots from "@/app/LoadingDots";
import CustomSlider from "@/app/review/CustomSlider";
import { PencilSquareIcon, Cog6ToothIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { WordType } from "@/types/Types";
import EditModal from "@/app/review/EditModal";
import useReviewSettingsStore from "@/store/reviewSettingsStore";
import ReviewSettingsModal from "./ReviewSettingsModal";
import { BiHomeAlt2 } from "react-icons/bi";

const Review = () => {
  const supabase = createClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // モーダルの開閉状態
  const [editWord, setEditWord] = useState<WordType | null>(null); // 編集するwordの状態
  const {
    userId,
    words,
    wordsSettings,
    setWords,
    fetchWords,
    fetchUserId,
    fetchUserWordsSettings,
  } = useUserStore();
  const { fields, showEmptyCards, fetchReviewSettings } = useReviewSettingsStore();
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  //////////////////////////////////////
  const swiperRef = useRef<any>(null); // Swiperインスタンスを保持するuseRef
  //////////////////////////////////////

  // userId の取得（初回のみ実行）
  useEffect(() => {
    if (!userId) {
      fetchUserId(); // userId がキャッシュされていない場合にのみ取得
      console.log("ユーザーIDの取得", userId);
    }
  }, [userId, fetchUserId]);

  // fields と showEmptyCards の取得（初回のみ）
  useEffect(() => {
    if (userId && !fields && showEmptyCards === null) {
      fetchReviewSettings(userId); // userId が存在し、fields がまだ取得されていない場合に取得
      console.log("設定の取得", fields, showEmptyCards);
    }
  }, [userId, fields, showEmptyCards, fetchReviewSettings]);

  // words の取得
  useEffect(() => {
    const fetchWordsIfNeeded = async () => {
      if (!words && userId) {
        const wordsSettingsError = await fetchUserWordsSettings();
        if (wordsSettingsError) {
          console.error("設定の取得中にエラーが発生しました:", wordsSettingsError);
          return;
        }
        await fetchWords(); // userId と wordsSettings が存在する場合のみ words を取得
        console.log("単語の取得", words);
      }
    };
    fetchWordsIfNeeded();
  }, [words, userId, wordsSettings, fetchUserWordsSettings, fetchWords]);

  if (!userId || !fields || showEmptyCards === null || !words) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingDots />
      </div>
    );
  }

  const handleSliderChange = (newIndexValue: number, wordId: string) => {
    //words状態を更新
    const updatedWords = words!.map((word) =>
      word.id === wordId ? { ...word, index: newIndexValue } : word
    );

    setWords(updatedWords);

    // Supabaseに変更を反映
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

  /////////////////////////////////////////編集モーダルに関する記述////////////////////////////////////////////
  const openEditModal = (word: WordType) => {
    //wordを受け取り、editWordに初期値として情報をセットしてからモーダルを開く
    setEditWord(word);
    setIsEditModalOpen(true); // モーダルを開く
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false); // モーダルを閉じる
    setEditWord(null); // 内容をクリア
  };

  const handleSaveChanges = async () => {
    if (!editWord) return;

    // Supabaseで更新処理
    try {
      const { error } = await supabase.from("words").update(editWord).eq("id", editWord.id);

      if (error) throw new Error(error.message);

      const updateWords = words!.map((word) => (word.id === editWord.id ? { ...editWord } : word));

      setWords(updateWords);

      closeEditModal(); // 保存後にモーダルを閉じる
    } catch (err: any) {
      console.error("更新エラー:", err.message);
    }
  };

  const goToFirstSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0); // 最初のスライドに戻る
    }
  };

  const renderField = (word: WordType, field: string, showEmptyCards: boolean) => {
    switch (field) {
      case "word":
        return (
          <div className="flex flex-col h-full justify-between items-center ">
            <div
              className="flex justify-between items-center w-full
                      xs:px-3 px-2 pt-4 short:pt-2 short:px-3"
            >
              <div // 長さを合わせるだけのダミー要素。スマホサイズで存在ごと消えます。
                className="flex items-center border rounded-3xl px-3 py-1 mt-1 text-gray-500
                        hover:bg-gray-100 transition-all duration-300 ease-out invisible"
              >
                <PencilSquareIcon className="h-5" />
                <div>カードを編集</div>
              </div>
              <div className="text-gray-400 text-2xl ml-3 mr-4 mt-1">語句</div>
              <button
                onClick={() => openEditModal(word)}
                className="flex items-center border rounded-3xl px-3 py-1 mt-1 text-gray-500
                        hover:bg-gray-100 transition-all duration-300 ease-out"
              >
                <PencilSquareIcon className="h-5" />
                <div>カードを編集</div>
              </button>
            </div>
            <div className="f-full flex items-center justify-center text-3xl px-16">
              <div className="font-bold">{word.word}</div>
            </div>
            <div className="xs:w-5/6 lg:w-2/3  w-full px-4 mb-2 mb-5">
              <CustomSlider
                sliderValue={word.index}
                onChange={(value) => handleSliderChange(value, word.id)}
              />
            </div>
          </div>
        );
      case "meaning":
        return (
          <div className="flex flex-col h-full justify-between items-center ">
            <div
              className="flex justify-between items-center w-full
                      xs:px-3 px-2 pt-4 short:pt-2 short:px-3"
            >
              <div // 長さを合わせるだけのダミー要素。スマホサイズで存在ごと消えます。
                className="flex items-center border rounded-3xl px-3 py-1 mt-1 text-gray-500 invisible"
              >
                <PencilSquareIcon className="h-5" />
                <div>カードを編集</div>
              </div>
              <div className="text-gray-400 text-2xl ml-3 mr-4 mt-1">意味</div>
              <button
                onClick={() => openEditModal(word)}
                className="flex items-center border rounded-3xl px-3 py-1 mt-1 text-gray-500
                        hover:bg-gray-100 transition-all duration-300 ease-out"
              >
                <PencilSquareIcon className="h-5" />
                <div>カードを編集</div>
              </button>
            </div>
            <div className="f-full flex items-center justify-center text-3xl px-16">
              <div className="font-bold">{word.meaning}</div>
            </div>
            <div className="xs:w-5/6 lg:w-2/3  w-full px-4 mb-2 mb-5">
              <CustomSlider
                sliderValue={word.index}
                onChange={(value) => handleSliderChange(value, word.id)}
              />
            </div>
          </div>
        );
      case "example":
        return (
          <div className="flex flex-col h-full justify-between items-center ">
            <div
              className="flex justify-between items-center w-full
                      xs:px-3 px-2 pt-4 short:pt-2 short:px-3"
            >
              <div // 長さを合わせるだけのダミー要素。スマホサイズで存在ごと消えます。
                className="flex items-center border rounded-3xl px-3 py-1 mt-1 text-gray-500
                        hover:bg-gray-100 transition-all duration-300 ease-out invisible"
              >
                <PencilSquareIcon className="h-5" />
                <div>カードを編集</div>
              </div>
              <div className="text-gray-400 text-2xl ml-3 mr-4 mt-1">例文</div>
              <button
                onClick={() => openEditModal(word)}
                className="flex items-center border rounded-3xl px-3 py-1 mt-1 text-gray-500
                        hover:bg-gray-100 transition-all duration-300 ease-out"
              >
                <PencilSquareIcon className="h-5" />
                <div>カードを編集</div>
              </button>
            </div>
            <div className="f-full flex items-center justify-center text-3xl px-16">
              <div className="font-bold">{word.example}</div>
            </div>
            <div className="xs:w-5/6 lg:w-2/3  w-full px-4 mb-2 mb-5">
              <CustomSlider
                sliderValue={word.index}
                onChange={(value) => handleSliderChange(value, word.id)}
              />
            </div>
          </div>
        );
      case "example_translation":
        return (
          <div className="flex flex-col h-full justify-between items-center ">
            <div
              className="flex justify-between items-center w-full
                      xs:px-3 px-2 pt-4 short:pt-2 short:px-3"
            >
              <div // 長さを合わせるだけのダミー要素。スマホサイズで存在ごと消えます。
                className="flex items-center border rounded-3xl px-3 py-1 mt-1 text-gray-500
                        hover:bg-gray-100 transition-all duration-300 ease-out invisible"
              >
                <PencilSquareIcon className="h-5" />
                <div>カードを編集</div>
              </div>
              <div className="text-gray-400 text-2xl ml-3 mr-4 mt-1">例文訳</div>
              <button
                onClick={() => openEditModal(word)}
                className="flex items-center border rounded-3xl px-3 py-1 mt-1 text-gray-500
                        hover:bg-gray-100 transition-all duration-300 ease-out"
              >
                <PencilSquareIcon className="h-5" />
                <div>カードを編集</div>
              </button>
            </div>
            <div className="f-full flex items-center justify-center text-3xl px-16">
              <div className="font-bold">{word.example_translation}</div>
            </div>
            <div className="xs:w-5/6 lg:w-2/3  w-full px-4 mb-2 mb-5">
              <CustomSlider
                sliderValue={word.index}
                onChange={(value) => handleSliderChange(value, word.id)}
              />
            </div>
          </div>
        );
      case "memo":
        return (
          <div className="flex flex-col h-full justify-between items-center ">
            <div
              className="flex justify-between items-center w-full
                      xs:px-3 px-2 pt-4 short:pt-2 short:px-3"
            >
              <div // 長さを合わせるだけのダミー要素。スマホサイズで存在ごと消えます。
                className="flex items-center border rounded-3xl px-3 py-1 mt-1 text-gray-500
                        hover:bg-gray-100 transition-all duration-300 ease-out invisible"
              >
                <PencilSquareIcon className="h-5" />
                <div>カードを編集</div>
              </div>
              <div className="text-gray-400 text-2xl ml-3 mr-4 mt-1">メモ</div>
              <button
                onClick={() => openEditModal(word)}
                className="flex items-center border rounded-3xl px-3 py-1 mt-1 text-gray-500
                        hover:bg-gray-100 transition-all duration-300 ease-out"
              >
                <PencilSquareIcon className="h-5" />
                <div>カードを編集</div>
              </button>
            </div>
            <div className="f-full flex items-center justify-center text-3xl px-16">
              <div className="font-bold">{word.memo}</div>
            </div>
            <div className="xs:w-5/6 lg:w-2/3  w-full px-4 mb-2 mb-5">
              <CustomSlider
                sliderValue={word.index}
                onChange={(value) => handleSliderChange(value, word.id)}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex flex-col items-center ">
        <div className="w-full short:hidden">
          <div className="flex justify-between items-center">
            <div className="w-full">
              <Link
                href="/"
                className="
                  text-gray-600 text-lg short:text-base
                  w-full bg-gray-100
                  py-3
                  hover:bg-gray-200 hover:shadow-sm
                  transition duration-200 ease-in-out
                  flex items-center justify-center gap-1"
              >
                <BiHomeAlt2 />
                <div>ホームへ</div>
              </Link>
            </div>
            <button
              onClick={goToFirstSlide}
              className="
                text-gray-600 text-lg short:text-base 
                w-full bg-gray-100 border-x-2
                py-3
                hover:bg-gray-200 hover:shadow-sm
                transition duration-200 ease-in-out
                flex items-center justify-center gap-1"
            >
              <ArrowUturnLeftIcon className="h-4" />
              最初から
            </button>
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="
                text-gray-600 text-lg short:text-base
                w-full bg-gray-100
                py-3
                hover:bg-gray-200 hover:shadow-sm
                transition duration-200 ease-in-out
                flex items-center justify-center gap-1"
            >
              <Cog6ToothIcon className="h-5" />
              設定
            </button>
          </div>
        </div>
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
          <SwiperSlide>
            <div className="h-full flex flex-col items-center justify-center text-3xl text-gray-500 opacity-20">
              <div className="text-3xl font-bold mb-4">Let's get started ! ➞</div>
            </div>
          </SwiperSlide>
          <div>
            {words!.map((word) => (
              <div key={word.id}>
                {fields
                  .filter((field) => !field.startsWith("-")) // 非表示項目はスキップ
                  .map(
                    (field) =>
                      (showEmptyCards || word[field]) && (
                        <SwiperSlide key={`${word.id}-${field}`}>
                          {renderField(word, field, showEmptyCards)}
                        </SwiperSlide>
                      )
                  )}
              </div>
            ))}
          </div>
          <SwiperSlide>
            <div className="h-full flex flex-col items-center justify-center   bg-gradient-to-t from-yellow-300 to-orange-400 text-gray-100 p-8 rounded-lg shadow-xl">
              <div className="flex space-x-2 text-3xl">
                <div className="w-7 h-1"></div>
                <div className="font-bold mb-3">Great job !</div>
                <div className="animate-bounce"> 🎉</div>
              </div>
              <div className="text-lg">すべてのカードを復習しました！</div>
              <div>
                →{" "}
                <Link href="/" className="underline underline-offset-2">
                  Home
                </Link>{" "}
                へ戻る
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* モーダル */}
      <EditModal
        isModalOpen={isEditModalOpen}
        closeModal={closeEditModal}
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