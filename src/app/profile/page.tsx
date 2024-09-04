"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";
import Link from "next/link";

export default function ProfilePage() {
  const supabase = createClient()
  const [userName, setUserName] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getProfile = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        setError(sessionError.message);
        return;
      }

      setSession(session);

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("user_name, icon")
        .eq("user_id", session?.user.id)
        .single();

      if (profileError) {
        setError(profileError.message);
      } else {
        setUserName(profileData.user_name);
        setIconUrl(profileData.icon);
      }

    };

    getProfile();
  }, []);

  const handleSave = async () => {
    if (session) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ user_name: userName, icon: iconUrl })
        .eq("user_id", session.user.id); // セッションからユーザーIDを取得して更新
  
      if (updateError) {
        setError(updateError.message);
      } else {
        setMessage("Successfully saved!")
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      {message && <p className="text-green-500">{message}</p>}
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="mb-2 p-2 border border-gray-300"
      />
      <input
        type="text"
        placeholder="Icon URL"
        value={iconUrl}
        onChange={(e) => setIconUrl(e.target.value)}
        className="mb-2 p-2 border border-gray-300"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Save
      </button>
      <Link href="/" className="underline mt-3">Home</Link>
    </div>
  );
}
