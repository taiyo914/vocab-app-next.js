"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import useOpenModalStore from "@/store/openModalStore";
import useUserStore from "@/store/userStore";
import { WordsSettingsType } from "@/types/Types";
import { motion, AnimatePresence } from "framer-motion";
import { BsEraser } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { HiXMark } from "react-icons/hi2";
import { FaRegCircleXmark } from "react-icons/fa6";
import Modal from "../components/Modal";
import { ChevronDownIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function SettingsModal() {
  const { isOpen, toggleModal } = useOpenModalStore();
  const { userId, wordsSettings, setWordsSettings } = useUserStore();
  const supabase = createClient();
  const [temporarySettings, setTemporarySettings] = useState<WordsSettingsType | null>(wordsSettings);
  const [showDetails, setShowDetails] = useState(false); // 詳細設定を表示するかどうかの状態
  const toggleDetails = () => setShowDetails((prev) => !prev); // トグルボタン用
  const onClose = () => {
    toggleModal()
    setTemporarySettings(wordsSettings)
  }


  useEffect(() => {
    if (wordsSettings) {
      setTemporarySettings(wordsSettings);
    }
  }, [
    wordsSettings?.sort_field,
    wordsSettings?.sort_order,
    wordsSettings?.start_index,
    wordsSettings?.end_index,
    wordsSettings?.start_review_count,
    wordsSettings?.end_review_count,
    wordsSettings?.date_field,
    wordsSettings?.start_date,
    wordsSettings?.end_date,
    wordsSettings?.display_count,
    //page_offset以外
  ]);

  //後ろの画面をスクロールできなくする設定
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setTemporarySettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    } as WordsSettingsType)) 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Supabaseにデータを保存
    const { error } = await supabase
      .from("user_words_settings")
      .update({
        ...temporarySettings,
        page_offset: 1,
      })
      .eq("user_id", userId);

    if (error) {
      alert(`設定の更新に失敗しました...: ${error.message}`);
    } else {
      setWordsSettings({ ...temporarySettings, page_offset: 1 });
      console.log("submitが実行されました")
      toggleModal()
    }
  };

  //数字を入力するフィールドにテキストを入力させない関数
  const handleInput = (e:any) => {
    const value = e.target.value;
    e.target.value = value.replace(/\D/, ''); 
  };

  // 日付をクリアする関数を作成（iPhoneだと一度入力した日付がリセットできないため）
  const clearDates = () => {
    setTemporarySettings((prevSettings) => ({
      ...prevSettings,
      start_date: null,
      end_date: null
    }) as WordsSettingsType );
  };

  return (
    <Modal isOpen ={isOpen} onClose={onClose} width="w-3/5 max-w-2xl">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition duration-200"
      >
        <XMarkIcon className="h-8 w-8 p-1" />
      </button>
      <h1 className="text-2xl font-bold mb-3 text-center">設定</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 ">
        <div className="mb-4">
          <label className="block font-medium mb-1 ml-0.5 text-gray-600">表示件数</label>
          <input
            type="number"
            name="display_count"
            min = {1}
            value={temporarySettings?.display_count}
            onChange={handleChange}
            onInput={handleInput}
            required
            className="
              py-2 px-3 w-full 
              border border-gray-300 rounded-lg
              bg-gray-50
              xs:font-semibold 
              focus:outline-none focus:border-black"
          />
        </div>
        <div className="mb-6">
          <label className="block font-medium mb-1 ml-0.5 text-gray-600">並び替え</label>
          <div className="flex items-center space-x-2">
            <select
              name="sort_field"
              value={temporarySettings?.sort_field}
              onChange={handleChange}
              className="
                appearance-none w-full bg-gray-50
                border border-gray-300 rounded-lg
                pl-3 py-2 
                xs:font-semibold
                focus:outline-none focus:border-black "
            >
              <option value="increment">作成日</option>
              <option value="index">優先度</option>
              <option value="word">アルファベット順</option>
              <option value="review_count">復習回数</option>
              <option value="reviewed_at">復習日</option>
              <option value="updated_at">更新日</option>
            </select>
            <span className=" text-gray-600 ">で</span>
            <select
              name="sort_order"
              value={temporarySettings?.sort_order}
              onChange={handleChange}
              className="
                appearance-none w-full bg-gray-50
                border border-gray-300 rounded-lg
                pl-3 py-2 
                xs:font-semibold
                focus:outline-none focus:border-black "
            >
              <option value="ASC">昇順</option>
              <option value="DESC">降順</option>
            </select>
            <span className=" text-gray-600 min-w-max ">にする</span>
          </div>
        </div>


          {/* トグルボタン */}
          <div className="flex">
            <button
              type = "button"
              className=" rounded-lg  hover:text-gray-500 transition-all duration-100 "
              onClick={toggleDetails}
            >
              {showDetails 
              ? (<div className="flex items-center justify-center gap-0.5"><ChevronDownIcon className="h-5"/>詳細設定</div>) 
              : (<div className="flex items-center justify-center gap-0.5"><ChevronRightIcon className="h-5"/>詳細設定</div>)}
            </button>
          </div>


        <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity:1}}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden"
              >
                <div className="my-4">
                  <label className="block font-medium mb-1 ml-0.5 text-gray-600">優先度</label>
                  <div className="flex items-center space-x-2 ">
                    <input
                      type="number"
                      name="start_index"
                      min={0}
                      max={temporarySettings?.end_index}
                      value={temporarySettings?.start_index}
                      onChange={handleChange}
                      onInput={handleInput}
                      required
                      className="
                        py-2 px-3 w-full 
                        border border-gray-300 rounded-lg
                        bg-gray-50
                        xs:font-semibold 
                        focus:outline-none focus:border-black"
                    />
                    <span className=" text-gray-600 min-w-max ">から</span>
                    <input
                      type="number"
                      name="end_index"
                      min={temporarySettings?.start_index}
                      max={10}
                      value={temporarySettings?.end_index}
                      onChange={handleChange}
                      onInput={handleInput}
                      required
                      className="
                        py-2 px-3 w-full 
                        border border-gray-300 rounded-lg
                        bg-gray-50
                        xs:font-semibold 
                        focus:outline-none focus:border-black"
                    />
                    <span className=" text-gray-600 min-w-max">まで</span>
                  </div>
                </div>

                <div className="mb-4 ">
                  <label className="block font-medium mb-1 ml-0.5 text-gray-600">復習回数</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      name="start_review_count"
                      min={0}
                      max={temporarySettings?.end_review_count}
                      value={temporarySettings?.start_review_count}
                      onChange={handleChange}
                      onInput={handleInput}
                      required
                      className="
                        py-2 px-3 w-full 
                        border border-gray-300 rounded-lg
                        bg-gray-50
                        xs:font-semibold 
                        focus:outline-none focus:border-black"
                    />
                    <span className="min-w-max  text-gray-600">から</span>
                    <input
                      type="number"
                      name="end_review_count"
                      min={temporarySettings?.start_review_count}
                      max={100}
                      value={temporarySettings?.end_review_count}
                      onChange={handleChange}
                      onInput={handleInput}
                      required
                      className="
                        py-2 px-3 w-full 
                        border border-gray-300 rounded-lg
                        bg-gray-50
                        xs:font-semibold 
                        focus:outline-none focus:border-black"
                    />
                    <span className="min-w-max text-gray-600 text-center">まで</span>
                  </div>
                </div>

                <div className="">
                  <div className="flex justify-between items-center mb-1 ml-0.5">
                    <label className="block font-medium  text-gray-600 ">日付範囲</label>
                    <div onClick={clearDates} 
                        className="text-gray-500 text-sm flex items-center justify-end cursor-pointer"
                      >
                          <BsEraser />
                          日付をクリア
                    </div>
                  </div>
                  <div className="flex flex-wrap items-baseline -mr-2">
                    <div className="flex flex-grow items-center mb-2">
                      <select
                        name="date_field"
                        value={temporarySettings?.date_field}
                        onChange={handleChange}
                        className="
                          appearance-none w-full bg-gray-50
                          border border-gray-300 rounded-lg
                          pl-3 py-2 
                          xs:font-semibold
                          focus:outline-none focus:border-black "
                      >
                        <option value="created_at">作成日</option>
                        <option value="updated_at">更新日</option>
                        <option value="reviewed_at">復習日</option>
                      </select>
                      <span className="text-gray-600 mx-2">を</span>
                    </div>
                    <div className="flex items-center flex-wrap flex-grow">
                      <div className="flex items-center flex-grow mb-2">
                        <input
                          type="date"
                          name="start_date"
                          value={temporarySettings?.start_date ?? ""}
                          onChange={handleChange}
                          className="
                            flex-grow bg-gray-50 h-11
                            border border-gray-300 rounded-lg
                            px-3  
                            xs:font-semibold
                            focus:outline-none focus:border-black "
                        />
                        <span className="text-gray-600 min-w-8 mx-2 ">から</span>
                      </div>
                      <div className="flex items-center flex-grow mb-2">
                        <input
                          type="date"
                          name="end_date"
                          value={temporarySettings?.end_date ?? ""}
                          onChange={handleChange}
                          className="
                            flex-grow bg-gray-50 h-11
                            border border-gray-300 rounded-lg
                            px-3
                            xs:font-semibold
                            focus:outline-none focus:border-black "
                          />
                        <span className="text-gray-600 min-w-8 mx-2">まで</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>)}
        </AnimatePresence>

        <div className="flex justify-between space-x-3 mt-6">
          <button
            type="submit"
            className="
              bg-blue-500 text-xl text-gray-100 xs:font-semibold font-[550]
              px-3 py-3 rounded-full hover:bg-blue-600 transition-all w-full"
          >
            設定を保存
          </button>
        </div>
      </form>
    </Modal>
  );
}
