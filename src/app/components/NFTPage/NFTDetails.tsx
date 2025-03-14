import React from "react";
import { NFTData } from "../../nftpage/page";
import NFTHeader from "./NFTHeader";
import PriceSection from "./PriceSection";
import LastActivity from "./LastActivity";
import AdditionalInfo from "./AdditionalInfo";
import TraitTable from "./TraitTable";

interface NFTDetailsProps {
  nftData: NFTData;
}

const NFTDetails: React.FC<NFTDetailsProps> = ({ nftData }) => {
  return (
    <div>
      {/* Header: Title and Owner */}
      <NFTHeader title={nftData.title} owner={nftData.owner} />

      {/* Price and Purchase Buttons */}
      <PriceSection price={nftData.price} />

      {/* Last Activity */}
      <LastActivity activity={nftData.lastActivity} />

      {/* Traits */}
      <TraitTable traits={nftData.traits} />

      {/* Additional Information */}
      <AdditionalInfo
        contactAddress={nftData.contactAddress}
        tokenId={nftData.tokenId}
        creator={nftData.creator}
        creatorFee={nftData.creatorFee}
      />
    </div>
  );
};

export default NFTDetails;
