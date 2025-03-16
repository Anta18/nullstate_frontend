// components/Collection/NFTCollectionDisplay.tsx
import React, { useState } from "react";
import SellModal from "./SellModal"; // adjust the import path as needed
import SearchHeader from "./SearchHeader";
import Eth from "../../../assets/icons/Eth.svg";
import { FetchedNFT } from "@/app/profile/page";

interface NFTCollectionDisplayProps {
  nfts: FetchedNFT[];
}

const NFTCollectionDisplay: React.FC<NFTCollectionDisplayProps> = ({
  nfts,
}) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedNFT, setSelectedNFT] = useState<FetchedNFT | null>(null);

  return (
    <div className="relative">
      <div
        className={`bg-black min-h-screen pb-8 w-full ${
          modalOpen ? "filter blur-sm" : ""
        }`}
      >
        <SearchHeader />
        <div className="mx-auto mt-4 px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {nfts.map((nft) => (
              <div
                key={nft.id}
                className="flex flex-col w-75"
                onMouseEnter={() => setHoveredId(nft.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative bg-[#131419] w-75 h-75">
                  <img
                    src={nft.imageUrl}
                    alt={nft.title}
                    className="w-75 h-75 aspect-square object-cover rounded"
                  />
                </div>
                <div className="mt-4 flex flex-col h-28">
                  <div>
                    <div className="flex justify-between">
                      <h3 className="text-white text-md pl-3">
                        {nft.title}
                        <br />
                        {nft.collection}
                      </h3>
                      <span className="text-[#5539A8] bg-[#E0CFFE] px-[6px] text-sm mb-auto">
                        {nft.tokenId}
                      </span>
                    </div>
                    <div className="h-px bg-zinc-800 my-2"></div>
                    <div className="flex justify-between items-center my-2 pl-3">
                      <div className="flex items-center">
                        <span className="text-[#969AAE] text-md">
                          Best Offer: {nft.price}
                        </span>
                        <Eth className="ml-1 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <button
                      onClick={() => {
                        setSelectedNFT(nft);
                        setModalOpen(true);
                      }}
                      className={`w-full block bg-[#4023B5] hover:bg-indigo-800 text-white text-center py-2 px-4 text-sm font-bold transition-opacity duration-200 ease-in-out ${
                        hoveredId === nft.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      SELL
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Render SellModal when modalOpen is true and a NFT is selected */}
      {modalOpen && selectedNFT && (
        <SellModal
          onClose={() => {
            setModalOpen(false);
            setSelectedNFT(null);
          }}
          nftTitle={selectedNFT.title}
          nftAssetId={selectedNFT.nftAssetId}
          collectionName="My Collection"
          rarity={selectedNFT.tokenId}
          nftImage={selectedNFT.imageUrl}
        />
      )}
    </div>
  );
};

export default NFTCollectionDisplay;
