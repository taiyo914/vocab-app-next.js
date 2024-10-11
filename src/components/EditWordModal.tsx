import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import CustomSlider from "@/components/CustomSlider";
import useUserStore from "@/store/userStore";
import { WordType } from "@/types/Types";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Modal from "@/components/Modal";
import Spinner from "@/components/Spiner";
import { format, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import useShowDetailsStore from "@/store/showDetailsStore";
import { handleSpeak } from "@/components/SpeechButton";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";
import useSearchStore from "@/store/searchStore";
import useNotificationStore from "@/store/useNotificationStore";

interface EditWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  editWord: WordType | null;
  setEditWord: React.Dispatch<React.SetStateAction<WordType | null>>;
  showDeleteBtn: boolean;
}

const EditWordModal: React.FC<EditWordModalProps> = ({
  isOpen,
  onClose,
  editWord,
  setEditWord,
  showDeleteBtn,
}) => {
  const supabase = createClient();
  const { words, setWords, fetchWords } = useUserStore();
  const { results, setResults, tempResults, setTempResults, searchTriggered } = useSearchStore();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { showDetails, toggleDetails } = useShowDetailsStore();
  const showNotification = useNotificationStore((state) => state.showNotification);

  const handleSaveChanges = async () => {
    try {
      const updatedAt = new Date().toISOString();
      const updatedWord = { ...editWord, updated_at: updatedAt };

      const { error } = await supabase.from("words").update(editWord).eq("id", editWord!.id);

      if (error) throw new Error(error.message);

      if (searchTriggered) {
        const updatedResults = results!.map((word) =>
          word.id === editWord!.id ? updatedWord : word
        );
        setResults(updatedResults as WordType[]);
      }

      const updatedTempResults = tempResults!.map((word) =>
        word.id === editWord!.id ? updatedWord : word
      );
      setTempResults(updatedTempResults as WordType[]);

      const updateWords = words!.map((word) => (word.id === editWord!.id ? updatedWord : word));
      setWords(updateWords as WordType[]);

      onClose();
    } catch (err: any) {
      showNotification(`更新に失敗しました...エラーメッセージ:${err.message}`, "error");
    }
  };

  //APIを使うパターン（ちょっと遅い...?）
  const handleDelete = async () => {
    setDeleteLoading(true);

    if (!editWord) {
      throw new Error("削除する単語が指定されていません");
    }

    try {
      const { error } = await supabase
      .from("words")
      .update({ deleted_at: new Date().toISOString() }) // 削除日を設定
      .eq("id", editWord.id); // 削除する単語のID

    if (error) {
      throw new Error(`${error.message}`);
    }

    await fetchWords();

    setResults(results.filter((word) => word.id !== editWord!.id));
    setTempResults(tempResults.filter((word) => word.id !== editWord!.id));

    showNotification("単語を削除しました", "delete");
    onClose();

    } catch (err: any) {
      showNotification(`単語の削除に失敗しました。エラー:${err.message}`,"error");
    } finally {
      setDeleteLoading(false);
      setIsDeleteConfirmOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return;
    const parsedUTCDate = parseISO(dateString); //デフォルトでその土地の時間で計算してくれます
    return format(parsedUTCDate, "yyyy年M月d日 H:mm");
  };

  const [isWordLangOpen, setIsWordLangOpen] = useState(false);
  const [isExampleLangOpen, setIsExampleLangOpen] = useState(false);

  return (

    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-center mt-3 xs:mt-0 mb-4">
        <PencilSquareIcon className="h-5" />
        <h2 className="font-bold text-xl ">{showDeleteBtn ? "単語カード" : "カード編集"}</h2>
      </div>

      <div>
        <div className="mb-5">
          <label className="text-gray-600 ml-1 flex items-center justify-between gap-1.5">
            <div>単語</div>
            <div
              className="relative inline-block "
              onMouseEnter={() => setIsWordLangOpen(true)}
              onMouseLeave={() => setIsWordLangOpen(false)}
            >
              <button className="text-gray-500 text-[1.5rem] flex justify-end w-full">
                <SpeakerWaveIcon className="h-[1.2rem] cursor-pointer mr-1" />
              </button>
              <AnimatePresence>
                {isWordLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-0 top-0  bg-white border rounded-xl border-gray-300 shadow-lg "
                  >
                    <div
                      onClick={() => handleSpeak(editWord?.word, "en-US")}
                      className="flex items-center gap-1 w-20 px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150 rounded-t-xl"
                    >
                      <SpeakerWaveIcon className="h-[1.2rem]" />
                      US
                    </div>
                    <div
                      onClick={() => handleSpeak(editWord?.word, "en-GB")}
                      className="flex items-center gap-1 w-20 px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150             "
                    >
                      <SpeakerWaveIcon className="h-[1.2rem]" />
                      UK
                    </div>
                    <div
                      onClick={() => handleSpeak(editWord?.word, "en-AU")}
                      className="flex items-center gap-1 w-20 px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150 rounded-b-xl"
                    >
                      <SpeakerWaveIcon className="h-[1.2rem]" />
                      AUS
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </label>
          <input
            type="text"
            value={editWord?.word}
            onChange={(e) => setEditWord((prev) => prev && { ...prev, word: e.target.value })}
            className="
              w-full px-3 py-2 
              border rounded-lg 
              font-medium
              focus:outline-none focus:border-1 transition-colors 
              focus:border-gray-700 "
          />
        </div>

        <div className="mb-6">
          <label className="text-gray-600 ml-1">意味</label>
          <input
            type="text"
            value={editWord?.meaning}
            onChange={(e) => setEditWord((prev) => prev && { ...prev, meaning: e.target.value })}
            className="
              w-full px-3 py-2 
              border rounded-lg 
              focus:outline-none focus:border-gray-700 focus:border-1 transition-colors"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-600 ml-1 flex items-center  justify-between gap-1.5">
            <div>例文</div>
            <div
              className="relative inline-block "
              onMouseEnter={() => setIsExampleLangOpen(true)}
              onMouseLeave={() => setIsExampleLangOpen(false)}
            >
              <button className="text-gray-500 text-[1.5rem] flex justify-end w-full">
                <SpeakerWaveIcon className="h-[1.2rem] cursor-pointer mr-1" />
              </button>
              <AnimatePresence>
                {isExampleLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-0 top-0  bg-white border rounded-xl border-gray-300 shadow-lg "
                  >
                    <div
                      onClick={() => handleSpeak(editWord?.example, "en-US")}
                      className="flex items-center gap-1 w-20 px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150 rounded-t-xl"
                    >
                      <SpeakerWaveIcon className="h-[1.2rem]" />
                      US
                    </div>
                    <div
                      onClick={() => handleSpeak(editWord?.example, "en-GB")}
                      className="flex items-center gap-1 w-20 px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150             "
                    >
                      <SpeakerWaveIcon className="h-[1.2rem]" />
                      UK
                    </div>
                    <div
                      onClick={() => handleSpeak(editWord?.example, "en-AU")}
                      className="flex items-center gap-1 w-20 px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150 rounded-b-xl"
                    >
                      <SpeakerWaveIcon className="h-[1.2rem]" />
                      AUS
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </label>
          <textarea
            value={editWord?.example}
            onChange={(e) => setEditWord((prev) => prev && { ...prev, example: e.target.value })}
            className="
              w-full px-3 py-2 
              border rounded-lg 
              focus:outline-none focus:border-gray-700 focus:border-1 transition-colors"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-600 ml-1">例文訳</label>
          <textarea
            value={editWord?.example_translation}
            onChange={(e) =>
              setEditWord((prev) => prev && { ...prev, example_translation: e.target.value })
            }
            className="
              w-full px-3 py-2 
              border rounded-lg 
              focus:outline-none focus:border-gray-700 focus:border-1 transition-colors"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-600 ml-1">メモ</label>
          <textarea
            value={editWord?.memo}
            onChange={(e) => setEditWord((prev) => prev && { ...prev, memo: e.target.value })}
            className="
              w-full px-3 py-2 
              border rounded-lg 
              focus:outline-none focus:border-gray-700 focus:border-1 transition-colors"
          />
        </div>
        <div className="mb-3 px-0.5">
          <div className="flex items-center gap-2">
            <label className="text-gray-600 ml-0.5">優先度</label>
            <div className="">{editWord?.index}</div>
          </div>
          <CustomSlider
            sliderValue={editWord?.index || 0}
            onChange={(value) => setEditWord((prev) => prev && { ...prev, index: value })}
          />
        </div>
      </div>

      <div className="flex justify-start">
        <button
          type="button"
          className=" rounded-lg text-gray-600  hover:text-gray-500 transition-all duration-100 "
          onClick={toggleDetails}
        >
          {showDetails ? (
            <div className="flex items-center justify-center gap-0.5">
              <ChevronDownIcon className="h-5" />
              詳細情報
            </div>
          ) : (
            <div className="flex items-center justify-center gap-0.5">
              <ChevronRightIcon className="h-5" />
              詳細情報
            </div>
          )}
        </button>
      </div>

      {/* 詳細情報 */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-3 ml-1 mt-4 mb-1 text-gray-600  ">
              <div className="flex">
                <span className="w-[5.1rem]">復習回数</span>
                <span className="mx-1">:</span>
                <span className="ml-1 ">{editWord?.review_count}</span>
              </div>

              <div className="flex ">
                <span className="w-[5.1rem]">最終復習日</span>
                <span className="mx-1">:</span>
                <span className="ml-1 ">
                  {editWord?.reviewed_at ? formatDate(editWord?.reviewed_at) : "未復習"}
                </span>
              </div>

              <div className="flex items-center">
                <span className="w-[5.1rem]">作成日時</span>
                <span className="mx-1">:</span>
                <span className="ml-1 ">
                  {editWord?.created_at && formatDate(editWord?.created_at)}
                </span>
              </div>

              <div className="flex items-center ">
                <span className="w-[5.1rem]">最終更新日</span>
                <span className="mx-1">:</span>
                <span className="ml-1 ">
                  {editWord?.updated_at && formatDate(editWord?.updated_at)} <br />
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ボタン */}
      <div className={`flex gap-3 mt-6 xs:-mb-1 ${!showDeleteBtn && "mb-2"}`}>
        <button
          onClick={handleSaveChanges}
          className="py-2 border rounded-xl text-white w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 font-semibold"
        >
          保 存
        </button>
        <button
          onClick={onClose}
          className="cursor-pointer text-center py-2 border rounded-xl text-white w-full bg-gray-500 hover:bg-gray-600 transition-colors duration-300 font-semibold"
        >
          閉じる
        </button>
      </div>

      {/* 削除ボタン */}
      {showDeleteBtn && (
        <div className="mt-7 flex justify-center ">
          <button
            onClick={() => setIsDeleteConfirmOpen(true)}
            className="
            w-40 py-2 rounded-full text-sm -mb-1
          hover:bg-gray-200 text-gray-600 font-medium transition duration-300
            flex items-center justify-center gap-0.5"
          >
            <TrashIcon className="h-4" />
            単語を削除する
          </button>
        </div>
      )}

      {/* 削除確認モダール */}
      {isDeleteConfirmOpen && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full">
          <div className="bg-white p-6 rounded-xl shadow-lg w-4/5 max-w-sm">
            <h3 className="mb-4 text-[1.1rem] text-center">この単語を削除しますか？</h3>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  handleDelete();
                }}
                className="
                    w-full py-2 
                    bg-red-500 text-white font-[550] rounded-lg 
                    hover:bg-red-600 transition duration-200
                    flex justify-center items-center gap-1"
              >
                {deleteLoading ? (
                  <Spinner
                    size="h-5 w-5"
                    borderColor="border-gray-100 border-t-red-300"
                    borderWeight="border-[3px]"
                  />
                ) : (
                  <TrashIcon className="h-5" />
                )}
                <span>削除</span>
              </button>
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="
                    w-full py-2 bg-gray-200 border text-black rounded-lg font-[550
                    hover:bg-gray-300 transition duration-200]"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EditWordModal;
