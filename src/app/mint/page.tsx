"use client";
import React, { useState, useRef } from "react";
import { Afacad } from "next/font/google";

const afacad = Afacad({ subsets: ["latin"], weight: ["400", "600", "700"] });

const NFTMintPage: React.FC = () => {
  const [formData, setFormData] = useState({
    collection: "",
    name: "",
    symbol: "",
    description: "",
    externalLink: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleMintNFT = () => {
    console.log("Minting NFT with data:", formData, selectedFile);
    // Add your minting logic here, for example, uploading the image along with metadata.
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
            {/* Hidden file input */}
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
            {/* Collection Dropdown */}
            <div>
              <label className="block mb-2 pl-1">Choose collection</label>
              <div className="relative">
                <select
                  name="collection"
                  className="w-full bg-[#131419] border-[1px] border-[#272934] text-[#969AAE] py-3 px-4 pr-8 rounded-[4px] appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600"
                  onChange={(e) => handleInputChange(e as any)}
                >
                  <option>Select a Collection</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                  <svg
                    className="fill-current h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="block mb-2 pl-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                className="w-full bg-[#131419] border-[1px] border-[#272934] text-white py-3 px-4 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-purple-600"
                onChange={handleInputChange}
              />
            </div>

            {/* Symbol Input */}
            <div>
              <label className="block mb-2 pl-1">Symbol</label>
              <input
                type="text"
                name="symbol"
                placeholder="Enter Symbol"
                className="w-full bg-[#131419] border-[1px] border-[#272934] text-white py-3 px-4 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-purple-600"
                onChange={handleInputChange}
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block mb-2 pl-1">Description</label>
              <input
                type="text"
                name="description"
                placeholder="Enter Description"
                className="w-full bg-[#131419] border-[1px] border-[#272934] text-white py-3 px-4 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-purple-600"
                onChange={handleInputChange}
              />
            </div>

            {/* External Link Input */}
            <div>
              <label className="block mb-2 pl-1">External Link</label>
              <input
                type="text"
                name="externalLink"
                placeholder="Enter External Link"
                className="w-full bg-[#131419] border-[1px] border-[#272934] text-white py-3 px-4 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-purple-600"
                onChange={handleInputChange}
              />
            </div>

            {/* Metadata Section */}
            <div>
              <label className="block mb-2 pl-1">Metadata</label>
              <div className="bg-[#131419] border-[1px] border-[#272934] rounded-[4px] p-6">
                <p className="text-gray-400 mb-4">
                  Metadata describe attributes of your item. They appear as
                  filters inside your collection page and are also listed out
                  inside your item page.
                </p>
                <button
                  type="button"
                  className="bg-white text-[#4023B5] py-2 px-4 rounded-[4px]"
                >
                  Add Metadata
                </button>
              </div>
            </div>

            {/* Mint Button */}
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
