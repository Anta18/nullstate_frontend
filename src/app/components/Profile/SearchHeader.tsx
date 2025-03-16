import React, { useState } from "react";
import { Search, Grid2X2, List } from "lucide-react";

interface SearchHeaderProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (value: number) => void;
  onViewChange?: (view: "grid" | "list") => void;
  onSortChange?: (sortOrder: string) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  onSearch,
  onViewChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [sliderValue, setSliderValue] = useState(0);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  // const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSliderValue(parseInt(e.target.value));
  //   onFilterChange?.(parseInt(e.target.value));
  // };

  return (
    <div className="w-full flex items-center bg-[#131419] p-4 mb-8 justify-between gap-4">
      <div className="flex gap-6 w-1/2">
        <button className="px-4 py-2 bg-black border border-[#272934] rounded-md text-white flex items-center">
          Status
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <button className="px-4 py-2 bg-black border border-[#272934] rounded-md text-white flex items-center">
          Chains
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Search input */}
        <div className="relative rounded-full overflow-hidden bg-black border-[1px] border-[#272934] flex-1 max-w-md">
          <div className="absolute inset-y-0 left-3 flex items-center">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search ID or Name"
            className="w-full bg-transparent text-white py-2 pl-10 pr-4 focus:outline-none"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-2">
        <div className="relative">
          <button className="px-4 py-2 bg-black border border-[#272934] rounded-md text-white flex items-center">
            Recently Received
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        <div className="flex border border-[#272934] rounded">
          <button
            className="p-2 text-gray-400 hover:bg-gray-800"
            onClick={() => onViewChange?.("grid")}
          >
            <Grid2X2 size={20} />
          </button>
          <button
            className="p-2 text-gray-400 hover:bg-gray-800"
            onClick={() => onViewChange?.("list")}
          >
            <List size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
