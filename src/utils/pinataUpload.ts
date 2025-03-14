// pinataUpload.ts
export default  async function uploadFileToPinata(
    file: File,
    pinataApiKey: string,
    pinataSecretApiKey: string
  ): Promise<string> {
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  
    const formData = new FormData();
    formData.append("file", file);
  
    // Optional metadata
    const pinataMetadata = JSON.stringify({
      name: file.name,
      keyvalues: {
        customKey: "customValue",
      },
    });
    formData.append("pinataMetadata", pinataMetadata);
  
    // Optional pin options
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", pinataOptions);
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error(`Pinata upload failed: ${response.statusText}`);
    }
  
    const result = await response.json();
    if (!result.IpfsHash) {
      throw new Error("Pinata response missing IpfsHash!");
    }
  
    // Return ipfs:// URI
    return `https://white-permanent-meadowlark-555.mypinata.cloud/ipfs/${result.IpfsHash}`;
  }
  