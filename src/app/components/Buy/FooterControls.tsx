import React from "react";
import SweepSlider from "./SweepSlider";
import Switch from "@/components/ui/switch";
import EthIcon from "../../../assets/icons/u-eth.svg";

const FooterControls = () => {
  return (
    <div className="flex items-center space-x-4 w-full bg-black px-1 pt-1 text-md">
      <div className="bg-black border border-purple-500 rounded-lg px-6 py-1">
        <div className="flex items-center space-x-4">
          <span className="text-purple-400 font-mono">BUY FLOOR</span>
          <div className="flex items-center">
            <EthIcon className="text-purple-400" />
            <span className="text-purple-300 font-mono ml-1">3.07</span>
          </div>
        </div>
      </div>

      <div className="flex items-center mr-2">
        <span className="text-green-400 font-mono mr-2">OR</span>
        <span className="text-green-400 font-mono">0.148</span>
        <EthIcon className="text-green-400" />
      </div>

      <div className="flex items-center space-x-2">
        <div className="w-12">
          <Switch />
        </div>
        <span className="text-white font-mono">OPTIMIZE SWEEP</span>
        <span className="text-gray-400">⚙️</span>
      </div>

      <SweepSlider />
    </div>
  );
};

export default FooterControls;
