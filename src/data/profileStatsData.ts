// data/profileStatsData.ts
export interface ProfileStatsData {
    image: string;
    name: string;
    social: {
      twitter: boolean;
      link: boolean;
    };
    stats: {
      totalVolume: number;
      floorPrice: number;
      topBid: number;
      owners: string;
      supply: number;
      royalty: string;
    };
  }
  
  export const profileStatsData: ProfileStatsData = {
    image: "/images/Azuki.png",
    name: "Azuki",
    social: {
      twitter: true,
      link: true,
    },
    stats: {
      totalVolume: 5249.21,
      floorPrice: 2.931,
      topBid: 2.91,
      owners: "4223(42%)",
      supply: 10000,
      royalty: "0.0%",
    },
  };
  