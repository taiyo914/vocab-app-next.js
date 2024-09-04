import Image from "next/image";
import { createClient } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";
import LogOutBtn from "@/components/LogOutBtn";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Hello World</h1>
      <LogOutBtn/>
      <p>Link to <Link href="/profile" className="underline"> profile</Link></p>
    </>
  );
}
