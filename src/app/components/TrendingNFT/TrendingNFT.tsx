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
    <>
      <TabMenu />
      {/* Table */}
      <div className="overflow-x-auto text-white p-6 font-roboto-mono">
        <table className="w-full text-left">
          <thead className="border-b border-gray-700 bg-[#121111]">
            <tr className="uppercase text-xs text-gray-400">
              <th className="py-3 font-medium pl-2">Collection</th>
              <th className="py-3 font-medium pl-2">Volume(300)</th>
              <th className="py-3 font-medium pl-2">Floor</th>
              <th className="py-3 font-medium pl-2">Sales</th>
              <th className="py-3 font-medium pl-2">Last Sold</th>
              <th className="py-3 pl-4"></th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((item, idx) => {
              return (
                <tr
                  key={idx}
                  onClick={()=>handleRowClick(item.collectionName)}
                  className="border-b border-gray-800 hover:bg-gray-900 transition-colors cursor-pointer"
                >
                  {/* Collection */}
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
                  {/* Volume(300) */}
                  <td className="py-4 pl-2">
                    <span className="flex items-center">
                      <Eth className="h-3 mr-1" />
                      {item.volume}
                    </span>
                  </td>
                  {/* Floor */}
                  <td className="py-4 pl-2">
                    <span className="flex items-center">
                      <Eth className="h-3 mr-1" />
                      {item.floorPrice}
                    </span>
                  </td>
                  {/* Sales (computed as supply - owners) */}
                  <td className="py-4 pl-2">{item.sales}</td>
                  {/* Last Sold - render 3 image urls */}
                  <td className="py-4 pl-2">
                    <div className="flex space-x-2">
                      {item.lastSoldImageUrls.map((url, idx) => (
                        <img
                          key={idx}
                          src={url}
                          alt={`Last sold ${idx + 1}`}
                          className="w-6 h-6 object-cover rounded"
                        />
                      ))}
                    </div>
                  </td>
                  {/* Favourite Star */}
                  <td className="py-2 pl-2 text-2xl">
                    <button onClick={(e) => toggleFavourite(e, idx)}>
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
    </>
  );
};

export default TrendingNFT;
