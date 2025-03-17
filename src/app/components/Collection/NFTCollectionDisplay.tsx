// components/Collection/NFTCollectionDisplay.tsx
"use client"
import React, { useState } from "react";
import Link from "next/link";
import Eth from "../../../assets/icons/Eth.svg";
import { NFT } from "../../../data/nftData";

interface NFTCollectionDisplayProps {
  nfts: NFT[];
}

const NFTCollectionDisplay: React.FC<NFTCollectionDisplayProps> = ({
  nfts,
}) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="bg-black min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="flex flex-col w-64"
              onMouseEnter={() => setHoveredId(nft.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative bg-[#131419] w-64 h-64">
                <img
                  src={nft.imageUrl}
                  alt={nft.title}
                  className="w-64 h-64 aspect-square object-cover rounded"
                />
              </div>
              <div className="mt-4 flex flex-col h-24">
                <div>
                  <h3 className="text-white font-semibold text-md pl-3">
                    {nft.title}
                  </h3>
                  <div className="h-px bg-zinc-800 my-2"></div>
                  <div className="flex justify-between items-center my-2 pl-3">
                    <div className="flex items-center">
                      <span className="text-white text-md font-semibold">
                        {nft.price}
                      </span>
                      <Eth className="ml-1 h-4" />
                    </div>
                    <span className="text-[#7F8199] text-sm">
                      {nft.tokenId.slice(0, 8)}...
                      {nft.tokenId.slice(-8)}
                    </span>
                  </div>
                </div>
                {/* Reserve space for the button */}
                <div className="mt-auto">
                  <Link
                    href={`/nftpage/${nft.tokenId}`}
                    className={`w-full block bg-[#4023B5] hover:bg-indigo-800 text-white text-center py-2 px-4 text-sm font-bold transition-opacity duration-200 ease-in-out ${
                      hoveredId === nft.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    BUY NOW
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTCollectionDisplay;
