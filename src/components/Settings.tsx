"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";
import { useRouter } from "next/navigation";

type UserWordsSettingsProps = {
  sort_field: string;
  sort_order: string;
  start_index: number;
  end_index: number;
  start_review_count: number;
  end_review_count: number;
  date_field: string;
  start_date: string | null;
  end_date: string | null;
  display_count: number;
  page_offset: number;
};

export default function Settings() {
  const supabase = createClient();
  const router = useRouter();
  const [settings, setSettings] = useState({
    sort_field: "created_at",
    sort_order: "DESC",
    start_index: 0,
    end_index: 10,
    start_review_count: 0,
    end_review_count: 100,
    date_field: "created_at",
    start_date: "",
    end_date: "",
    display_count: 10,
  });
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      console.log(user);
      if (userError || !user) {
        alert(`ユーザー情報の取得に失敗しました: ${userError}`);
      } else {
        setUserId(user.id);
        const { data, error } = await supabase.from("user_words_settings").select("sort_field, sort_order, start_index, end_index, start_review_count, end_review_count, date_field, start_date, end_date, display_count").eq("user_id", user.id).single();
        if (error) {
          alert(`設定情報の取得に失敗しました: ${error.message}`);
        } else {
          setSettings(data);
        }
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Supabaseにデータを保存
    const { error } = await supabase
      .from("user_words_settings")
      .update({
        sort_field: settings.sort_field,
        sort_order: settings.sort_order,
        start_index: settings.start_index,
        end_index: settings.end_index,
        start_review_count: settings.start_review_count,
        end_review_count: settings.end_review_count,
        date_field: settings.date_field,
        start_date: settings.start_date || null, // 入力がなければnullを指定
        end_date: settings.end_date || null, // 入力がなければnullを指定
        display_count: settings.display_count,
        // page_offsetは変更しないのでここでは指定しない
      })
      .eq("user_id", userId);

    if (error) {
      alert(`Error saving settings: ${error.message}`);
    } else {
      alert("Settings saved successfully");
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
            <input type="number" name="display_count" value={settings.display_count} onChange={handleChange} className="p-2 border border-gray-300 rounded w-full " />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-500">並び替え</label>
            <div className="flex items-center space-x-1 mr-1">
              <select name="sort_field" value={settings.sort_field} onChange={handleChange} className="p-2 border border-gray-300 rounded w-full">
                <option value="created_at">作成日</option>
                <option value="index">優先度</option>
                <option value="word">語句</option>
                <option value="review_count">復習回数</option>
                <option value="reviewed_at">復習日</option>
                <option value="updated_at">更新日</option>
              </select>
              <span className=" text-gray-600 ">で</span>
              <select name="sort_order" value={settings.sort_order} onChange={handleChange} className="p-2 border border-gray-300 rounded w-full">
                <option value="ASC">昇順</option>
                <option value="DESC">降順</option>
              </select>
              <span className=" text-gray-600 min-w-max ">にする</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-500">優先度</label>
            <div className="flex items-center space-x-1 mr-1">
              <input type="number" name="start_index" min={0} max={settings.end_index} value={settings.start_index} onChange={handleChange} className="p-2 border border-gray-300 rounded w-full" />
              <span className=" text-gray-600 min-w-max ">から</span>
              <input type="number" name="end_index" min={settings.start_index} max={10} value={settings.end_index} onChange={handleChange} className="p-2 border border-gray-300 rounded w-full" />
              <span className=" text-gray-600 min-w-max">まで</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-500">復習回数</label>
            <div className="flex items-center space-x-1 mr-1">
              <input type="number" name="start_review_count" min={0} max={settings.end_review_count} value={settings.start_review_count} onChange={handleChange} className="p-2 border border-gray-300 rounded w-full" />
              <span className="min-w-max  text-gray-600">から</span>
              <input type="number" name="end_review_count" min={settings.start_review_count} max={100} value={settings.end_review_count} onChange={handleChange} className="p-2 border border-gray-300 rounded w-full" />
              <span className="min-w-max text-gray-600 text-center">まで</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-500">日付範囲</label>
            <div className="flex flex-wrap items-baseline  ">
              <select name="date_field" value={settings.date_field} onChange={handleChange} className=" p-2 border border-gray-300 rounded mb-2 flex-grow  max-w">
                <option value="created_at">作成日</option>
                <option value="updated_at">更新日</option>
                <option value="reviewed_at">復習日</option>
              </select>
              <span className="text-gray-600 mx-1">を</span>
              <div className="flex items-center flex-wrap flex-grow">
                <div className="flex items-center flex-grow mb-2">
                  <input type="date" name="start_date" value={settings.start_date ?? ""} onChange={handleChange} className="p-2 border border-gray-300 rounded flex-grow" />
                  <span className="text-gray-600 min-w-8 mx-1 ">から</span>
                </div>
                <div className="flex items-center flex-grow mb-2">
                  <input type="date" name="end_date" value={settings.end_date ?? ""} onChange={handleChange} className="p-2 border border-gray-300 rounded flex-grow" />
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
