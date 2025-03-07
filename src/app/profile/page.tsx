"use client";
import React, { useState } from "react";

const CryptoWalletInterface: React.FC = () => {
  const walletData = {
    address: "0x235307CD9a152D06dc6bf9D665084CBA109653e6",
    balance: {
      usd: 129.86,
      eth: 0.24,
    },
  };

  // User profile data
  const profileData = {
    username: "SeskyMama",
    bio: "A hungry cat on the internet. Looking for fellow cats to invest in Sesky Mama's catfood idea. Damn the raw meat verified by the vets for 5 types of cat conditions including kittens, healthy adults, obese adults, aged adult and lactating cat sounds perfect for my owner ya.",
    socialLinks: ["twitter", "linkedin", "github", "discord", "instagram"],
  };

  // Statistics data
  const statsData = [
    {
      title: "Days Active",
      value: 321,
      icon: "fire",
      bgColor: "bg-orange-600",
    },
    {
      title: "Gas Burned",
      value: 0.1444,
      icon: "ethereum",
      bgColor: "bg-blue-700",
    },
    {
      title: "Total Txn. Volume",
      value: "$1.45 M",
      icon: "coin",
      bgColor: "bg-red-600",
    },
  ];

  // Action buttons data
  const actionButtons = [
    { label: "Service", bgColor: "bg-blue-600" },
    { label: "Transfers", bgColor: "bg-green-600" },
    { label: "NFTs", bgColor: "bg-purple-600" },
    { label: "dApps", bgColor: "bg-yellow-600" },
    { label: "Stake", bgColor: "bg-pink-600" },
  ];

  // Transactions data
  const transactions = [
    {
      type: "set",
      action: "ENS avatar",
      date: "Yesterday at 13:05",
      amount: "0 ETH",
      hasView: true,
    },
    {
      type: "received",
      action: "ETH from 0x3f8e...6525",
      date: "26 July at 13:05",
      amount: "0.009 ETH",
      hasView: false,
    },
    {
      type: "transferred",
      action: "ETH to 0x3f8e...6525",
      date: "26 July at 13:05",
      amount: "0.02 ETH",
      hasView: false,
    },
    {
      type: "set",
      action: "gweiclub.eth's URL to nullstate",
      date: "26 July at 13:05",
      amount: "0 ETH",
      hasView: false,
    },
    {
      type: "bought",
      action: "NFT on Opensea",
      date: "26 July at 13:05",
      amount: "0.00046 ETH",
      hasView: true,
    },
    {
      type: "bought",
      action: "NFT on Opensea",
      date: "26 July at 13:05",
      amount: "0.03 ETH",
      hasView: true,
    },
    {
      type: "received",
      action: "ETH from 0x3f8e...6525",
      date: "26 July at 13:05",
      amount: "0.0555 ETH",
      hasView: false,
    },
    {
      type: "registered",
      action: "nullstate on ENS",
      date: "26 July at 13:05",
      amount: "0 ETH",
      hasView: false,
    },
    {
      type: "received",
      action: "ETH from 0x3f8e...6525",
      date: "26 July at 13:05",
      amount: "0.0254 ETH",
      hasView: false,
    },
    {
      type: "transferred",
      action: "cheemsdoge.eth to 0x3f8e...6525",
      date: "26 July at 13:05",
      amount: "0 ETH",
      hasView: false,
    },
    {
      type: "registered",
      action: "cheemsdoge.eth on ENS",
      date: "26 July at 13:05",
      amount: "0 ETH",
      hasView: false,
    },
  ];

  // Filter Tabs state
  const filterOptions = ["All activity", "Transfers", "NFTs", "dApps"];
  const [selectedFilter, setSelectedFilter] = useState("All activity");

  // Copy wallet state
  const [copied, setCopied] = useState(false);
  const copyWalletAddress = () => {
    navigator.clipboard.writeText(walletData.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle action button click
  const handleActionClick = (label: string) => {
    console.log(`Action: ${label}`);
    // add your action logic here
  };

  // Filter transactions based on selected filter
  const filteredTransactions = transactions.filter((tx) => {
    if (selectedFilter === "All activity") return true;
    if (selectedFilter === "Transfers") {
      return tx.type === "transferred" || tx.type === "received";
    }
    if (selectedFilter === "NFTs") {
      return tx.type === "bought";
    }
    if (selectedFilter === "dApps") {
      return tx.type === "set";
    }
    return true;
  });

  // Helper function to render icon based on type
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "fire":
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05c-.867 0-1.876.219-2.667.655A7.004 7.004 0 0010 18a7 7 0 006.95-6.093c.05-.564-.055-1.2-.303-1.803-.313-.753-.831-1.353-1.419-1.8-.325-.25-.682-.438-1.05-.593-.37-.156-.782-.3-1.202-.42-.421-.121-.864-.233-1.315-.34-.451-.108-.916-.21-1.379-.303-.43-.087-.856-.166-1.264-.24-.407-.073-.798-.14-1.15-.203zm3.347 3.535a3.023 3.023 0 00-.633-.305 8.51 8.51 0 01.33.535c.21.337.41.698.593 1.077.167.344.337.718.52 1.104.313.662.649 1.337 1.02 2.005.367.66.764 1.311 1.203 1.936.245.352.495.686.745 1l.527.643c.12.146.242.287.363.423.236.265.49.557.664.734.174.177.331.326.45.433.119.107.202.175.242.2.04.026.063.04.063.04v.002A7 7 0 0110 18 7 7 0 014.3 5.303c.121-.036.252-.07.396-.107.156-.04.324-.08.507-.122l1.232-.274c.356-.08.724-.162 1.104-.243.38-.082.773-.164 1.164-.246.39-.084.782-.167 1.166-.252.383-.085.761-.172 1.12-.263z"
              clipRule="evenodd"
            ></path>
          </svg>
        );
      case "ethereum":
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
          </svg>
        );
      case "coin":
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            ></path>
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16z"
              clipRule="evenodd"
            ></path>
          </svg>
        );
    }
  };

  // Helper function to render social icon
  const renderSocialIcon = (type: string) => {
    switch (type) {
      case "twitter":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
          </svg>
        );
      case "linkedin":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
          </svg>
        );
      case "github":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.4 0 0 5.4 0 12c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.8-.3-5.6-1.3-5.6-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4 0-6.6-5.4-12-12-12z"></path>
          </svg>
        );
      case "discord":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
          </svg>
        );
      case "instagram":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
              clipRule="evenodd"
            ></path>
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
          </svg>
        );
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-gray-400 text-sm">Wallet address</span>
        <span className="text-gray-300 text-sm">{walletData.address}</span>
        <button
          onClick={copyWalletAddress}
          className="p-1 bg-gray-800 rounded-full"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
          </svg>
          {copied && (
            <span className="ml-2 text-xs text-green-400">Copied!</span>
          )}
        </button>
        <button
          onClick={() => alert("Share functionality not implemented")}
          className="p-1 bg-gray-800 rounded-full"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Profile card */}
        <div className="bg-gray-900 rounded-xl p-6">
          <div className="flex flex-col items-center mb-4">
            <div className="relative mb-2">
              <img
                src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%3E%3Crect%20width%3D%2280%22%20height%3D%2280%22%20fill%3D%22%23ff0066%22%2F%3E%3Ctext%20x%3D%2240%22%20y%3D%2240%22%20font-family%3D%22Arial%22%20font-size%3D%2220%22%20fill%3D%22%23fff%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%3E😎%3C%2Ftext%3E%3C%2Fsvg%3E"
                alt={`${profileData.username} profile`}
                className="w-16 h-16 rounded-lg bg-pink-600"
              />
            </div>
            <h2 className="text-xl font-bold">{profileData.username}</h2>
            <button className="text-blue-400 flex items-center mt-1">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <p className="text-sm text-gray-400 text-center mb-4">
            {profileData.bio}
          </p>

          <div className="flex justify-center gap-2">
            {profileData.socialLinks.map((social, index) => (
              <button key={index} className="p-3 bg-gray-800 rounded-full">
                {renderSocialIcon(social)}
              </button>
            ))}
          </div>
        </div>

        {/* Right panel with wallet info */}
        <div className="md:col-span-2 space-y-4">
          {/* Balance card */}
          <div className="bg-gray-900 rounded-xl p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2-2h12v2H4V4zm12 2H4v8h12V6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">
                    ${walletData.balance.usd.toFixed(2)}
                  </span>
                  <span className="text-gray-400">
                    {walletData.balance.eth} ETH
                  </span>
                </div>
                <div className="text-xs text-gray-400">Wallet Balance</div>
              </div>
            </div>
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statsData.map((stat, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                    {renderIcon(stat.icon)}
                  </div>
                  <div>
                    <div className="text-xl font-bold">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            {actionButtons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleActionClick(button.label)}
                className={`${button.bgColor} rounded-full px-4 py-2 text-sm`}
              >
                {button.label}
              </button>
            ))}
          </div>

          {/* Transaction chart placeholder */}
          <div className="bg-gray-900 rounded-xl p-4">
            <div className="h-12 flex items-end">
              <div className="w-full bg-blue-500 h-8 rounded"></div>
              <div className="w-12 bg-yellow-500 h-8 rounded ml-1"></div>
              <div className="w-12 bg-pink-500 h-8 rounded ml-1"></div>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Transaction distribution (240)
            </div>
          </div>
        </div>
      </div>

      {/* Activity section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="font-bold">Activity</h2>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">240 Transactions</span>
          </div>

          <div className="flex gap-2">
            {filterOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedFilter(option)}
                className={`${
                  selectedFilter === option ? "bg-blue-600" : "bg-gray-800"
                } rounded-full px-4 py-1 text-sm`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction list */}
        <div className="space-y-2">
          {filteredTransactions.map((tx, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">{tx.type}</span>
                  <span className="font-medium">{tx.action.split(" ")[0]}</span>
                  <span className="text-gray-400">
                    {tx.action.split(" ").slice(1).join(" ")}
                  </span>
                </div>
                <div className="text-xs text-gray-500">{tx.date}</div>
              </div>

              <div className="flex items-center gap-2">
                {tx.hasView && (
                  <button className="px-2 py-1 text-xs text-blue-400">
                    view
                  </button>
                )}
                <div className="text-right">
                  <div className="font-medium">{tx.amount}</div>
                  <div className="text-xs text-gray-500">0.00226574</div>
                </div>
                <button>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7-7 7M5 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoWalletInterface;
