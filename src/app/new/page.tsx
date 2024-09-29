"use client";
import Link from "next/link";
import { useState, useEffect, FormEvent, ChangeEvent, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";
import useUserStore from "@/store/userStore";
import { ArrowUturnLeftIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import CustomSlider from "@/components/CustomSlider"; 
import useNotificationStore from "@/store/useNotificationStore";

interface FormData {
  word: string;
  meaning: string;
  example: string;
  example_translation: string;
  memo: string;
  index: number;
}

const initialValue = {
  word: "",
  meaning: "",
  example: "",
  example_translation: "",
  memo: "",
  index: 0,
};

export default function AddNewWord() {
  const supabase = createClient();
  const [formData, setFormData] = useState<FormData>(initialValue);
  const { userId, fetchUserId , fetchWords} = useUserStore();
  const router = useRouter();
  const showNotification = useNotificationStore(state => state.showNotification)
  const [initialAddAndContinue, setInitialAddAndContinue] = useState(false)

  useEffect(() => {
    fetchUserId(); // キャッシュ済みなら何もしない
  }, [fetchUserId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = await saveDataToDatabase(formData);
    if (error) {
      showNotification( `単語の追加に失敗しました...エラーメッセージ: ${error.message}`, "error");
    } else {
      await fetchWords()
      router.push("/")
    }
  };

  const handleSubmitAndContinue = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const error = await saveDataToDatabase(formData);
    if (!error) setFormData(initialValue);
  };

  const saveDataToDatabase = async (data: FormData) => {
    // 新しい単語をSupabaseに挿入
    const { error: insertError } = await supabase
      .from("words")
      .insert([{ user_id: userId, ...data }]);
    
    if (insertError) {
      showNotification( `単語の追加に失敗しました...エラーメッセージ: ${insertError.message}`, "error");
      return insertError
    } else {
      setInitialAddAndContinue(true)
      setFormData(initialValue);
      showNotification("単語を追加しました", "success");
    }
  };

  const handleBack = async () =>{
    if(initialAddAndContinue){
      await fetchWords()
    }
    router.push("/")
  }

  return (
    <div >
      <div className="px-5 xs:p-0 mt-4 mx-auto max-w-3xl">
        <div className="flex justify-between items-center mb-3 px-0.5 xs:pr-5 xs:pl-3">
          <div
            onClick={handleBack}
            className="
              text-gray-500 cursor-pointer
              p-2 rounded-full
              hover:text-gray-700 hover:bg-gray-100 transition duration-200 
              flex items-center space-x-1"
          >
            <ArrowUturnLeftIcon className="h-4" />
            <div>戻る</div>
          </div>
          <Link
            href="new/import"
            className="
              px-4 py-2.5
              rounded-xl font-semibold
              bg-gray-900 text-white 
              shadow 
              hover:bg-gray-700 transition duration-300
              flex space-x-1"
          >
            <ArrowDownTrayIcon className="h-5" />
            <span className=""> {"TSV/CSV"}</span>からインポート
          </Link>
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="p-8 xs:py-2 xs:px-5 border xs:border-none bg-white rounded-lg shadow-lg xs:shadow-none">
            <div className="mb-5">
              <label className="block text-gray-700 font-bold ml-1" htmlFor="word">
                単語
              </label>
              <input
                type="text"
                name="word"
                id="word"
                value={formData.word}
                onChange={handleChange}
                className="
                  w-full px-3 py-2 
                  border rounded-lg 
                  text-gray-800 
                  focus:outline-none focus:border-gray-700 focus:border-1 transition-colors"
                autoComplete="off"
                placeholder="例: apple"
              />
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 font-bold ml-1" htmlFor="meaning">
                意味
              </label>
              <input
                type="text"
                name="meaning"
                id="meaning"
                value={formData.meaning}
                onChange={handleChange}
                className="
                  w-full px-3 py-2 
                  border rounded-lg 
                  text-gray-800 
                  focus:outline-none focus:border-gray-700 focus:border-1 transition-colors"
                autoComplete="off"
                placeholder="例: りんご"
              />
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 font-bold ml-1" htmlFor="example">
                例文
              </label>
              <textarea
                name="example"
                id="example"
                value={formData.example}
                onChange={handleChange}
                className="
                  w-full px-3 py-2 
                  border rounded-lg 
                  text-gray-800 
                  focus:outline-none focus:border-gray-700 focus:border-1 transition-colors
                  h-20"
                autoComplete="off"
                placeholder = "例: An apple a day keeps the doctors away"
              ></textarea>
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 font-bold ml-1" htmlFor="example_translation">
                例文訳
              </label>
              <textarea
                name="example_translation"
                id="example_translation"
                value={formData.example_translation}
                onChange={handleChange}
                className="
                  w-full px-3 py-2 
                  border rounded-lg 
                  text-gray-800 
                  focus:outline-none focus:border-gray-700 focus:border-1 transition-colors
                  h-20"
                autoComplete="off"
                placeholder = "例: 1日1個のりんごで医者いらず"
              ></textarea>
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 font-bold ml-1" htmlFor="memo">
                メモ
              </label>
              <textarea
                name="memo"
                id="memo"
                value={formData.memo}
                onChange={handleChange}
                className="
                  w-full px-3 py-2 
                  border rounded-lg 
                  text-gray-800 
                  focus:outline-none focus:border-gray-700 focus:border-1 transition-colors 
                  h-20"
                autoComplete="off"
                placeholder="例: ウェールズ地方由来のことわざ"
              ></textarea>
            </div>

            <div className="mb-5">
              <div className="flex">
                <label className="block text-gray-700 font-bold mb-1 ml-1">優先度 </label>
                <div className="text-gray-500  pl-2">{formData.index}</div>
              </div>
              <div className="flex w-full px-0.5">
                <CustomSlider sliderValue={formData.index} onChange={(value) => setFormData({ ...formData, index: value })} />
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-3 my-4 xs:px-5">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-700 text-white font-bold rounded-full transition duration-300
                flex items-center justify-center gap-1"
            >
              追 加
            </button>
            <button
              type="button"
              onClick={handleSubmitAndContinue}
              className="w-full py-3 px-4 bg-gray-300 hover:bg-gray-400 text-black font-bold rounded-full transition duration-300"
            >
              追加 & 新規作成
            </button>
          </div>
        </form>

        <div className="h-80"></div>

      </div>
    </div>
  );
}
