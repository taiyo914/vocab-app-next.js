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

      if (profileError) {
        setMessage(`Error: ${profileError.message}`);
      } else if (settingsError) {
        setMessage(`Error: ${settingsError.message}`);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="rounded-lg border p-8 shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4 border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" />
        <button onClick={handleSignUp} className="w-full bg-blue-500 text-white p-3 rounded-lg hover:opacity-80 transition duration-300">
          <span className="font-semibold">Sign Up</span>
        </button>
        <p className="text-red-500 mt-2">{message}</p>
        <div className="block text-center mt-4 ">
          <p className="text-sm text-gray-400">You already have your account?</p>
          <p>
            {" "}
            →{" "}
            <Link href="/signin" className="text-gray-500 hover:underline  transition-all">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
