import React from "react";
import { Afacad } from "next/font/google";

const afacad = Afacad({ subsets: ["latin"], weight: ["400", "600", "700"] });

interface CreatorBannerProps {
  onApplyClick?: () => void;
}

const CreatorBanner: React.FC<CreatorBannerProps> = ({ onApplyClick }) => {
  return (
    <section
      className={`${afacad.className} relative w-full  text-white py-10 px-6 flex flex-col items-start md:flex-row md:items-center md:justify-between`}
    >
      <div className="max-w-xl">
        <h2 className="text-3xl font-semibold mb-4 text-[#E0D9F5]">
          Are you a Creator?
        </h2>
        <p className="text-[#969AAE] mb-6">
          Empowering creators. Nullstate prioritizes helping creators by
          providing assistance in technical support, networking, and community
          building.
        </p>
      </div>

      <button
        onClick={onApplyClick}
        className="text-[#E0CFFE] border border-[#E0CFFE] px-6 py-2 mt-2 md:mt-0 hover:bg-white hover:text-black transition-colors"
      >
        Apply Now
      </button>
    </section>
  );
};

export default CreatorBanner;
