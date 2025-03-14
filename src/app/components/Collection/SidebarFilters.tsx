// components/Collection/SidebarFilters.tsx
import React, { useState } from "react";

interface Trait {
  name: string;
  count: number;
}

interface SidebarFiltersProps {
  traits: Trait[];
  traitOptions: { [key: string]: string[] };
  rarityData: { label: string; count: number }[];
  priceData: { label: string; count: number }[];
}

const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  traits,
  traitOptions,
  rarityData,
  priceData,
}) => {
  const [expanded, setExpanded] = useState({
    traits: true,
    rarity: false,
    price: false,
  });

  // State to track expansion for each trait item
  const [traitExpanded, setTraitExpanded] = useState<{
    [key: string]: boolean;
  }>(() =>
    traits.reduce((acc, trait) => {
      acc[trait.name] = false;
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleTrait = (traitName: string) => {
    setTraitExpanded((prev) => ({
      ...prev,
      [traitName]: !prev[traitName],
    }));
  };

  // Helper component for the toggle arrow
  const ToggleArrow = ({ isOpen }: { isOpen: boolean }) => (
    <svg
      className={`w-4 h-4 transform transition-transform duration-200 ${
        isOpen ? "rotate-180" : ""
      }`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 12.293l3.646-3.647a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L10 12.293z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="bg-black text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-gray-400 text-lg tracking-wider">FILTERS</h2>
        <button className="text-gray-400 text-2xl">«</button>
      </div>

      {/* Status */}
      <div className="mb-8">
        <h3 className="text-md mb-4">STATUS</h3>
        <div className="flex items-center mb-3">
          <div className="w-4 h-4 rounded-full bg-purple-700 mr-3"></div>
          <span>ONLY BUY NOW</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full border border-purple-700 mr-3"></div>
          <span>SHOW ALL</span>
        </div>
      </div>

      {/* Rarity */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("rarity")}
        >
          <h3 className="text-md">RARITY</h3>
          <ToggleArrow isOpen={expanded.rarity} />
        </div>
        {expanded.rarity && (
          <div className="mt-4">
            {rarityData.map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center mb-2 text-md"
              >
                <span>{item.label}</span>
                <span className="text-gray-400 text-sm">{item.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="mb-8">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("price")}
        >
          <h3 className="text-md">PRICE</h3>
          <ToggleArrow isOpen={expanded.price} />
        </div>
        {expanded.price && (
          <div className="mt-4">
            {priceData.map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center mb-2 text-md"
              >
                <span>{item.label}</span>
                <span className="text-gray-400 text-sm">{item.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-700 mb-8"></div>

      {/* Traits */}
      <div>
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("traits")}
        >
          <h3 className="text-md">TRAITS</h3>
          <ToggleArrow isOpen={expanded.traits} />
        </div>
        {expanded.traits && (
          <div>
            {traits.map((trait) => (
              <div key={trait.name}>
                <div
                  className="flex justify-between items-center mb-4 text-md cursor-pointer"
                  onClick={() => toggleTrait(trait.name)}
                >
                  <span>{trait.name}</span>
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-2">{trait.count}</span>
                    <ToggleArrow isOpen={traitExpanded[trait.name]} />
                  </div>
                </div>
                {traitExpanded[trait.name] && (
                  <div className="ml-4 mb-4">
                    {traitOptions[trait.name]?.map((option, index) => (
                      <div key={index} className="text-sm text-gray-400 mb-1">
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarFilters;
