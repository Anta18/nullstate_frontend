import {NextRequest,NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(request:NextRequest){
    try {
        const allCollection = await prisma.nFTMinting.findMany({
            distinct: ['collectionName'],
            where:{ collectionName: { not: null } }
        });
        const data = allCollection.map((nft)=>{
            return {
                collectionName: nft.collectionName,
                floorPrice: nft.nftPrice ? `${nft.nftPrice} ETH` : "0 ETH",
                volume: "0 ETH",       // need to calculate 
                sales: "0",           //need to calculate
                imageUrl: nft.nftImage, 
                lastSoldImageUrls: [
                  nft.nftImage,
                  nft.nftImage,
                  nft.nftImage,
                ],
              };
            }
        )
        return NextResponse.json(data);
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Error fetching collection predicates"}, {status: 500});
    }
}