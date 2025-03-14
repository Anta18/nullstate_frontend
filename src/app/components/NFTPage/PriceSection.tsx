import React from "react";
import Eth from "../../../assets/icons/Eth.svg";

interface PriceSectionProps {
  price: number;
}

const PriceSection: React.FC<PriceSectionProps> = ({ price }) => {
  return (
    <div className="rounded-lg border-[1px] border-[#272934] p-6 mb-6">
      <div className="rounded-md border-[1px] border-[#272934] py-3 px-8 bg-[#131419] mb-6">
        <p className="text-[#7F8199] uppercase font-medium text-md">PRICE</p>
        <div className="flex items-center">
          <span className="text-2xl font-bold mr-2">{price}</span>
          <Eth className="h-5" />
        </div>
      </div>
      <button className="bg-[#4023B5] hover:bg-indigo-700 w-full py-3 font-medium mb-4">
        BUY NOW
      </button>
      <button className="bg-white w-full py-3 font-medium text-[#4023B5]">
        MAKE OFFER
      </button>
    </div>
  );
};

export default PriceSection;
