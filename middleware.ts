import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function middleware(req: NextRequest) {
  const { data: { session } } = await supabase.auth.getSession();
  
  const isLoginOrSignupPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup");

  if (!session && !isLoginOrSignupPage) {
    // セッションがないのに、ログイン/サインアップページ以外にアクセスしようとした場合、ログインページにリダイレクト
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (session && isLoginOrSignupPage) {
    // ログインしているのに、ログインページやサインアップページにアクセスしようとした場合、ホームページにリダイレクト
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
