import React, { useState } from "react";
import "./Slider.css"; // Import the CSS file shown below

const Slider: React.FC = () => {
  const [value, setValue] = useState(50);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value, 10));
  };

  return (
    <div className="flex items-center w-full max-w-md p-4">
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        style={{ "--val": value } as React.CSSProperties}
        className="slider"
      />
    </div>
  );
};

export default Slider;
