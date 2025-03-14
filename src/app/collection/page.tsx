"use client";
import React from "react";
import ProfileStats from "../components/Collection/ProfileStats";
import SidebarFilters from "../components/Collection/SidebarFilters";
import NFTCollectionDisplay from "../components/Collection/NFTCollectionDisplay";
import SearchHeader from "../components/Collection/SearchHeader";
import { Afacad } from "next/font/google";

import { nfts } from "../../data/nftData";
import { profileStatsData } from "../../data/profileStatsData";
import {
  traits,
  traitOptions,
  rarityData,
  priceData,
} from "../../data/sidebarFiltersData";

const afacad = Afacad({ subsets: ["latin"], weight: ["400", "600", "700"] });

const NFTCollectionPage: React.FC = () => {
  return (
    <div
      className={`${afacad.className} min-h-screen pt-16 bg-black text-white font-sans flex flex-col overflow-auto custom-scrollbar`}
    >
      <img src="/images/image 216.png" alt="Banner" />
      <ProfileStats data={profileStatsData} />

      <div className="h-20 bg-[#131419]">
        <SearchHeader />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 overflow-y-auto border-r border-gray-700 custom-scrollbar">
          <SidebarFilters
            traits={traits}
            traitOptions={traitOptions}
            rarityData={rarityData}
            priceData={priceData}
          />
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto custom-scrollbar ml-20">
            <NFTCollectionDisplay nfts={nfts} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default NFTCollectionPage;
