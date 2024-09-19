"use client"
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SignOutBtn() {
  const supabase = createClient()
  const router = useRouter()
  const singOut = async () =>{
    const  { error } = await supabase.auth.signOut()
   
    if(error){
      alert(`ログアウトできませんでした: ${error.message}`)
    }else{
      router.push("/signin")
      window.location.reload(); //すべての状態を初期化
    }
  }
  return (
    <button onClick={singOut}>Log out</button>
  );
}