import {NextRequest,NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";


export async function GET(
    request: NextRequest,
    {params} : {params: {collectionName: string}}
){
    try {
        const {collectionName} = params;
        const entries = await prisma.predicateEntry.findMany({
            where:{
                NFTMinting:{
                    collectionName
                },
                status:"active"
            },
            include:{
                NFTMinting:true
            }
        });
        const serializableEntries = entries.map((entry) => ({
            ...entry,
            createdAt: entry.createdAt.toISOString(),
            updatedAt: entry.updatedAt.toISOString(),
            NFTMinting: {
              ...entry.NFTMinting,
              nftCreatedAt: entry.NFTMinting.nftCreatedAt.toISOString(),
              nftUpdatedAt: entry.NFTMinting.nftUpdatedAt.toISOString(),
            },
          }));
      
          return NextResponse.json(serializableEntries);
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Error fetching collection predicates"}, {status: 500});
    }
}