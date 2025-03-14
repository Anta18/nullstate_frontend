import React from "react";

export interface Trait {
  trait: string;
  name: string;
  traitFloor: number;
}

interface TraitTableProps {
  traits: Trait[];
}

const TraitTable: React.FC<TraitTableProps> = ({ traits }) => {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="w-full border-collapse text-left rounded-lg overflow-hidden bg-black text-white">
        <thead className="bg-[#131419] text-[#969AAE] font-medium">
          <tr>
            <th className="px-6 py-3">TRAIT</th>
            <th className="px-6 py-3">NAME</th>
            <th className="px-6 py-3">TRAIT FLOOR</th>
          </tr>
        </thead>
        <tbody>
          {traits.map((trait, index) => (
            <tr key={index} className="hover:bg-gray-800">
              <td className="px-6 py-4">{trait.trait}</td>
              <td className="px-6 py-4">{trait.name}</td>
              <td className="px-6 py-4">{trait.traitFloor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TraitTable;
