// components/Collection/ProfileStats.tsx
import React from "react";
import { Star, Link } from "lucide-react";
import Discord from "../../../assets/icons/DiscordLogo.svg";
import Eth from "../../../assets/icons/Eth.svg";
import { ProfileStatsData } from "../../../data/profileStatsData";

interface ProfileStatsProps {
  data: ProfileStatsData;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ data }) => {
  return (
    <div className="bg-black text-white w-full p-4 flex items-center font-mono justify-between">
      <div className="flex items-center space-x-3">
        {/* NFT Image */}
        <div className="relative w-12 h-12 bg-red-600 rounded-md overflow-hidden">
          <img
            src={data.image}
            alt={`${data.name} NFT`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* NFT Name and Social Links */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-1">
            <span className="font-semibold text-lg">{data.name}</span>
            <Star className="h-4 w-4 text-white" />
          </div>
          <div className="flex space-x-2">
            <Discord className="h-4 w-4 text-gray-400" />
            <Link className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="ml-auto grid grid-cols-6 gap-6">
        {/* Total Volume */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#7F8199]">TOTAL VOLUME</span>
          <div className="flex items-center">
            <span>{data.stats.totalVolume}</span>
            <Eth className="h-3 ml-1" />
          </div>
        </div>

        {/* Floor Price */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#7F8199]">FLOOR PRICE</span>
          <div className="flex items-center">
            <span>{data.stats.floorPrice}</span>
            <Eth className="h-3 ml-1" />
          </div>
        </div>

        {/* Top Bid */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#7F8199]">TOP BID</span>
          <div className="flex items-center">
            <span>{data.stats.topBid}</span>
            <Eth className="h-3 ml-1" />
          </div>
        </div>

        {/* Owners */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#7F8199]">OWNERS</span>
          <span>{data.stats.owners}</span>
        </div>

        {/* Supply */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#7F8199]">SUPPLY</span>
          <span>{data.stats.supply}</span>
        </div>

        {/* Royalty */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#7F8199]">ROYALTY</span>
          <span>{data.stats.royalty}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
