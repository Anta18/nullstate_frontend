"use server"

import { prisma } from "@/lib/prisma";

export interface PredicateEntryType {
    sellerAddress: string,
    predicateAddress: string,
    nftAssetId: string,
    config: 
    {
        FEE_AMOUNT: string,
        FEE_ASSET: string,
        TREASURY_ADDRESS: string,
        ASK_AMOUNT: string,
        ASK_ASSET: string,
        NFT_ASSET_ID: string,

    }
}

export  async function createPredicateEntry(input: PredicateEntryType){
  try {
    console.log("input is ",input)
    const newEntry = await prisma.predicateEntry.create({
      data: {
        sellerId:input.sellerAddress,
        predicateId:input.predicateAddress,
        nftId:input.nftAssetId,
        config:input.config
      },
      include:{
        NFTMinting:true
      }

    });

    console.log(newEntry);
    return newEntry
    
  } catch (error) {
    console.log("Error is ",error)
  }
}

export  async function changeNFTStatus(nftId:string){
    try {
        const nft = await prisma.nFTMinting.update({
            where:{
                nftId
            },
            data:{
                nftStatus:"Listed"
            }
        });
        return nft
    } catch (error) {
        console.log("Error is ",error)
    }
}





