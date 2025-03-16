import { NextRequest, NextResponse } from "next/server";
import { getUserNFTs } from "@/Backend/GetUserNFT";


export async function GET(request : NextRequest){
    try {
        const {searchParams} = new URL(request.url);
        const address = searchParams.get('address');
        if(!address){
            return NextResponse.json(
                {message: "Missing address Parameter"},
                {status: 400}

            );
        }
        const nfts = await getUserNFTs(address);
        return NextResponse.json(nfts);
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: error})
    }
}