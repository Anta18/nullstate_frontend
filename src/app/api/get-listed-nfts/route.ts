import {NextRequest,NextResponse} from "next/server";
import {getUserNFTs} from "@/Backend/GetUserNFT";
import {getListedNFTs} from "@/Backend/GetListedNFTs";

export async function GET(){
    try {
        const nfts = await getListedNFTs();
        return NextResponse.json(nfts);
    } catch (error) {
        console.error("Error in /api/get-listed-nfts:", error);
        return NextResponse.json({ message: "Error retrieving NFTs" }, { status: 500 });
    }
}