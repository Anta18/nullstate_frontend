"use client";
import React, { useState, useEffect } from "react";
import { nfts } from "../../data/userNFTData";
import BuyTable from "../components/Buy/BuyTable";
import NFTCollectionDisplay from "../components/Profile/CollectionDispay";
import { getUserNFTs } from "@/Backend/GetUserNFT";
import { useIsConnected, useWallet } from "@fuels/react";

interface NFT {
  id: number;
  nftId: string;
  nftName: string;
  nftAssetId: string;
  nftDescription: string;
  nftImage: string;
  nftPrice: string;
  nftOwnerAddress: string;
  nftCreatorAddress: string;
  nftStatus: string;
}
export interface FetchedNFT {
  id: number;
  nftAssetId: string;
  title: string;
  collection: string;
  price: number;
  tokenId: string;
  imageUrl: string;
}

const NFTMarketplacePage = () => {
  const { wallet } = useWallet();
  const { isConnected } = useIsConnected();
  const [address, setAddress] = useState("");
  const [userNFTs, setUserNFTs] = useState<FetchedNFT[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isConnected || !wallet) return;
    const userAddress = wallet.address.toString();
    setAddress(userAddress);
  }, [isConnected, wallet]);

  useEffect(() => {
    if (address) {
      refetchNFTs();
    }
  }, [address]);

  const refetchNFTs = async () => {
    try {
      if (!address) return;
      setLoading(true);
      const res = await fetch(`/api/get-user-nfts?address=${address}`);
      if (!res.ok) {
        console.error("Failed to fetch user NFTs");
        setLoading(false);
        return;
      }
      const data: NFT[] = await res.json();
      console.log("Data is ", data);

      const onlyMinted = data.filter((nft) => nft.nftStatus === "Minted");
      console.log("Only minted is ", onlyMinted);

      const fetchedNFT: FetchedNFT[] = onlyMinted.map((nft) => {
        return {
          id: nft.id,
          title: nft.nftName,
          collection: nft.id.toString(),
          price: parseFloat(nft.nftPrice),
          tokenId: nft.toString(),
          imageUrl: nft.nftImage,
          nftAssetId: nft.nftId,
        };
      });
      setUserNFTs(fetchedNFT);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const [activeTab, setActiveTab] = useState<"collection" | "activity">(
    "collection"
  );
  const totalCollections = 79;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-afacad">
      <div className="flex-grow">
        {/* Profile Section, Tabs, Content Section */}
        <div className="pt-20">
          {/* Profile Section */}
          <div className="flex flex-col py-10 ml-[60px]">
            <img
              className="w-40 h-40 rounded-full overflow-hidden"
              src="/images/nft_cat.png"
              alt="Profile"
            />
            <h2 className="mt-6 ml-1 text-2xl font-semibold">.eth</h2>
            <div className="flex items-center mt-2 ml-1 text-[16px] text-[#E0D9F5]">
              <span>nullstate.eth</span>
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <span>Joined November 2012</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-[#131419] border-b border-gray-800">
            <div className="mx-auto">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("collection")}
                  className={`px-8 py-4 ${
                    activeTab === "collection"
                      ? "text-white border-b-2 border-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  COLLECTED {totalCollections}
                </button>
                <button
                  onClick={() => setActiveTab("activity")}
                  className={`px-8 py-4 ${
                    activeTab === "activity"
                      ? "text-white border-b-2 border-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  ACTIVITY
                </button>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="pb-16">
            {activeTab === "activity" && (
              <div className="mt-4 overflow-x-auto">
                <BuyTable />
              </div>
            )}
            {activeTab === "collection" &&
              (loading ? (
                <div className="text-center mt-4 text-gray-400">Loading...</div>
              ) : userNFTs.length > 0 ? (
                <NFTCollectionDisplay nfts={userNFTs} onRefetch={refetchNFTs} />
              ) : (
                <div className="text-center mt-4 text-gray-400">
                  No collections available.
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 w-full py-4 text-center text-xs text-gray-500">
        All rights reserved. Nullstate © 2022
      </footer>
    </div>
  );
};

export default NFTMarketplacePage;
