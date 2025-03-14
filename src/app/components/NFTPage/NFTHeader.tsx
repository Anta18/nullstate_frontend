import React from "react";

interface NFTHeaderProps {
  title: string;
  owner: string;
}

const NFTHeader: React.FC<NFTHeaderProps> = ({ title, owner }) => {
  return (
    <div className="mb-6">
      <p className="text-[#2081E2] mb-1">{owner}</p>
      <h1 className="text-3xl font-semibold mb-2">{title}</h1>
      <div className="flex items-center">
        <span className="text-[#7F8199]">Owned by</span>
        <a href="#" className="text-[#2081E2] ml-2">
          {owner}
        </a>
      </div>
    </div>
  );
};

export default NFTHeader;
