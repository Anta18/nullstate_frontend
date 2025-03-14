"use client";
import React from "react";
import TabMenu from "./TabMenu";
import Eth from "../../../assets/icons/Eth.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface NftCollection {
  collectionName: string;
  floorPrice: string;
  topBid: string;
  dayFloorChange: string;
  weekFloorChange: string;
  dayVolume: string;
  weekVolume: string;
  owners: string;
  supply: string;
  imageUrl?: string;
}

interface TrendingNFTProps {
  data: NftCollection[];
  limit?: number; // optional prop to limit the number of rows
}

const TrendingNFT: React.FC<TrendingNFTProps> = ({ data, limit }) => {
  const router = useRouter();
  const displayedData = limit ? data.slice(0, limit) : data;

  const handleRowClick = () => {
    router.push("/collection");
  };

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
            {displayedData.map((item, idx) => (
              <tr
                key={idx}
                onClick={handleRowClick}
                className="border-b border-gray-800 hover:bg-gray-900 transition-colors cursor-pointer"
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
      {/* Render "View More" button only if limit is set and there are more rows */}
      {limit && data.length > limit && (
        <div className="flex justify-center mt-4">
          <Link href="/collections">
            <button className="bg-black border-[1px] border-gray-800 hover:bg-[#6A4FB2] text-white font-bold py-2 px-4 rounded transition-colors">
              View All
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default TrendingNFT;
