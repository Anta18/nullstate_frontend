"use server"
import { prisma } from "@/lib/prisma";

interface NFTType {
    nftId: string;
    nftName: string;
    nftDescription: string;
    nftImage: string;
    nftPrice: string;
    nftOwnerAddress: string;
    nftCreatorAddress: string;
    nftStatus: string;
    collectionName: string;
}

export default async function createNFT(input: NFTType) {
    try {
        const { nftId, nftName, nftDescription, nftImage, nftPrice, nftOwnerAddress, nftCreatorAddress, nftStatus, collectionName } = input;
        const newNFT = await prisma.nFTMinting.create({
            data: {
                nftId,
                nftName,
                nftDescription,
                nftImage,
                nftPrice,
                nftOwnerAddress,
                nftCreatorAddress,
                nftStatus,
                collectionName
            }
        });
        return newNFT;

    } catch (error) {
        throw new Error(`Error creating NFT: ${error}`);
    }

}