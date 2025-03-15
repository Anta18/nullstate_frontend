"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useFuel, useIsConnected, useWallet } from "@fuels/react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { wallet } = useWallet();
  const { fuel } = useFuel();
  const { isConnected } = useIsConnected();
  const [address, setAddress] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const handleSignOut = () => {
    setAddress(null);
    setIsDropdownOpen(false);
    // Add actual sign out logic here
  };

  const handleSwitchAccount = () => {
    setIsDropdownOpen(false);
    // Add actual switch account logic here
  };

  const handleProfile = () => {
    setIsDropdownOpen(false);
    // Add navigation to profile page or profile logic here
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex items-center px-8 py-4 font-w95 transition-colors ${
        scrolled ? "bg-[rgba(0,0,0,0.75)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Link
        href="/"
        className="text-2xl tracking-wide text-white text-[28px] pr-20"
      >
        {"{}State"}
      </Link>
      <nav className="space-x-16 font-afacad text-[20px]">
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
          Mint NFT
        </Link>
      </nav>
      <div className="ml-auto relative" ref={dropdownRef}>
        {isConnected && address ? (
          <div>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-[#E0CFFE] text-[#4023B5] py-2 px-3 rounded-[3px] font-afacad cursor-pointer flex items-center"
            >
              {address}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`ml-2 transition-transform duration-200 ${
                  isDropdownOpen ? "transform rotate-180" : ""
                }`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#E0CFFE] rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={handleProfile}
                  className="block w-full text-left px-4 py-2 text-[#4023B5] hover:bg-purple-100 font-afacad"
                >
                  Profile
                </button>
                <button
                  onClick={handleSwitchAccount}
                  className="block w-full text-left px-4 py-2 text-[#4023B5] hover:bg-purple-100 font-afacad"
                >
                  Switch Account
                </button>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-afacad flex items-center justify-between"
                >
                  <span>Sign Out</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleConnect}
            className="bg-[#E0CFFE] text-[#4023B5] py-2 font-semibold px-5 rounded-[3px] font-afacad cursor-pointer"
          >
            CONNECT WALLET
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
