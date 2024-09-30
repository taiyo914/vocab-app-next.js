"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingDots from "@/components/LoadingDots";
import Spinner from "@/components/Spiner";

export default function SignIn() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setMessage(`Error: ${error.message}`);
      setLoading(false);
    } else {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([{ user_id: data.user?.id, user_name: data.user?.email, icon: "" }]);

      const { error: wordsSettingsError } = await supabase
        .from("user_words_settings")
        .insert([{ user_id: data.user?.id }]);

      const { error: reviewSettingsError } = await supabase
        .from("user_review_settings")
        .insert([{ user_id: data.user?.id }]);

      // 単語がないと最初の単語取得でエラーになるので、初期値としてガイドも兼ねていくつかカードを作っておく
      const { error: wordsError } = await supabase.from("words").insert([
        { user_id: data.user?.id, word: "Welcome!", meaning: "ようこそ！" },
      ]);

      if (profileError) {
        setMessage(`Error: ${profileError.message}`);
        setLoading(false);
      } else if (wordsSettingsError) {
        setMessage(`Error: ${wordsSettingsError.message}`);
        setLoading(false);
      } else if (reviewSettingsError) {
        setMessage(`Error: ${reviewSettingsError.message}`);
        setLoading(false);
      } else if (wordsError) {
        setMessage(`Error: ${wordsError.message}`);
        setLoading(false);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <>
      {loading && (<>
        <div className="fixed inset-0 bg-black opacity-40 "></div>
        <div className="fixed inset-0 flex flex-col items-center justify-center gap-2">
            <div className="text-center space-y-1 font-medium text-lg">
              <div className="text-white">アカウント作成中...</div>
              <div className="text-white">しばらくお待ち下さい</div>
            </div>
            <Spinner borderColor = "border-gray-100 border-t-blue-300 border-r-blue-300" size = "h-7 w-7" borderWeight = "border-[0.25rem]" props = "mt-1"/>
        </div>
      </>)}
      <div className="h-screen flex flex-col justify-center items-center text-black">
        <div className="rounded-lg p-8 w-full max-w-md ">
          <h1 className="text-3xl font-bold mb-8 text-center">新規アカウント登録</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button
            onClick={handleSignUp}
            className={`w-full text-white p-3 rounded-lg transition duration-300 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            <span className="font-semibold">新規アカウント登録</span>
          </button>
          <p className="text-red-500 mt-2">{message}</p>
          <div className="flex flex-col items-center justify-center mt-4 gap-1">
            <p className="text-sm text-gray-400">アカウントを持っている方は</p>
            <Link href="/signin" className="text-gray-500 underline">
              ログイン
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
