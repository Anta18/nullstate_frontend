"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="flex items-center px-8 py-4 font-w95">
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
          href="/portfolio"
          className={
            pathname === "/portfolio"
              ? "text-purple-500 transition-colors"
              : "text-white transition-colors"
          }
        >
          Portfolio
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
