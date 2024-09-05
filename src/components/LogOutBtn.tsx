"use client"
import { createClient } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LogOutBtn() {
  const supabase = createClient()
  const router = useRouter()
  const singOut = async () =>{
    const  { error } = await supabase.auth.signOut()
    router.push("/signin")
  }
  return (
      <button onClick={singOut} className="py-1 px-2 bg-gray-300 rounded-lg"> Log out</button>
  );
}