import Image from "next/image";
import { createClient } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";
import LogOutBtn from "@/components/logOutBtn";

export default function Home() {
  return (
    <>
      <h1>Hello World</h1>
      <LogOutBtn/>
    </>
  );
}
