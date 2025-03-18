"use client";
import React, { useState, useRef, useMemo,  useCallback } from "react";
import { Afacad } from "next/font/google";
import { useFuel, useIsConnected } from "@fuels/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Eth from "../../assets/icons/Eth.svg";
import useSWR from "swr";
const afacad = Afacad({ subsets: ["latin"], weight: ["400", "600", "700"] });

import uploadFileToPinata from "@/utils/pinataUpload";
import NFTABI from "../../ABI's/NFT/NFT-contract-abi.json";
import { generateRandomSubId } from "@/utils/randomSubId";
import { useWallet } from "@fuels/react";
import { Contract, getMintedAssetId } from "fuels";



const NFT_CONTRACT_ID =
  "0xbcd6b6790d35474a72091db0f0efb570bbf51228d680f5322011dc566c5ca16e";

const PINATA_API_KEY = "955f973ebf3cb0da7c61";
const PINATA_SECRET_API_KEY =
  "124f11ab548d375df0650bf325b15ea131f35ae138be8598708d6e573de16cd3";

interface NFT {
  nftId: string;
  nftName: string;
  nftDescription: string;
  nftImage: string;
  nftPrice: string;
  nftOwnerAddress: string;
  nftCreatorAddress: string;
  nftStatus: string;
}

interface Collection {
  collectionName: string;
  floorPrice: string;
  imageUrl: string;
  lastSoldImageUrls: string[];
  sales: string;
  volume: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Error fetching data");
  }
  return res.json();
};

const NFTMintPage: React.FC = () => {
  const { wallet } = useWallet();
  const { fuel } = useFuel();
  const { isConnected } = useIsConnected();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    collection: "", 
    collectionDetail: "", 
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [minting, setMinting] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const shouldFetchCollections = formData.collection === "existing";
  const { data: existingCollections, error } = useSWR<Collection[]>(
    shouldFetchCollections ? "/api/nft-collections" : null,
    fetcher
  );


  const isFormValid = useMemo(() => {

    const basicValid =
      formData.name.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.category.trim() !== "" &&
      formData.price.trim() !== "" &&
      formData.collection.trim() !== "" &&
      selectedFile !== null;
    const collectionValid = formData.collectionDetail.trim() !== "";
    return basicValid && collectionValid;
  }, [formData, selectedFile]);

  const buttonText = uploading
    ? "Uploading..."
    : minting
      ? "Minting..."
      : "Mint NFT";
  const isButtonDisabled = !isFormValid || uploading || minting;

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
        ...(name === "collection" ? { collectionDetail: "" } : {}),
      }));
    },
    []
  );

  const handlePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const numericValue = e.target.value.replace(/\D/g, "");
      setFormData((prevState) => ({ ...prevState, price: numericValue }));
    },
    []
  );

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleImageClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleOpenModal = useCallback(() => {
    if (!isFormValid) {
      toast.error("Please fill in all fields and upload an image");
      return;
    }
    setShowModal(true);
  }, [isFormValid]);

  async function CreateNftOnServer(nftData: NFT) {
    try {
      const response = await fetch("/api/create-user-nft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nftData),
      });
      if (!response.ok) {
        throw new Error("Failed to create NFT on server");
      }
      const data = await response.json();
      console.log("NFT created on server:", data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const handleConfirmMint = useCallback(async () => {
    if (!wallet) {
      toast.error("Wallet not connected!");
      setShowModal(false);
      return;
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

      
      const mintedAssetId = await getMintedAssetId(NFT_CONTRACT_ID, subId);

      if (transactionSummary.status !== "success") {
        setMinting(false);
        toast.error("Failed to mint NFT");
        return;
      }

      // Register NFT in your backend
      const entry = {
        nftId: mintedAssetId,
        nftName: formData.name,
        nftDescription: formData.description,
        nftImage: ipfsUrl,
        nftPrice: formData.price,
        nftOwnerAddress: wallet.address.toString(),
        nftCreatorAddress: wallet.address.toString(),
        nftStatus: "Minted",
        collectionName: formData.collectionDetail,
      };
      await CreateNftOnServer(entry);

      setMinting(false);
      toast.success("NFT minted successfully!");

      
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        collection: "",
        collectionDetail: "",
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
  }, [
    wallet,
    formData,
    selectedFile,
    setUploading,
    setMinting,
    setShowModal,
    toast
  ]);

  return (
    <div
      className={`${afacad.className} relative min-h-screen bg-black text-white pt-20`}
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
              {/* Collection Section */}
              <div className="border border-gray-900 p-4 rounded-lg">
                <h3 className="mb-2 font-semibold">Collection</h3>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <label className="block mb-1 text-sm">
                      Collection Exists?
                    </label>
                    <select
                      name="collection"
                      value={formData.collection}
                      onChange={handleInputChange}
                      className="w-full bg-[#131419] border border-[#272934] text-white py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      <option value="">Select Option</option>
                      <option value="existing">
                        Add to Existing Collection
                      </option>
                      <option value="new">Create New Collection</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    {formData.collection === "existing" && (
                      <>
                        <label className="block mb-1 text-sm">
                          Select Collection
                        </label>
                        <select
                          name="collectionDetail"
                          value={formData.collectionDetail}
                          onChange={handleInputChange}
                          className="w-full bg-[#131419] border border-[#272934] text-white py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                        >
                          <option value="">Select a Collection</option>
                          {existingCollections?.map((col) => (
                            <option
                              key={col.collectionName}
                              value={col.collectionName}
                            >
                              {col.collectionName}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                    {formData.collection === "new" && (
                      <>
                        <label className="block mb-1 text-sm">
                          Collection Name
                        </label>
                        <input
                          type="text"
                          name="collectionDetail"
                          placeholder="Enter Collection Name"
                          className="w-full bg-[#131419] border border-[#272934] text-white py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                          onChange={handleInputChange}
                          value={formData.collectionDetail}
                        />
                      </>
                    )}
                  </div>
                </div>
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
                  ${isButtonDisabled
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
              Confirm NFT Mint
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
                      <span className="text-gray-400 text-sm">Collection</span>
                      <span className="text-white">
                        {formData.collection === "existing"
                          ? `Existing: ${formData.collectionDetail}`
                          : formData.collection === "new"
                            ? `New: ${formData.collectionDetail}`
                            : ""}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-sm">Price</span>
                      <span className="text-white font-bold flex items-center">
                        <span className="mr-2">
                          <Eth className="h-4 mr-2" />
                        </span>
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
