"use server"
import { prisma } from "@/lib/prisma";

export async function getListedNFTs(){
    try {
        const nfts = await prisma.predicateEntry.findMany({
            where:{
                status:"active"
            },
            include:{
                NFTMinting:true
            }
        })

        const serialized = nfts.map((entry) => ({
            ...entry,
            createdAt: entry.createdAt.toISOString(),
            updatedAt: entry.updatedAt.toISOString(),
            config: entry.config ?? {},
    
            NFTMinting: {
              ...entry.NFTMinting,
              nftCreatedAt: entry.NFTMinting.nftCreatedAt.toISOString(),
              nftUpdatedAt: entry.NFTMinting.nftUpdatedAt.toISOString(),
            },
          }));
      
          return serialized;
        
    } catch (error) {
        console.error(error);
    }
}
export async function changePredicateStatus(id:string){
    try {
        const nfts = await prisma.predicateEntry.update({
            where:{
                predicateId:id
            },
            data:{
                status:"Closed"
            }
        })
        
    } catch (error) {
        console.error(error);
    }
}