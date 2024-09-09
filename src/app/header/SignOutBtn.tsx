"use client"
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SignOutBtn() {
  const supabase = createClient()
  const router = useRouter()
  const singOut = async () =>{
    const  { error } = await supabase.auth.signOut()
    router.push("/signin")
    if(error){
      alert(`ログアウトできませんでした: ${error.message}`)
    }
  }
  return (
    <button onClick={singOut}>Log out</button>
  );
}