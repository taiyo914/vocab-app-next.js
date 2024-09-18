"use client";
import { useState } from "react";
import { createClient } from "../../../utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      const { error: profileError } = await supabase.from("profiles").insert([{ user_id: data.user?.id, user_name: data.user?.email, icon: "" }]);

      const { error: settingsError } = await supabase.from("user_words_settings").insert([{ user_id: data.user?.id }]);

      const { error: reviewSettingsError } = await supabase.from("user_review_settings").insert([{ user_id: data.user?.id }]);

      // 単語がないと最初の単語取得でエラーになるので、初期値としてガイドも兼ねていくつかカードを作っておく

      if (profileError) {
        setMessage(`Error: ${profileError.message}`);
      } else if (settingsError) {
        setMessage(`Error: ${settingsError.message}`);
      } else if (reviewSettingsError) {
        setMessage(`Error: ${reviewSettingsError.message}`);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="rounded-lg p-8 w-full max-w-md ">
        <h1 className="text-3xl font-bold mb-8 text-center">新規アカウント登録</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4 border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" />
        <button onClick={handleSignUp} className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300">
          <span className="font-semibold">新規アカウント登録</span>
        </button>
        <p className="text-red-500 mt-2">{message}</p>
        <div className="flex flex-col items-center justify-center mt-4 gap-1">
          <p className="text-sm text-gray-400"  >
            アカウントを持っている方は 
          </p>
          <Link href="/signin" className="text-gray-500 underline">
            ログイン
          </Link>
        </div>
      </div>
    </div>
  );
}
