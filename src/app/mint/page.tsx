"use client";
import React, { useState, useRef } from "react";
import { Afacad } from "next/font/google";
import { useFuel, useIsConnected } from "@fuels/react";

const afacad = Afacad({ subsets: ["latin"], weight: ["400", "600", "700"] });

import uploadFileToPinata from "@/utils/pinataUpload";
import NFTABI from "../../ABI's/NFT/NFT-contract-abi.json";
import { generateRandomSubId } from "@/utils/randomSubId";
import { useWallet } from "@fuels/react";
import { Contract } from "fuels";
import { computeAssetId } from "@/utils/computeAssetId";

const NFT_CONTRACT_ID =
  "0xbcd6b6790d35474a72091db0f0efb570bbf51228d680f5322011dc566c5ca16e";

const PINATA_API_KEY = "955f973ebf3cb0da7c61";
const PINATA_SECRET_API_KEY =
  "124f11ab548d375df0650bf325b15ea131f35ae138be8598708d6e573de16cd3";

const NFTMintPage: React.FC = () => {
  const { wallet } = useWallet();
  const { fuel } = useFuel();
  const { isConnected } = useIsConnected();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    setFormData((prevState) => ({ ...prevState, price: numericValue }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleMintNFT = async () => {
    if (!wallet) {
      throw new Error("Wallet not connected!");
    }
    setError("");
    setSuccess("");
    try {
      let ipfsUrl = "";
      if (selectedFile) {
        setUploading(true);
        ipfsUrl = await uploadFileToPinata(
          selectedFile,
          PINATA_API_KEY,
          PINATA_SECRET_API_KEY
        );
        setUploading(false);
      }
      console.log("IPFS URL:", ipfsUrl);
      const contract = new Contract(NFT_CONTRACT_ID, NFTABI, wallet);

      const subId = generateRandomSubId();
      const assetId = computeAssetId(NFT_CONTRACT_ID, subId);
      console.log("Random subId:", subId);
      console.log("Computed assetId:", assetId);

      const callArray = [];
      if (formData.name) {
        callArray.push(
          contract.functions
            .set_name(assetId, formData.name)
            .txParams({ gasLimit: 10_000_000 })
        );
      }

      if (formData.description) {
        callArray.push(
          contract.functions
            .set_metadata(assetId, "description", { Raw: formData.description })
            .txParams({ gasLimit: 10_000_000 })
        );
      }

      if (formData.category) {
        callArray.push(
          contract.functions
            .set_metadata(assetId, "category", { Raw: formData.category })
            .txParams({ gasLimit: 10_000_000 })
        );
      }

      if (formData.price) {
        callArray.push(
          contract.functions
            .set_metadata(assetId, "price", { Raw: formData.price })
            .txParams({ gasLimit: 10_000_000 })
        );
      }

      if (ipfsUrl) {
        callArray.push(
          contract.functions
            .set_metadata(assetId, "image_url", { Raw: ipfsUrl })
            .txParams({ gasLimit: 10_000_000 })
        );
      }

      const recipientIdentity = {
        Address: {
          bits: wallet.address.toB256(),
        },
      };
      callArray.push(
        contract.functions
          .mint(recipientIdentity, subId, 1)
          .txParams({ gasLimit: 10_000_000 })
      );

      await contract.multiCall(callArray).call();
      console.log("All calls succeeded in one transaction!");

      setSuccess("NFT minted successfully!");
    } catch (error) {
      setUploading(false);
      setError("Failed to upload file to IPFS");
      return;
    }

    console.log("Minting NFT with data:", formData, selectedFile);
  };

  return (
    <div
      className={`${afacad.className} flex justify-center items-center min-h-screen bg-black text-white pt-16`}
    >
      <div className="flex w-full max-w-6xl p-8 gap-24">
        {/* Left side - Image upload area */}
        <div className="w-2/5">
          <div
            className="group bg-[#131419] rounded-[4px] p-6 flex flex-col items-center justify-center h-96 cursor-pointer hover:bg-[#1b1a22] transition-colors duration-300"
            onClick={handleImageClick}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="object-contain max-h-full"
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="p-3 mb-4 group-hover:animate-bounce transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                </div>
                <p className="text-center font-medium mb-1">Upload an image</p>
                <p className="text-gray-400 text-sm">
                  PNG, JPG, JPEG up to 2MB
                </p>
              </div>
            )}
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-400">NOTE</p>
            <p className="text-sm">Service Fee: 2%</p>
          </div>
        </div>

        {/* Right side - Form area */}
        <div className="w-3/5">
          <form className="space-y-6">
            <div>
              <label className="block mb-2 pl-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                className="w-full bg-[#131419] border-[1px] border-[#272934] text-white py-3 px-4 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-purple-600"
                onChange={handleInputChange}
                value={formData.name}
              />
            </div>
            <div>
              <label className="block mb-2 pl-1">Description</label>
              <input
                type="text"
                name="description"
                placeholder="Enter Description"
                className="w-full bg-[#131419] border-[1px] border-[#272934] text-white py-3 px-4 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-purple-600"
                onChange={handleInputChange}
                value={formData.description}
              />
            </div>
            <div>
              <label className="block mb-2 pl-1">Category</label>
              <input
                type="text"
                name="category"
                placeholder="Enter Category"
                className="w-full bg-[#131419] border-[1px] border-[#272934] text-white py-3 px-4 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-purple-600"
                onChange={handleInputChange}
                value={formData.category}
              />
            </div>
            <div>
              <label className="block mb-2 pl-1">Price</label>
              <input
                type="text"
                name="externalLink"
                placeholder="Price"
                className="w-full bg-[#131419] border-[1px] border-[#272934] text-white py-3 px-4 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={formData.price ? `${formData.price}` : ""}
                onChange={handlePriceChange}
              />
            </div>
            <button
              type="button"
              onClick={handleMintNFT}
              className="w-full bg-[#4023B5] hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-[4px] transition duration-300"
            >
              MINT NFT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NFTMintPage;
