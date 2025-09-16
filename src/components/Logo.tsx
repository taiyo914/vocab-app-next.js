"use client";

import Link from "next/link";

interface LogoProps {
  href?: string;
}

const Logo = ({ href = "/" }: LogoProps) => {
  return (
    <Link href={href}>
      <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
        <span className="tracking-[-0.02em]">Vocab</span>
        A<span className="tracking-[-0.02em]">pp</span>
      </span>
    </Link>
  );
};

export default Logo;
