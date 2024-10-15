"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Spinner from "@/components/Spiner";
import { translateSupabaseAuthError } from "@/utils/authErrorTranslator";

export default function SignIn() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); 
  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);  
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const errorMessage = translateSupabaseAuthError(error.code);
      setMessage(errorMessage);
      setLoading(false);  
    } else {
      supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
          // セッションが存在する場合、リダイレクト
          router.push("/");
        }
      });
    }
  };

  return (
  <>
    {loading && (<>
      <div className="fixed inset-0 bg-black opacity-40 "></div>
      <div className="fixed inset-0 flex flex-col items-center justify-center gap-2">
          <div className="text-center space-y-1 font-medium text-lg">
            <div className="text-white">ログイン中...</div>
            <div className="text-white">しばらくお待ち下さい</div>
          </div>
          <Spinner borderColor = "border-gray-100 border-t-blue-300 border-r-blue-300" size = "h-7 w-7" borderWeight = "border-[0.25rem]" props = "mt-1"/>
      </div>
    </>)}

    <div className="flex flex-col h-screen">
      <header className='mx-auto py-4 xs:py-3 px-5 xs:px-4 w-full bg-white shadow-md flex justify-center'>
        <div  className="max-w-[1400px] flex items-center justify-between w-full">
          <Link className="" href="/">
            <span className="xs:ml-0 text-3xl font-bold">VocabApp</span>
          </Link>
        </div>
      </header>
      <div className="flex-grow min-h-fit flex flex-col justify-center items-center text-black">
        <div className="p-8 w-full max-w-md xs:-mt-10">
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
    </div>
  </>
  );
}
