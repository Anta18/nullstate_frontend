"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // When scrollY is greater than 0, set scrolled to true
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex items-center px-8 py-4 font-w95 transition-colors ${
        scrolled ? "bg-[rgba(0,0,0,0.75)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Link href="/" className="text-2xl tracking-wide text-white pr-20">
        {"{}State"}
      </Link>
      <nav className="space-x-16">
        <Link
          href="/collections"
          className={
            pathname === "/collections"
              ? "text-purple-500 transition-colors"
              : "text-white transition-colors"
          }
        >
          Collection
        </Link>
        <Link
          href="/mint"
          className={
            pathname === "/mint"
              ? "text-purple-500 transition-colors"
              : "text-white transition-colors"
          }
        >
          Mint
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
