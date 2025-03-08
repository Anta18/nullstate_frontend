"use client";
import React, { useState } from "react";
import ProfileStats from "../components/Buy/ProfileStats";
import TrendUp from "../../assets/icons/TrendUp.svg";
import BuyTable from "../components/Buy/BuyTable";
import SidebarFilters from "../components/Buy/SidebarFillters";
import FooterControls from "../components/Buy/FooterControls";
import ActivityTable from "../components/Buy/ActivityTable";

const NFTCollectionPage: React.FC = () => {
  const [collectionData] = useState({
    name: "Azuki",
    floorPrice: "12.7 ETH",
    change24h: "+2.3%",
    change7d: "+5.1%",
    volume24h: "432 ETH",
    owners: 4223,
    items: "10K",
    listed: 2120,
    marketCap: "127K ETH",
  });

  // Activity data
  const [activityItems] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      description: `Bought Azuki #${3000 + i}`,
      timeAgo: "2h ago",
      amount: "+10.5 ETH",
    }))
  );

  return (
    <div className="h-[calc(100vh-64px)] bg-black text-white font-sans flex flex-col">
      <ProfileStats />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (Filters/Slider) */}
        <aside className="w-64 overflow-y-auto border-r border-gray-700">
          <SidebarFilters />
        </aside>

        {/* Main Content (Table & Footer) */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Table Container */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <BuyTable />
          </div>
          {/* Footer Controls can be fixed in height */}
          <div className="h-20 border-t border-gray-700">
            <FooterControls />
          </div>
        </main>

        {/* Right Sidebar (Activity & Chart) */}
        <aside className="w-72 overflow-y-auto border-l border-gray-800 py-4">
          <div className="space-y-6">
            <div>
              <span className="pl-2 font-mono flex">
                <TrendUp stroke="gray" />
                <span className="ml-2">ACTIVITY</span>
              </span>
              <ActivityTable />
            </div>
            <div className="p-2">
              <h2 className="font-bold text-lg mb-2">Depth vs. Sales</h2>
              <div className="w-full h-32 bg-gray-800 rounded flex items-center justify-center text-gray-500 text-sm">
                <span>Chart goes here</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NFTCollectionPage;
