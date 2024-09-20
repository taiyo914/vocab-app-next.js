"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";
import { useRouter } from "next/navigation";
import useUserWordsSettingsStore from "@/store/userWordsSettingsStore";
import useUserIdStore from "@/store/userIdStore";
import { UserWordsSettingsProps } from "@/types/UserWordsSettingsProps";

type SettingsProps = {
  initialUserWordsSettings: UserWordsSettingsProps; 
};

export default function Settings({initialUserWordsSettings}: SettingsProps) { 
  const supabase = createClient(); 
  const router = useRouter();
  const { setUserWordsSettings } = useUserWordsSettingsStore();
  const { userId } = useUserIdStore();
  const [temporarySettings, setTemporarySettings] = useState<UserWordsSettingsProps>(initialUserWordsSettings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTemporarySettings({
      ...temporarySettings,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId) {
      alert("ユーザーがログインしていません");
      return;
    }

    // Supabaseにデータを保存（クライアントサイドからでいいかな？API作る？）
    const { error } = await supabase
      .from("user_words_settings")
      .update({
        ...temporarySettings,
        page_offset: 1
      })
      .eq("user_id", userId);

    if (error) {
      alert(`supabase.updateに失敗: ${error.message}`);
    } else {
      setUserWordsSettings({ ...temporarySettings, page_offset: 1 });
      router.refresh();
    }
  };

  return (
    <div className="flex justify-center">
      <div className="mx-auto xs:p-8 p-4 border max-w-xl mx-2">
        {/* xsはtailwind.configに設定が必要 */}
        <h1 className="text-2xl font-bold mb-3 text-center">設定</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 ml-1">
          <div className="mr-1">
            <label className="block text-sm font-medium text-gray-500 mb-1 -mt-2">表示件数</label>
            <input type="number" name="display_count" value={temporarySettings.display_count} onChange={handleChange} className="p-2 border border-gray-300 rounded w-full " />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-500">並び替え</label>
            <div className="flex items-center space-x-1 mr-1">
              <select name="sort_field" value={temporarySettings.sort_field} onChange={handleChange} className="p-2 border border-gray-300 rounded w-full">
                <option value="created_at">作成日</option>
                <option value="index">優先度</option>
                <option value="word">アルファベット順</option>
                <option value="review_count">復習回数</option>
                <option value="reviewed_at">復習日</option>
                <option value="updated_at">更新日</option>
              </select>
              <span className=" text-gray-600 ">で</span>
              <select name="sort_order" value={temporarySettings.sort_order} onChange={handleChange} className="p-2 border border-gray-300 rounded w-full">
                <option value="ASC">昇順</option>
                <option value="DESC">降順</option>
              </select>
              <span className=" text-gray-600 min-w-max ">にする</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-500">優先度</label>
            <div className="flex items-center space-x-1 mr-1">
              <input type="number" name="start_index" min={0} max={temporarySettings.end_index} value={temporarySettings.start_index} onChange={handleChange} className="p-2 border border-gray-300 rounded w-full" />
              <span className=" text-gray-600 min-w-max ">から</span>
              <input type="number" name="end_index" min={temporarySettings.start_index} max={10} value={temporarySettings.end_index} onChange={handleChange} className="p-2 border border-gray-300 rounded w-full" />
              <span className=" text-gray-600 min-w-max">まで</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-500">復習回数</label>
            <div className="flex items-center space-x-1 mr-1">
              <input type="number" name="start_review_count" min={0} max={temporarySettings.end_review_count} value={temporarySettings.start_review_count} onChange={handleChange} className="p-2 border border-gray-300 rounded w-full" />
              <span className="min-w-max  text-gray-600">から</span>
              <input type="number" name="end_review_count" min={temporarySettings.start_review_count} max={100} value={temporarySettings.end_review_count} onChange={handleChange} className="p-2 border border-gray-300 rounded w-full" />
              <span className="min-w-max text-gray-600 text-center">まで</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-500">日付範囲</label>
            <div className="flex flex-wrap items-baseline  ">
              <select name="date_field" value={temporarySettings.date_field} onChange={handleChange} className=" p-2 border border-gray-300 rounded mb-2 flex-grow  max-w">
                <option value="created_at">作成日</option>
                <option value="updated_at">更新日</option>
                <option value="reviewed_at">復習日</option>
              </select>
              <span className="text-gray-600 mx-1">を</span>
              <div className="flex items-center flex-wrap flex-grow">
                <div className="flex items-center flex-grow mb-2">
                  <input type="date" name="start_date" value={temporarySettings.start_date ?? ""} onChange={handleChange} className="p-2 border border-gray-300 rounded flex-grow" />
                  <span className="text-gray-600 min-w-8 mx-1 ">から</span>
                </div>
                <div className="flex items-center flex-grow mb-2">
                  <input type="date" name="end_date" value={temporarySettings.end_date ?? ""} onChange={handleChange} className="p-2 border border-gray-300 rounded flex-grow" />
                  <span className="text-gray-600 min-w-8 mx-1">まで</span>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-1">
            設定を保存
          </button>
        </form>
      </div>
    </div>
  );
}
