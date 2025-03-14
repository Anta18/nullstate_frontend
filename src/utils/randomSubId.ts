
import { randomBytes } from "crypto";
export function generateRandomSubId():string {
    // 32 bytes = 64 hex chars
    const bytes = randomBytes(32);
    return "0x" + bytes.toString("hex");
  }
  