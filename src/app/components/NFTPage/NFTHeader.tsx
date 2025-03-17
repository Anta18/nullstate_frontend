import React from "react";

interface NFTHeaderProps {
  title: string;
  owner: string;
}

const NFTHeader: React.FC<NFTHeaderProps> = ({ title, owner }) => {
  return (
    <div className="mb-6">

      <h1 className="text-3xl font-semibold mb-2">{title}</h1>
      <div className="flex items-center">
        <span className="text-[#7F8199]">Owned by</span>
        <a href="#" className="text-[#2081E2] ml-2">
          {owner.slice(0,8)}...{owner.slice(-10)}
        </a>
      </div>
    </div>
  );
};

export default NFTHeader;
