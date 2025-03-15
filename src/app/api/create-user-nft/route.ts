import {NextRequest, NextResponse} from "next/server";
import createNFT from "@/Backend/CreateNFT";


export async function POST(request:NextRequest){
    try {
        const body = await request.json();
        console.log(body);

        const {
            nftId,
            nftName,
            nftDescription,
            nftImage,
            nftPrice,
            nftOwnerAddress,
            nftCreatorAddress,
            nftStatus
        } = body;

        const newNFT = await createNFT({
            nftId,
            nftName,
            nftDescription,
            nftImage,
            nftPrice,
            nftOwnerAddress,
            nftCreatorAddress,
            nftStatus
        });
        return NextResponse.json(newNFT,{status: 201});
        
    } catch (error) {
        console.error(`Error creating NFT: ${error}`);
        return NextResponse.json({message: error})
    }




}