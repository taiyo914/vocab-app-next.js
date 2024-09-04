"use client";
import Link from "next/link";
import { useState, FormEvent, ChangeEvent, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";

interface FormData {
  word: string;
  meaning: string;
  exampleSentence: string;
  exampleTranslation: string;
  memo: string;
  rating: number;
}

export default function AddNewWord() {
  const supabase = createClient()
  const [formData, setFormData] = useState<FormData>({
    word: "",
    meaning: "",
    exampleSentence: "",
    exampleTranslation: "",
    memo: "",
    rating: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      rating: Number(e.target.value),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await saveDataToDatabase(formData);
    router.push("/");
  };

  const handleSubmitAndContinue = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await saveDataToDatabase(formData);
    setFormData({
      word: "",
      meaning: "",
      exampleSentence: "",
      exampleTranslation: "",
      memo: "",
      rating: 0,
    });
  };

  const saveDataToDatabase = async (data: FormData) => {
    setLoading(true);
    setError(null);

    // ログインユーザーのIDを取得
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setError('ユーザー情報の取得に失敗');
      setLoading(false);
      return;
    }

    // 新しい単語をSupabaseに挿入
    const { error: insertError } = await supabase
      .from('words')
      .insert([
        {
          user_id: user.id , // ログイン中のユーザーのIDを設定
          word : data.word,
          meaning : data.meaning, 
          example : data.exampleSentence,
          example_translation: data.exampleTranslation,
          memo: data.memo, 
          index: data.rating,
        },
      ]);

    if (insertError) {
      setError('データの追加(インサート)に失敗: ' + insertError.message);
    } else {
      setFormData({
        word: "",
        meaning: "",
        exampleSentence: "",
        exampleTranslation: "",
        memo: "",
        rating: 0,
      });
      alert('Word added successfully');
    }

    setLoading(false);
  };

  return (
    <>
      <div className="py-4 md:px-6 px-4 mx-auto max-w-3xl">
        <div className="flex justify-between items-center mb-2 px-1">
          <Link href="/" className="hover:opacity-65 transition duration-300">
            ⬅ 戻る
          </Link>
          <Link
            href="new/import"
            className="p-2 bg-gray-900 text-white rounded-md shadow hover:bg-gray-300 hover:text-gray-900 transition duration-300"
          >
            <span className=""> {"CSV/TSV"}</span>からインポート
          </Link>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading && "ローディング中"}
        <form onSubmit={handleSubmit}>
          <div className=" p-6 border bg-white rounded-lg shadow-lg">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold " htmlFor="word">
                語句
              </label>
              <input
                type="text"
                name="word"
                id="word"
                value={formData.word}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-gray-700 bg-white"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold "
                htmlFor="meaning"
              >
                意味
              </label>
              <input
                type="text"
                name="meaning"
                id="meaning"
                value={formData.meaning}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-gray-700 bg-white"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold"
                htmlFor="exampleSentence"
              >
                例文
              </label>
              <textarea
                name="exampleSentence"
                id="exampleSentence"
                value={formData.exampleSentence}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-gray-700 bg-white h-24"
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold"
                htmlFor="exampleTranslation"
              >
                例文訳
              </label>
              <textarea
                name="exampleTranslation"
                id="exampleTranslation"
                value={formData.exampleTranslation}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-gray-700 bg-white h-24"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold" htmlFor="memo">
                メモ
              </label>
              <textarea
                name="memo"
                id="memo"
                value={formData.memo}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-gray-700 bg-white h-24"
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                優先度{" "}
              </label>
              <div className="flex">
                <input
                  type="range"
                  name="rating"
                  min="0"
                  max="10"
                  value={formData.rating}
                  onChange={handleSliderChange}
                  className="w-full"
                />
                <div className="text-gray-500  pl-2">{formData.rating}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-3 my-4 px-1">
            <button
              type="submit"
              className="w-2/3 py-2 px-4 bg-gray-900 hover:bg-gray-700 text-white font-bold rounded-lg transition duration-300"
            >
              追加
            </button>
            <button
              type="button"
              onClick={handleSubmitAndContinue}
              className="w-2/3 py-2 px-4 bg-gray-300 hover:bg-gray-400 text-black font-bold rounded-lg  transition duration-300"
            >
              追加して新規作成
            </button>
          </div>
        </form>

        <div className="h-32"></div>
      </div>
    </>
  );
}
