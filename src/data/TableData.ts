interface NftCollection {
  collectionName: string;
  floorPrice: string;
  volume: string; 
  sales: string;
  imageUrl?: string;
  lastSoldImageUrls: string[]; // 3 image urls for "Last Sold"
}

const mockData: NftCollection[] = [
  {
    collectionName: "Azuki #777",
    floorPrice: "0.45 ETH",
    volume: "4021 ETH",
    sales: "9998",
    imageUrl: "/images/Azuki.png",
    lastSoldImageUrls: [
      "/images/Azuki.png",
      "/images/Azuki.png",
      "/images/Azuki.png",
    ],
  },
  {
    collectionName: "Azuki #778",
    floorPrice: "0.46 ETH",
    volume: "4100 ETH",
    sales: "9998",
    imageUrl: "/images/Azuki.png",
    lastSoldImageUrls: [
      "/images/Azuki.png",
      "/images/Azuki.png",
      "/images/Azuki.png",
    ],
  },
  {
    collectionName: "Azuki #779",
    floorPrice: "0.47 ETH",
    volume: "4150 ETH",
    sales: "9998",
    imageUrl: "/images/Azuki.png",
    lastSoldImageUrls: [
      "/images/Azuki.png",
      "/images/Azuki.png",
      "/images/Azuki.png",
    ],
  },
  {
    collectionName: "Azuki #780",
    floorPrice: "0.48 ETH",
    volume: "4200 ETH",
    sales: "9998",
    imageUrl: "/images/Azuki.png",
    lastSoldImageUrls: [
      "/images/Azuki.png",
      "/images/Azuki.png",
      "/images/Azuki.png",
    ],
  },
  {
    collectionName: "Azuki #781",
    floorPrice: "0.50 ETH",
    volume: "4250 ETH",
    sales: "9998",
    imageUrl: "/images/Azuki.png",
    lastSoldImageUrls: [
      "/images/Azuki.png",
      "/images/Azuki.png",
      "/images/Azuki.png",
    ],
  },
  {
    collectionName: "Azuki #782",
    floorPrice: "0.52 ETH",
    volume: "4300 ETH",
    sales: "9998",
    imageUrl: "/images/Azuki.png",
    lastSoldImageUrls: [
      "/images/Azuki.png",
      "/images/Azuki.png",
      "/images/Azuki.png",
    ],
  },
  {
    collectionName: "Azuki #783",
    floorPrice: "0.55 ETH",
    volume: "4350 ETH",
    sales: "9998",
    imageUrl: "/images/Azuki.png",
    lastSoldImageUrls: [
      "/images/Azuki.png",
      "/images/Azuki.png",
      "/images/Azuki.png",
    ],
  },
  {
    collectionName: "Azuki #784",
    floorPrice: "0.58 ETH",
    volume: "4400 ETH",
    sales: "9998",
    imageUrl: "/images/Azuki.png",
    lastSoldImageUrls: [
      "/images/Azuki.png",
      "/images/Azuki.png",
      "/images/Azuki.png",
    ],
  },
  {
    collectionName: "Azuki #785",
    floorPrice: "0.60 ETH",
    volume: "4450 ETH",
    sales: "9998",
    imageUrl: "/images/Azuki.png",
    lastSoldImageUrls: [
      "/images/Azuki.png",
      "/images/Azuki.png",
      "/images/Azuki.png",
    ],
  },
  {
    collectionName: "Azuki #786",
    floorPrice: "0.62 ETH",
    volume: "4500 ETH",
    sales: "9998",
    imageUrl: "/images/Azuki.png",
    lastSoldImageUrls: [
      "/images/Azuki.png",
      "/images/Azuki.png",
      "/images/Azuki.png",
    ],
  },
  {
    collectionName: "Azuki #787",
    floorPrice: "0.65 ETH",
    volume: "4550 ETH",
    sales: "9998",
    imageUrl: "/images/Azuki.png",
    lastSoldImageUrls: [
      "/images/Azuki.png",
      "/images/Azuki.png",
      "/images/Azuki.png",
    ],
  },
  {
    collectionName: "Azuki #788",
    floorPrice: "0.68 ETH",
    volume: "4600 ETH",
    sales: "9998",
    imageUrl: "/images/Azuki.png",
    lastSoldImageUrls: [
      "/images/Azuki.png",
      "/images/Azuki.png",
      "/images/Azuki.png",
    ],
  },
  {
    collectionName: "Azuki #789",
    floorPrice: "0.70 ETH",
    volume: "4650 ETH",
    sales: "9998",
    imageUrl: "/images/Azuki.png",
    lastSoldImageUrls: [
      "/images/Azuki.png",
      "/images/Azuki.png",
      "/images/Azuki.png",
    ],
  },
  {
    collectionName: "Azuki #790",
    floorPrice: "0.72 ETH",
    volume: "4700 ETH",
    sales: "9998",
    imageUrl: "/images/Azuki.png",
    lastSoldImageUrls: [
      "/images/Azuki.png",
      "/images/Azuki.png",
      "/images/Azuki.png",
    ],
  },
  {
    collectionName: "Azuki #791",
    floorPrice: "0.75 ETH",
    volume: "4750 ETH",
    sales: "9998",
    imageUrl: "/images/Azuki.png",
    lastSoldImageUrls: [
      "/images/Azuki.png",
      "/images/Azuki.png",
      "/images/Azuki.png",
    ],
  },
];

export default mockData;
