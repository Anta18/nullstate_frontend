"use client";
import React from "react";
import TabMenu from "./TabMenu";
import Eth from "../../../assets/icons/Eth.svg";

interface NftCollection {
  collectionName: string;
  floorPrice: string;
  topBid: string;
  dayFloorChange: string; // 24h floor
  weekFloorChange: string; // 7D floor
  dayVolume: string; // 24h volume
  weekVolume: string; // 7D volume
  owners: string;
  supply: string;
  imageUrl?: string;
}

interface TrendingNFTProps {
  data: NftCollection[];
}

const TrendingNFT: React.FC<TrendingNFTProps> = ({ data }) => {
  return (
    <>
      <TabMenu />
      {/* Table */}
      <div className="overflow-x-auto text-white p-6 font-roboto-mono">
        <table className="w-full text-left">
          <thead className="border-b border-gray-700 bg-[#121111]">
            <tr className="uppercase text-xs text-gray-400">
              <th className="py-3 font-medium pl-2">Collections</th>
              <th className="py-3 font-medium pl-2">Floor Price</th>
              <th className="py-3 font-medium pl-2">Top Bid</th>
              <th className="py-3 font-medium pl-2">24h Floor</th>
              <th className="py-3 font-medium pl-2">7D Floor</th>
              <th className="py-3 font-medium pl-2">24h Volume</th>
              <th className="py-3 font-medium pl-2">7D Volume</th>
              <th className="py-3 font-medium pl-2">Owners</th>
              <th className="py-3 font-medium pl-2">Supply</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-800 hover:bg-gray-900 transition-colors"
              >
                <td className="py-4 pl-2 flex items-center space-x-3">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.collectionName}
                      className="w-8 h-8 object-cover rounded"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-700 rounded" />
                  )}
                  <span className="font-medium">{item.collectionName}</span>
                </td>
                <td className="py-4 pl-2">
                  <span className="flex">
                    <Eth className="h-3 mt-[6px] mr-1" />
                    {item.floorPrice}
                  </span>
                </td>
                <td className="py-4 pl-2">
                  <span className="flex">
                    <Eth className="h-3 mt-[6px] mr-1" />
                    {item.topBid}
                  </span>
                </td>
                <td className="py-4 pl-2">
                  <span
                    className={
                      item.dayFloorChange.startsWith("+")
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {item.dayFloorChange}
                  </span>
                </td>
                <td className="py-4 pl-2">
                  <span
                    className={
                      item.weekFloorChange.startsWith("+")
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {item.weekFloorChange}
                  </span>
                </td>
                <td className="py-4 pl-2">
                  <span className="flex">
                    <Eth className="h-3 mt-[6px] mr-1" />
                    {item.dayVolume}
                  </span>
                </td>
                <td className="py-4 pl-2">
                  <span className="flex">
                    <Eth className="h-3 mt-[6px] mr-1" />
                    {item.weekVolume}
                  </span>
                </td>
                <td className="py-4 pl-2">{item.owners}</td>
                <td className="py-4 pl-2">{item.supply}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TrendingNFT;
