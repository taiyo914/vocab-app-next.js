"use client";
import { useState } from "react";
import { createClient } from "../../../utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">ログイン</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4 border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" />
        <button onClick={handleSignIn} className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300">
          <span className="font-semibold">ログイン</span>
        </button>
        <p className="text-red-500 mt-2">{message}</p>
        <div className="flex flex-col justify-center items-center mt-4 gap-1">
          <p className="text-sm text-gray-400">アカウントを持っていない方は{" "}
          </p>
          <Link href="/signup" className="text-gray-500 underline  transition-all">
            新規アカウント登録
          </Link>
        </div>
      </div>
    </div>
  );
}
