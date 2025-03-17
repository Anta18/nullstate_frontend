import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function GET(
    request: NextRequest,
    { params }: { params: { assetId: string } }
  ) {
    try {
      const { assetId } = params;
      const predicate = await prisma.predicateEntry.findFirst({
        where: { 
          nftId: assetId, 
        },
        include: {
            NFTMinting: true,
        },

      });

      if (!predicate) {
        return NextResponse.json({ message: "No active listing found" }, { status: 404 });
      }
  
      const nft = predicate.NFTMinting;
      if (!nft) {
        return NextResponse.json({ message: "NFTMinting relation not found" }, { status: 404 });
      }

      const config = predicate.config as {
        ASK_ASSET?: string;
        FEE_ASSET?: string;
        ASK_AMOUNT?: string;
        FEE_AMOUNT?: string;
        NFT_ASSET_ID?: string;
      } | null;

      const nftData = {
        title: nft.nftName,
        owner: nft.nftOwnerAddress,
        creator: nft.nftCreatorAddress,
        description: nft.nftDescription,
        author: "SomeAuthor", 
        price: parseFloat(nft.nftPrice || "0"),
        tokenId: nft.nftId,   
        askAsset: config?.ASK_ASSET,
        contactAddress: "0x1234...",
        creatorFee: 5,
        lastActivity: {
          price: parseFloat(nft.nftPrice || "0"),
          actionBy: nft.nftOwnerAddress,
        },
        traits: [
          { trait: "Rarity", name: "Rare", traitFloor: 0.02 },
          { trait: "Character Type", name: "Strong", traitFloor: 0.02 },
        ],
        imageUrl: nft.nftImage,
      };
  
      // Return the shaped data
      return NextResponse.json(nftData);
    } catch (error) {
      console.error("Error fetching NFT:", error);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  }