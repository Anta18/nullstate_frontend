import React from "react";

interface AdditionalInfoProps {
  contactAddress: string;
  tokenId: string;
  creator: string;
  creatorFee: number;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({
  contactAddress,
  tokenId,
  creator,
  creatorFee,
}) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Contact Address */}
      <div className="rounded-lg p-4 flex items-center border-[1px] border-[#272934]">
        <div className="bg-[#7250FB] rounded-full p-3 mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div>
          <p className="text-[#7F8199] text-xs">CONTACT ADDRESS</p>
          <p className="text-sm font-bold">{contactAddress}</p>
        </div>
      </div>

      {/* Token ID */}
      <div className="border-[1px] border-[#272934] rounded-lg p-4 flex items-center">
        <div className="bg-[#7250FB] rounded-full p-3 mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <div>
          <p className="text-[#7F8199] text-xs">TOKEN ID</p>
          <p className="text-sm font-bold">{tokenId}</p>
        </div>
      </div>

      {/* Creator */}
      <div className="border-[1px] border-[#272934] rounded-lg p-4 flex items-center">
        <div className="bg-[#7250FB] rounded-full p-3 mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547"
            />
          </svg>
        </div>
        <div>
          <p className="text-[#7F8199] text-xs">CREATOR</p>
          <p className="text-sm font-bold">{creator.slice(0,5)}....{creator.slice(-8)}</p>
        </div>
      </div>

      {/* Creator Fee */}
      <div className="border-[1px] border-[#272934] rounded-lg p-4 flex items-center">
        <div className="bg-[#7250FB] rounded-full p-3 mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <p className="text-[#7F8199] text-xs">CREATOR FEE</p>
          <p className="text-sm font-bold">{creatorFee}%</p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
