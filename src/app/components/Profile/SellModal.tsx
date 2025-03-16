// components/SellModal.tsx
import React, { useState } from "react";
import {
  WalletUnlocked,
  Provider,
  Contract,
  ContractFactory,
  Address,
  bn
} from 'fuels';
import { useWallet } from '@fuels/react';
import { NftFixedPriceSwapPredicate } from "../../../ABI's/PREDICATE/NftFixedPriceSwapPredicate";

interface ConfigType {
  FEE_AMOUNT: string;
  FEE_ASSET: string;
  TREASURY_ADDRESS: string;
  ASK_AMOUNT: string;
  ASK_ASSET: string;
  NFT_ASSET_ID: string;
}

interface Entry {
  sellerAddress: string;
  predicateAddress: string;
  nftAssetId: string;
  config: ConfigType;
}


interface SellModalProps {
  onClose: () => void;
  nftTitle: string;
  nftAssetId: string;
  collectionName: string;
  rarity: string;
  nftImage: string;
}

const SellModal: React.FC<SellModalProps> = ({
  onClose,
  nftTitle,
  nftAssetId,
  collectionName,
  rarity,
  nftImage,
}) => {
  const { wallet } = useWallet();
  const [config, setConfig] = useState<{ [key: string]: string }>({
    ASK_AMOUNT: '',
    ASK_ASSET: '',
});

  // Pricing states
  console.log(nftTitle);
  console.log(collectionName);
  console.log(rarity);
  console.log(nftImage);
  const [floorPrice, setFloorPrice] = useState("");
  const [topTraitPrice, setTopTraitPrice] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [listingPrice, setListingPrice] = useState("");

  // Duration state
  const [duration, setDuration] = useState("");

  // Fee and earnings states
  const [openSeaFee, setOpenSeaFee] = useState("");
  const [creatorEarnings, setCreatorEarnings] = useState("");
  const [customPercentage, setCustomPercentage] = useState("");

  // Total potential earnings
  const [totalEarnings, setTotalEarnings] = useState("");

  async function createPredicateEntry(entry: Entry) {
    try {
        const res = await fetch("/api/create-predicate-entry", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entry),
        });

        if (!res.ok) {
            console.error("Failed to create predicate entry");
            return;
        }

        const data = await res.json();
        console.log("Predicate entry created:", data);
    } catch (error) {
        console.error("Error creating predicate entry:", error);
    }
    };

  const initializeSellerPredicate = async () => {
    if (!wallet) return;

    const missingFields = Object.entries(config)
        .filter(([key, value]) => !value.trim())
        .map(([key, value]) => key);

    if (missingFields.length > 0) {
        console.log("Missing Fields", missingFields);
        alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
        return;
    }
    ///////These need to be asked and put//////

    const FEE_AMOUNT = "1";
    const FEE_ASSET = "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
    const TREASURY_ADDRESS = "0x3867E485f463f22fb49758E18e72ed3844701d8AFaCaA434FB7e971bD22116b0";

    ///////////////////////////////////////////

    const configurableConstants = {
        FEE_AMOUNT: bn(FEE_AMOUNT),
        FEE_ASSET: { bits: FEE_ASSET},
        TREASURY_ADDRESS: { bits: TREASURY_ADDRESS },
        ASK_AMOUNT: bn(config.ASK_AMOUNT),
        ASK_ASSET: { bits: config.ASK_ASSET },
        RECEIVER: { bits: wallet.address.toString() }, // 64 chars
        NFT_ASSET_ID: { bits: nftAssetId },
    };

    const newPredicate = new NftFixedPriceSwapPredicate({
        provider: wallet.provider,
        data: [],
        configurableConstants,
    });

    try {
        console.log("Transferring NFT to Predicate Address...");

        const transferTx = await wallet.transfer(
            newPredicate.address,
            bn(1),
            config.NFT_ASSET_ID,
            { gasLimit: 100_000 }
        );

        await transferTx.waitForResult();
        console.log("NFT successfully transferred to Predicate.");

        const entry = {
            sellerAddress: wallet.address.toString(),
            predicateAddress: newPredicate.address.toString(),
            nftAssetId: (config.NFT_ASSET_ID).toString(),
            config: config as unknown as ConfigType
        }

        await createPredicateEntry(entry);
        console.log("Predicate Initialized:", newPredicate);
        console.log("Predicate Address:", newPredicate.address.toString());
        const predicateBalance = await wallet.provider.getBalance(newPredicate.address, config.NFT_ASSET_ID);
        console.log("Predicate NFT Balance:", predicateBalance.toString());
    } catch (error) {
        console.error("Error initializing predicate:", error);
    }
};

  const handleSubmit = () => {
    
    console.log({
      nftTitle,
      collectionName,
      rarity,
      nftImage,
      floorPrice,
      topTraitPrice,
      startingPrice,
      listingPrice,
      duration,
      openSeaFee,
      creatorEarnings,
      totalEarnings,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-afacad">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black opacity-75"
        onClick={onClose}
      ></div>
      {/* Modal Content */}
      <div className="relative bg-black text-white w-full max-w-lg mx-4 max-h-4/5 overflow-auto p-6 rounded shadow-lg z-10 custom-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl font-bold"
        >
          &times;
        </button>

        {/* Header with NFT info */}
        <div className="flex mb-10">
          <div className="flex">
            <div className="relative">
              <img
                src="/images/image 212.png"
                alt="NFT"
                className="h-14 w-14"
              />
            </div>
            <div className="ml-4">
              <div className="text-[16px] font-medium">{nftTitle}</div>
              <div className="text-gray-400 text-[16px]">{collectionName}</div>
              <div className="text-gray-400 text-[14px]">Rarity {rarity}</div>
            </div>
          </div>
          <div className="ml-auto text-right mr-8">
            <div className="text-gray-400 text-[14px]">Listing price</div>
            <input
              type="text"
              placeholder="ETH"
              value={listingPrice}
              onChange={(e) => setListingPrice(e.target.value)}
              className="text-[16px] font-medium bg-transparent border-b border-gray-600 text-right focus:outline-none max-w-16"
            />
          </div>
        </div>

        <div className="border-t border-white my-4"></div>

        {/* Set a price section */}
        <div className="mb-6">
          <h2 className="text-[18px] mb-3">Set a price</h2>
          <div className="flex gap-3">
            <div className="flex-1 py-3 px-6 border border-gray-800 rounded-lg">
              <input
                type="text"
                placeholder="Floor (ETH)"
                value={floorPrice}
                onChange={(e) => setFloorPrice(e.target.value)}
                className="bg-transparent text-[16px] w-full focus:outline-none"
              />
            </div>
            <div className="flex-1 py-3 px-6 border border-gray-800 rounded-lg">
              <input
                type="text"
                placeholder="Top trait (ETH)"
                value={topTraitPrice}
                onChange={(e) => setTopTraitPrice(e.target.value)}
                className="bg-transparent text-[16px] w-full focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Starting price */}
        <div className="mb-6">
          <h2 className="text-[18px] mb-3">Starting price</h2>
          <div className="flex gap-3">
            <div className="flex-1 py-3 px-6 border border-gray-800 rounded-lg flex items-center">
              <input
                type="text"
                placeholder="Amount"
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.value)}
                className="bg-transparent text-[16px] w-full focus:outline-none"
              />
            </div>
            <div className="flex-none py-3 px-6 border border-gray-800 rounded-lg flex items-center">
              <div className="text-[16px] text-[#969AAE]">ETH</div>
            </div>
          </div>
        </div>

        {/* Duration */}
        <div className="mb-6">
          <h2 className="text-[18px] mb-3">Duration</h2>
          <div className="flex gap-3">
            <div className="flex-1 py-3 px-6 border border-gray-800 rounded-lg relative">
              <select
                className="appearance-none bg-black w-full text-[16px] pr-10 focus:outline-none"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="" disabled>
                  Select duration
                </option>
                <option value="3 days">3 days</option>
                <option value="1 week">1 week</option>
                <option value="1 month">1 month</option>
                <option value="3 months">3 months</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Listing Price Input */}
        <div className="mb-6">
          <div className="py-3 px-6 border border-gray-800 rounded-lg flex justify-between items-center">
            <div className="font-medium text-[16px]">Listing Price</div>
            <input
              type="text"
              placeholder="ETH"
              value={listingPrice}
              onChange={(e) => setListingPrice(e.target.value)}
              className="text-[16px] text-[#969AAE] bg-transparent focus:outline-none text-right"
            />
          </div>
        </div>

        {/* OpenSea fee */}
        <div className="mb-6">
          <div className="py-3 px-6 border border-gray-800 rounded-lg flex justify-between items-center">
            <div className="font-medium text-[16px]">OpenSea fee</div>
            <input
              type="text"
              placeholder="e.g., 0.5%"
              value={openSeaFee}
              onChange={(e) => setOpenSeaFee(e.target.value)}
              className="text-[16px] text-[#969AAE] bg-transparent focus:outline-none text-right"
            />
          </div>
        </div>

        {/* Creator earnings */}
        <div className="mb-6">
          <div className="py-3 px-6 border border-gray-800 rounded-lg flex justify-between items-center">
            <div className="font-medium text-[16px]">Creator earnings</div>
            <input
              type="text"
              placeholder="e.g., 0.5%"
              value={creatorEarnings}
              onChange={(e) => setCreatorEarnings(e.target.value)}
              className="text-[16px] text-[#969AAE] bg-transparent focus:outline-none text-right"
            />
          </div>
        </div>

        {/* Total potential earnings */}
        <div className="mb-8">
          <div className="py-3 px-6 border border-gray-800 rounded-lg flex justify-between items-center">
            <div className="font-medium text-[16px]">
              Total potential earnings
            </div>
            <input
              type="text"
              placeholder="ETH"
              value={totalEarnings}
              onChange={(e) => setTotalEarnings(e.target.value)}
              className="text-[16px] text-[#969AAE] bg-transparent focus:outline-none text-right"
            />
          </div>
        </div>

        {/* Complete Listing button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#4023B5] hover:bg-indigo-600 py-3 text-[20px] font-semibold"
        >
          Complete Listing
        </button>
      </div>
    </div>
  );
};

export default SellModal;
