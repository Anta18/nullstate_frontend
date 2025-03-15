"use server"
import { prisma } from "@/lib/prisma";


export  async function getUserNFTs(address: string) {
    try {
        const nfts = await prisma.nFTMinting.findMany(
            {
                where:{
                    nftOwnerAddress: address
                }
            }
        );
        return nfts;
        
    } catch (error) {
        throw new Error(`Error getting NFTs: ${error}`);
    }

}