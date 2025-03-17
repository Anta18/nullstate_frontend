import React from "react";
import Eth from "../../../assets/icons/Eth.svg";

interface LastActivityProps {
  activity: {
    price: number;
    actionBy: string;
  };
}

const LastActivity: React.FC<LastActivityProps> = ({ activity }) => {
  return (
    <div className="bg-[#131419] rounded-lg p-4 mb-6">
      <p className="text-gray-400 uppercase font-medium text-sm mb-2">
        LAST ACTIVITY
      </p>
      <div className="flex items-center">
        <span className="mr-[2px]">{activity.price}</span>
        <Eth className="h-3" />
        <span className="text-gray-400 text-sm ml-2">
          list by {activity.actionBy.slice(0, 8)}...
          {activity.actionBy.slice(-10)}
        </span>
      </div>
    </div>
  );
};

export default LastActivity;
