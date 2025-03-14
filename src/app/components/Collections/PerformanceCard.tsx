import React from "react";
import Eth from "../../../assets/icons/Eth.svg";
import Db from "../../../assets/icons/db.svg";
import Coins from "../../../assets/icons/u_coins.svg";
import ImageIcon from "../../../assets/icons/u_image.svg";
import ArrowUp from "../../../assets/icons/u_arrow-up-right.svg";
import ArrowDown from "../../../assets/icons/u_arrow-down-left.svg";

interface DashboardStats {
  collections: number;
  nftsOwned: number;
  ethSpent: number;
  revenue: number;
  realizedGains: number;
}

interface NFTDashboardProps {
  currentValue: number;
  invested: number;
  pnl: number;
  stats: DashboardStats;
}

const NFTDashboard: React.FC<NFTDashboardProps> = ({
  currentValue,
  invested,
  pnl,
  stats,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-black text-white w-full font-mono">
      {/* Performance Card */}
      <div className="bg-black border border-gray-800 rounded-lg p-6 flex-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm text-gray-400 font-medium">Performance</h2>
          <div className="rounded-full border border-gray-700 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div className="space-y-4 flex justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-1 ml-1">Current</p>
              <div className="flex items-center">
                <p className="text-4xl flex">
                  <Eth className="h-[36px] mt-1" />
                  <span className="ml-2">{currentValue.toFixed(2)}</span>
                </p>
              </div>
            </div>
            <div className="ml-16">
              <p className="text-xs text-gray-400 mb-1 ml-1">Invested</p>
              <div className="flex items-center">
                <Eth className="h-4 mr-1" />
                <p className="text-md">{invested.toFixed(2)}</p>
              </div>
            </div>
            <div className="ml-16 flex-col items-end">
              <p className="text-xs text-gray-400 mb-1 ml-1">PnL</p>
              <div className="flex items-center">
                <Eth className="h-4 mr-1" />
                <p className="text-md">{pnl.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Card */}
      <div className="bg-black border border-gray-800 rounded-lg p-6 flex-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm text-gray-400 font-medium">Statistics</h2>
          <div className="rounded-full border border-gray-700 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex items-center">
            <div className="bg-gray-800 rounded-full p-2 mr-3">
              <Db />
            </div>
            <div>
              <p className="text-xs text-gray-400">Collections</p>
              <p className="text-lg font-medium">{stats.collections}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-gray-800 rounded-full p-2 mr-3">
              <ImageIcon />
            </div>
            <div>
              <p className="text-xs text-gray-400">NFTs owned</p>
              <p className="text-lg font-medium">{stats.nftsOwned}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-gray-800 rounded-full p-2 mr-3">
              <ArrowUp />
            </div>
            <div>
              <p className="text-xs text-gray-400">ETH Spent</p>
              <p className="text-lg font-medium">
                <span className="text-green-500">↑</span>{" "}
                {stats.ethSpent.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-gray-800 rounded-full p-2 mr-3">
              <Coins />
            </div>
            <div>
              <p className="text-xs text-gray-400">Revenue</p>
              <p className="text-lg font-medium">
                <span className="text-green-500">↑</span>{" "}
                {stats.revenue.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-gray-800 rounded-full p-2 mr-3">
              <ArrowDown />
            </div>
            <div>
              <p className="text-xs text-gray-400">Realized gains</p>
              <p className="text-lg font-medium">
                <span className="text-green-500">↑</span>{" "}
                {stats.realizedGains.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDashboard;
