// computeAssetId.ts
import { sha256, arrayify, hexlify } from "fuels";


export function computeAssetId(contractId: string, subId: string): string {
  const cId = contractId.replace(/^0x/, "");
  const sId = subId.replace(/^0x/, "");

  const combined = `0x${cId}${sId}`;
 
  const hashed = sha256(arrayify(combined));
 
  return hexlify(hashed);
}
