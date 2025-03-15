"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  useFuel,
  useIsConnected,
  useAccounts,
  useWallet,
  useConnectUI,
  useDisconnect,
} from "@fuels/react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { wallet } = useWallet();
  const { fuel } = useFuel();
  const { isConnected } = useIsConnected();
  const { accounts } = useAccounts();
  const { connect, theme, isConnecting } = useConnectUI();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const address = accounts?.[0] ?? null;
  const truncatedAddr = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

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
          <>
            <span className="bg-transparent border border-purple-600 text-gray-500 py-2 px-5 rounded-sm font-mono cursor-pointer">
              {truncatedAddr}
            </span>
            <button
              type="button"
              onClick={() => disconnect()}
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white py-2 px-5 rounded-sm font-mono cursor-pointer"
            >
              Disconnect
            </button>
          </>
        ) : (
          <button
            onClick={() => connect()}
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
