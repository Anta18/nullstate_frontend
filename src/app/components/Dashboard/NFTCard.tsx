import React from "react";

interface NFTCardProps {
  imageSrc: string;
  title: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ imageSrc, title }) => {
  return (
    <div className="rounded-lg overflow-hidden relative">
      {/* Image Wrapper */}
      <div className="relative">
        <img src={imageSrc} alt={title} className="w-[400px] h-[400px]" />
        {/* Text Container */}
        {/* <div className="absolute bottom-0 left-0 w-full bg-[rgba(18,17,17,0.6)] text-white p-4 z-20">
          <div className="text-lg font-semibold text-[#C4C4C4]">{title}</div>
          <div className="text-sm text-white">{owners} Owners</div>
        </div> */}
      </div>
    </div>
  );
};

export default NFTCard;
