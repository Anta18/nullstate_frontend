import React from "react";
import Broom from "../../../assets/icons/broom.svg";
import Slider from "@/components/ui/slider";

const SweepSlider = () => {
  return (
    <div className="w-full max-w-2xs bg-black p-4 flex justify-center">
      <div className=" w-full rounded-lg border border-gray-700 overflow-hidden">
        <div className="flex h-12">
          {/* Left section with icon */}
          <div className="flex-1 border-r max-w-16 border-gray-700 flex items-center justify-center">
            <Broom />
          </div>

          {/* Middle section with number */}
          <div className="flex-1 border-r w-full border-gray-700 flex items-center justify-center">
            <span className="text-white text-md font-mono">0</span>
          </div>

          {/* Right section with menu button and slider */}
          <div className="flex-grow-[3] flex items-center px-2 max-w-48">
            <Slider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SweepSlider;
