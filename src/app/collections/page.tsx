"use client";
import React, { useEffect, useState } from "react";
import TrendingNFT from "../components/TrendingNFT/TrendingNFT";
import NFTCollection from "../../data/TableData";
import PerformanceCard from "../components/Collections/PerformanceCard";

interface NFTCollection {
  collectionName: string;
  floorPrice: string;
  volume: string;
  sales: string;
  imageUrl?: string;
  lastSoldImageUrls: string[];
}

const Collection = () => {
  const [nftCollection, setNftCollection] = useState<NFTCollection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTCollections = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/nft-collections");
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data: NFTCollection[] = await response.json();
        console.log(data);
        setNftCollection(data);
        setError(null);
      } catch (error: any) {
        console.error("Error fetching NFT collections:", error);
        setError("There was an error fetching NFT collections.");
      } finally {
        setLoading(false);
      }
    };

    fetchNFTCollections();
  }, []);

  const dashboardData = {
    currentValue: 32.0,
    invested: 32.98,
    pnl: 32.09,
    stats: {
      collections: 45,
      nftsOwned: 82,
      ethSpent: 44.98,
      revenue: 44.98,
      realizedGains: 44.98,
    },
  };

  return (
    <div className="w-full min-h-screen bg-black pt-20">
      {/* <PerformanceCard
        currentValue={dashboardData.currentValue}
        invested={dashboardData.invested}
        pnl={dashboardData.pnl}
        stats={dashboardData.stats}
      /> */}

      {loading && <p className="text-white text-center">Loading...</p>}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && nftCollection.length === 0 && (
        <p className="text-white text-center">No collections available.</p>
      )}

      {!loading && !error && nftCollection.length > 0 && (
        <TrendingNFT data={nftCollection} />
      )}
    </div>
  );
};

export default Collection;
