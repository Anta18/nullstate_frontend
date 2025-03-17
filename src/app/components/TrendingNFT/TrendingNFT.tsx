"use client";
import React, { useState, useEffect } from "react";
import TabMenu from "./TabMenu";
import Eth from "../../../assets/icons/Eth.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface NftCollection {
  collectionName: string;
  floorPrice: string;
  volume: string;
  sales: string;
  imageUrl?: string;
  lastSoldImageUrls: string[]; // 3 image urls for "Last Sold"
}

interface TrendingNFTProps {
  data: NftCollection[];
  limit?: number; // optional prop to limit the number of rows
}

const TrendingNFT: React.FC<TrendingNFTProps> = ({ data, limit }) => {
  const router = useRouter();
  const displayedData = limit ? data.slice(0, limit) : data;

  // Track favourite status for each row
  const [favourites, setFavourites] = useState<boolean[]>([]);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const handleRowClick = (collectionName: string) => {
    router.push(`/collections/${collectionName}`);
  };

  const toggleFavourite = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setFavourites((prevFavs) => {
      const newFavs = [...prevFavs];
      newFavs[index] = !newFavs[index];
      return newFavs;
    });
  };

  return (
    <div className="bg-[#080808] rounded-xl shadow-lg ">
      <TabMenu />
      {/* Table */}
      <div className="overflow-x-auto text-white p-6 font-roboto-mono">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="uppercase text-xs">
              <th className="py-5 font-semibold pl-5 rounded-tl-lg bg-[#131419] text-white">
                Collection
              </th>
              <th className="py-5 font-semibold pl-5 bg-[#131419] text-white">
                Volume(300)
              </th>
              <th className="py-5 font-semibold pl-5 bg-[#131419] text-white">
                Floor
              </th>
              <th className="py-5 font-semibold pl-5 bg-[#131419] text-white">
                Sales
              </th>
              <th className="py-5 font-semibold pl-5 bg-[#131419] text-white">
                Last Sold
              </th>
              <th className="py-5 pl-4 rounded-tr-lg bg-[#131419]"></th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((item, idx) => {
              const isLast = idx === displayedData.length - 1;
              const rowBg = idx % 2 === 0 ? "bg-[#0D0D0D]" : "bg-[#141414]";
              const hoverBg = "hover:bg-[#1E1E1E]";

              return (
                <tr
                  key={idx}
                  onClick={() => handleRowClick(item.collectionName)}
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`
                    transition-colors cursor-pointer
                    ${hoveredRow === idx ? "bg-[#222]" : rowBg}
                    ${hoverBg}
                  `}
                >
                  {/* Collection */}
                  <td
                    className={`py-4 pl-4 ${
                      isLast ? "rounded-bl-lg" : "border-b border-gray-800"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.collectionName}
                          className="w-10 h-10 object-cover rounded-lg border border-gray-700"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg" />
                      )}
                      <span className="font-medium text-white">
                        {item.collectionName}
                      </span>
                    </div>
                  </td>
                  {/* Volume(300) */}
                  <td
                    className={`py-4 pl-4 ${
                      isLast ? "" : "border-b border-gray-800"
                    }`}
                  >
                    <span className="flex items-center bg-[#1C1C20] px-3 py-1 rounded-full w-fit">
                      <Eth className="h-3 mr-2" />
                      <span className="text-sm">{item.volume}</span>
                    </span>
                  </td>
                  {/* Floor */}
                  <td
                    className={`py-4 pl-4 ${
                      isLast ? "" : "border-b border-gray-800"
                    }`}
                  >
                    <span className="flex items-center bg-[#1C1C20] px-3 py-1 rounded-full w-fit">
                      <Eth className="h-3 mr-2" />
                      <span className="text-sm">{item.floorPrice}</span>
                    </span>
                  </td>
                  {/* Sales */}
                  <td
                    className={`py-4 pl-4 ${
                      isLast ? "" : "border-b border-gray-800"
                    }`}
                  >
                    <div className="px-3 py-1 rounded-full bg-[#1C1C20] w-fit">
                      <span className="text-sm">{item.sales}</span>
                    </div>
                  </td>
                  {/* Last Sold */}
                  <td
                    className={`py-4 pl-4 ${
                      isLast ? "" : "border-b border-gray-800"
                    }`}
                  >
                    <div className="flex -space-x-2">
                      {item.lastSoldImageUrls.map((url, imgIdx) => (
                        <img
                          key={imgIdx}
                          src={url}
                          alt={`Last sold ${imgIdx + 1}`}
                          className="w-8 h-8 object-cover rounded-full border-2 border-[#0D0D0D]"
                        />
                      ))}
                    </div>
                  </td>
                  {/* Favourite Star */}
                  <td
                    className={`py-4 pl-4 pr-4 text-2xl ${
                      isLast ? "rounded-br-lg" : "border-b border-gray-800"
                    }`}
                  >
                    <button
                      onClick={(e) => toggleFavourite(e, idx)}
                      className={`transition-colors ${
                        favourites[idx]
                          ? "text-yellow-400"
                          : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      {favourites[idx] ? "★" : "☆"}
                    </button>
                  </td>
                </tr>
              );
            })}
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
    </div>
  );
};

export default TrendingNFT;
