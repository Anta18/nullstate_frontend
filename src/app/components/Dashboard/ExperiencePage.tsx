import React from "react";
import { Afacad } from "next/font/google";

const afacad = Afacad({ subsets: ["latin"], weight: ["400", "600", "700"] });

const NFTLandingPage = () => {
  return (
    <div className="w-full h-screen flex overflow-hidden pt-8">
      {/* Left section - visual area with purple-blue-black gradient (50%) */}
      <div className="w-1/2 relative">
        <img src="/images/2.svg" className="h-screen" />
        {/* Abstract pattern overlay */}
        {/* <div className="absolute inset-0 opacity-60">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 600"
            preserveAspectRatio="none"
          >
            <g transform="rotate(-10 400 300)">
              {[...Array(20)].map((_, i) => (
                <line
                  key={i}
                  x1={100 + i * 30}
                  y1={-100}
                  x2={-100 + i * 50}
                  y2={700}
                  stroke="rgba(186, 104, 200, 0.4)"
                  strokeWidth={(i % 3) + 1}
                  strokeLinecap="round"
                />
              ))}
              {[...Array(20)].map((_, i) => (
                <line
                  key={i + 20}
                  x1={-200 + i * 40}
                  y1={100 + i * 20}
                  x2={900}
                  y2={-100 + i * 30}
                  stroke="rgba(153, 102, 204, 0.3)"
                  strokeWidth={(i % 4) + 1}
                  strokeLinecap="round"
                />
              ))}
            </g>
          </svg>
        </div> */}
      </div>

      {/* Right section - black background with text content (50%) */}
      <div
        className={` w-1/2 bg-black flex flex-col justify-center items-center text-white p-8`}
      >
        <div className="max-w-lg flex flex-col justify-center items-end">
          <h1 className="text-5xl md:text-6xl font-medium tracking-wide mb-4 text-right text-[#E0D9F5] font-robit">
            The Superior
            <br />
            NFT Experience
            <br />
            on NullState
          </h1>

          <p
            className={`${afacad.className} text-gray-300 text-lg my-8 text-right`}
          >
            No more multi signings. Thunder enables bulk executions in a single
            transaction
          </p>

          <button className="bg-white text-purple-700 font-semibold text-lg py-3 px-8 rounded-sm hover:bg-opacity-90 transition-all duration-300 w-full max-w-sm">
            <span className={`text-center ${afacad.className}`}>Connect</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NFTLandingPage;
