"use client";
import { getUserNFTs } from "@/Backend/GetUserNFT";
import { useIsConnected, useWallet } from "@fuels/react";

import React, { useEffect, useState } from "react";
import ProfileCard from "../components/Profile/ProfileCard";
import WalletInfoCard from "../components/Profile/WalletInfoCard";
import TransactionDistributionChart from "../components/Profile/TransactionDistributionChart";
import TransactionList from "../components/Profile/TransactionList";

import { walletData } from "../../data/walletData";
import { profileData } from "../../data/profileData";
import { transactions } from "../../data/transactionsData";

const typeColors: Record<string, string> = {
  set: "#1f77b4",
  received: "#ff7f0e",
  transferred: "#2ca02c",
  bought: "#d62728",
  registered: "#9467bd",
};

const filterOptions = ["All activity", "Transfers", "NFTs", "dApps"];

interface NFT {
  id: number;
  nftId: string;
  nftName: string;
  nftDescription: string;
  nftImage: string;
  nftPrice: string;
  nftOwnerAddress: string;
  nftCreatorAddress: string;
  nftStatus: string;
}


const CryptoWalletInterface: React.FC = () => {
  const {wallet} = useWallet();
  const { isConnected } = useIsConnected();
  const [address, setAddress] = useState("");
  const [userNFTs, setUserNFTs] = useState<NFT[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("All activity");
  

  useEffect(() => {
    if(!isConnected || !wallet) return;
    const userAddress = wallet.address.toString();
    setAddress(userAddress);
  }, [isConnected, wallet]);

  useEffect(() => {
    if(!address) return;

    const fetchNFTs = async () =>{
      try {
        const res = await fetch(`/api/get-user-nfts?address=${address}`);
        if(!res.ok) {
          console.error("Failed to fetch user NFTs");
          return;
        }
        const data:[] = await res.json();
        console.log("NFT are",data);
        setUserNFTs(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNFTs();
    
  }, [address]);

 
  return (
    <div className="bg-black text-white min-h-screen p-4 pt-16">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-gray-400 text-sm">Wallet address</span>
        <span className="text-gray-300 text-sm">{walletData.address}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProfileCard profile={profileData} />
        <div className="md:col-span-2 space-y-4">
          <WalletInfoCard walletData={walletData} />
          <div className="border-1 border-gray-700 rounded-xl p-4">
            <TransactionDistributionChart
              transactions={transactions}
              typeColors={typeColors}
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="font-bold">Activity</h2>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">
              {transactions.length} Transactions
            </span>
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
        <TransactionList
          transactions={transactions}
          filter={selectedFilter}
          typeColors={typeColors}
        />
      </div>
    </div>
  );
};

export default CryptoWalletInterface;
