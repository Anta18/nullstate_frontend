import React from "react";
import { Star, X, Link } from "lucide-react";
import Eth from "../../../assets/icons/Eth.svg";

const ProfileStats = () => {
  const nftData = {
    image: "/images/Azuki.png",
    name: "Azuki",
    social: {
      twitter: true,
      link: true,
    },
    stats: {
      floorPrice: 2.931,
      topBid: 2.91,
      oneDayChange: -6.06,
      sevenDayChange: -6.83,
      fifteenMinuteVolume: 6.42,
      oneDayVolume: 1032.79,
      sevenDayVolume: 4176,
      owners: "4223 (42%)",
      supply: 10000,
      royalty: "0.0%",
    },
  };

  return (
    <div className="bg-black text-white w-full p-4 flex items-center font-mono">
      <div className="flex items-center space-x-3">
        {/* NFT Image */}
        <div className="relative w-12 h-12 bg-red-600 rounded-md overflow-hidden">
          <img
            src={nftData.image}
            alt={`${nftData.name} NFT`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* NFT Name and Social Links */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-1">
            <span className="font-bold text-lg">{nftData.name}</span>
            <Star className="h-4 w-4 text-white" />
          </div>
          <div className="flex space-x-2">
            <X className="h-4 w-4 text-gray-400" />
            <Link className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="ml-auto grid grid-cols-10 gap-2">
        {/* Floor Price */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#7F8199]">FLOOR PRICE</span>
          <div className="flex items-center">
            <span>{nftData.stats.floorPrice}</span>
            <Eth />
          </div>
        </div>

        {/* Top Bid */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#7F8199]">TOP BID</span>
          <div className="flex items-center">
            <span className="text-xs ]">{nftData.stats.topBid}</span>
            <Eth />
          </div>
        </div>

        {/* 1D Change */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#7F8199]">1D CHANGE</span>
          <span className="text-[#847CDE]">{nftData.stats.oneDayChange}%</span>
        </div>

        {/* 7D Change */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#7F8199]">7D CHANGE</span>
          <span className="text-[#847CDE]">
            {nftData.stats.sevenDayChange}%
          </span>
        </div>

        {/* 15M Volume */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#7F8199]">15M VOLUME</span>
          <div className="flex items-center">
            <span className="text-xs ">
              {nftData.stats.fifteenMinuteVolume}
            </span>
            <Eth />
          </div>
        </div>

        {/* 1D Volume */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#7F8199]">1D VOLUME</span>
          <div className="flex items-center">
            <span className="text-xs">{nftData.stats.oneDayVolume}</span>
            <Eth />
          </div>
        </div>

        {/* 7D Volume */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#7F8199]">7D VOLUME</span>
          <div className="flex items-center">
            <span className="text-xs ">{nftData.stats.sevenDayVolume}</span>
            <Eth />
          </div>
        </div>

        {/* Owners */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#7F8199]">OWNERS</span>
          <span className="text-xs ">{nftData.stats.owners}</span>
        </div>

        {/* Supply */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#7F8199]">SUPPLY</span>
          <span className="text-xs ">{nftData.stats.supply}</span>
        </div>

        {/* Royalty */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#7F8199]">ROYALTY</span>
          <span className="text-xs ">{nftData.stats.royalty}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
