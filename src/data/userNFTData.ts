// data/nftData.ts
export interface NFT {
    id: number;
    nftAssetId: string;
    title: string;
    collection: string;
    price: number;
    tokenId: string;
    imageUrl: string;
  }
  
  export const nfts: NFT[] = [
    {
      id: 1,
      nftAssetId: "1",
      title: "THE SISTERS #1234",
      collection: "Zo World Founders",
      price: 0.0074,
      tokenId: "#4567",
      imageUrl: "/images/image 212.png",
    },
    {
      id: 2,
      nftAssetId: "2",
      title: "THE SISTERS #1234",
      collection: "Zo World Founders",
      price: 0.0074,
      tokenId: "#4567",
      imageUrl: "/images/image 213.png",
    },
    // {
    //   id: 3,
    //   title: "THE SISTERS #1234",
    //   collection: "Zo World Founders",
    //   price: 0.0074,
    //   tokenId: "#4567",
    //   imageUrl: "/images/image 212.png",
    // },
    // {
    //   id: 4,
    //   title: "THE SISTERS #1234",
    //   collection: "Zo World Founders",
    //   price: 0.0074,
    //   tokenId: "#4567",
    //   imageUrl: "/images/image 212.png",
    // },
    // {
    //   id: 5,
    //   title: "THE SISTERS #1234",
    //   collection: "Zo World Founders",
    //   price: 0.0074,
    //   tokenId: "#4567",
    //   imageUrl: "/images/image 213.png",
    // },
    // {
    //   id: 6,
    //   title: "THE SISTERS #1234",
    //   collection: "Zo World Founders",
    //   price: 0.0074,
    //   tokenId: "#4567",
    //   imageUrl: "/images/image 212.png",
    // },
    // {
    //   id: 7,
    //   title: "THE SISTERS #1234",
    //   collection: "Zo World Founders",
    //   price: 0.0074,
    //   tokenId: "#4567",
    //   imageUrl: "/images/image 212.png",
    // },
    // {
    //   id: 8,
    //   title: "THE SISTERS #1234",
    //   collection: "Zo World Founders",
    //   price: 0.0074,
    //   tokenId: "#4567",
    //   imageUrl: "/images/image 213.png",
    // },
    // {
    //   id: 9,
    //   title: "THE SISTERS #1234",
    //   collection: "Zo World Founders",
    //   price: 0.0074,
    //   tokenId: "#4567",
    //   imageUrl: "/images/image 212.png",
    // },
  ];
  