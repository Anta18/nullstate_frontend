"use client";
import React, {useState,useEffect} from "react";
import { Afacad } from "next/font/google";
import ActionIcons from "../../components/NFTPage/ActionIcons";
import DescriptionCard from "../../components/NFTPage/DescriptionCard";
import NFTDetails from "../../components/NFTPage/NFTDetails";
import { useParams } from "next/navigation";
const afacad = Afacad({ subsets: ["latin"], weight: ["400", "600", "700"] });

export interface Trait {
  trait: string;
  name: string;
  traitFloor: number;
}

// price, askAsset, tokenId, seller
export interface NFTData {
  title: string;
  owner: string;
  creator: string;
  description: string;
  author: string;
  price: number;
  tokenId: string;
  askAsset: string;
  contactAddress: string;
  creatorFee: number;
  lastActivity: {
    price: number;
    actionBy: string;
  };
  traits: Trait[];
  imageUrl: string;
}



const NFTMarketplacePage: React.FC = () => {
  const {nftAssetId} = useParams();
  console.log(nftAssetId);
  const [nftData, setNftData] = useState<NFTData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Avoid fetching if no assetId
    if (!nftAssetId) return;

    const fetchNFT = async () => {
      try {
        const response = await fetch(`/api/nft/${nftAssetId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch NFT: ${response.status}`);
        }
        const data: NFTData = await response.json();
        console.log(data);
        setNftData(data);
      } catch (error) {
        console.error("Error fetching NFT:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFT();
  }, [nftAssetId]);


  if (loading) {
    return <div className="min-h-screen bg-black text-white">Loading...</div>;
  }

  if (!nftData) {
    return <div className="min-h-screen bg-black text-white">NFT not found</div>;
  }



  return (
    <div
      className={`${afacad.className} flex min-h-screen pt-16 bg-black text-white`}
    >
      <div className="w-1/2 p-6">
        <div className="flex">
          <ActionIcons />
          <div className="rounded-lg overflow-hidden mt-4 mb-6 mx-auto max-w-md">
            <img
              src={nftData.imageUrl}
              alt={nftData.title}
              className="w-full object-cover"
            />
          </div>
        </div>
        <DescriptionCard
          description={nftData.description}
          author={nftData.author}
        />
      </div>

      <div className="w-1/2 p-6">
        <NFTDetails nftData={nftData} />
      </div>
    </div>
  );
};

export default NFTMarketplacePage;
