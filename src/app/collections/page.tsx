"use client";
import React from "react";
import TrendingNFT from "../components/TrendingNFT/TrendingNFT";
import NFTCollection from "../../data/TableData";
import PerformanceCard from "../components/Collections/PerformanceCard";

const Collection = () => {
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
    <div className="w-full bg-black pt-16">
      <PerformanceCard
        currentValue={dashboardData.currentValue}
        invested={dashboardData.invested}
        pnl={dashboardData.pnl}
        stats={dashboardData.stats}
      />
      <TrendingNFT data={NFTCollection} />
    </div>
  );
};

export default Collection;
