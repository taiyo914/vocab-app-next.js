"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Mousewheel } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import useUserStore from "@/store/userStore";
import LoadingDots from "../../components/LoadingDots";
import CustomSlider from "./CustomSlider";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { WordType } from "@/types/Types";
import EditModal from "./EditModal";
import useReviewSettingsStore from "@/store/reviewSettingsStore";

const Review = () => {
  const supabase = createClient();
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの開閉状態
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
    const updatedWords = words?.map((word) =>
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

  const openModal = (word: WordType) => {
    //wordを受け取り、editWordに初期値として情報をセットしてからモーダルを開く
    setEditWord(word);
    setIsModalOpen(true); // モーダルを開く
  };

  const closeModal = () => {
    setIsModalOpen(false); // モーダルを閉じる
    setEditWord(null); // 内容をクリア
  };

  const handleSaveChanges = async () => {
    if (!editWord) return;

    // Supabaseで更新処理
    try {
      const { error } = await supabase.from("words").update(editWord).eq("id", editWord.id);

      if (error) throw new Error(error.message);

      const updateWords = words.map((word) => (word.id === editWord.id ? { ...editWord } : word));

      setWords(updateWords);

      closeModal(); // 保存後にモーダルを閉じる
    } catch (err: any) {
      console.error("更新エラー:", err.message);
    }
  };

  return (
    <>
      <div className="h-screen p-4  short:p-0 flex flex-col items-center ">
        <div className="w-full">
          <div className="flex justify-between items-center mb-3 short:mb-0 space-x-3">
            <Link
              href="/" //今は簡易的にリンクを付けているが、データベースに状態を更新してから戻る
              className="
                w-full
                py-2 
                border rounded-md shadow
                short:border-none short:bg-blue-100 short:rounded-none
                font-semibold text-center
                hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-out
                short:py-1 "
            >
              完 了
            </Link>
          </div>
        </div>
        <Swiper
          navigation
          pagination={{ type: "progressbar" }}
          keyboard={{ enabled: true }}
          mousewheel={{ forceToAxis: true }} //設定で縦スクロールも選べるようにするとよい
          modules={[Navigation, Pagination, Keyboard, Mousewheel]}
          spaceBetween={30}
          className="w-full h-full border p-2 rounded-lg short:border-none  short:rounded-none"
        >
          <SwiperSlide>
            <div className="h-full flex flex-col items-center justify-center text-3xl text-gray-500 opacity-20">
              <div className="text-3xl font-bold mb-4">Let's get started ! ➞</div>
            </div>
          </SwiperSlide>
          {words.map((word) => (
            <div key={word.id}>
              {word.word && (
                <SwiperSlide key={`${word.id}-word`}>
                  <div className="flex flex-col h-full justify-between items-center ">
                    <div className="flex justify-between items-center px-5 pt-4 w-full">
                      <div className="text-gray-400 xs:text-2xl">語句</div>
                      <button
                        onClick={() => openModal(word)}
                        className="flex items-center border rounded-3xl px-3 py-1 mt-1 text-gray-500
                        hover:bg-gray-100 transition-all duration-300 ease-out"
                      >
                        <PencilSquareIcon className="h-5" />
                        <div>カードを編集</div>
                      </button>
                    </div>
                    <div className="f-full flex items-center justify-center text-3xl pl-16 pr-20">
                      <div className="font-bold">{word.word}</div>
                    </div>
                    <div className="xs:w-2/3 w-5/6 mb-2">
                      <CustomSlider
                        sliderValue={word.index}
                        onChange={(value) => handleSliderChange(value, word.id)}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              )}
              {word.meaning && (
                <SwiperSlide key={`${word.id}-meaning`}>
                  <div className="flex flex-col h-full justify-between items-center ">
                    <div className="flex justify-between items-center px-5 pt-4 w-full">
                      <div className="text-gray-400 xs:text-2xl">意味</div>
                      <button
                        onClick={() => openModal(word)}
                        className="flex items-center border rounded-3xl px-3 py-1 mt-1 text-gray-500
                          hover:bg-gray-100 transition-all duration-300 ease-out"
                      >
                        <PencilSquareIcon className="h-5" />
                        <div>カードを編集</div>
                      </button>
                    </div>
                    <div className="f-full flex items-center justify-center text-3xl pl-16 pr-20">
                      <div className="font-bold">{word.meaning}</div>
                    </div>
                    <div className="xs:w-2/3 w-5/6 mb-2">
                      <CustomSlider
                        sliderValue={word.index}
                        onChange={(value) => handleSliderChange(value, word.id)}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              )}
              {word.example && (
                <SwiperSlide key={`${word.id}-example`}>
                  <div className="flex flex-col h-full justify-between items-center ">
                    <div className="flex justify-between items-center px-5 pt-4 w-full">
                      <div className="text-gray-400 xs:text-2xl">例文</div>
                      <button
                        onClick={() => openModal(word)}
                        className="flex items-center border rounded-3xl px-3 py-1 mt-1 text-gray-500
                          hover:bg-gray-100 transition-all duration-300 ease-out"
                      >
                        <PencilSquareIcon className="h-5" />
                        <div>カードを編集</div>
                      </button>
                    </div>
                    <div className="f-full flex items-center justify-center text-3xl pl-16 pr-20">
                      <div className="font-bold">{word.example}</div>
                    </div>
                    <div className="xs:w-2/3 w-5/6 mb-2">
                      <CustomSlider
                        sliderValue={word.index}
                        onChange={(value) => handleSliderChange(value, word.id)}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              )}
              {word.example_translation && (
                <SwiperSlide key={`${word.id}-example_translation`}>
                  <div className="flex flex-col h-full justify-between items-center ">
                    <div className="flex justify-between items-center px-5 pt-4 w-full">
                      <div className="text-gray-400 xs:text-2xl">例文訳</div>
                      <button
                        onClick={() => openModal(word)}
                        className="flex items-center border rounded-3xl px-3 py-1 mt-1 text-gray-500
                          hover:bg-gray-100 transition-all duration-300 ease-out"
                      >
                        <PencilSquareIcon className="h-5" />
                        <div>カードを編集</div>
                      </button>
                    </div>
                    <div className="f-full flex items-center justify-center text-3xl pl-16 pr-20">
                      <div className="font-bold">{word.example_translation}</div>
                    </div>
                    <div className="xs:w-2/3 w-5/6 mb-2">
                      <CustomSlider
                        sliderValue={word.index}
                        onChange={(value) => handleSliderChange(value, word.id)}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              )}
              {word.memo && (
                <SwiperSlide key={`${word.id}-memo`}>
                  <div className="flex flex-col h-full justify-between items-center ">
                    <div className="flex justify-between items-center px-5 pt-4 w-full">
                      <div className="text-gray-400 xs:text-2xl">メモ</div>
                      <button
                        onClick={() => openModal(word)}
                        className="flex items-center border rounded-3xl px-3 py-1 mt-1 text-gray-500
                          hover:bg-gray-100 transition-all duration-300 ease-out"
                      >
                        <PencilSquareIcon className="h-5" />
                        <div>カードを編集</div>
                      </button>
                    </div>
                    <div className="f-full flex items-center justify-center text-3xl pl-16 pr-20">
                      <div className="font-bold">{word.memo}</div>
                    </div>
                    <div className="xs:w-2/3 w-5/6 mb-2">
                      <CustomSlider
                        sliderValue={word.index}
                        onChange={(value) => handleSliderChange(value, word.id)}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              )}
            </div>
          ))}

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
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        editWord={editWord}
        setEditWord={setEditWord}
      />
    </>
  );
};

export default Review;
