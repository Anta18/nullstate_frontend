import React, { useState, useEffect } from "react";
import SellModal from "./SellModal";
import SearchHeader from "./SearchHeader";
import Eth from "../../../assets/icons/Eth.svg";
import { FetchedNFT } from "@/app/profile/page";

interface NFTCollectionDisplayProps {
  nfts: FetchedNFT[];
  onRefetch: () => void;
}

const NFTCollectionDisplay: React.FC<NFTCollectionDisplayProps> = ({
  nfts,
  onRefetch,
}) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedNFT, setSelectedNFT] = useState<FetchedNFT | null>(null);
  const [blinking, setBlinking] = useState<boolean>(true);

  // Add blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking((prev) => !prev);
    }, 500);

    return () => clearInterval(blinkInterval);
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedNFT(null);
    if (onRefetch) {
      onRefetch();
    }
  };

  // Function to splice NFT asset ID to show only first 4 and last 4 characters
  const spliceAssetId = (assetId: string) => {
    if (!assetId || assetId.length <= 8) return assetId;
    return `${assetId.substring(0, 4)}...${assetId.substring(
      assetId.length - 4
    )}`;
  };

  return (
    <div className="relative">
      <div
        className={`bg-black min-h-screen pb-8 w-full ${
          modalOpen ? "filter blur-sm" : ""
        }`}
      >
        <SearchHeader />
        <div className="mx-auto mt-4 px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {nfts.map((nft) => (
              <div
                key={nft.id}
                className="flex flex-col bg-[#131419] rounded-lg overflow-hidden transition-all duration-300 transform origin-top hover:z-10"
                style={{
                  transform: hoveredId === nft.id ? "scale(1.1)" : "scale(1)",
                  marginBottom: hoveredId === nft.id ? "1rem" : "0",
                }}
                onMouseEnter={() => setHoveredId(nft.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative">
                  <img
                    src={nft.imageUrl}
                    alt={nft.title}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="text-[#5539A8] bg-[#E0CFFE] px-2 py-1 rounded-md text-sm font-bold">
                      {spliceAssetId(nft.nftAssetId)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col p-3 border-t border-zinc-800">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white text-md font-semibold">
                      {nft.title}
                    </h3>
                  </div>

                  <div className="flex items-center mb-2">
                    <div
                      className={`h-4 w-4 rounded-full mr-2 transition-opacity duration-300 ${
                        blinking
                          ? "opacity-100 bg-purple-600"
                          : "opacity-40 bg-purple-400"
                      }`}
                    ></div>
                    <span className="text-gray-400 text-sm">
                      <span className="text-gray-500">Collection: </span>
                      {nft.collection}
                    </span>
                  </div>

                  <div className="h-px bg-zinc-800 my-2"></div>

                  <div className="bg-[#1a1b21] p-2 rounded mb-3">
                    <span className="text-xs text-gray-400">Price</span>
                    <div className="flex items-center">
                      <span className="text-white font-medium">
                        {nft.price}
                      </span>
                      <Eth className="ml-1 h-3" />
                    </div>
                  </div>

                  <div
                    className="mt-auto overflow-hidden transition-all duration-300"
                    style={{ height: hoveredId === nft.id ? "40px" : "0px" }}
                  >
                    {hoveredId === nft.id && (
                      <button
                        onClick={() => {
                          setSelectedNFT(nft);
                          setModalOpen(true);
                        }}
                        className="w-full block bg-[#4023B5] hover:bg-indigo-800 text-white text-center py-2 px-4 text-sm font-bold rounded transition-all duration-250 animate-pulse hover:animate-none"
                      >
                        <span className="inline-block animate-bounce">S</span>
                        <span className="inline-block animate-bounce delay-75">
                          E
                        </span>
                        <span className="inline-block animate-bounce delay-100">
                          L
                        </span>
                        <span className="inline-block animate-bounce delay-150">
                          L
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {modalOpen && selectedNFT && (
        <SellModal
          onClose={() => {
            handleCloseModal();
          }}
          nftTitle={selectedNFT.title}
          nftAssetId={selectedNFT.nftAssetId}
          collectionName={selectedNFT.collection}
          rarity={selectedNFT.tokenId}
          nftImage={selectedNFT.imageUrl}
        />
      )}
    </div>
  );
};

export default NFTCollectionDisplay;
