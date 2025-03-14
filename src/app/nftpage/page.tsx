import React from "react";
import { Afacad } from "next/font/google";
import ActionIcons from "../components/NFTPage/ActionIcons";
import DescriptionCard from "../components/NFTPage/DescriptionCard";
import NFTDetails from "../components/NFTPage/NFTDetails";

const afacad = Afacad({ subsets: ["latin"], weight: ["400", "600", "700"] });

export interface Trait {
  trait: string;
  name: string;
  traitFloor: number;
}

export interface NFTData {
  title: string;
  owner: string;
  creator: string;
  description: string;
  author: string;
  price: number;
  tokenId: number;
  contactAddress: string;
  creatorFee: number;
  lastActivity: {
    price: number;
    actionBy: string;
  };
  traits: Trait[];
  imageUrl: string;
}

const dummyNFTData: NFTData = {
  title: "THE SISTERS",
  owner: "A974DD",
  creator: "AI Quantum Flux",
  description:
    "Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  author: "B44622",
  price: 0.0074,
  tokenId: 34,
  contactAddress: "0X5DAW...4546F",
  creatorFee: 5,
  lastActivity: {
    price: 0.0074,
    actionBy: "0xace6...39d2",
  },
  traits: [
    { trait: "Rarity", name: "Rare", traitFloor: 0.02 },
    { trait: "Character Type", name: "Strong", traitFloor: 0.02 },
  ],
  imageUrl: "/images/image 213.png",
};

const NFTMarketplacePage: React.FC = () => {
  return (
    <div
      className={`${afacad.className} flex min-h-screen pt-16 bg-black text-white`}
    >
      <div className="w-1/2 p-6">
        <div className="flex">
          <ActionIcons />
          <div className="rounded-lg overflow-hidden mt-4 mb-6 mx-auto max-w-md">
            <img
              src={dummyNFTData.imageUrl}
              alt="Anime character with sword"
              className="w-full object-cover"
            />
          </div>
        </div>
        <DescriptionCard
          description={dummyNFTData.description}
          author={dummyNFTData.author}
        />
      </div>

      <div className="w-1/2 p-6">
        <NFTDetails nftData={dummyNFTData} />
      </div>
    </div>
  );
};

export default NFTMarketplacePage;
