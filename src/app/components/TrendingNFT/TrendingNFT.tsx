"use client";
import React from "react";
import TabMenu from "./TabMenu";

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

const mockData: NftCollection[] = [
  {
    collectionName: "Azuki #777",
    floorPrice: "0.45 ETH",
    topBid: "0.40 ETH",
    dayFloorChange: "+2.4%",
    weekFloorChange: "+5.2%",
    dayVolume: "4021 ETH",
    weekVolume: "6291 ETH",
    owners: "9998",
    supply: "9998",
    imageUrl: "/images/Azuki.png",
  },
  {
    collectionName: "Azuki #778",
    floorPrice: "0.46 ETH",
    topBid: "0.40 ETH",
    dayFloorChange: "+2.1%",
    weekFloorChange: "+4.8%",
    dayVolume: "4100 ETH",
    weekVolume: "6320 ETH",
    owners: "9998",
    supply: "9998",
    imageUrl: "/images/Azuki.png",
  },
  {
    collectionName: "Azuki #779",
    floorPrice: "0.47 ETH",
    topBid: "0.41 ETH",
    dayFloorChange: "+1.8%",
    weekFloorChange: "+4.5%",
    dayVolume: "4150 ETH",
    weekVolume: "6350 ETH",
    owners: "9998",
    supply: "9998",
    imageUrl: "/images/Azuki.png",
  },
  {
    collectionName: "Azuki #780",
    floorPrice: "0.48 ETH",
    topBid: "0.42 ETH",
    dayFloorChange: "+1.5%",
    weekFloorChange: "+4.2%",
    dayVolume: "4200 ETH",
    weekVolume: "6380 ETH",
    owners: "9998",
    supply: "9998",
    imageUrl: "/images/Azuki.png",
  },
  {
    collectionName: "Azuki #781",
    floorPrice: "0.50 ETH",
    topBid: "0.43 ETH",
    dayFloorChange: "+2.0%",
    weekFloorChange: "+4.0%",
    dayVolume: "4250 ETH",
    weekVolume: "6400 ETH",
    owners: "9998",
    supply: "9998",
    imageUrl: "/images/Azuki.png",
  },
  {
    collectionName: "Azuki #782",
    floorPrice: "0.52 ETH",
    topBid: "0.44 ETH",
    dayFloorChange: "+1.7%",
    weekFloorChange: "+3.8%",
    dayVolume: "4300 ETH",
    weekVolume: "6450 ETH",
    owners: "9998",
    supply: "9998",
    imageUrl: "/images/Azuki.png",
  },
  {
    collectionName: "Azuki #783",
    floorPrice: "0.55 ETH",
    topBid: "0.45 ETH",
    dayFloorChange: "+2.3%",
    weekFloorChange: "+3.6%",
    dayVolume: "4350 ETH",
    weekVolume: "6480 ETH",
    owners: "9998",
    supply: "9998",
    imageUrl: "/images/Azuki.png",
  },
  {
    collectionName: "Azuki #784",
    floorPrice: "0.58 ETH",
    topBid: "0.46 ETH",
    dayFloorChange: "+1.9%",
    weekFloorChange: "+3.4%",
    dayVolume: "4400 ETH",
    weekVolume: "6520 ETH",
    owners: "9998",
    supply: "9998",
    imageUrl: "/images/Azuki.png",
  },
  {
    collectionName: "Azuki #785",
    floorPrice: "0.60 ETH",
    topBid: "0.48 ETH",
    dayFloorChange: "+2.5%",
    weekFloorChange: "+3.2%",
    dayVolume: "4450 ETH",
    weekVolume: "6560 ETH",
    owners: "9998",
    supply: "9998",
    imageUrl: "/images/Azuki.png",
  },
  {
    collectionName: "Azuki #786",
    floorPrice: "0.62 ETH",
    topBid: "0.49 ETH",
    dayFloorChange: "+2.2%",
    weekFloorChange: "+3.0%",
    dayVolume: "4500 ETH",
    weekVolume: "6600 ETH",
    owners: "9998",
    supply: "9998",
    imageUrl: "/images/Azuki.png",
  },
  {
    collectionName: "Azuki #787",
    floorPrice: "0.65 ETH",
    topBid: "0.50 ETH",
    dayFloorChange: "+2.0%",
    weekFloorChange: "+2.8%",
    dayVolume: "4550 ETH",
    weekVolume: "6640 ETH",
    owners: "9998",
    supply: "9998",
    imageUrl: "/images/Azuki.png",
  },
  {
    collectionName: "Azuki #788",
    floorPrice: "0.68 ETH",
    topBid: "0.51 ETH",
    dayFloorChange: "+1.8%",
    weekFloorChange: "+2.6%",
    dayVolume: "4600 ETH",
    weekVolume: "6680 ETH",
    owners: "9998",
    supply: "9998",
    imageUrl: "/images/Azuki.png",
  },
  {
    collectionName: "Azuki #789",
    floorPrice: "0.70 ETH",
    topBid: "0.53 ETH",
    dayFloorChange: "+1.5%",
    weekFloorChange: "+2.4%",
    dayVolume: "4650 ETH",
    weekVolume: "6720 ETH",
    owners: "9998",
    supply: "9998",
    imageUrl: "/images/Azuki.png",
  },
  {
    collectionName: "Azuki #790",
    floorPrice: "0.72 ETH",
    topBid: "0.54 ETH",
    dayFloorChange: "+1.2%",
    weekFloorChange: "+2.2%",
    dayVolume: "4700 ETH",
    weekVolume: "6760 ETH",
    owners: "9998",
    supply: "9998",
    imageUrl: "/images/Azuki.png",
  },
  {
    collectionName: "Azuki #791",
    floorPrice: "0.75 ETH",
    topBid: "0.55 ETH",
    dayFloorChange: "+1.0%",
    weekFloorChange: "+2.0%",
    dayVolume: "4750 ETH",
    weekVolume: "6800 ETH",
    owners: "9998",
    supply: "9998",
    imageUrl: "/images/Azuki.png",
  },
];

const TrendingNFT: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6 font-roboto-mono">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-wide font-w95 text-[#E0D9F5]">
          TRENDING NFT
        </h1>
      </div>
      <TabMenu />
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-700 bg-[#121111]">
            <tr className="uppercase text-xs text-gray-400">
              <th className="py-3 font-medium">Collections</th>
              <th className="py-3 font-medium">Floor Price</th>
              <th className="py-3 font-medium">Top Bid</th>
              <th className="py-3 font-medium">24h Floor</th>
              <th className="py-3 font-medium">7D Floor</th>
              <th className="py-3 font-medium">24h Volume</th>
              <th className="py-3 font-medium">7D Volume</th>
              <th className="py-3 font-medium">Owners</th>
              <th className="py-3 font-medium">Supply</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-800 hover:bg-gray-900 transition-colors"
              >
                <td className="py-4 flex items-center space-x-3">
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
                <td className="py-4">{item.floorPrice}</td>
                <td className="py-4">{item.topBid}</td>
                <td className="py-4">
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
                <td className="py-4">
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
                <td className="py-4">{item.dayVolume}</td>
                <td className="py-4">{item.weekVolume}</td>
                <td className="py-4">{item.owners}</td>
                <td className="py-4">{item.supply}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrendingNFT;
