import React, { useState } from "react";
import WalletIcon from "../../../assets/icons/wallet.svg";

export interface Wallet {
  address: string;
  balance: {
    usd: number;
    eth: number;
  };
}

interface WalletInfoCardProps {
  walletData: Wallet;
}

const WalletInfoCard: React.FC<WalletInfoCardProps> = ({ walletData }) => {
  const [copied, setCopied] = useState(false);
  const copyWalletAddress = () => {
    navigator.clipboard.writeText(walletData.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-1 border-gray-700 rounded-xl p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <WalletIcon />
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">
              ${walletData.balance.usd.toFixed(2)}
            </span>
            <span className="text-gray-400">{walletData.balance.eth} ETH</span>
          </div>
          <div className="text-xs text-gray-400">Wallet Balance</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
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
    </div>
  );
};

export default WalletInfoCard;
