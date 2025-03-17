// components/SellModal.tsx
import React, { useState } from "react";
import {
  WalletUnlocked,
  Provider,
  Contract,
  ContractFactory,
  Address,
  bn,
} from "fuels";
import { useWallet } from "@fuels/react";
import { NftFixedPriceSwapPredicate } from "../../../ABI's/PREDICATE/NftFixedPriceSwapPredicate";
import { toast } from "react-toastify";
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
  const [askAmount, setAskAmount] = useState("");
  const [askAsset, setAskAsset] = useState("");
  const [isSelling, setIsSelling] = useState(false);
  const [config, setConfig] = useState<ConfigType | null>(null);

  // Pricing states
  console.log(nftTitle);
  console.log(collectionName);
  console.log(rarity);
  console.log(nftImage);
  console.log(nftAssetId);
  const [floorPrice, setFloorPrice] = useState("");
  const [topTraitPrice, setTopTraitPrice] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [listingPrice, setListingPrice] = useState("");

  // Duration state
  const [duration, setDuration] = useState("");

  // Fee and earnings states
  const [openSeaFee, setOpenSeaFee] = useState("");
  const [creatorEarnings, setCreatorEarnings] = useState("");

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
  }

  const initializeSellerPredicate = async (finalConfig: ConfigType) => {
    if (!wallet) return;

    if (!finalConfig.ASK_AMOUNT.trim() || !finalConfig.ASK_ASSET.trim()) {
      alert("Please fill in all required fields: ASK_AMOUNT, ASK_ASSET");
      return;
    }

    ///////These need to be asked and put//////

    const FEE_AMOUNT = "1";
    const FEE_ASSET =
      "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07";
    const TREASURY_ADDRESS =
      "0x3867E485f463f22fb49758E18e72ed3844701d8AFaCaA434FB7e971bD22116b0";

    ///////////////////////////////////////////

    const configurableConstants = {
      FEE_AMOUNT: bn(FEE_AMOUNT),
      FEE_ASSET: { bits: FEE_ASSET },
      TREASURY_ADDRESS: { bits: TREASURY_ADDRESS },
      ASK_AMOUNT: bn(finalConfig.ASK_AMOUNT),
      ASK_ASSET: { bits: finalConfig.ASK_ASSET },
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
        finalConfig.NFT_ASSET_ID,
        { gasLimit: 100_000 }
      );

      const transactionResponse = await transferTx.waitForResult();
      console.log("Transaction Response is ", transactionResponse);

      console.log("NFT successfully transferred to Predicate.");
      if (transactionResponse.status !== "success") {
        // setMinting(false);
        // toast.error("Failed to mint NFT");
        return;
      }

      const entry = {
        sellerAddress: wallet.address.toString(),
        predicateAddress: newPredicate.address.toString(),
        nftAssetId: finalConfig.NFT_ASSET_ID.toString(),
        config: finalConfig,
      };
      console.log("Creating Predicate Entry...");

      await createPredicateEntry(entry);
      return true;
    } catch (error) {
      console.error("Error initializing predicate:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    const finalConfig: ConfigType = {
      FEE_AMOUNT: "",
      FEE_ASSET: "",
      TREASURY_ADDRESS: "",
      ASK_AMOUNT: askAmount,
      ASK_ASSET: askAsset,
      NFT_ASSET_ID: nftAssetId,
    };
    setIsSelling(true);
    try {
      const success = await initializeSellerPredicate(finalConfig);
      if (success) {
        toast.success("NFT listed successfully");
        onClose();
      } else {
        toast.error("Failed to list NFT");
      }
    } catch (error) {
      console.error("Error initializing predicate:", error);
      toast.error("Failed to list NFT");
    } finally {
      setIsSelling(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-afacad">
      {/* Backdrop with enhanced blur */}
      <div
        className="absolute inset-0 bg-black opacity-70 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Container with subtle glow */}
      <div className="relative bg-gradient-to-br from-gray-900 to-black text-white w-full max-w-lg mx-4 overflow-hidden p-8 rounded-xl shadow-2xl transform transition-all duration-300 scale-100">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-violet-600 rounded-full filter blur-3xl opacity-10"></div>

        {/* Close Button - keeping original functionality */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl font-bold hover:text-gray-400 focus:outline-none"
        >
          &times;
        </button>

        {/* NFT Info Header - keeping original structure */}
        <div className="flex items-center mb-6 border-b border-gray-700 pb-4">
          <div className="relative">
            <img
              src={nftImage}
              alt="NFT"
              className="h-16 w-16 rounded-full object-cover border-2 border-indigo-500 shadow-lg shadow-indigo-500/20"
            />
          </div>
          <div className="ml-4">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              {nftTitle}
            </div>
            <div className="text-gray-400 text-sm">{collectionName}</div>
          </div>
        </div>

        {/* Form Header - keeping original text */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            List Your NFT
          </h2>
          <p className="mt-2 text-gray-400 text-base">
            Set your ask price and asset for listing
          </p>
        </div>

        {/* Ask Price Field - keeping original structure */}
        <div className="mb-6">
          <label
            htmlFor="askAmount"
            className="block text-gray-400 text-sm mb-2"
          >
            Ask Price (ETH)
          </label>
          <input
            id="askAmount"
            type="text"
            placeholder="Enter ask price"
            value={askAmount}
            onChange={(e) => setAskAmount(e.target.value)}
            className="w-full px-5 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg placeholder-gray-500"
          />
        </div>

        {/* Ask Asset Field - keeping original structure */}
        <div className="mb-8">
          <label
            htmlFor="askAsset"
            className="block text-gray-400 text-sm mb-2"
          >
            Ask Asset
          </label>
          <input
            id="askAsset"
            type="text"
            placeholder="Enter asset name"
            value={askAsset}
            onChange={(e) => setAskAsset(e.target.value)}
            className="w-full px-5 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg placeholder-gray-500"
          />
        </div>

        {/* Submit Button - enhanced but keeping original text and function */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-[#4023B5] to-[#5834D9] hover:from-[#4628C8] hover:to-[#613BE2] transition-colors duration-300 py-3 text-xl font-semibold rounded-lg shadow-lg"
          disabled={isSelling}
        >
          {isSelling ? "Listing..." : "Complete Listing"}
        </button>
      </div>
    </div>
  );
};

export default SellModal;
