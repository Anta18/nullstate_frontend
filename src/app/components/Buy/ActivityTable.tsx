import React from "react";

interface TableRow {
  time: string;
  itemImage: string;
  itemName: string;
  price: number;
  seller: string;
}

const data: TableRow[] = [
  {
    time: "30s",
    itemImage: "/images/Azuki.png",
    itemName: "#1",
    price: 3.07,
    seller: "9feA69",
  },
  {
    time: "30s",
    itemImage: "/images/Azuki.png",
    itemName: "#2",
    price: 3.07,
    seller: "9feA69",
  },
  {
    time: "30s",
    itemImage: "/images/Azuki.png",
    itemName: "#3",
    price: 3.07,
    seller: "9feA69",
  },
];

export default function ActivityTable() {
  return (
    <div className="p-2 w-[280px] text-xs font-sans bg-black text-white">
      <table className="table-auto w-full">
        {/* Table Head */}
        <thead className="text-gray-400 border-b border-gray-700">
          <tr>
            <th className="py-2 text-left">TIME</th>
            <th className="py-2 text-left">ITEM</th>
            <th className="py-2 text-left">PRICE</th>
            <th className="py-2 text-left">SELLER</th>
            <th className="py-2 text-right"></th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b border-gray-700">
              <td className="py-2">{row.time}</td>
              <td className="py-2">
                <img
                  src={row.itemImage}
                  alt="NFT Icon"
                  className="inline-block w-4 h-4 rounded-full mr-1 align-middle"
                />
                {row.itemName}
              </td>
              <td className="py-2">
                <span className="inline-block mr-1 align-middle">💎</span>
                {row.price}
              </td>
              <td className="py-2">{row.seller}</td>
              <td className="py-2 text-right">
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-2 py-1 rounded">
                  BUY
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
