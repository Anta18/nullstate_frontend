import React, { useState } from "react";
import StackIcon from "../../../assets/icons/Stack.svg";
import TrendUpIcon from "../../../assets/icons/TrendUp.svg";
import StarIcon from "../../../assets/icons/star.svg";

const TabMenu: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"watchlist" | "trending">(
    "trending"
  );

  return (
    <nav className="bg-black text-white flex items-center space-x-8 p-4 ml-4">
      {/* TRENDING */}
      <button
        onClick={() => setActiveTab("trending")}
        className="relative flex flex-col items-center group"
      >
        <div className="flex items-center space-x-2">
          <TrendUpIcon stroke={activeTab === "trending" ? "#986FE6" : "gray"} />
          <span
            className={`uppercase text-sm font-semibold ${
              activeTab === "trending" ? "text-[#986FE6]" : "text-gray-500"
            }`}
          >
            TRENDING
          </span>
        </div>
        {activeTab === "trending" && (
          <div className="w-full h-0.5 bg-[#986FE6] mt-2" />
        )}
      </button>
      {/* watchlist */}
      <button
        onClick={() => setActiveTab("watchlist")}
        className="relative flex flex-col items-center group"
      >
        <div className="flex items-center space-x-2">
          <StackIcon stroke={activeTab === "watchlist" ? "#986FE6" : "gray"} />
          <span
            className={`uppercase text-sm font-semibold ${
              activeTab === "watchlist" ? "text-[#986FE6]" : "text-gray-500"
            }`}
          >
            watchlist
          </span>
        </div>
        {activeTab === "watchlist" && (
          <div className="w-full h-0.5 bg-[#986FE6] mt-2" />
        )}
      </button>
    </nav>
  );
};

export default TabMenu;
