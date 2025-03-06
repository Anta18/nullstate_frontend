import React from "react";
import NFTCard from "./components/Dashboard/NFTCard";
import TrendingNFT from "./components/TrendingNFT/TrendingNFT";
import ImageOverlay from "./components/Dashboard/ImageOverlay";
import Navbar from "./components/Navbar/Navbar";

const HomePage: React.FC = () => {
  const nftCollection = [
    { imageSrc: "/images/nft_cat.png", title: "GK34", owners: 4224 },
    { imageSrc: "/images/nft_cat.png", title: "GK35", owners: 3201 },
    { imageSrc: "/images/nft_cat.png", title: "GK36", owners: 2100 },
    { imageSrc: "/images/nft_cat.png", title: "GK37", owners: 1987 },
  ];

  return (
    <div className="min-h-screen text-[#E0D9F5] font-w95">
      <div className="relative bg-gradient-to-b from-[#5539A8] via-[rgba(116,14,63,40%)] to-black">
        <ImageOverlay />
        {/* NAVIGATION BAR */}
        <Navbar />

        {/* HERO SECTION */}
        <section className="relative flex flex-col items-center justify-center text-center pt-10 pb-16 px-4">
          <div className="w-full mt-56 flex justify-end mr-16">
            <h1 className="text-[120px] leading-tight mb-4 text-right max-w-3xl">
              The NFT Exchange for Power Traders
            </h1>
          </div>
        </section>

        <section className="px-4 py-8 m-16">
          <h2 className="text-[52px] font-bold mb-6 text-left">
            FEATURED COLLECTION
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl">
            {nftCollection.map((nft, index) => (
              <NFTCard
                key={index}
                imageSrc={nft.imageSrc}
                title={nft.title}
                owners={nft.owners}
              />
            ))}
          </div>
        </section>
      </div>

      <TrendingNFT />

      {/* FOOTER */}
      <footer className="py-6 text-center text-sm text-gray-500">
        © 2025 {"{}"}State. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
