"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useFuel, useIsConnected, useWallet } from "@fuels/react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { wallet } = useWallet();
  const { fuel } = useFuel();
  const { isConnected } = useIsConnected();
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleConnect = async () => {
    if (!fuel) {
      console.error("Fuel not connected");
      return;
    }
    try {
      await fuel.connect();
      const accounts = await fuel.accounts();
      if (accounts.length > 0) {
        const addr = accounts[0];
        // Create a truncated address: first 6 characters, ellipsis, and last 4 characters.
        const sliceAddress = addr.slice(0, 6) + "..." + addr.slice(-4);
        setAddress(sliceAddress);
      }
    } catch (error) {
      console.error("Error connecting wallet", error);
    }
  };

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
      <div className="ml-auto">
        {isConnected && address ? (
          <Link href="/profile">
            <button className="bg-transparent border border-purple-600 text-gray-500 py-2 px-5 rounded-sm font-mono cursor-pointer">
              {address}
            </button>
          </Link>
        ) : (
          <button
            onClick={handleConnect}
            className="bg-[#E0CFFE] text-[#4023B5] py-2 px-5 rounded-sm font-mono cursor-pointer"
          >
            CONNECT WALLET
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
