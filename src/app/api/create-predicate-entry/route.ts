import {NextRequest,NextResponse} from "next/server";
import {createPredicateEntry, changeNFTStatus} from "@/Backend/CreatePredicate";

export async function POST(request:NextRequest){
    try {
        const body = await request.json();
        const {
            sellerAddress,
            predicateAddress,
            nftAssetId,
            config
        }
        = body;
        const newEntry = await createPredicateEntry({
            sellerAddress,
            predicateAddress,
            nftAssetId,
            config
        });
        const updatedNFT = await changeNFTStatus(nftAssetId);

        return  NextResponse.json(updatedNFT,{status: 200});
        
    } catch (error) {
        console.log("Error is ",error)
        return NextResponse.json({message: error})
    }
}