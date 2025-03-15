import React from "react";
import NFTCard from "./components/Dashboard/NFTCard";
import TrendingNFT from "./components/TrendingNFT/TrendingNFT";
import ImageOverlay from "./components/Dashboard/ImageOverlay";
import NFTCollection from "../data/TableData";
import CreatorBanner from "./components/Dashboard/CreatorBanner";
import ExperiencePage from "./components/Dashboard/ExperiencePage";

const HomePage: React.FC = () => {
  const nftCollection = [
    { imageSrc: "/images/image 223.png", title: "GK36" },
    { imageSrc: "/images/image 221.png", title: "GK34" },
    { imageSrc: "/images/image 196.png", title: "GK35" },
  ];
  // const popularCollection = [
  //   { imageSrc: "/images/nft_cat.png", title: "GK34", owners: 4224 },
  //   { imageSrc: "/images/nft_cat.png", title: "GK35", owners: 3201 },
  //   { imageSrc: "/images/nft_cat.png", title: "GK36", owners: 2100 },
  //   { imageSrc: "/images/nft_cat.png", title: "GK37", owners: 1987 },
  // ];
  return (
    <div className="min-h-screen overflow-auto text-[#E0D9F5] font-w95 custom-scrollbar bg-black">
      <div className="relative bg-gradient-to-b from-[#5539A8] via-[rgba(116,14,63,40%)] to-black">
        <ImageOverlay />

        <section className="relative flex flex-col items-center justify-center text-center pt-10 pb-16 px-4">
          <div className="w-full mt-56 flex justify-end mr-16">
            <h1 className="text-[120px] leading-tight mb-48 text-right max-w-3xl">
              nullstate
            </h1>
          </div>
        </section>
        <CreatorBanner />
        <section className="px-4 py-8 m-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {nftCollection.map((nft, index) => (
              <NFTCard key={index} imageSrc={nft.imageSrc} title={nft.title} />
            ))}
          </div>
        </section>
      </div>

      <div className="mb-8 bg-black"></div>
      <TrendingNFT data={NFTCollection} limit={10} />
      <ExperiencePage />

      {/* FOOTER */}
      {/* <img src="/images/Footer.svg" /> */}
    </div>
  );
};

export default HomePage;
