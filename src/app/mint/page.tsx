"use client";
import React, { useState, useRef, useMemo } from "react";
import { Afacad } from "next/font/google";
import { useFuel, useIsConnected } from "@fuels/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Eth from "../../assets/icons/Eth.svg";

const afacad = Afacad({ subsets: ["latin"], weight: ["400", "600", "700"] });

import uploadFileToPinata from "@/utils/pinataUpload";
import NFTABI from "../../ABI's/NFT/NFT-contract-abi.json";
import { generateRandomSubId } from "@/utils/randomSubId";
import { useWallet } from "@fuels/react";
import { Contract, getMintedAssetId } from "fuels";
import createNFT from "@/Backend/CreateNFT";

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
  const [showModal, setShowModal] = useState(false);

  const isFormValid = useMemo(() => {
    return (
      formData.name.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.category.trim() !== "" &&
      formData.price.trim() !== "" &&
      selectedFile !== null
    );
  }, [formData, selectedFile]);

  const buttonText = uploading
    ? "Uploading..."
    : minting
    ? "Minting..."
    : "Mint NFT";
  const isButtonDisabled = !isFormValid || uploading || minting;

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

  const handleOpenModal = () => {
    if (!isFormValid) {
      toast.error("Please fill in all fields and upload an image");
      return;
    }
    setShowModal(true);
  };

  const handleConfirmMint = async () => {
    if (!wallet) {
      toast.error("Wallet not connected!");
      setShowModal(false);
      throw new Error("Wallet not connected!");
    }

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
      setMinting(true);
      const contract = new Contract(NFT_CONTRACT_ID, NFTABI, wallet);
      const subId = generateRandomSubId();

      const recipientIdentity = {
        Address: {
          bits: wallet.address.toB256(),
        },
      };

      const tx = await contract.functions
        .mint(recipientIdentity, subId, 1)
        .txParams({ gasLimit: 10_000_000 })
        .call();

      const { transactionResponse } = await tx.waitForResult();
      const transactionSummary =
        await transactionResponse.getTransactionSummary();

      console.log("Transaction summary:", transactionSummary);

      const mintedAssetId = await getMintedAssetId(NFT_CONTRACT_ID, subId);
      console.log("Minted assetId:", mintedAssetId);

      if (transactionSummary.status !== "success") {
        setMinting(false);
        toast.error("Failed to mint NFT");
        return;
      }

      const entry = {
        nftId: mintedAssetId,
        nftName: formData.name,
        nftDescription: formData.description,
        nftImage: ipfsUrl,
        nftPrice: formData.price,
        nftOwnerAddress: wallet.address.toString(),
        nftCreatorAddress: wallet.address.toString(),
        nftStatus: "Minted",
      };
      await createNFT(entry);
      setMinting(false);

      toast.success("NFT minted successfully!");

      // Clear the form on successful minting.
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
      });
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error) {
      setUploading(false);
      setMinting(false);
      toast.error("Failed to mint NFT");
      console.error(error);
    } finally {
      setShowModal(false);
    }
    console.log("Minting NFT with data:", formData, selectedFile);
  };

  return (
    <div
      className={`${afacad.className} relative min-h-screen bg-black text-white pt-16`}
    >
      <div className={`${showModal ? "filter blur-sm" : ""}`}>
        <div className="flex w-full max-w-6xl p-8 gap-24 mx-auto">
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
                  <p className="text-center font-medium mb-1">
                    Upload an image
                  </p>
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
          <div className="w-3/5">
            <form className="space-y-6">
              <div>
                <label className="block mb-2 pl-1">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  className="w-full bg-[#131419] border border-[#272934] text-white py-3 px-4 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                  className="w-full bg-[#131419] border border-[#272934] text-white py-3 px-4 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                  className="w-full bg-[#131419] border border-[#272934] text-white py-3 px-4 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                  className="w-full bg-[#131419] border border-[#272934] text-white py-3 px-4 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={formData.price ? `${formData.price}` : ""}
                  onChange={handlePriceChange}
                />
              </div>
              <button
                type="button"
                onClick={handleOpenModal}
                disabled={isButtonDisabled}
                className={`w-full font-bold py-3 px-4 rounded-[4px] transition duration-300 
                ${
                  isButtonDisabled
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#4023B5] hover:bg-purple-700"
                } flex justify-center items-center`}
              >
                {(uploading || minting) && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                )}
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
      {showModal && (
        <div
          className={`${afacad.className} fixed inset-0 flex items-center justify-center z-50`}
        >
          <div
            className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="relative bg-[#14151B] p-8 rounded-xl shadow-2xl w-11/12 max-w-4xl border border-gray-800 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
              <span className="mr-2"></span> Confirm NFT Mint
            </h2>
            <div className="flex flex-col md:flex-row gap-8">
              {previewUrl && (
                <div className="md:w-1/2">
                  <div className="rounded-xl overflow-hidden border border-gray-700 shadow-lg">
                    <img
                      src={previewUrl}
                      alt="NFT Preview"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}
              <div className="md:w-1/2">
                <div className="border border-gray-800 bg-black bg-opacity-60 p-6 rounded-xl shadow-inner">
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {formData.name}
                  </h3>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-4"></div>

                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-sm">Description</span>
                      <span className="text-white">{formData.description}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-gray-400 text-sm">Category</span>
                      <span className="text-white flex items-center">
                        <span className="mr-2">🏷️</span> {formData.category}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-gray-400 text-sm">Price</span>
                      <span className="text-white font-bold flex items-center">
                        <span className="mr-2">
                          <Eth className="h-4 mr-2" />
                        </span>{" "}
                        {formData.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-6 rounded-lg transition duration-200 ease-in-out"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmMint}
                disabled={minting || uploading}
                className="bg-[#4023B5] hover:bg-[#4f2bd0] text-white py-2 px-6 rounded-lg transition duration-200 ease-in-out flex items-center justify-center"
              >
                {minting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Minting...
                  </>
                ) : (
                  "Confirm and Mint"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTMintPage;
