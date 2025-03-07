"use client";
import React, { useState } from "react";
import ProfileStats from "../components/Buy/ProfileStats";
import Navbar from "../components/Navbar/Navbar";

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

  // Filter options
  const filterOptions = {
    rarities: [
      "Any",
      "Rank #1 - #1000",
      "Rank #1001 - #5000",
      "Rank #5001 - #10000",
    ],
    traits: ["Background", "Eyes", "Hair"],
  };

  // Table data (NFT items)
  const [tableItems] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      id: index,
      image: "/images/Azuki.png",
      name: `Azuki #${3770 + index}`,
      rarity: `Rank #${1000 + index}`,
      price: (10 + index * 0.01).toFixed(2) + " ETH",
      change24h: "+1.2%",
      change7d: "+3.5%",
      lastSale: "9.2 ETH",
    }))
  );

  // Activity data
  const [activityItems] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      description: `Bought Azuki #${3000 + i}`,
      timeAgo: "2h ago",
      amount: "+10.5 ETH",
    }))
  );

  // Handler for buy button click
  const handleBuy = (item: any) => {
    console.log("Buy button clicked for:", item);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <ProfileStats />

      {/* Top Stats / Header */}
      <header className="px-6 py-4 border-b border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        {/* Collection Name and Stats */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">{collectionData.name}</h1>
          <div className="hidden sm:flex space-x-2 text-gray-400 text-sm">
            <span>
              Floor Price:{" "}
              <span className="text-white font-medium">
                {collectionData.floorPrice}
              </span>
            </span>
            <span>|</span>
            <span>
              24h:{" "}
              <span className="text-green-400">{collectionData.change24h}</span>
            </span>
            <span>|</span>
            <span>
              7d:{" "}
              <span className="text-green-400">{collectionData.change7d}</span>
            </span>
            <span>|</span>
            <span>Volume (24h): {collectionData.volume24h}</span>
            <span>|</span>
            <span>Owners: {collectionData.owners}</span>
          </div>
        </div>
        {/* Additional top-right stats */}
        <div className="mt-2 sm:mt-0 flex space-x-4 text-sm text-gray-400">
          <div>
            <p>Items</p>
            <p className="text-white font-medium">{collectionData.items}</p>
          </div>
          <div>
            <p>Listed</p>
            <p className="text-white font-medium">{collectionData.listed}</p>
          </div>
          <div>
            <p>Market Cap</p>
            <p className="text-white font-medium">{collectionData.marketCap}</p>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar Filters */}
        <aside className="hidden lg:block w-64 border-r border-gray-800 p-4">
          <h2 className="text-lg font-bold mb-4">Filters</h2>
          <div className="space-y-6 text-sm text-gray-200">
            {/* Only Buy Now */}
            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span>Only Buy Now</span>
              </label>
            </div>

            {/* Rarity */}
            <div>
              <h3 className="font-medium mb-2">Rarity</h3>
              <select className="bg-gray-800 text-white rounded w-full p-2 focus:outline-none">
                {filterOptions.rarities.map((option, idx) => (
                  <option key={idx}>{option}</option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <h3 className="font-medium mb-2">Price</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Min"
                  className="bg-gray-800 p-2 rounded w-1/2 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Max"
                  className="bg-gray-800 p-2 rounded w-1/2 focus:outline-none"
                />
              </div>
            </div>

            {/* Traits */}
            <div>
              <h3 className="font-medium mb-2">Traits</h3>
              <ul className="space-y-1">
                {filterOptions.traits.map((trait, idx) => (
                  <li key={idx}>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <span>{trait}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          {/* Table header row */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">Items</h2>
            <div className="flex items-center space-x-4">
              <button className="px-3 py-1 rounded bg-gray-800 text-gray-300 text-sm hover:bg-gray-700">
                Buy Floor
              </button>
              <button className="px-3 py-1 rounded bg-gray-800 text-gray-300 text-sm hover:bg-gray-700">
                Sort By: Rarity
              </button>
            </div>
          </div>

          {/* Table of items */}
          <div className="w-full overflow-x-auto border border-gray-800 rounded">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-800 text-gray-400">
                <tr>
                  <th className="px-4 py-2 text-left">Item</th>
                  <th className="px-4 py-2 text-left">Rarity</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">24h Change</th>
                  <th className="px-4 py-2 text-left">7d Change</th>
                  <th className="px-4 py-2 text-left">Last Sale</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-800 hover:bg-gray-800"
                  >
                    <td className="px-4 py-3 flex items-center space-x-2">
                      <img
                        src={item.image}
                        alt="nft"
                        className="w-10 h-10 rounded"
                      />
                      <span>{item.name}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{item.rarity}</td>
                    <td className="px-4 py-3 text-gray-300">{item.price}</td>
                    <td className="px-4 py-3 text-green-400">
                      {item.change24h}
                    </td>
                    <td className="px-4 py-3 text-green-400">
                      {item.change7d}
                    </td>
                    <td className="px-4 py-3 text-gray-300">{item.lastSale}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleBuy(item)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm"
                      >
                        Buy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* Right Sidebar (Activity & Chart) */}
        <aside className="hidden xl:block w-64 border-l border-gray-800 p-4">
          <div className="space-y-6">
            <div>
              <h2 className="font-bold text-lg mb-2">Activity</h2>
              <ul className="space-y-2 text-sm">
                {activityItems.map((activity) => (
                  <li
                    key={activity.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-gray-300">{activity.description}</p>
                      <p className="text-xs text-gray-500">
                        {activity.timeAgo}
                      </p>
                    </div>
                    <p className="text-green-400">{activity.amount}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
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
