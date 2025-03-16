import {NextRequest,NextResponse} from "next/server";
import createPredicateEntry from "@/Backend/CreatePredicate";

async function POST(request:NextRequest){
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
        return  NextResponse.json(newEntry,{status: 201});
        
    } catch (error) {
        console.log("Error is ",error)
        return NextResponse.json({message: error})
    }
}