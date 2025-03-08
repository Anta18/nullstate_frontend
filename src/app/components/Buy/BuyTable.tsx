import { Checkbox } from "@/app/components/ui/checkbox";
import { Check, Clock } from "lucide-react";
import React from "react";

interface TableItem {
  tokenId: number;
  name: string;
  rarity: number;
  buyNow: string;
  lastSale: string;
  topBid: string;
  owner: string;
  held: number;
  timeAgo: string;
  imageUrl?: string;
}

const items: TableItem[] = [
  {
    tokenId: 6771,
    name: "Azuki #6771",
    rarity: 3373,
    buyNow: "0.026",
    lastSale: "3.07",
    topBid: "$2.91",
    owner: "3DFD5C",
    held: 1,
    timeAgo: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6771,
    name: "Azuki #6771",
    rarity: 3373,
    buyNow: "0.026",
    lastSale: "3.07",
    topBid: "$2.91",
    owner: "3DFD5C",
    held: 1,
    timeAgo: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6771,
    name: "Azuki #6771",
    rarity: 3373,
    buyNow: "0.026",
    lastSale: "3.07",
    topBid: "$2.91",
    owner: "3DFD5C",
    held: 1,
    timeAgo: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6771,
    name: "Azuki #6771",
    rarity: 3373,
    buyNow: "0.026",
    lastSale: "3.07",
    topBid: "$2.91",
    owner: "3DFD5C",
    held: 1,
    timeAgo: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6771,
    name: "Azuki #6771",
    rarity: 3373,
    buyNow: "0.026",
    lastSale: "3.07",
    topBid: "$2.91",
    owner: "3DFD5C",
    held: 1,
    timeAgo: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6771,
    name: "Azuki #6771",
    rarity: 3373,
    buyNow: "0.026",
    lastSale: "3.07",
    topBid: "$2.91",
    owner: "3DFD5C",
    held: 1,
    timeAgo: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6771,
    name: "Azuki #6771",
    rarity: 3373,
    buyNow: "0.026",
    lastSale: "3.07",
    topBid: "$2.91",
    owner: "3DFD5C",
    held: 1,
    timeAgo: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6771,
    name: "Azuki #6771",
    rarity: 3373,
    buyNow: "0.026",
    lastSale: "3.07",
    topBid: "$2.91",
    owner: "3DFD5C",
    held: 1,
    timeAgo: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6771,
    name: "Azuki #6771",
    rarity: 3373,
    buyNow: "0.026",
    lastSale: "3.07",
    topBid: "$2.91",
    owner: "3DFD5C",
    held: 1,
    timeAgo: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6771,
    name: "Azuki #6771",
    rarity: 3373,
    buyNow: "0.026",
    lastSale: "3.07",
    topBid: "$2.91",
    owner: "3DFD5C",
    held: 1,
    timeAgo: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6771,
    name: "Azuki #6771",
    rarity: 3373,
    buyNow: "0.026",
    lastSale: "3.07",
    topBid: "$2.91",
    owner: "3DFD5C",
    held: 1,
    timeAgo: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6771,
    name: "Azuki #6771",
    rarity: 3373,
    buyNow: "0.026",
    lastSale: "3.07",
    topBid: "$2.91",
    owner: "3DFD5C",
    held: 1,
    timeAgo: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6771,
    name: "Azuki #6771",
    rarity: 3373,
    buyNow: "0.026",
    lastSale: "3.07",
    topBid: "$2.91",
    owner: "3DFD5C",
    held: 1,
    timeAgo: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
];

const BuyTable: React.FC = () => {
  return (
    <div className="overflow-x-auto text-white pb-4 px-6 font-roboto-mono">
      <div>
        <table className="w-full text-left">
          <thead className="border-b border-gray-700 bg-[#121111]">
            <tr className="uppercase text-xs text-gray-400">
              {/* Checkbox column */}
              <th scope="col" className="py-3 font-medium pl-3">
                <Checkbox />
              </th>
              <th scope="col" className="py-3 font-medium pl-2">
                Name
              </th>
              <th scope="col" className="py-3 font-medium pl-2">
                Rarity
              </th>
              <th scope="col" className="py-3 font-medium pl-2">
                Buy Now
              </th>
              <th scope="col" className="py-3 font-medium pl-2">
                Last Sale
              </th>
              <th scope="col" className="py-3 font-medium pl-2">
                Top Bid
              </th>
              <th scope="col" className="py-3 font-medium pl-2">
                Owner
              </th>
              <th scope="col" className="py-3 font-medium pl-2">
                #Held
              </th>
              <th scope="col" className="py-3 font-medium pl-2">
                <Clock className="w-4 h-auto" />
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {items.map((item) => (
              <tr key={item.tokenId}>
                {/* Checkbox */}
                <td className="p-3">
                  <Checkbox />
                </td>
                <td className="px-2 py-3 flex items-center text-sm font-medium whitespace-nowrap space-x-3">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-8 h-8 object-cover rounded mr-2"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-700 rounded" />
                  )}{" "}
                  {item.name}
                </td>
                <td className="px-2 py-3 text-sm whitespace-nowrap">
                  {item.rarity}
                </td>
                <td className="px-2 py-3 text-sm whitespace-nowrap border-gray-500 rounded-lg">
                  {item.buyNow} ETH
                </td>
                <td className="px-2 py-3 text-sm whitespace-nowrap">
                  {item.lastSale}
                </td>
                <td className="px-2 py-3 text-sm whitespace-nowrap">
                  {item.topBid}
                </td>
                <td className="px-2 py-3 text-sm whitespace-nowrap">
                  {item.owner}
                </td>
                <td className="px-2 py-3 text-sm whitespace-nowrap">
                  {item.held}
                </td>
                <td className="px-2 py-3 text-sm whitespace-nowrap">
                  {item.timeAgo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyTable;
