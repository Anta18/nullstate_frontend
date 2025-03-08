"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 flex items-center px-8 py-4 font-w95 border-b border-gray-700 bg-black h-16">
      <Link href="/" className="text-2xl tracking-wide text-white pr-20">
        {"{}State"}
      </Link>
      <nav className="space-x-16">
        <Link
          href="/collection"
          className={
            pathname === "/collection"
              ? "text-purple-500 transition-colors"
              : "text-white transition-colors"
          }
        >
          Collection
        </Link>
        <Link
          href="/buy"
          className={
            pathname === "/buy"
              ? "text-purple-500 transition-colors"
              : "text-white transition-colors"
          }
        >
          Buy
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
