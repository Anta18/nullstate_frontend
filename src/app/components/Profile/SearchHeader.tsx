import React, { useState } from "react";
import { Search, Grid2X2, List, Filter, X } from "lucide-react";

interface SearchHeaderProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (value: number) => void;
  onViewChange?: (view: "grid" | "list") => void;
  onSortChange?: (sortOrder: string) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  onSearch,
  onViewChange,
  onFilterChange,
  onSortChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [activeSort, setActiveSort] = useState("Recently Received");
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  const handleViewChange = (view: "grid" | "list") => {
    setActiveView(view);
    onViewChange?.(view);
  };

  const handleSortChange = (sortOrder: string) => {
    setActiveSort(sortOrder);
    setIsSortOpen(false);
    onSortChange?.(sortOrder);
  };

  const sortOptions = [
    "Recently Received",
    "Price: Low to High",
    "Price: High to Low",
    "Rarity: Common First",
    "Rarity: Rare First",
  ];

  return (
    <div className="w-full bg-[#131419] p-4 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search and filters section */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search input */}
          <div className="relative rounded-full overflow-hidden bg-black border border-[#272934] flex-1 min-w-[240px]">
            <div className="absolute inset-y-0 left-3 flex items-center">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search ID or Name"
              className="w-full bg-transparent text-white py-2 pl-10 pr-4 focus:outline-none"
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery && (
              <div className="absolute inset-y-0 right-3 flex items-center">
                <button
                  onClick={() => {
                    setSearchQuery("");
                    onSearch?.("");
                  }}
                >
                  <X size={16} className="text-gray-400 hover:text-white" />
                </button>
              </div>
            )}
          </div>

          {/* Filter buttons */}
          <div className="flex gap-2">
            <div className="relative">
              <button
                className={`px-4 py-2 border rounded-md text-white flex items-center transition-colors ${
                  isFilterOpen
                    ? "bg-[#4023B5] border-[#4023B5]"
                    : "bg-black border-[#272934] hover:border-[#4023B5]"
                }`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={16} className="mr-2" />
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
              {isFilterOpen && (
                <div className="absolute mt-2 w-48 bg-[#1A1B22] border border-[#272934] rounded-md shadow-lg z-10">
                  <div className="p-2">
                    <div className="flex items-center mb-2">
                      <input type="checkbox" id="owned" className="mr-2" />
                      <label htmlFor="owned" className="text-white">
                        Owned
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input type="checkbox" id="listed" className="mr-2" />
                      <label htmlFor="listed" className="text-white">
                        Listed
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="staked" className="mr-2" />
                      <label htmlFor="staked" className="text-white">
                        Staked
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="px-4 py-2 bg-black border border-[#272934] hover:border-[#4023B5] rounded-md text-white flex items-center transition-colors">
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
          </div>
        </div>

        {/* Sort and view options */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              className="px-4 py-2 bg-black border border-[#272934] hover:border-[#4023B5] rounded-md text-white flex items-center transition-colors"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              {activeSort}
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
            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1A1B22] border border-[#272934] rounded-md shadow-lg z-10">
                <div className="p-2">
                  {sortOptions.map((option) => (
                    <div
                      key={option}
                      className={`p-2 cursor-pointer rounded hover:bg-[#272934] ${
                        activeSort === option ? "text-[#4023B5]" : "text-white"
                      }`}
                      onClick={() => handleSortChange(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex border border-[#272934] rounded">
            <button
              className={`p-2 hover:bg-gray-800 transition-colors ${
                activeView === "grid" ? "text-[#4023B5]" : "text-gray-400"
              }`}
              onClick={() => handleViewChange("grid")}
            >
              <Grid2X2 size={20} />
            </button>
            <button
              className={`p-2 hover:bg-gray-800 transition-colors ${
                activeView === "list" ? "text-[#4023B5]" : "text-gray-400"
              }`}
              onClick={() => handleViewChange("list")}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
