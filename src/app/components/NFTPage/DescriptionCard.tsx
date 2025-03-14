import React from "react";
import { Afacad } from "next/font/google";

const afacad = Afacad({ subsets: ["latin"], weight: ["400", "600", "700"] });

interface DescriptionCardProps {
  description: string;
  author: string;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({
  description,
  author,
}) => {
  return (
    <div
      className={`${afacad.className} text-white rounded-md border-[1px] border-[#272934] max-w-xl mx-auto`}
    >
      <div className="w-full bg-[#131419] px-3 py-3">
        <h2 className="text-lg text-gray-400">DESCRIPTION</h2>
      </div>
      <div className="mt-4 px-3 pb-3">
        <p className="text-lg text-[#C2A3FF]">By {author}</p>
        <p className="text-gray-300 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default DescriptionCard;
