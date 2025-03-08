import React, { useState } from "react";

const Switch: React.FC = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div
      // The outer container (track) of the switch
      className={`relative inline-flex items-center h-6 w-12 rounded-full cursor-pointer
        border border-gray-600 
        transition-colors duration-300 ease-in-out
        ${isOn ? "bg-white" : "bg-black"}`}
      onClick={() => setIsOn(!isOn)}
    >
      {/* The toggle "circle" */}
      <div
        className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out
          ${isOn ? "translate-x-6 bg-black" : "translate-x-1 bg-white"}`}
      />
    </div>
  );
};

export default Switch;
